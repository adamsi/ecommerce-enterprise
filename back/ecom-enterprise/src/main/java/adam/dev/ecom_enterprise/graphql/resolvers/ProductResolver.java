package adam.dev.ecom_enterprise.graphql.resolvers;

import adam.dev.ecom_enterprise.entity.Product;
import adam.dev.ecom_enterprise.graphql.inputs.ProductInput;
import adam.dev.ecom_enterprise.graphql.mappers.ProductMapper;
import adam.dev.ecom_enterprise.service.ProductService;
import adam.dev.ecom_enterprise.service.S3Service;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.InputArgument;
import graphql.schema.DataFetchingEnvironment;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@DgsComponent
@RequiredArgsConstructor
public class ProductResolver {

    private final ProductService productService;

    private final ProductMapper productMapper;

    private final S3Service s3Service;

    @PreAuthorize("hasRole('ADMIN')")
    @DgsMutation
    public Product addProduct(@InputArgument(name = "input") ProductInput input, DataFetchingEnvironment dfe) {
        MultipartFile file = dfe.getArgument("image");
        List<MultipartFile> thumbnailsFiles = dfe.getArgument("thumbnails");
        List<String> thumbnails = input.thumbnails();
        String image = input.image();
        boolean toDeleteThumbnails = false;
        boolean toDeleteImage = false;

        if (thumbnailsFiles != null) {
            toDeleteThumbnails = true;
            thumbnails = s3Service.uploadFiles(thumbnailsFiles);
        }

        if (file != null) {
            toDeleteImage = true;
            image = s3Service.uploadFile(file);
        }

        Product product = productMapper.toProduct(input, thumbnails, image);
        Product savedProduct = productService.saveOrOverrideProduct(product, toDeleteImage, toDeleteThumbnails);

        return savedProduct;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DgsMutation
    public Product deleteProduct(@InputArgument(name = "id") String id) {
        Product product =  productService.deleteProductById(id);
        List<String> filesToDelete = product.getThumbnails();
        filesToDelete.add(product.getImage());
        s3Service.deleteFiles(filesToDelete);

        return product;
    }

}

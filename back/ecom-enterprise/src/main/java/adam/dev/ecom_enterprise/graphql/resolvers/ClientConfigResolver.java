package adam.dev.ecom_enterprise.graphql.resolvers;

import adam.dev.ecom_enterprise.entity.ClientConfig;
import adam.dev.ecom_enterprise.graphql.inputs.ClientConfigInput;
import adam.dev.ecom_enterprise.graphql.mappers.ClientConfigMapper;
import adam.dev.ecom_enterprise.service.ClientConfigService;
import adam.dev.ecom_enterprise.service.S3Service;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.InputArgument;
import graphql.schema.DataFetchingEnvironment;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@DgsComponent
@RequiredArgsConstructor
public class ClientConfigResolver {

    private final ClientConfigService clientConfigService;

    private final S3Service s3Service;

    private final ClientConfigMapper clientConfigMapper;

    @DgsMutation
    public ClientConfig editClientConfig(@InputArgument ClientConfigInput input, DataFetchingEnvironment dfe) {
        List<MultipartFile> imagesFiles = dfe.getArgument("images");
        List<String> images = input.images();
        boolean toDeleteImages = false;

        if (imagesFiles != null) {
            toDeleteImages = true;
            images = s3Service.uploadFiles(imagesFiles);
        }

        ClientConfig clientConfig = clientConfigMapper.toClientConfig(input, images);
        return clientConfigService.createOrUpdateConfig(clientConfig, toDeleteImages);
    }

}

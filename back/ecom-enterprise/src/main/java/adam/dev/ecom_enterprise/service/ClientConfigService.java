package adam.dev.ecom_enterprise.service;

import adam.dev.ecom_enterprise.entity.ClientConfig;
import adam.dev.ecom_enterprise.repository.ClientConfigRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClientConfigService {

    private final ClientConfigRepository clientConfigRepository;

    private final S3Service s3Service;

    public ClientConfig getClientConfig(String key) {
       return clientConfigRepository.findClientConfigByKey(key)
               .orElseThrow(()-> new EntityNotFoundException(String.format("clientConfig with key %s was not found", key)));
    }

    public ClientConfig createOrUpdateConfig(ClientConfig clientConfig, boolean toDeleteImages) {
        return clientConfigRepository.findClientConfigByKey(clientConfig.getKey())
                .map(currentConfig -> {
                   if (toDeleteImages) {
                       s3Service.deleteFiles(currentConfig.getImages());
                   }

                    clientConfig.setId(currentConfig.getId());

                    return clientConfigRepository.save(clientConfig);
                })
                .orElseGet(() -> clientConfigRepository.save(clientConfig));
    }

}

package adam.dev.ecom_enterprise.graphql.mappers;

import adam.dev.ecom_enterprise.entity.ClientConfig;
import adam.dev.ecom_enterprise.graphql.inputs.ClientConfigInput;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ClientConfigMapper {

    public ClientConfig toClientConfig(ClientConfigInput clientConfigInput, List<String> images) {
        return new ClientConfig(clientConfigInput.key(), clientConfigInput.contents(), images);
    }
}

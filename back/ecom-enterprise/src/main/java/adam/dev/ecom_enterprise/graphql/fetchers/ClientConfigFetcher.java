package adam.dev.ecom_enterprise.graphql.fetchers;

import adam.dev.ecom_enterprise.entity.ClientConfig;
import adam.dev.ecom_enterprise.service.ClientConfigService;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;
import lombok.RequiredArgsConstructor;

@DgsComponent
@RequiredArgsConstructor
public class ClientConfigFetcher {

    private final ClientConfigService clientConfigService;

    @DgsQuery
    public ClientConfig clientConfig(@InputArgument String key) {
     return clientConfigService.getClientConfig(key);
    }

}

package adam.dev.ecom_enterprise.graphql.inputs;

import java.util.List;

public record ClientConfigInput(String key, List<String> contents, List<String> images) {
}

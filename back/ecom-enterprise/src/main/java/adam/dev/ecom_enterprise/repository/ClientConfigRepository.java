package adam.dev.ecom_enterprise.repository;


import adam.dev.ecom_enterprise.entity.ClientConfig;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientConfigRepository extends JpaRepository<ClientConfig, String> {
    Optional<ClientConfig> findClientConfigByKey(String key);
}

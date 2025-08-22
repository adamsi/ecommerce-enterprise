package adam.dev.ecom_enterprise.entity;

import adam.dev.ecom_enterprise.converter.StringListConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "client_config")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
public class ClientConfig extends JTVEntity {

    @Column
    private String key;

    @Column
    @Convert(converter = StringListConverter.class)
    private List<String> contents;

    @Column
    @Convert(converter = StringListConverter.class)
    private List<String> images;

}

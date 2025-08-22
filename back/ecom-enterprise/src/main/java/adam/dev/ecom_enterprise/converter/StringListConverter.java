package adam.dev.ecom_enterprise.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Converter
public class StringListConverter implements AttributeConverter<List<String>, String> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<String> list) {
        try {
            return list == null ? "[]" : objectMapper.writeValueAsString(list);
        } catch (Exception e) {
            throw new IllegalArgumentException("Error converting list to JSON string.", e);
        }
    }

    @Override
    public List<String> convertToEntityAttribute(String joined) {
        try {
            if (joined == null || joined.trim().isEmpty()) {
                return new ArrayList<>();
            }
            return objectMapper.readValue(joined, new TypeReference<>() {});
        } catch (Exception e) {
            throw new IllegalArgumentException("Error converting JSON string to list.", e);
        }
    }
}

package adam.dev.ecom_enterprise.controller;

import adam.dev.ecom_enterprise.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;


@RestController
@RequestMapping("/cronjob")
@RequiredArgsConstructor
public class CronjobController {

    private final UserRepository userRepository;

    private final StringRedisTemplate redisTemplate;

    @GetMapping("/")
    public ResponseEntity<Void> activateFreeTierServices() {
        //postgres
        userRepository.existsById("japan");
        //redis
        redisTemplate.opsForValue().get("japan");

        return ResponseEntity.ok()
                .build();
    }

    @GetMapping("/test")
    public String createPaymentLink() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://sandbox.meshulam.co.il/api/light/server/1.0/CreatePaymentLink";

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        // Create form data
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();

        // Add all form fields
        formData.add("apiKey", "57ce86548429");
        formData.add("userId", "4ec1d595ae764243");
        formData.add("pageCode", "c34d1f4a546f");
        formData.add("paymentLinkType", "2");
        formData.add("isActive", "1");
        formData.add("sendingMode", "1");
        formData.add("messageText", "שלום ישראל כאן ביוטי ספא");
        formData.add("chargeType", "1");
        formData.add("customText[thankPageTitle]", "תודה על רכישתכם");
        formData.add("successUrl", "https://mysite.co.il?success=true");
        formData.add("customText[thankPageDescription]", "נציג יצור קשר בהקדם לקביעת מועד טיפול");
        formData.add("invoiceNotifyUrl", "https://yourinvoicewebhookurl.com");
        formData.add("title", "דרישת תשלום - טיפול יופי");
        formData.add("paymentTypes[0][type]", "payments");
        formData.add("paymentTypes[0][payments][paymentsPaymentNum]", "1");
        formData.add("pageFieldSettings[fullName][value]", "ישראל ישראלי");
        formData.add("pageFieldSettings[email][value]", "test@test.com");
        formData.add("products[data][0][catalogNumber]", "1");
        formData.add("products[data][0][name]", "חבילת טיפול יופי");
        formData.add("products[data][0][price]", "100");
        formData.add("products[data][0][quantity]", "1");
        formData.add("products[data][0][minQuantity]", "1");
        formData.add("products[data][0][vatType]", "1");
        formData.add("transactionType[0]", "1");
        formData.add("transactionType[1]", "6");
        formData.add("transactionType[2]", "13");
        formData.add("transactionType[3]", "14");
        formData.add("transactionType[4]", "15");

        // Create request entity
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(formData, headers);

        try {
            // Make the request
            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Failed to create payment link: " + e.getMessage(), e);
        }
    }

}

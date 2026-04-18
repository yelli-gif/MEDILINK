package com.medilink.patient.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
@SuppressWarnings("unchecked")
public class Lot1Client {

    @Value("${lot1.url:http://localhost:8081}")
    private String lot1Url;

    private final RestTemplate restTemplate = new RestTemplate();

    public List<Map<String, Object>> getServices() {
        try {
            return restTemplate.getForObject(lot1Url + "/api/services", List.class);
        } catch (Exception e) {
            System.err.println("Lot 1 inaccessible, utilisation du fallback: " + e.getMessage());
            return Collections.emptyList();
        }
    }

    public Map<String, Object> getServiceById(Long id) {
        List<Map<String, Object>> services = getServices();
        return services.stream()
                .filter(s -> id.equals(((Number) s.get("id")).longValue()))
                .findFirst()
                .orElse(null);
    }
}

package com.medilink.medilinklot3.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import java.util.Map;

@Service
public class Lot1Client {

    @Value("${lot1.url:http://localhost:8081}")
    private String lot1Url;

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> getServiceById(Long id) {
        try {
            return restTemplate.getForObject(lot1Url + "/api/services/" + id, Map.class);
        } catch (Exception e) {
            System.err.println("Lot 1 inaccessible (service): " + e.getMessage());
            return null;
        }
    }
}

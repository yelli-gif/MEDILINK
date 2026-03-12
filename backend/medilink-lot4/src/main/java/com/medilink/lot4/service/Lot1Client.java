package com.medilink.lot4.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class Lot1Client {

    @Value("${lot1.url:http://localhost:8081}")
    private String lot1Url;

    private final RestTemplate restTemplate = new RestTemplate();

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> getMedicaments() {
        try {
            return restTemplate.getForObject(lot1Url + "/api/medicaments", List.class);
        } catch (Exception e) {
            System.err.println("Lot 1 inaccessible (Médicaments), utilisation du fallback: " + e.getMessage());
            return Collections.emptyList();
        }
    }
}

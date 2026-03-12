package com.medilink.lot4.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import java.util.Map;

@Service
public class Lot3Client {

    @Value("${lot3.url:http://localhost:8083}")
    private String lot3Url;

    private final RestTemplate restTemplate = new RestTemplate();

    @SuppressWarnings("unchecked")
    public Map<String, Object> getCurrentTicket(Long serviceId) {
        try {
            String url = lot3Url + "/api/file-attente/current?serviceId=" + serviceId;
            return restTemplate.getForObject(url, Map.class);
        } catch (Exception e) {
            System.err.println("Lot 3 inaccessible (File d'attente), utilisation du fallback: " + e.getMessage());
            return null;
        }
    }
}

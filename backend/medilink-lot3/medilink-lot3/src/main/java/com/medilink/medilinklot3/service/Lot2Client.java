package com.medilink.medilinklot3.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import java.util.Map;

@Service
public class Lot2Client {

    @Value("${lot2.url:http://localhost:8082}")
    private String lot2Url;

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, Object> getRendezVousById(Long id) {
        try {
            return restTemplate.getForObject(lot2Url + "/api/rendezvous/" + id, Map.class);
        } catch (Exception e) {
            System.err.println("Lot 2 inaccessible, utilisation du fallback: " + e.getMessage());
            return null; // ou fake_data if needed
        }
    }
}

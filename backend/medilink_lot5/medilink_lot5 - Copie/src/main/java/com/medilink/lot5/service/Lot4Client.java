package com.medilink.lot5.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;
import java.util.Map;

@Service
public class Lot4Client {

    @Value("${lot4.url:http://localhost:8084}")
    private String lot4Url;

    private final RestTemplate restTemplate = new RestTemplate();

    @SuppressWarnings("unchecked")
    public Map<String, Object> getOrdonnanceById(Long id) {
        try {
            return restTemplate.getForObject(lot4Url + "/api/ordonnances/" + id, Map.class);
        } catch (Exception e) {
            System.err.println("Lot 4 inaccessible (Ordonnances), utilisation du fallback: " + e.getMessage());
            return null;
        }
    }
}

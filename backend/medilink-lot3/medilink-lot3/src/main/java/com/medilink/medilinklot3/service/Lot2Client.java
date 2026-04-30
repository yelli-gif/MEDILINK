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
            return restTemplate.getForObject(lot2Url + "/api/rendez-vous/" + id, Map.class);
        } catch (Exception e) {
            System.err.println("Lot 2 inaccessible, utilisation du fallback: " + e.getMessage());
            return null;
        }
    }

    public void updateRendezVousStatus(Long id, String statut) {
        try {
            // Utiliser exchange pour patch car patchForObject peut avoir des soucis avec certaines configs RestTemplate par défaut
            restTemplate.execute(lot2Url + "/api/rendez-vous/" + id + "/status?statut=" + statut, 
                               org.springframework.http.HttpMethod.PATCH, null, null);
        } catch (Exception e) {
            System.err.println("Impossible de mettre à jour le statut du RDV " + id + " : " + e.getMessage());
        }
    }
}

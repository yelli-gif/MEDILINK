package com.medilink.lot5.controller;

import com.medilink.lot5.service.MockDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class StatusController {

    @Autowired
    private MockDataService mockDataService;

    // --- Bloc 8 : HealthCheck ---
    @GetMapping("/status")
    public Map<String, Object> getStatus() {
        return Map.of(
                "status", "OPERATIONAL",
                "module", "Lot 5 - Suivi & Pharmacie",
                "timestamp", LocalDateTime.now()
        );
    }

    // --- Bloc 3 : Réinitialisation des Mocks ---
    @PostMapping("/mock/init")
    public ResponseEntity<Map<String, String>> resetMockData() {
        try {
            // CORRECTION ICI : On utilise ta méthode existante
            mockDataService.reinitialiserDonnees();

            return ResponseEntity.ok(Map.of(
                    "message", "Données de test réinitialisées (Tables vidées + JSON rechargé)",
                    "timestamp", LocalDateTime.now().toString()
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "error", "Erreur lors du reset : " + e.getMessage()
            ));
        }
    }
}
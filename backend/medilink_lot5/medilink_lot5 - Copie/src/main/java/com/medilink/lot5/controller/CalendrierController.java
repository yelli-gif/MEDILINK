package com.medilink.lot5.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.medilink.lot5.service.CalendrierService;
import com.medilink.lot5.service.MockDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api") // On met la racine /api pour coller à ton URL Postman
@RequiredArgsConstructor
public class CalendrierController {

    private final CalendrierService calendrierService;
    private final MockDataService mockDataService;

    // --- TACHE BLOC 9 : Lecture du calendrier (GET) ---
    // C'est cette méthode qui manquait pour ton test Postman
    @GetMapping("/patient/suivi/calendrier")
    public ResponseEntity<?> getCalendrier(@RequestParam("patientId") String pId) { // Changé Long en String
        JsonNode root = mockDataService.getOrdonnanceMock();

        if (root == null) {
            return ResponseEntity.status(503).body("Les données mock ne sont pas chargées.");
        }

        // Comparaison en texte (.asText()) pour éviter les erreurs de format
        if (root.has("patientId") && root.get("patientId").asText().equals(pId)) {

            // On suit la structure UML : Ordonnance [cite: 52] -> LigneOrdonnance [cite: 70]
            JsonNode ordonnance = root.get("ordonnance");

            if (ordonnance != null && ordonnance.has("lignes")) {
                return ResponseEntity.ok(ordonnance.get("lignes"));
            }
        }

        return ResponseEntity.status(404).body("Aucun calendrier trouvé pour le patient ID : " + pId);
    }

    // --- Méthode existante pour générer (POST) ---
    @PostMapping("/calendrier/generer")
    public ResponseEntity<?> generer() {
        calendrierService.genererCalendrier(mockDataService.getOrdonnanceMock());
        return ResponseEntity.ok("Calendrier généré et sauvegardé en base.");
    }
}
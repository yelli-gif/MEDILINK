package com.medilink.lot5.controller;

import com.medilink.lot5.dto.response.PriseMedicamentDTO;
import com.medilink.lot5.entity.PriseMedicament;
import com.medilink.lot5.service.SuiviPatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List; // Import indispensable pour List

@RestController
@RequestMapping("/api/patient/suivi")
@RequiredArgsConstructor
public class PatientSuiviController {

    private final SuiviPatientService suiviService;

    // Tâche : Récupérer son calendrier de prises
    /*@GetMapping("/calendrier")
    public ResponseEntity<List<PriseMedicament>> getCalendrier(@RequestParam String patientId) {
        return ResponseEntity.ok(suiviService.getPrisesMedicamentsPatient(patientId));
    }
    */
    // Tâche : Cocher "J'ai pris"
    @PostMapping("/prises/{id}/valider")
    public ResponseEntity<PriseMedicament> valider(@PathVariable Long id) {
        return ResponseEntity.ok(suiviService.validerPriseMedicament(id));
    }

    // Tâche : Voir l'historique (Bloc 6)
    @GetMapping("/historique")
    public ResponseEntity<List<PriseMedicamentDTO>> getHistorique() {
        return ResponseEntity.ok(suiviService.getHistoriquePrisesPatient());
    }
}
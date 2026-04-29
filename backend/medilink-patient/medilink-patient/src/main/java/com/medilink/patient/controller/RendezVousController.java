package com.medilink.patient.controller;

import com.medilink.patient.dto.RendezVousDTO;
import com.medilink.patient.dto.RendezVousResponseDTO;
import com.medilink.patient.service.RendezVousService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST pour la gestion des rendez-vous
 * Fonctionnalité 3 : Prise de Rendez-Vous (demanderRDV, annulerRDV)
 */
@RestController
@RequestMapping("/api/rendez-vous")
@RequiredArgsConstructor
@Tag(name = "Rendez-vous", description = "API de gestion des rendez-vous médicaux")
public class RendezVousController {

    private final RendezVousService rendezVousService;

    /**
     * POST /api/rendez-vous - Créer un nouveau rendez-vous (demanderRDV dans l'UML)
     */
    @PostMapping
    @Operation(summary = "Créer un rendez-vous", description = "Demande un nouveau rendez-vous médical (demanderRDV)")
    public ResponseEntity<RendezVousResponseDTO> creerRendezVous(@Valid @RequestBody RendezVousDTO rendezVousDTO) {
        RendezVousResponseDTO response = rendezVousService.creerRendezVous(rendezVousDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * GET /api/rendez-vous/{id} - Obtenir un rendez-vous par son ID
     */
    @GetMapping("/{id}")
    @Operation(summary = "Obtenir un rendez-vous", description = "Récupère les détails d'un rendez-vous")
    public ResponseEntity<RendezVousResponseDTO> obtenirRendezVous(@PathVariable Long id) {
        RendezVousResponseDTO response = rendezVousService.obtenirRendezVous(id);
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/rendez-vous/patient/{patientId} - Obtenir les rendez-vous d'un patient
     */
    @GetMapping("/patient/{patientId}")
    @Operation(summary = "Rendez-vous d'un patient", description = "Liste tous les rendez-vous d'un patient")
    public ResponseEntity<List<RendezVousResponseDTO>> obtenirRendezVousPatient(@PathVariable Long patientId) {
        List<RendezVousResponseDTO> response = rendezVousService.obtenirRendezVousPatient(patientId);
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/rendez-vous/medecin/{medecinId} - Obtenir les rendez-vous d'un médecin
     */
    @GetMapping("/medecin/{medecinId}")
    @Operation(summary = "Rendez-vous d'un médecin", description = "Liste tous les rendez-vous d'un médecin")
    public ResponseEntity<List<RendezVousResponseDTO>> obtenirRendezVousMedecin(@PathVariable Long medecinId) {
        List<RendezVousResponseDTO> response = rendezVousService.obtenirRendezVousMedecin(medecinId);
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/rendez-vous/hopital/{hopitalId} - Obtenir les rendez-vous d'un hôpital
     */
    @GetMapping("/hopital/{hopitalId}")
    @Operation(summary = "Rendez-vous d'un hôpital", description = "Liste tous les rendez-vous d'un hôpital pour la réception")
    public ResponseEntity<List<RendezVousResponseDTO>> obtenirRendezVousHopital(@PathVariable Long hopitalId) {
        List<RendezVousResponseDTO> response = rendezVousService.obtenirRendezVousHopital(hopitalId);
        return ResponseEntity.ok(response);
    }

    /**
     * DELETE /api/rendez-vous/{id} - Annuler un rendez-vous (annulerRDV dans l'UML)
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Annuler un rendez-vous", description = "Annule un rendez-vous existant (annulerRDV)")
    public ResponseEntity<Void> annulerRendezVous(@PathVariable Long id) {
        rendezVousService.annulerRendezVous(id);
        return ResponseEntity.noContent().build();
    }
}
package com.medilink.patient.controller;

import com.medilink.patient.dto.PatientDTO;
import com.medilink.patient.dto.PatientResponseDTO;
import com.medilink.patient.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST pour la gestion des patients
 * Fonctionnalité 1 : Profil Patient (Inscription, Antécédents)
 */
@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
@Tag(name = "Patients", description = "API de gestion des patients")
public class PatientController {

    private final PatientService patientService;

    /**
     * POST /api/patients - Créer un nouveau patient (inscription)
     */
    @PostMapping
    @Operation(summary = "Créer un patient", description = "Inscription d'un nouveau patient dans le système")
    public ResponseEntity<PatientResponseDTO> creerPatient(@Valid @RequestBody PatientDTO patientDTO) {
        PatientResponseDTO response = patientService.creerPatient(patientDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * GET /api/patients/{id} - Obtenir un patient par son ID
     */
    @GetMapping("/{id}")
    @Operation(summary = "Obtenir un patient", description = "Récupère les informations d'un patient par son ID")
    public ResponseEntity<PatientResponseDTO> obtenirPatient(@PathVariable Long id) {
        PatientResponseDTO response = patientService.obtenirPatient(id);
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/patients - Lister tous les patients (paginé)
     */
    @GetMapping
    @Operation(summary = "Lister les patients", description = "Liste tous les patients avec pagination")
    public ResponseEntity<Page<PatientResponseDTO>> listerPatients(Pageable pageable) {
        Page<PatientResponseDTO> response = patientService.listerPatients(pageable);
        return ResponseEntity.ok(response);
    }

    /**
     * PUT /api/patients/{id} - Modifier un patient (y compris antécédents)
     */
    @PutMapping("/{id}")
    @Operation(summary = "Modifier un patient", description = "Met à jour les informations d'un patient (profil, antécédents)")
    public ResponseEntity<PatientResponseDTO> modifierPatient(
            @PathVariable Long id,
            @Valid @RequestBody PatientDTO patientDTO) {
        PatientResponseDTO response = patientService.modifierPatient(id, patientDTO);
        return ResponseEntity.ok(response);
    }

    /**
     * DELETE /api/patients/{id} - Supprimer un patient
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un patient", description = "Supprime un patient du système")
    public ResponseEntity<Void> supprimerPatient(@PathVariable Long id) {
        patientService.supprimerPatient(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * GET /api/patients/search?critere=xxx - Rechercher des patients
     */
    @GetMapping("/search")
    @Operation(summary = "Rechercher des patients", description = "Recherche des patients par nom ou prénom")
    public ResponseEntity<List<PatientResponseDTO>> rechercherPatients(
            @RequestParam String critere) {
        List<PatientResponseDTO> response = patientService.rechercherPatients(critere);
        return ResponseEntity.ok(response);
    }
}
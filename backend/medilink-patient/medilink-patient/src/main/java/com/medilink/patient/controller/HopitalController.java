package com.medilink.patient.controller;

import com.medilink.patient.dto.HopitalResponseDTO;
import com.medilink.patient.service.HopitalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST pour la gestion des hôpitaux
 * Fonctionnalité 2 : Recherche d'Hôpital (Géolocalisation - rechercherHopital)
 */
@RestController
@RequestMapping("/api/hopitaux")
@RequiredArgsConstructor
@Tag(name = "Hôpitaux", description = "API de recherche d'hôpitaux avec géolocalisation")
public class HopitalController {

    private final HopitalService hopitalService;

    /**
     * GET /api/hopitaux/{id} - Obtenir un hôpital par son ID
     */
    @GetMapping("/{id}")
    @Operation(summary = "Obtenir un hôpital", description = "Récupère les informations d'un hôpital avec ses services")
    public ResponseEntity<HopitalResponseDTO> obtenirHopital(@PathVariable Long id) {
        HopitalResponseDTO response = hopitalService.obtenirHopital(id);
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/hopitaux - Lister tous les hôpitaux (paginé)
     */
    @GetMapping
    @Operation(summary = "Lister les hôpitaux", description = "Liste tous les hôpitaux avec pagination")
    public ResponseEntity<Page<HopitalResponseDTO>> listerHopitaux(Pageable pageable) {
        Page<HopitalResponseDTO> response = hopitalService.listerHopitaux(pageable);
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/hopitaux/search?nom=xxx - Rechercher des hôpitaux par nom
     */
    @GetMapping("/search")
    @Operation(summary = "Rechercher des hôpitaux par nom", description = "Recherche des hôpitaux par nom")
    public ResponseEntity<List<HopitalResponseDTO>> rechercherHopitaux(@RequestParam String nom) {
        List<HopitalResponseDTO> response = hopitalService.rechercherHopitaux(nom);
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/hopitaux/proches?lat=xxx&lon=xxx&rayon=xxx - Rechercher des hôpitaux proches (rechercherHopital dans l'UML)
     */
    @GetMapping("/proches")
    @Operation(
            summary = "Rechercher des hôpitaux proches",
            description = "Recherche des hôpitaux dans un rayon donné à partir d'une position GPS (rechercherHopital)"
    )
    public ResponseEntity<List<HopitalResponseDTO>> rechercherHopitauxProches(
            @RequestParam Double latitude,
            @RequestParam Double longitude,
            @RequestParam(defaultValue = "10.0") Double rayon) {
        List<HopitalResponseDTO> response = hopitalService.rechercherHopitauxProches(latitude, longitude, rayon);
        return ResponseEntity.ok(response);
    }
}
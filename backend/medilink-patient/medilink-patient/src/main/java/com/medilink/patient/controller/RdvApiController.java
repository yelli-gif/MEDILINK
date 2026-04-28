package com.medilink.patient.controller;

import com.medilink.patient.dto.RendezVousResponseDTO;
import com.medilink.patient.service.RendezVousService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rendezvous")
@RequiredArgsConstructor
@Tag(name = "API Rendez-Vous", description = "Endpoints pour la gestion des RDV et communication inter-lots")
public class RdvApiController {

    private final RendezVousService rendezVousService;

    @Operation(summary = "Récupérer un RDV par ID", description = "Utilisé par le Lot 3 pour valider l'arrivée du patient")
    @GetMapping("/{id}")
    public ResponseEntity<RendezVousResponseDTO> getRendezVous(@PathVariable Long id) {
        return ResponseEntity.ok(rendezVousService.obtenirRendezVous(id));
    }
}

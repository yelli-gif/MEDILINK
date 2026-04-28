package com.medilink.lot4.controller;

import com.medilink.lot4.entity.Ordonnance;
import com.medilink.lot4.service.ConsultationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ordonnances")
@RequiredArgsConstructor
@Tag(name = "API Ordonnance", description = "Endpoints pour la gestion des ordonnances (consommés par le Lot 5)")
public class OrdonnanceApiController {

    private final ConsultationService consultationService;

    @Operation(summary = "Récupérer une ordonnance par ID", description = "Utilisé par le Lot 5 pour préparer les médicaments")
    @GetMapping("/{id}")
    public ResponseEntity<Ordonnance> getOrdonnance(@PathVariable Long id) {
        return ResponseEntity.ok(consultationService.getOrdonnanceById(id));
    }
}

package com.medilink.lot5.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/disponibilite")
@Tag(name = "API Disponibilité", description = "Vérification des stocks pharmacie")
public class DisponibiliteController {

    @Operation(summary = "Vérifier la disponibilité d'un médicament", 
               description = "Logique : Doliprane est toujours disponible, Morphine est toujours indisponible.")
    @GetMapping("/check")
    public ResponseEntity<Map<String, Object>> checkDisponibilite(@RequestParam String medicamentNom) {
        boolean disponible = true;
        
        if (medicamentNom != null && medicamentNom.toLowerCase().contains("morphine")) {
            disponible = false;
        } else if (medicamentNom != null && medicamentNom.toLowerCase().contains("doliprane")) {
            disponible = true;
        }
        
        return ResponseEntity.ok(Map.of(
            "medicament", medicamentNom,
            "disponible", disponible,
            "message", disponible ? "En stock" : "Rupture de stock"
        ));
    }
}

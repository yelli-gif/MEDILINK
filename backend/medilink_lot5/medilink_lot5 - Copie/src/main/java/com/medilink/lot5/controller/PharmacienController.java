package com.medilink.lot5.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pharmacien")
@RequiredArgsConstructor
public class PharmacienController {
    // private final PharmacieService pharmacieService; // Removed unused
    @GetMapping("/demandes")
    public ResponseEntity<?> getDemandes() {
        return ResponseEntity.ok("Liste demandes");
    }

    @PostMapping("/demandes/{id}/valider")
    public ResponseEntity<?> valider(@PathVariable Long id) {
        return ResponseEntity.ok("Validé");
    }
}
package com.medilink.lot4.controller;

import com.medilink.lot4.dto.OrdonnanceDTO;
import com.medilink.lot4.dto.LigneOrdonnanceDTO;
import com.medilink.lot4.entity.Ordonnance;
import com.medilink.lot4.entity.LigneOrdonnance;
import com.medilink.lot4.service.ConsultationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/consultation")
public class ConsultationController {

    private final ConsultationService consultationService;

    public ConsultationController(ConsultationService consultationService) {
        this.consultationService = consultationService;
    }

    // --- CARTE 9 : ENDPOINTS PRESCRIPTION (Cœur du Lot 4) ---

    /**
     * Étape 1 : Créer l'entête de l'ordonnance
     * Correspond à Medecin.creerOrdonnance() dans l'UML
     */
    @PostMapping("/ordonnance")
    public ResponseEntity<Ordonnance> creerOrdonnance(@RequestBody OrdonnanceDTO dto) {
        return new ResponseEntity<>(consultationService.creerOrdonnance(dto), HttpStatus.CREATED);
    }

    /**
     * Étape 2 : Ajouter des médicaments à l'ordonnance
     * Correspond à Ordonnance.ajouterLigneOrdonnance() dans l'UML
     */
    @PostMapping("/ordonnance/{id}/ligne")
    public ResponseEntity<LigneOrdonnance> ajouterLigne(@PathVariable Long id, @RequestBody LigneOrdonnanceDTO dto) {
        return new ResponseEntity<>(consultationService.ajouterLigneOrdonnance(id, dto), HttpStatus.CREATED);
    }

    @GetMapping("/ordonnance/{id}")
    public ResponseEntity<Ordonnance> getOrdonnance(@PathVariable Long id) {
        // Cette méthode doit appeler ton service pour récupérer l'objet
        Ordonnance ordonnance = consultationService.getOrdonnanceById(id);
        return ResponseEntity.ok(ordonnance);
    }

    @DeleteMapping("/ligne/{id}")
    public ResponseEntity<Void> supprimerLigne(@PathVariable Long id) {
        consultationService.supprimerLigneOrdonnance(id);
        return ResponseEntity.noContent().build(); // Renvoie un code 204 (Succès, pas de contenu)
    }

}
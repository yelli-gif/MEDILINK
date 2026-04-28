package com.medilink.medilink.controller;

import com.medilink.medilink.model.Medicament;
import com.medilink.medilink.repository.MedicamentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicaments")
public class MedicamentController {

    @Autowired
    private MedicamentRepository medicamentRepository;

    // 1. LISTER tous les médicaments
    @GetMapping
    public List<Medicament> getAllMedicaments() {
        return medicamentRepository.findAll();
    }

    // 2. AJOUTER un médicament
    @PostMapping
    public Medicament addMedicament(@RequestBody Medicament medicament) {
        return medicamentRepository.save(medicament);
    }

    // 3. MODIFIER un médicament
    @PutMapping("/{id}")
    public ResponseEntity<Medicament> updateMedicament(@PathVariable Long id, @RequestBody Medicament details) {
        return medicamentRepository.findById(id)
                .map(m -> {
                    m.setNom(details.getNom());
                    m.setForme(details.getForme());
                    return ResponseEntity.ok(medicamentRepository.save(m));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 4. SUPPRIMER un médicament
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicament(@PathVariable Long id) {
        if (medicamentRepository.existsById(id)) {
            medicamentRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
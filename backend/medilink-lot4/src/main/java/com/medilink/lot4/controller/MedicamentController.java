package com.medilink.lot4.controller;

import com.medilink.lot4.entity.Medicament;
import com.medilink.lot4.service.MedicamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicaments")
@RequiredArgsConstructor
public class MedicamentController {

    private final MedicamentService medicamentService;

    @GetMapping
    public ResponseEntity<List<Medicament>> getAll() {
        return ResponseEntity.ok(medicamentService.getAllMedicaments());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Medicament>> search(@RequestParam String q) {
        return ResponseEntity.ok(medicamentService.searchMedicaments(q));
    }

    @PostMapping
    public ResponseEntity<Medicament> create(@RequestBody Medicament medicament) {
        Medicament saved = medicamentService.addMedicament(medicament);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}

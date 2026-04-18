package com.medilink.controller;

import com.medilink.dto.StockMedicamentDTO;
import com.medilink.entity.StockMedicament;
import com.medilink.repository.StockMedicamentRepository;
import com.medilink.service.PharmacieService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/pharmacien")
@CrossOrigin(origins = "*") // Autoriser le frontend (Vite)
public class PharmacieController {

    private final PharmacieService pharmacieService;
    private final StockMedicamentRepository stockRepository;

    public PharmacieController(PharmacieService pharmacieService, StockMedicamentRepository stockRepository) {
        this.pharmacieService = pharmacieService;
        this.stockRepository = stockRepository;
    }

    @GetMapping("/stock/{medicamentId}")
    public ResponseEntity<StockMedicamentDTO> getStock(@PathVariable Long medicamentId, @RequestParam(required = false, defaultValue = "1") Long pharmacieId) {
        Optional<StockMedicament> stockOpt = stockRepository.findByMedicamentIdAndPharmacieId(medicamentId, pharmacieId);
        
        StockMedicamentDTO dto = new StockMedicamentDTO();
        dto.setMedicamentId(medicamentId);
        dto.setNom("Medicament-" + medicamentId); // Mock name
        dto.setQuantiteRequise(1); // Mock requested
        
        if (stockOpt.isPresent()) {
            dto.setQuantiteDisponible(stockOpt.get().getQuantiteDisponible());
            dto.setDisponible(stockOpt.get().getQuantiteDisponible() > 0);
        } else {
            dto.setQuantiteDisponible(0);
            dto.setDisponible(false);
        }
        
        return ResponseEntity.ok(dto);
    }
}

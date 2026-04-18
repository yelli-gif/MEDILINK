package com.medilink.service;

import com.medilink.entity.StockMedicament;
import com.medilink.repository.StockMedicamentRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PharmacieService {

    private final StockMedicamentRepository stockRepository;

    public PharmacieService(StockMedicamentRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    public boolean verifierDisponibilite(Long medicamentId, Long pharmacieId) {
        Optional<StockMedicament> stock = stockRepository.findByMedicamentIdAndPharmacieId(medicamentId, pharmacieId);
        return stock.isPresent() && stock.get().getQuantiteDisponible() > 0;
    }
}

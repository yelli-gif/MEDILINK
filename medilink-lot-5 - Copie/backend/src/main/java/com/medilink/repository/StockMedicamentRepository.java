package com.medilink.repository;

import com.medilink.entity.StockMedicament;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StockMedicamentRepository extends JpaRepository<StockMedicament, Long> {
    Optional<StockMedicament> findByMedicamentIdAndPharmacieId(Long medicamentId, Long pharmacieId);
}

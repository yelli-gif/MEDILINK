package com.medilink.lot4.repository;

import com.medilink.lot4.entity.LigneOrdonnance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LigneOrdonnanceRepository extends JpaRepository<LigneOrdonnance, Long> {
}
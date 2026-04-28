package com.medilink.lot5.repository;

import com.medilink.lot5.entity.Pharmacien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PharmacienRepository extends JpaRepository<Pharmacien, Long> {
}
package com.medilink.medilink.repository;

import com.medilink.medilink.model.Pharmacien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PharmacienRepository extends JpaRepository<Pharmacien, Long> {
}

package com.medilink.lot4.repository;

import com.medilink.lot4.entity.Medecin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedecinRepository extends JpaRepository<Medecin, Long> {
    // Cette interface nous donne accès à save(), findById(), delete(), etc.
}
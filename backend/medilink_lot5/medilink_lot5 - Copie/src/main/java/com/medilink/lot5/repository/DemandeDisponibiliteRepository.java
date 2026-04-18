package com.medilink.lot5.repository;

import com.medilink.lot5.entity.DemandeDisponibilite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandeDisponibiliteRepository extends JpaRepository<DemandeDisponibilite, Long> {

}
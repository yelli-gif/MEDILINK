package com.medilink.lot5.repository;

import com.medilink.lot5.entity.DemandeDisponibilite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DemandeDisponibiliteRepository extends JpaRepository<DemandeDisponibilite, Long> {

}
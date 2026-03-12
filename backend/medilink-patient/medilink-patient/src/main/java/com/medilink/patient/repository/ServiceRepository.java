package com.medilink.patient.repository;

import com.medilink.patient.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository pour l'accès aux données des services hospitaliers
 * Conforme au diagramme UML
 */
@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {

    /**
     * Trouve tous les services d'un hôpital
     */
    List<Service> findByHopitalId(Long hopitalId);

    /**
     * Recherche des services par nom (insensible à la casse)
     */
    @Query("SELECT s FROM Service s WHERE LOWER(s.nom) LIKE LOWER(CONCAT('%', :nom, '%'))")
    List<Service> findByNomContaining(@Param("nom") String nom);
}
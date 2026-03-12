package com.medilink.patient.repository;

import com.medilink.patient.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository pour l'accès aux données des patients
 * Conforme au diagramme UML - Fonctionnalité 1 : Profil Patient
 */
@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    /**
     * Recherche des patients par nom ou prénom (insensible à la casse)
     * Pour la fonctionnalité : rechercherPatients
     */
    @Query("SELECT p FROM Patient p WHERE " +
            "LOWER(p.nom) LIKE LOWER(CONCAT('%', :critere, '%')) OR " +
            "LOWER(p.prenom) LIKE LOWER(CONCAT('%', :critere, '%'))")
    List<Patient> rechercherParNomOuPrenom(@Param("critere") String critere);
}
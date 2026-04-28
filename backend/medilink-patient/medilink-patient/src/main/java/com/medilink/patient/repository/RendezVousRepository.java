package com.medilink.patient.repository;

import com.medilink.patient.entity.RendezVous;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

/**
 * Repository pour l'accès aux données des rendez-vous
 * Conforme au diagramme UML - Fonctionnalité 3 : Prise de RDV
 */
@Repository
public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {

    /**
     * Trouve tous les rendez-vous d'un patient
     */
    List<RendezVous> findByPatientId(Long patientId);

    /**
     * Trouve tous les rendez-vous d'un médecin
     */
    List<RendezVous> findByMedecinId(Long medecinId);

    /**
     * Trouve tous les rendez-vous d'un service
     */
    List<RendezVous> findByServiceId(Long serviceId);

    // Methode supprimée car Hopital n'est plus une entité locale
    // @Query("SELECT r FROM RendezVous r WHERE r.service.hopital.id = :hopitalId")
    // List<RendezVous> findByHopitalId(@Param("hopitalId") Long hopitalId);

    /**
     * Trouve les rendez-vous d'un médecin pour une date donnée
     */
    List<RendezVous> findByMedecinIdAndDate(Long medecinId, LocalDate date);

    /**
     * Vérifie si un médecin a déjà un rendez-vous à une date et heure données
     * Utilisé pour vérifier la disponibilité
     */
    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM RendezVous r " +
            "WHERE r.medecinId = :medecinId " +
            "AND r.date = :date " +
            "AND r.heure = :heure")
    boolean existsByMedecinIdAndDateAndHeure(
            @Param("medecinId") Long medecinId,
            @Param("date") LocalDate date,
            @Param("heure") LocalTime heure);
}
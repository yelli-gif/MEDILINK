package com.medilink.patient.repository;

import com.medilink.patient.entity.Hopital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository pour l'accès aux données des hôpitaux
 * Conforme au diagramme UML - Fonctionnalité 2 : Recherche d'Hôpital (Géolocalisation)
 */
@Repository
public interface HopitalRepository extends JpaRepository<Hopital, Long> {

    /**
     * Recherche des hôpitaux par nom (insensible à la casse)
     */
    @Query("SELECT h FROM Hopital h WHERE LOWER(h.nom) LIKE LOWER(CONCAT('%', :nom, '%'))")
    List<Hopital> findByNomContaining(@Param("nom") String nom);

    /**
     * Recherche des hôpitaux proches d'une position GPS dans un rayon donné
     * Utilise la formule Haversine pour calculer la distance
     * @param latitude Latitude de la position de recherche
     * @param longitude Longitude de la position de recherche
     * @param rayonKm Rayon de recherche en kilomètres
     * @return Liste des hôpitaux dans le rayon
     */
    @Query(value = "SELECT h.*, " +
            "(6371 * acos(cos(radians(:latitude)) * cos(radians(ST_Y(h.localisation))) * " +
            "cos(radians(ST_X(h.localisation)) - radians(:longitude)) + " +
            "sin(radians(:latitude)) * sin(radians(ST_Y(h.localisation))))) AS distance " +
            "FROM hopital h " +
            "HAVING distance <= :rayonKm " +
            "ORDER BY distance",
            nativeQuery = true)
    List<Hopital> rechercherHopitauxProches(
            @Param("latitude") Double latitude,
            @Param("longitude") Double longitude,
            @Param("rayonKm") Double rayonKm);
}
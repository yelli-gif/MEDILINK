package com.medilink.patient.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * DTO de réponse pour un rendez-vous avec informations complètes
 * Conforme au diagramme UML avec relations
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RendezVousResponseDTO {

    private Long id;
    private LocalDate date;
    private LocalTime heure;
    private LocalDateTime dateCreation;
    private String statut;

    // Informations du patient (imbriquées)
    private PatientInfoDTO patient;

    // ID du médecin (géré dans LOT 1)
    private Long medecinId;

    // Informations du service (imbriquées)
    private ServiceInfoDTO service;

    // Informations de l'hôpital (via service)
    private HopitalInfoDTO hopital;

    /**
     * DTO imbriqué pour les informations basiques du patient
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PatientInfoDTO {
        private Long id;
        private String nom;
        private String prenom;
    }

    /**
     * DTO imbriqué pour les informations basiques du service
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ServiceInfoDTO {
        private Long id;
        private String nom;
    }

    /**
     * DTO imbriqué pour les informations basiques de l'hôpital
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class HopitalInfoDTO {
        private Long id;
        private String nom;
        private String adresse;
        private Double latitude;
        private Double longitude;
    }
}
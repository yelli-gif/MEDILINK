package com.medilink.patient.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * DTO de réponse pour un patient (avec ID et dates)
 * Conforme au diagramme UML avec informations complètes
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientResponseDTO {

    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private LocalDate dateNaissance;
    private String groupeSanguin;
    private Integer poids;

    // Localisation
    private Double latitude;
    private Double longitude;

    private String antecedents;
    private LocalDateTime dateCreation;

    // Nombre de rendez-vous (optionnel, peut être calculé côté service)
    private Long nombreRendezVous;
}
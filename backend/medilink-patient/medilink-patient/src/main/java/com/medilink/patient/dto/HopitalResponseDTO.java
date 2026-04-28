package com.medilink.patient.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO de réponse pour un hôpital avec ses services
 * Conforme au diagramme UML
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HopitalResponseDTO {

    private Long id;
    private String nom;
    private String adresse;
    private Double latitude;
    private Double longitude;
    private LocalDateTime dateCreation;

    // Liste des services de l'hôpital
    private List<ServiceBasicDTO> services;

    // Distance calculée (pour la recherche géolocalisée)
    private Double distance; // en km

    /**
     * DTO imbriqué pour les informations basiques d'un service
     */
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ServiceBasicDTO {
        private Long id;
        private String nom;
    }
}
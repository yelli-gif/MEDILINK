package com.medilink.patient.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO de réponse pour un service hospitalier
 * Conforme au diagramme UML
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceResponseDTO {

    private Long id;
    private String nom;
    private LocalDateTime dateCreation;

    // Informations de l'hôpital associé
    private HopitalInfoDTO hopital;

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
    }
}
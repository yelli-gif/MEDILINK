package com.medilink.patient.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO pour la création et modification d'un hôpital
 * Conforme au diagramme UML : Hopital (-nom, -adresse, -localisation)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HopitalDTO {

    @NotBlank(message = "Le nom de l'hôpital est obligatoire")
    @Size(max = 255, message = "Le nom ne peut pas dépasser 255 caractères")
    private String nom;

    @NotBlank(message = "L'adresse est obligatoire")
    @Size(max = 500, message = "L'adresse ne peut pas dépasser 500 caractères")
    private String adresse;

    // Localisation (Point dans l'UML)
    @NotNull(message = "La latitude est obligatoire")
    @Min(value = -90, message = "La latitude doit être entre -90 et 90")
    @Max(value = 90, message = "La latitude doit être entre -90 et 90")
    private Double latitude;

    @NotNull(message = "La longitude est obligatoire")
    @Min(value = -180, message = "La longitude doit être entre -180 et 180")
    @Max(value = 180, message = "La longitude doit être entre -180 et 180")
    private Double longitude;
}
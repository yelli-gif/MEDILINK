package com.medilink.patient.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO pour la création et modification d'un patient
 * Conforme au diagramme UML : Patient (-nom, -prenom, -dateNaissance, -groupeSanguin, -poids, -localisation, -antecedents)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientDTO {

    @NotBlank(message = "Le nom est obligatoire")
    @Size(max = 100, message = "Le nom ne peut pas dépasser 100 caractères")
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    @Size(max = 100, message = "Le prénom ne peut pas dépasser 100 caractères")
    private String prenom;

    @Email(message = "L'email doit être valide")
    private String email;

    @Past(message = "La date de naissance doit être dans le passé")
    private LocalDate dateNaissance;

    @Pattern(regexp = "^(A\\+|A-|B\\+|B-|AB\\+|AB-|O\\+|O-)$",
            message = "Groupe sanguin invalide (valeurs acceptées: A+, A-, B+, B-, AB+, AB-, O+, O-)")
    private String groupeSanguin;

    @Positive(message = "Le poids doit être positif")
    @Max(value = 500, message = "Le poids ne peut pas dépasser 500 kg")
    private Integer poids;

    // Localisation (Point dans l'UML, mais on utilise lat/lon pour faciliter l'API)
    @Min(value = -90, message = "La latitude doit être entre -90 et 90")
    @Max(value = 90, message = "La latitude doit être entre -90 et 90")
    private Double latitude;

    @Min(value = -180, message = "La longitude doit être entre -180 et 180")
    @Max(value = 180, message = "La longitude doit être entre -180 et 180")
    private Double longitude;

    @Size(max = 5000, message = "Les antécédents ne peuvent pas dépasser 5000 caractères")
    private String antecedents;
}
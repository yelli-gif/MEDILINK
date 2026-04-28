package com.medilink.patient.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * DTO pour la création d'un rendez-vous
 * Conforme au diagramme UML : RendezVous (-date, -heure)
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RendezVousDTO {

    @NotNull(message = "L'ID du patient est obligatoire")
    private Long patientId;

    @NotNull(message = "L'ID du médecin est obligatoire")
    private Long medecinId;

    @NotNull(message = "L'ID du service est obligatoire")
    private Long serviceId;

    @NotNull(message = "La date du rendez-vous est obligatoire")
    @Future(message = "La date du rendez-vous doit être dans le futur")
    private LocalDate date;

    @NotNull(message = "L'heure du rendez-vous est obligatoire")
    private LocalTime heure;
}
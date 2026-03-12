package com.medilink.patient.exception;

import java.time.LocalDate;
import java.time.LocalTime;

/**
 * Exception levée quand un créneau horaire est indisponible pour un rendez-vous
 */
public class CreneauIndisponibleException extends RuntimeException {

    public CreneauIndisponibleException(LocalDate date, LocalTime heure) {
        super("Le créneau du " + date + " à " + heure + " est déjà réservé");
    }

    public CreneauIndisponibleException(String message) {
        super(message);
    }

    public CreneauIndisponibleException(Long medecinId, LocalDate date, LocalTime heure) {
        super("Le médecin avec ID " + medecinId + " n'est pas disponible le " + date + " à " + heure);
    }
}
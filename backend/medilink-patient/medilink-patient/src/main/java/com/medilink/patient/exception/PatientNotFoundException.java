package com.medilink.patient.exception;

/**
 * Exception levée quand un patient n'est pas trouvé
 */
public class PatientNotFoundException extends RuntimeException {

    public PatientNotFoundException(Long id) {
        super("Patient non trouvé avec l'ID : " + id);
    }

    public PatientNotFoundException(String message) {
        super(message);
    }
}
package com.medilink.patient.exception;

/**
 * Exception levée quand un hôpital n'est pas trouvé
 */
public class HopitalNotFoundException extends RuntimeException {

    public HopitalNotFoundException(Long id) {
        super("Hôpital non trouvé avec l'ID : " + id);
    }

    public HopitalNotFoundException(String message) {
        super(message);
    }
}
package com.medilink.patient.exception;

/**
 * Exception levée quand un service hospitalier n'est pas trouvé
 */
public class ServiceNotFoundException extends RuntimeException {

    public ServiceNotFoundException(Long id) {
        super("Service hospitalier non trouvé avec l'ID : " + id);
    }

    public ServiceNotFoundException(String message) {
        super(message);
    }
}
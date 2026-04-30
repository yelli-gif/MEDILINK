package com.medilink.medilinklot3.dto;

/**
 * DTO enrichi retourné lors de la création d'un ticket à l'accueil.
 * Inclut les informations du service et de l'hôpital pour les notifications patient.
 */
public class TicketResponseDTO {

    private String idTicket;
    private Integer numeroFile;
    private Long rendezVousId;
    private Long serviceId;
    private String serviceNom;
    private Long hopitalId;
    private String hopitalNom;
    private String statut;
    // ID du patient (récupéré depuis le RDV) pour cibler la notification
    private Long patientId;

    // ===== GETTERS / SETTERS =====

    public String getIdTicket() { return idTicket; }
    public void setIdTicket(String idTicket) { this.idTicket = idTicket; }

    public Integer getNumeroFile() { return numeroFile; }
    public void setNumeroFile(Integer numeroFile) { this.numeroFile = numeroFile; }

    public Long getRendezVousId() { return rendezVousId; }
    public void setRendezVousId(Long rendezVousId) { this.rendezVousId = rendezVousId; }

    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }

    public String getServiceNom() { return serviceNom; }
    public void setServiceNom(String serviceNom) { this.serviceNom = serviceNom; }

    public Long getHopitalId() { return hopitalId; }
    public void setHopitalId(Long hopitalId) { this.hopitalId = hopitalId; }

    public String getHopitalNom() { return hopitalNom; }
    public void setHopitalNom(String hopitalNom) { this.hopitalNom = hopitalNom; }

    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }

    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }
}

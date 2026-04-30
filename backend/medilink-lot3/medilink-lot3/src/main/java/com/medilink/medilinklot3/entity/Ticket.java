package com.medilink.medilinklot3.entity;

import com.medilink.medilinklot3.enums.StatutTicket;
import jakarta.persistence.*;

@Entity
@Table(name = "ticket")
public class Ticket {

    @Id
    @Column(name = "id_ticket")
    private String idTicket;

    @Column(name = "numero_file", nullable = false)
    private Integer numeroFile;

    @Column(name = "rendez_vous_id", nullable = false)
    private Long rendezVousId;

    @Column(name = "service_id")
    private Long serviceId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "file_attente_id")
    private FileAttente fileAttente;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut")
    private StatutTicket statut;

    // ===== GETTERS / SETTERS =====

    public String getIdTicket() {
        return idTicket;
    }

    public void setIdTicket(String idTicket) {
        this.idTicket = idTicket;
    }

    public Integer getNumeroFile() {
        return numeroFile;
    }

    public void setNumeroFile(Integer numeroFile) {
        this.numeroFile = numeroFile;
    }

    public Long getRendezVousId() {
        return rendezVousId;
    }

    public void setRendezVousId(Long rendezVousId) {
        this.rendezVousId = rendezVousId;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }

    public FileAttente getFileAttente() {
        return fileAttente;
    }

    public void setFileAttente(FileAttente fileAttente) {
        this.fileAttente = fileAttente;
    }

    public StatutTicket getStatut() {
        return statut;
    }

    public void setStatut(StatutTicket statut) {
        this.statut = statut;
    }
}

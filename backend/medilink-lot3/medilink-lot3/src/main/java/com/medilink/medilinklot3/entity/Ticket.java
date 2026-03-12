package com.medilink.medilinklot3.entity;

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

    @ManyToOne(optional = false)
    @JoinColumn(name = "file_attente_id")
    private FileAttente fileAttente;

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

    public FileAttente getFileAttente() {
        return fileAttente;
    }

    public void setFileAttente(FileAttente fileAttente) {
        this.fileAttente = fileAttente;
    }
}

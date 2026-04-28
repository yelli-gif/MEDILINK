package com.medilink.medilinklot3.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "file_attente")
public class FileAttente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    @Column(name = "service_id", nullable = false)
    private Long serviceId;

    @Column(name = "ticket_en_cours")
    private String ticketEnCours;   // CN39

    @Column(name = "numero_suivant")
    private Integer numeroSuivant;  // 39

    // ===== GETTERS / SETTERS =====

    public Long getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }

    public String getTicketEnCours() {
        return ticketEnCours;
    }

    public void setTicketEnCours(String ticketEnCours) {
        this.ticketEnCours = ticketEnCours;
    }

    public Integer getNumeroSuivant() {
        return numeroSuivant;
    }

    public void setNumeroSuivant(Integer numeroSuivant) {
        this.numeroSuivant = numeroSuivant;
    }
}

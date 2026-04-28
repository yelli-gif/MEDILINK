package com.medilink.medilink.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ticket")
@Data
public class Ticket {

    @Id
    @Column(name = "id_ticket")
    private String id_ticket;

    @Column(name = "numero_file")
    private int numeroFile;

    private String statut;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service;

    // --- CORRECTION ICI ---
    // On commente ou on supprime la relation FileAttente
    // car c'est elle qui provoquait l'erreur "Field 'file_attente_id' doesn't have a default value"
    /* @ManyToOne
    @JoinColumn(name = "file_attente_id")
    private FileAttente fileAttente;
    */

    @Column(name = "rendez_vous_id", nullable = false)
    private Long rendezVousId;
}
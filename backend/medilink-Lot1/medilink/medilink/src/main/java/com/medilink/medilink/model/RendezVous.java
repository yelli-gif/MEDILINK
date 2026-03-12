package com.medilink.medilink.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "rendez_vous")
@Data
public class RendezVous {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private LocalTime heure;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Service service; // Ajout nécessaire pour que le ticket sache où aller
}
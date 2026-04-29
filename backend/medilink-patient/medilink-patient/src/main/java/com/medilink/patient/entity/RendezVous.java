package com.medilink.patient.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * Entité représentant un rendez-vous médical
 * Conforme au diagramme UML : RendezVous (-date, -heure)
 * Mappée sur la table existante 'rendez_vous'
 */
@Entity
@Table(name = "rendez_vous")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RendezVous {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "heure")
    private LocalTime heure;

    @Column(name = "created_at", nullable = false, updatable = false, insertable = false)
    private LocalDateTime createdAt;

    // Relation ManyToOne avec Patient (1..* → 1..1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    @ToString.Exclude
    private Patient patient;

    // Référence au médecin (géré dans LOT 1 - Médecin)
    @Column(name = "medecin_id")
    private Long medecinId;


    // Relation OneToMany avec Service (1..* → 1..1) - REMPLACÉ PAR ID
    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "service_id")
    // @ToString.Exclude
    // private Service service;
    
    @Column(name = "service_id")
    private Long serviceId;

    @Column(name = "statut")
    private String statut = "EN_ATTENTE";

    // Méthode helper pour obtenir l'hôpital via le service - SUPPRIMÉE CAR PLUS DE RELATION DIRECTE
    // public Hopital obtenirHopital() {
    //    return service != null ? service.getHopital() : null;
    // }
}
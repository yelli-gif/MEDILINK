package com.medilink.patient.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entité représentant un service hospitalier (ex: Cardiologie, Pédiatrie, etc.)
 * Conforme au diagramme UML : Service (-nom)
 * Mappée sur la table existante 'service'
 */
@Entity
@Table(name = "service")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nom;

    @Column(name = "created_at", nullable = false, updatable = false, insertable = false)
    private LocalDateTime createdAt;

    // Relation ManyToOne avec Hopital (1..* → 1..1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hopital_id")
    @JsonBackReference
    @ToString.Exclude
    private Hopital hopital;

    // Relation OneToMany avec RendezVous (1..1 → 1..*)
    @OneToMany(mappedBy = "service")
    @ToString.Exclude
    private List<RendezVous> rendezVous = new ArrayList<>();
}
package com.medilink.lot4.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "ligne_ordonnance")
@Data
public class LigneOrdonnance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Attributs demandés dans ton fichier Tache_lot4.txt
    private String posologie;
    private String frequence;
    private String dureeTraitement;
    private Integer quantite;

    // L'attribut "Important UML" de ta liste
    private boolean estDisponible;

    @ManyToOne
    @JoinColumn(name = "ordonnance_id")
    @com.fasterxml.jackson.annotation.JsonBackReference // Ligne pour eviter le referencement recursifs
    private Ordonnance ordonnance;

    // Identifiant du médicament (Lien avec le Lot 1)
    private long medicamentId;
}
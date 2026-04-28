package com.medilink.patient.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.locationtech.jts.geom.Point;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entité représentant un patient dans le système MediLink
 * Conforme au diagramme UML : Patient (-nom, -prenom, -dateNaissance, -groupeSanguin, -poids, -localisation, -antecedents)
 * Mappée sur la table existante 'patient'
 */
@Entity
@Table(name = "patient")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nom;

    @Column(nullable = false, length = 100)
    private String prenom;

    @Column(name = "date_naissance")
    private LocalDate dateNaissance;

    @Column(name = "groupe_sanguin", length = 10)
    private String groupeSanguin;

    @Column
    private Integer poids;

    // Localisation géographique (type POINT avec SRID 4326)
    @Column(columnDefinition = "POINT SRID 4326")
    private Point localisation;

    @Column(columnDefinition = "TEXT")
    private String antecedents;

    @Column(name = "created_at", nullable = false, updatable = false, insertable = false)
    private LocalDateTime createdAt;

    // Relation OneToMany avec RendezVous (1..1 → 1..*)
    @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<RendezVous> rendezVous = new ArrayList<>();

    // Méthodes utilitaires pour gérer la relation bidirectionnelle
    public void addRendezVous(RendezVous rdv) {
        rendezVous.add(rdv);
        rdv.setPatient(this);
    }

    public void removeRendezVous(RendezVous rdv) {
        rendezVous.remove(rdv);
        rdv.setPatient(null);
    }

    // Méthodes helper pour faciliter l'accès aux coordonnées
    public Double getLatitude() {
        return localisation != null ? localisation.getY() : null;
    }

    public Double getLongitude() {
        return localisation != null ? localisation.getX() : null;
    }
}
package com.medilink.patient.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.locationtech.jts.geom.Point;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Entité représentant un hôpital dans le système MediLink
 * Conforme au diagramme UML : Hopital (-nom, -adresse, -localisation)
 * Mappée sur la table existante 'hopital'
 */
@Entity
@Table(name = "hopital")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hopital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String nom;

    @Column(nullable = false, length = 500)
    private String adresse;

    // Localisation géographique (type POINT avec SRID 4326)
    @Column(columnDefinition = "POINT SRID 4326", nullable = false)
    private Point localisation;

    @Column(name = "created_at", nullable = false, updatable = false, insertable = false)
    private LocalDateTime createdAt;

    // Relation OneToMany avec Service (1..1 → 1..*)
    @OneToMany(mappedBy = "hopital", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @ToString.Exclude
    private List<Service> services = new ArrayList<>();

    // Méthodes utilitaires pour gérer la relation bidirectionnelle
    public void addService(Service service) {
        services.add(service);
        service.setHopital(this);
    }

    public void removeService(Service service) {
        services.remove(service);
        service.setHopital(null);
    }

    // Méthodes helper pour faciliter l'accès aux coordonnées
    public Double getLatitude() {
        return localisation != null ? localisation.getY() : null;
    }

    public Double getLongitude() {
        return localisation != null ? localisation.getX() : null;
    }
}
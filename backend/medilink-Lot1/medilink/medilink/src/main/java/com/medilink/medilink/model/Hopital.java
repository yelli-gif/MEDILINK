package com.medilink.medilink.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.locationtech.jts.geom.Point;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "hopital")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "services") // Évite les boucles dans les logs
public class Hopital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String adresse;

    @Column(columnDefinition = "geometry(Point, 4326)", nullable = true)
    @JsonIgnore // Temporaire : évite l'erreur 500 liée au format du Point JTS
    private Point localisation;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @OneToMany(mappedBy = "hopital", cascade = CascadeType.ALL)
    @JsonIgnore // Empêche la boucle infinie dans le JSON
    private List<Service> services;
}
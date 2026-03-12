package com.medilink.medilink.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.locationtech.jts.geom.Point;
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

    @Column(columnDefinition = "GEOMETRY", nullable = false)
    @JsonIgnore // Temporaire : évite l'erreur 500 liée au format du Point JTS
    private Point localisation;

    @OneToMany(mappedBy = "hopital", cascade = CascadeType.ALL)
    @JsonIgnore // Empêche la boucle infinie dans le JSON
    private List<Service> services;
}
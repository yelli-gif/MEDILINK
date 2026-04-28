package com.medilink.lot5.entity;

import jakarta.persistence.*;
import lombok.*;

import java.awt.*;
import org.locationtech.jts.geom.Point; // Utilise bien cette bibliothèque


@Entity
@Table(name = "pharmacie")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pharmacie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",nullable = false, unique = true, length = 50)
    private Long id;


    @Column(name="nom",nullable = false, length = 200)
    public String nom;

    @Column(name="localisation",columnDefinition = "GEOMETRY")
    private Point localisation;

    @Column(name = "adresse",nullable = false)
    private String adresse;
}
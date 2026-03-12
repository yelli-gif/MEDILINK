package com.medilink.lot5.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "medicament")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Medicament {


    @Id
    @Column(name = "id",nullable = false, unique = true, length = 50)

    private Long id;

    /**
     * ATTRIBUTS DU DIAGRAMME UML
     * Le diagramme montre: nom, forme
     */
    @Column(name = "nom",nullable = false, length = 200)
    private String nom;

    @Column(name = "forme",length = 100)
    private String forme; // Ex: "Comprimé 500mg", "Gélule 20mg"
}
package com.medilink.medilink.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "medecin")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Medecin {

    @Id
    private Long id; // ID partagé avec la table Users

    private String nom;
    private String prenom;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "service_id") // Relation avec la table service
    private Service service;
}
package com.medilink.medilink.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pharmacien")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pharmacien {

    @Id
    private Long id; // ID partagé avec la table Users

    private String nom;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Users user; // Lien avec le compte utilisateur (Socle)

    @Column(name = "pharmacie_id")
    private Long pharmacieId; // Référence simple vers la table pharmacie du Lot 5
}

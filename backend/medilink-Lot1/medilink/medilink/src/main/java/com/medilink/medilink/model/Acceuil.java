package com.medilink.medilink.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "acceuil")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Acceuil {

    @Id
    private Long id; // Cet ID est partagé avec la table Users

    private String nom;
    private String prenom;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Users user; // Lien avec le compte utilisateur (Socle)

    @ManyToOne
    @JoinColumn(name = "hopital_id") // C'est ici qu'on lie à l'hôpital et non au service
    private Hopital hopital;
}
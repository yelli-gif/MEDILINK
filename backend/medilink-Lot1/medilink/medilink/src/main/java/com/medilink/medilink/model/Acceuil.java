package com.medilink.medilink.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id")
    @JsonIgnore // Évite la boucle infinie avec Users
    private Users user; // Lien avec le compte utilisateur (Socle)

    @Column(name = "created_at", nullable = false, updatable = false)
    private java.time.LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = java.time.LocalDateTime.now();
        }
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hopital_id") // C'est ici qu'on lie à l'hôpital et non au service
    @JsonIgnore // Hopital contient des géométries non sérialisables
    private Hopital hopital;
}
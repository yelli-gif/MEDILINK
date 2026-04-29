package com.medilink.medilink.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

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

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id")
    @JsonIgnore // Évite la boucle infinie avec Users
    private Users user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "service_id") // Relation avec la table service
    private Service service;
}
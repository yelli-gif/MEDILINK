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
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Medecin {

    @Id
    private Long id; // ID partagé avec la table Users
 
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id", insertable = false, updatable = false)
    @JsonIgnore // Évite la boucle infinie avec Users
    private Users user;

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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "service_id") // Relation avec la table service
    private Service service;

    // Helper pour obtenir l'ID si besoin (pour compatibilité)
    public Long getId() {
        return user != null ? user.getId() : null;
    }
}
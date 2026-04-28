package com.medilink.medilink.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

@Entity
@Table(name = "service")
@Data
@ToString(exclude = "hopital") // Évite les boucles dans les logs
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hopital_id")
    // On garde l'hôpital visible pour valider l'étape 3
    private Hopital hopital;
}
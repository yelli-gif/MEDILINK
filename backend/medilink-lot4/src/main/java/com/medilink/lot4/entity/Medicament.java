package com.medilink.lot4.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "medicament")
@Data
public class Medicament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", unique = true)
    private String code;

    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "forme")
    private String forme;

    @Column(name = "prix")
    private Double prix;
}

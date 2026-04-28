package com.medilink.medilink.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "medicament")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Medicament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nom;

    private String forme; // Ex: Tablette, Sirop, Gélule

}
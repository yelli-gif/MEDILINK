package com.medilink.lot5.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pharmacien")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pharmacien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",nullable = false, unique = true, length = 50)
    private Long id;

    @Column(name="nom",nullable = false, length = 200)
    private String nom;
}
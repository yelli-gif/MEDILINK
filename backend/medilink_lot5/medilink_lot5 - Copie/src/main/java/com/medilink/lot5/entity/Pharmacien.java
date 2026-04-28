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
    @Column(name = "id")
    private Long id;

    @Column(name="nom",nullable = false, length = 200)
    private String nom;
}
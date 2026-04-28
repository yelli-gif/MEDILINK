package com.medilink.lot5.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "demande_disponibilite")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DemandeDisponibilite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    // DIAGRAMME UML: id: String, dateDemande: DateTime
    @Column(name = "date_demande")
    private LocalDateTime dateDemande;
}
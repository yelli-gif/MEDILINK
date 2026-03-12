package com.medilink.lot5.entity;

import com.medilink.lot5.constant.StatutPrise;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "prise_medicament")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PriseMedicament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id",nullable = false, unique = true, length = 50)
    private Long id;


    @Column(name = "date_heure_prevue")
    private LocalDateTime dateHeurePrevue;

    @Column(name = "date_heure_prise")
    private LocalDateTime dateHeurePrise;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut_prise")
    private StatutPrise statutprise;

    private String commentaire;

    // MÉTHODE DIAGRAMME UML: + validerPrise() : void
    public void validerPrise() {
        if (this.dateHeurePrise == null) {
            this.dateHeurePrise = LocalDateTime.now();
        }
        if (this.dateHeurePrise.isAfter(this.dateHeurePrevue.plusHours(2))) {
            this.statutprise = StatutPrise.RETARD;
        } else {
            this.statutprise = StatutPrise.PRISE;
        }
    }
}
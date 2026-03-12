package com.medilink.lot4.entity;

import com.medilink.lot4.enums.StatutOrdonnance;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "ordonnance")
@Getter
@Setter
@NoArgsConstructor
public class Ordonnance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_creation")
    private LocalDateTime dateCreation;

    @Column(name = "date_debut_traitement")
    private LocalDateTime dateDebutTraitement;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut_ordonnance")
    private StatutOrdonnance statutOrdonnance = StatutOrdonnance.EN_ATTENTE_PHARMACIE;

    @Column(name = "medecin_id", nullable = false)
    private Long medecinId;

    @Column(name = "patient_id", nullable = false)
    private Long patientId;

    @Column(name = "service_id", nullable = false)  // ✅ Le champ critique
    private Long serviceId;

    @OneToMany(mappedBy = "ordonnance", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @com.fasterxml.jackson.annotation.JsonManagedReference // ligne pour eviter le referencement recursifs
    private List<LigneOrdonnance> lignes;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (dateCreation == null) {
            dateCreation = LocalDateTime.now();
        }
    }
}
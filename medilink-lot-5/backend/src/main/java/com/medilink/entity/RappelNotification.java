package com.medilink.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class RappelNotification {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private LocalDateTime dateHeure;
    
    @Enumerated(EnumType.STRING)
    private TypeNotification type;
    
    private String statut;
    private Long priseMedicamentId;

    public RappelNotification() {}

    public RappelNotification(Long id, LocalDateTime dateHeure, TypeNotification type, String statut, Long priseMedicamentId) {
        this.id = id;
        this.dateHeure = dateHeure;
        this.type = type;
        this.statut = statut;
        this.priseMedicamentId = priseMedicamentId;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public LocalDateTime getDateHeure() { return dateHeure; }
    public void setDateHeure(LocalDateTime dateHeure) { this.dateHeure = dateHeure; }
    
    public TypeNotification getType() { return type; }
    public void setType(TypeNotification type) { this.type = type; }
    
    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }
    
    public Long getPriseMedicamentId() { return priseMedicamentId; }
    public void setPriseMedicamentId(Long priseMedicamentId) { this.priseMedicamentId = priseMedicamentId; }
}

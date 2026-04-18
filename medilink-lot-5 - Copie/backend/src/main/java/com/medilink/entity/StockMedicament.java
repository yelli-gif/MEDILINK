package com.medilink.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class StockMedicament {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long medicamentId;
    private Long pharmacieId;
    private Integer quantiteDisponible;

    public StockMedicament() {}

    public StockMedicament(Long id, Long medicamentId, Long pharmacieId, Integer quantiteDisponible) {
        this.id = id;
        this.medicamentId = medicamentId;
        this.pharmacieId = pharmacieId;
        this.quantiteDisponible = quantiteDisponible;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Long getMedicamentId() { return medicamentId; }
    public void setMedicamentId(Long medicamentId) { this.medicamentId = medicamentId; }
    
    public Long getPharmacieId() { return pharmacieId; }
    public void setPharmacieId(Long pharmacieId) { this.pharmacieId = pharmacieId; }
    
    public Integer getQuantiteDisponible() { return quantiteDisponible; }
    public void setQuantiteDisponible(Integer quantiteDisponible) { this.quantiteDisponible = quantiteDisponible; }
}

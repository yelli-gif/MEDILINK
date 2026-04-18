package com.medilink.dto;

public class StockMedicamentDTO {
    private Long medicamentId;
    private String nom;
    private Integer quantiteRequise;
    private Integer quantiteDisponible;
    private boolean disponible;

    public StockMedicamentDTO() {}

    public StockMedicamentDTO(Long medicamentId, String nom, Integer quantiteRequise, Integer quantiteDisponible, boolean disponible) {
        this.medicamentId = medicamentId;
        this.nom = nom;
        this.quantiteRequise = quantiteRequise;
        this.quantiteDisponible = quantiteDisponible;
        this.disponible = disponible;
    }

    public Long getMedicamentId() { return medicamentId; }
    public void setMedicamentId(Long medicamentId) { this.medicamentId = medicamentId; }
    
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    
    public Integer getQuantiteRequise() { return quantiteRequise; }
    public void setQuantiteRequise(Integer quantiteRequise) { this.quantiteRequise = quantiteRequise; }
    
    public Integer getQuantiteDisponible() { return quantiteDisponible; }
    public void setQuantiteDisponible(Integer quantiteDisponible) { this.quantiteDisponible = quantiteDisponible; }
    
    public boolean isDisponible() { return disponible; }
    public void setDisponible(boolean disponible) { this.disponible = disponible; }
}

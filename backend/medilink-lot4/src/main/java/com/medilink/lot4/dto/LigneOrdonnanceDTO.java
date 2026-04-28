package com.medilink.lot4.dto;

import lombok.Data;

@Data
public class LigneOrdonnanceDTO {
    private Long medicamentId;
    private String posologie;
    private String frequence;
    private String dureeTraitement;
    private Integer quantite;
}

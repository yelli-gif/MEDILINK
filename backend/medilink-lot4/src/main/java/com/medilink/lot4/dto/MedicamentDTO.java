package com.medilink.lot4.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicamentDTO {
    private String id;
    private String nom;
    private String forme; // Ex: Tablette, Sirop
    private String dosage; // Ex: 500mg
}
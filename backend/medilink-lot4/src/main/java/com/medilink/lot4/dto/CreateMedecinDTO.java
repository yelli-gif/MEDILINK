package com.medilink.lot4.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateMedecinDTO {
    private Long userId;      // ID du user déjà créé par le Lot 1 (ou en SQL)
    private String nom;
    private String prenom;
    private Long serviceId;   // ID du service
}
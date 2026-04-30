package com.medilink.lot4.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class OrdonnanceDTO {
    private Long medecinId;
    private Long patientId;
    private Long serviceId;
    private LocalDateTime dateDebutTraitement;
    private String contenu;
    private String medecinNom;
    private String patientNom;
    private String serviceNom;
}
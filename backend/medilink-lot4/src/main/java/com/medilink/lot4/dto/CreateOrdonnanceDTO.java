package com.medilink.lot4.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class CreateOrdonnanceDTO {
    private Long medecinId;
    private Long patientId;
    // ❌ Pas besoin de serviceId dans le DTO - on le déduit du médecin
    private LocalDateTime dateDebutTraitement;
    private List<LigneOrdonnanceDTO> lignes;
}


package com.medilink.lot5.dto.response;


import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
public class DemandeDisponibiliteDTO {
    private Long id;
    private LocalDateTime dateDemande;
}


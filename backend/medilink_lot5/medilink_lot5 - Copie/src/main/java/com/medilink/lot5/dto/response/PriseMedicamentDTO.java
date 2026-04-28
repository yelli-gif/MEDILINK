package com.medilink.lot5.dto.response;
import com.medilink.lot5.constant.StatutPrise;
import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
public class PriseMedicamentDTO {
    private Long id;
    private LocalDateTime dateHeurePrevue;
    private LocalDateTime dateHeureReelle;
    private StatutPrise statut;
    private String commentaire;
}
package com.medilink.lot5.dto.response;


import lombok.*;
import java.util.List;

@Data
@Builder
public class CalendrierResponseDTO {
    private int totalPrises;
    private List<PriseMedicamentDTO> prises;
}
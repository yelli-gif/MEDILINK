package com.medilink.lot4.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketDTO {

    private String idTicket;
    private Integer numeroFile;
    private String statut; // EN_ATTENTE, EN_CONSULTATION, TERMINE

    // On lie le ticket au patient pour que le médecin sache qui il reçoit
    private PatientDTO patient;
}
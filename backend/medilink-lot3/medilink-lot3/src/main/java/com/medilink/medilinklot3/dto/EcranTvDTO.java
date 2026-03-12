package com.medilink.medilinklot3.dto;

import com.medilink.medilinklot3.entity.Ticket;
import java.util.List;

public class EcranTvDTO {

    private Ticket ticketEnCours;
    private Integer numeroSuivant;
    private List<Ticket> ticketsEnAttente;

    public EcranTvDTO(Ticket ticketEnCours,
                      Integer numeroSuivant,
                      List<Ticket> ticketsEnAttente) {
        this.ticketEnCours = ticketEnCours;
        this.numeroSuivant = numeroSuivant;
        this.ticketsEnAttente = ticketsEnAttente;
    }

    public Ticket getTicketEnCours() {
        return ticketEnCours;
    }

    public Integer getNumeroSuivant() {
        return numeroSuivant;
    }

    public List<Ticket> getTicketsEnAttente() {
        return ticketsEnAttente;
    }
}

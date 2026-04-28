package com.medilink.medilinklot3.controller;

import com.medilink.medilinklot3.entity.Ticket;
import com.medilink.medilinklot3.service.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accueil")
public class AccueilController {

    private final TicketService ticketService;

    public AccueilController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    /**
     * Scan RDV → génération ticket
     */
    @PostMapping("/arrivee")
    public ResponseEntity<Ticket> arriverPatient(
            @RequestParam Long rendezVousId,
            @RequestParam Long serviceId) {

        Ticket ticket = ticketService.creerTicket(rendezVousId, serviceId);
        return ResponseEntity.ok(ticket);
    }
}

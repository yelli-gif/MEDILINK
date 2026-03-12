package com.medilink.medilinklot3.controller;

import com.medilink.medilinklot3.entity.Ticket;
import com.medilink.medilinklot3.service.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mock")
public class MockController {

    private final TicketService ticketService;

    public MockController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    /**
     * Génère un faux patient
     */
    @PostMapping("/arrivee")
    public ResponseEntity<Ticket> genererFauxPatient(
            @RequestParam Long serviceId) {

        Long fakeRdvId = System.currentTimeMillis();

        Ticket ticket = ticketService.creerTicket(fakeRdvId, serviceId);
        return ResponseEntity.ok(ticket);
    }
}

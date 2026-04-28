package com.medilink.medilinklot3.controller;

import com.medilink.medilinklot3.service.FileAttenteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tv")
public class TvController {

    private final FileAttenteService fileAttenteService;

    public TvController(FileAttenteService fileAttenteService) {
        this.fileAttenteService = fileAttenteService;
    }

    /**
     * Numéro actuellement affiché à l’écran (ex: CN39)
     */
    @GetMapping("/encours")
    public ResponseEntity<String> ticketEnCours(@RequestParam Long serviceId) {

        String ticket = fileAttenteService.getTicketEnCours(serviceId);

        if (ticket == null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(ticket);
    }

    /**
     * Appeler le prochain patient (FIFO)
     */
    @PostMapping("/suivant")
    public ResponseEntity<String> appelerSuivant(@RequestParam Long serviceId) {

        String ticket = fileAttenteService.appelerProchain(serviceId);

        if (ticket == null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(ticket);
    }
}

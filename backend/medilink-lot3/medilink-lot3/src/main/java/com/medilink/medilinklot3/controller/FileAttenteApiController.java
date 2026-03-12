package com.medilink.medilinklot3.controller;

import com.medilink.medilinklot3.service.FileAttenteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/file-attente")
@RequiredArgsConstructor
@Tag(name = "API File d'Attente", description = "Endpoints pour le suivi de la file d'attente (Lot 4)")
public class FileAttenteApiController {

    private final FileAttenteService fileAttenteService;

    @Operation(summary = "Récupérer le ticket en cours", description = "Utilisé par le Lot 4 pour savoir quel patient appeler")
    @GetMapping("/current")
    public ResponseEntity<Map<String, Object>> getCurrentTicket(@RequestParam Long serviceId) {
        String ticket = fileAttenteService.getTicketEnCours(serviceId);
        Map<String, Object> response = new HashMap<>();
        response.put("ticketNumero", ticket);
        // On pourrait ajouter l'ID du patient si la FileAttente le stockait, mais ici
        // c'est juste le numéro
        return ResponseEntity.ok(response);
    }
}

package com.medilink.medilink.controller;

import com.medilink.medilink.model.RendezVous;
import com.medilink.medilink.model.Ticket;
import com.medilink.medilink.repository.RendezVousRepository;
import com.medilink.medilink.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/accueil")
public class AccueilController {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private RendezVousRepository rendezVousRepository;

    @PostMapping("/emettre-ticket")
    public Ticket emettreTicket(@RequestParam Long rendezVousId) {
        // 1. On vérifie juste que le RDV existe (Lien avec le Lot 2)
        RendezVous rdv = rendezVousRepository.findById(rendezVousId)
                .orElseThrow(() -> new RuntimeException("RDV " + rendezVousId + " non trouvé."));

        // 2. Création d'un ticket simple pour marquer l'arrivée
        Ticket t = new Ticket();
        // Génération d'un ID unique
        t.setId_ticket("TK-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase());
        t.setNumeroFile(1); // On met 1 par défaut, le Lot 3 gérera l'incrémentation plus tard
        t.setStatut("PRESENT"); // Le patient est là

        // On récupère les infos du Lot 2 (Rendez-vous)
        t.setService(rdv.getService());
        t.setRendezVousId(rdv.getId());

        // 3. On sauvegarde sans se soucier de la file d'attente
        return ticketRepository.save(t);
    }
}
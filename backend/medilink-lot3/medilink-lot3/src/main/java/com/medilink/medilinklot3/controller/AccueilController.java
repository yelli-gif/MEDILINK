package com.medilink.medilinklot3.controller;

import com.medilink.medilinklot3.dto.TicketResponseDTO;
import com.medilink.medilinklot3.entity.Ticket;
import com.medilink.medilinklot3.service.Lot1Client;
import com.medilink.medilinklot3.service.Lot2Client;
import com.medilink.medilinklot3.service.TicketService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/accueil")
public class AccueilController {

    private final TicketService ticketService;
    private final Lot1Client lot1Client;
    private final Lot2Client lot2Client;

    public AccueilController(TicketService ticketService, Lot1Client lot1Client, Lot2Client lot2Client) {
        this.ticketService = ticketService;
        this.lot1Client = lot1Client;
        this.lot2Client = lot2Client;
    }

    /**
     * Scan RDV → génération ticket enrichi avec serviceNom, hopitalNom, patientId
     */
    @PostMapping("/arrivee")
    public ResponseEntity<TicketResponseDTO> arriverPatient(
            @RequestParam Long rendezVousId,
            @RequestParam Long serviceId) {

        Ticket ticket = ticketService.creerTicket(rendezVousId, serviceId);

        // Construire le DTO enrichi
        TicketResponseDTO dto = new TicketResponseDTO();
        dto.setIdTicket(ticket.getIdTicket());
        dto.setNumeroFile(ticket.getNumeroFile());
        dto.setRendezVousId(ticket.getRendezVousId());
        dto.setServiceId(serviceId);
        dto.setStatut(ticket.getStatut() != null ? ticket.getStatut().name() : "EN_ATTENTE");

        // Enrichir avec les données du service (Lot 1)
        try {
            Map<String, Object> serviceData = lot1Client.getServiceById(serviceId);
            if (serviceData != null) {
                dto.setServiceNom((String) serviceData.get("nom"));
                // L'hôpital est imbriqué dans le service
                if (serviceData.containsKey("hopital") && serviceData.get("hopital") instanceof Map) {
                    Map<String, Object> hopitalData = (Map<String, Object>) serviceData.get("hopital");
                    dto.setHopitalId(hopitalData.get("id") != null ? ((Number) hopitalData.get("id")).longValue() : null);
                    dto.setHopitalNom((String) hopitalData.get("nom"));
                }
            }
        } catch (Exception e) {
            System.err.println("Impossible d'enrichir le ticket avec les données Lot 1: " + e.getMessage());
        }

        // Récupérer le patientId depuis le RDV (Lot 2)
        try {
            Map<String, Object> rdv = lot2Client.getRendezVousById(rendezVousId);
            if (rdv != null && rdv.containsKey("patient") && rdv.get("patient") instanceof Map) {
                Map<String, Object> patientData = (Map<String, Object>) rdv.get("patient");
                if (patientData.get("id") != null) {
                    dto.setPatientId(((Number) patientData.get("id")).longValue());
                }
            }
        } catch (Exception e) {
            System.err.println("Impossible de récupérer le patientId depuis Lot 2: " + e.getMessage());
        }

        // 3. Notifier Lot 2 que le patient est arrivé pour qu'il disparaisse des "nouvelles demandes"
        lot2Client.updateRendezVousStatus(rendezVousId, "ARRIVE");

        return ResponseEntity.ok(dto);
    }
}

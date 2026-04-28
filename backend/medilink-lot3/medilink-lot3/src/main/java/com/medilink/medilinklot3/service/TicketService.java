package com.medilink.medilinklot3.service;

import com.medilink.medilinklot3.entity.FileAttente;
import com.medilink.medilinklot3.entity.Ticket;
import com.medilink.medilinklot3.repository.FileAttenteRepository;
import com.medilink.medilinklot3.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final FileAttenteRepository fileAttenteRepository;
    private final Lot2Client lot2Client; // Ajouté

    public TicketService(TicketRepository ticketRepository,
            FileAttenteRepository fileAttenteRepository,
            Lot2Client lot2Client) {
        this.ticketRepository = ticketRepository;
        this.fileAttenteRepository = fileAttenteRepository;
        this.lot2Client = lot2Client;
    }

    public Ticket creerTicket(Long rendezVousId, Long serviceId) {
        // Validation via Lot 2
        var rdv = lot2Client.getRendezVousById(rendezVousId);
        if (rdv == null) {
            throw new RuntimeException("Rendez-vous invalide ou introuvable : " + rendezVousId);
        }
        // Optionnel : Vérifier si le serviceId correspond
        // Long rdvServiceId = ((Number)
        // ((Map)rdv.get("service")).get("id")).longValue();
        // if (!rdvServiceId.equals(serviceId)) ...

        FileAttente file = fileAttenteRepository
                .findByDateAndServiceId(LocalDate.now(), serviceId)
                .orElseGet(() -> {
                    FileAttente f = new FileAttente();
                    f.setDate(LocalDate.now());
                    f.setServiceId(serviceId);
                    f.setNumeroSuivant(1);
                    f.setTicketEnCours(null);
                    return fileAttenteRepository.save(f);
                });

        Ticket ticket = new Ticket();
        ticket.setIdTicket(UUID.randomUUID().toString());
        ticket.setNumeroFile(file.getNumeroSuivant());
        ticket.setRendezVousId(rendezVousId);
        ticket.setFileAttente(file);

        file.setNumeroSuivant(file.getNumeroSuivant() + 1);
        fileAttenteRepository.save(file);

        return ticketRepository.save(ticket);
    }
}

package com.medilink.medilinklot3.service;

import com.medilink.medilinklot3.entity.FileAttente;
import com.medilink.medilinklot3.entity.Ticket;
import com.medilink.medilinklot3.repository.FileAttenteRepository;
import com.medilink.medilinklot3.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class FileAttenteService {

    private final FileAttenteRepository fileAttenteRepository;

    public FileAttenteService(FileAttenteRepository fileAttenteRepository) {
        this.fileAttenteRepository = fileAttenteRepository;
    }

    /**
     * Retourne le ticket affiché à l'écran (CN39)
     */
    public String getTicketEnCours(Long serviceId) {

        return fileAttenteRepository
                .findByDateAndServiceId(LocalDate.now(), serviceId)
                .map(FileAttente::getTicketEnCours)
                .orElse(null);
    }

    /**
     * Appelle le prochain patient (FIFO)
     */
    public String appelerProchain(Long serviceId) {

        FileAttente file = fileAttenteRepository
                .findByDateAndServiceId(LocalDate.now(), serviceId)
                .orElseGet(() -> {
                    FileAttente f = new FileAttente();
                    f.setDate(LocalDate.now());
                    f.setServiceId(serviceId);
                    f.setNumeroSuivant(1);
                    return fileAttenteRepository.save(f);
                });

        // Construire le ticket affiché
        String ticket = "CN" + file.getNumeroSuivant();

        // Mettre à jour la file
        file.setTicketEnCours(ticket);
        file.setNumeroSuivant(file.getNumeroSuivant() + 1);

        fileAttenteRepository.save(file);

        return ticket;
    }
}

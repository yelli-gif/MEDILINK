package com.medilink.medilinklot3.repository;

import com.medilink.medilinklot3.entity.FileAttente;
import com.medilink.medilinklot3.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, String> {

    Optional<Ticket> findFirstByFileAttenteIdOrderByNumeroFileAsc(Long fileAttenteId);
}

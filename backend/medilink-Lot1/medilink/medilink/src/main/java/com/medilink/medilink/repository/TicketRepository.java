package com.medilink.medilink.repository;

import com.medilink.medilink.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, String> {
    // On utilise String ici car ton id_ticket est un String
}
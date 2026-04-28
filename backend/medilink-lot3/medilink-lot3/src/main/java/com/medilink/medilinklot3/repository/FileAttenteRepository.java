package com.medilink.medilinklot3.repository;

import com.medilink.medilinklot3.entity.FileAttente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface FileAttenteRepository extends JpaRepository<FileAttente, Long> {

    Optional<FileAttente> findByDateAndServiceId(LocalDate date, Long serviceId);
}

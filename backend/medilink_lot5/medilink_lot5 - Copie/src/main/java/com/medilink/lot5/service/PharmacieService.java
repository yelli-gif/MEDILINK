package com.medilink.lot5.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.medilink.lot5.entity.DemandeDisponibilite;
import com.medilink.lot5.repository.DemandeDisponibiliteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PharmacieService {

    private final DemandeDisponibiliteRepository demandeRepository;
    private final MockDataService mockDataService;

    @Transactional
    public DemandeDisponibilite recevoirDemande(String refOrdonnance) {
        DemandeDisponibilite demande = DemandeDisponibilite.builder()
                .dateDemande(LocalDateTime.now())
                .build();
        return demandeRepository.save(demande);
    }

    @Transactional
    public DemandeDisponibilite traiterDemande(Long id, String reponse) {
        DemandeDisponibilite demande = demandeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Demande non trouvée"));
        return demandeRepository.save(demande);
    }

    public JsonNode consulterOrdonnance(String ordonnanceId) {
        return mockDataService.getOrdonnanceMock();
    }
}
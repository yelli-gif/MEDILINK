package com.medilink.lot5.service;

import com.medilink.lot5.constant.StatutPrise;
import com.medilink.lot5.dto.response.PriseMedicamentDTO;
import com.medilink.lot5.entity.PriseMedicament;
import com.medilink.lot5.repository.PriseMedicamentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SuiviPatientService {

    private final PriseMedicamentRepository priseRepository;

    // Tâche : Calendrier actuel
    public List<PriseMedicament> getPrisesMedicamentsPatient(String patientId) {
        return priseRepository.findByPatientIdOrderByDateHeurePrevueAsc(patientId);
    }

    // Tâche : Valider une prise (passe de A_PRENDRE à PRISE)
    @Transactional
    public PriseMedicament validerPriseMedicament(Long priseId) {
        PriseMedicament prise = priseRepository.findById(priseId)
                .orElseThrow(() -> new RuntimeException("Prise non trouvée"));
        prise.setStatutprise(StatutPrise.PRISE);
        return priseRepository.save(prise);
    }

    // Tâche : Historique (Bloc 5)
    public List<PriseMedicamentDTO> getHistoriquePrisesPatient() {
        return priseRepository.findAll().stream()
                .filter(p -> p.getStatutprise() != StatutPrise.A_PRENDRE)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Dans SuiviPatientService.java
    private PriseMedicamentDTO convertToDTO(PriseMedicament prise) {
        return PriseMedicamentDTO.builder()
                .id(prise.getId())
                .dateHeurePrevue(prise.getDateHeurePrevue())
                .statut(prise.getStatutprise()) // <--- RETIREZ le .name() ici
                .commentaire(prise.getCommentaire())
                .build();
    }
}
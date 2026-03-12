package com.medilink.lot5.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.medilink.lot5.constant.StatutPrise;
import com.medilink.lot5.entity.PriseMedicament;
import com.medilink.lot5.repository.PriseMedicamentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendrierService {

    private final PriseMedicamentRepository priseRepository;

    @Transactional
    public List<PriseMedicament> genererCalendrier(JsonNode ordonnance) {
        List<PriseMedicament> prises = new ArrayList<>();
        LocalDateTime dateDebut = LocalDateTime.parse(ordonnance.get("dateDebutTraitement").asText());

        for (JsonNode ligne : ordonnance.get("lignesOrdonnance")) {
            String freq = ligne.get("frequence").asText();
            int duree = Integer.parseInt(ligne.get("duree_traitement").asText().split(" ")[0]);
            int nbPrises = freq.contains("1x") ? 1 : freq.contains("2x") ? 2 : freq.contains("3x") ? 3 : 4;

            List<LocalTime> heures = new ArrayList<>();
            if (nbPrises == 1) heures.add(LocalTime.of(8, 0));
            else if (nbPrises == 2) { heures.add(LocalTime.of(8, 0)); heures.add(LocalTime.of(20, 0)); }
            else if (nbPrises == 3) { heures.add(LocalTime.of(8, 0)); heures.add(LocalTime.of(14, 0)); heures.add(LocalTime.of(20, 0)); }
            else { heures.add(LocalTime.of(7, 0)); heures.add(LocalTime.of(12, 0)); heures.add(LocalTime.of(17, 0)); heures.add(LocalTime.of(22, 0)); }

            for (int j = 0; j < duree; j++) {
                for (LocalTime h : heures) {
                    PriseMedicament prise = PriseMedicament.builder()
                            .dateHeurePrevue(LocalDateTime.of(dateDebut.plusDays(j).toLocalDate(), h))
                            .statutprise(StatutPrise.A_PRENDRE)
                            .build();
                    prises.add(prise);
                }
            }
        }

        return priseRepository.saveAll(prises);
    }
}
package com.medilink.lot4.service.mock;

import com.medilink.lot4.dto.PatientDTO;
import org.springframework.stereotype.Service;
import java.util.Arrays;

@Service
public class MockPatientService {

    /**
     * Simule la récupération d'un patient depuis le Lot 2/3
     */
    public PatientDTO getPatientById(String id) {
        // On crée un patient fictif pour les tests
        return new PatientDTO(
                id,
                "Dupont",
                "Jean",
                "O+",
                Arrays.asList("Allergie Pénicilline", "Hypertension", "Asthme")
        );
    }
}
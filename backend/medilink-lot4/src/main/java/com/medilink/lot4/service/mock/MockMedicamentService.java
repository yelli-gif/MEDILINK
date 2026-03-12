package com.medilink.lot4.service.mock;

import com.medilink.lot4.dto.MedicamentDTO;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;

@Service
public class MockMedicamentService {

    // Simule le catalogue du Lot 1
    public List<MedicamentDTO> getAllMedicaments() {
        return Arrays.asList(
                new MedicamentDTO("1", "Doliprane", "Tablette", "500mg"),
                new MedicamentDTO("2", "Amoxicilline", "Gélule", "1g")
        );
    }

    // Simule la validation du pharmacien (estDispo: Boolean)
    public boolean verifierDisponibilite(String medicamentId) {
        // Simule que tout est dispo sauf si l'ID est "999"
        return !"999".equals(medicamentId);
    }
}
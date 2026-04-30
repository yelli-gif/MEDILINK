package com.medilink.lot4.service;

import com.medilink.lot4.entity.Medicament;
import com.medilink.lot4.repository.MedicamentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicamentService {

    private final MedicamentRepository medicamentRepository;

    public List<Medicament> getAllMedicaments() {
        return medicamentRepository.findAll();
    }

    public List<Medicament> searchMedicaments(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return medicamentRepository.findAll();
        }
        return medicamentRepository.findByNomContainingIgnoreCase(keyword.trim());
    }

    public Medicament addMedicament(Medicament medicament) {
        if (medicament.getCode() == null || medicament.getCode().isEmpty()) {
            medicament.setCode("MED-NEW-" + System.currentTimeMillis());
        }
        return medicamentRepository.save(medicament);
    }
}

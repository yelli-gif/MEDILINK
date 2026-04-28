package com.medilink.patient.service;

import com.medilink.patient.dto.PatientDTO;
import com.medilink.patient.dto.PatientResponseDTO;
import com.medilink.patient.entity.Patient;
import com.medilink.patient.exception.PatientNotFoundException;
import com.medilink.patient.mapper.PatientMapper;
import com.medilink.patient.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service pour la gestion des patients
 * Fonctionnalité 1 : Profil Patient (Inscription, Antécédents)
 */
@Service
@RequiredArgsConstructor
@Transactional
public class PatientService {

    private final PatientRepository patientRepository;
    private final PatientMapper patientMapper;

    /**
     * Crée un nouveau patient (inscription)
     */
    public PatientResponseDTO creerPatient(PatientDTO patientDTO) {
        // Convertir DTO → Entité
        Patient patient = patientMapper.toEntity(patientDTO);

        // Sauvegarder
        Patient savedPatient = patientRepository.save(patient);

        // Retourner la réponse
        return patientMapper.toResponseDTO(savedPatient);
    }

    /**
     * Obtient un patient par son ID
     */
    @Transactional(readOnly = true)
    public PatientResponseDTO obtenirPatient(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException(id));

        return patientMapper.toResponseDTO(patient);
    }

    /**
     * Liste tous les patients avec pagination
     */
    @Transactional(readOnly = true)
    public Page<PatientResponseDTO> listerPatients(Pageable pageable) {
        return patientRepository.findAll(pageable)
                .map(patientMapper::toResponseDTO);
    }

    /**
     * Modifie les informations d'un patient (y compris antécédents)
     */
    public PatientResponseDTO modifierPatient(Long id, PatientDTO patientDTO) {
        // Vérifier que le patient existe
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException(id));

        // Mettre à jour les champs
        patientMapper.updateEntity(patientDTO, patient);

        // Sauvegarder
        Patient updatedPatient = patientRepository.save(patient);

        return patientMapper.toResponseDTO(updatedPatient);
    }

    /**
     * Supprime un patient
     */
    public void supprimerPatient(Long id) {
        // Vérifier que le patient existe
        if (!patientRepository.existsById(id)) {
            throw new PatientNotFoundException(id);
        }

        patientRepository.deleteById(id);
    }

    /**
     * Recherche des patients par nom ou prénom
     */
    @Transactional(readOnly = true)
    public List<PatientResponseDTO> rechercherPatients(String critere) {
        List<Patient> patients = patientRepository.rechercherParNomOuPrenom(critere);

        return patients.stream()
                .map(patientMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}
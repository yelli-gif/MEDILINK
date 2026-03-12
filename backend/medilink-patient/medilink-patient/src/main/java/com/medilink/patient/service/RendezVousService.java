package com.medilink.patient.service;

import com.medilink.patient.dto.RendezVousDTO;
import com.medilink.patient.dto.RendezVousResponseDTO;
import com.medilink.patient.entity.Patient;
import com.medilink.patient.entity.RendezVous;
import com.medilink.patient.entity.RenderVous; // Placeholder to keep line count or just remove
// import com.medilink.patient.entity.Service; // Supprimé
import com.medilink.patient.exception.CreneauIndisponibleException;
import com.medilink.patient.exception.PatientNotFoundException;
import com.medilink.patient.exception.ServiceNotFoundException;
import com.medilink.patient.mapper.RendezVousMapper;
import com.medilink.patient.repository.PatientRepository;
import com.medilink.patient.repository.RendezVousRepository;
// import com.medilink.patient.repository.ServiceRepository; // Supprimé
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Service pour la gestion des rendez-vous
 * Fonctionnalité 3 : Prise de Rendez-Vous (demanderRDV, annulerRDV)
 */
@org.springframework.stereotype.Service
@RequiredArgsConstructor
@Transactional
public class RendezVousService {

    private final RendezVousRepository rendezVousRepository;
    private final PatientRepository patientRepository;
    // private final ServiceRepository serviceRepository; // Supprimé
    private final Lot1Client lot1Client; // Ajouté
    private final RendezVousMapper rendezVousMapper;

    /**
     * Crée un nouveau rendez-vous (demanderRDV dans l'UML)
     * Vérifie la disponibilité du médecin avant de créer
     */
    public RendezVousResponseDTO creerRendezVous(RendezVousDTO rendezVousDTO) {
        // Vérifier que le patient existe
        Patient patient = patientRepository.findById(rendezVousDTO.getPatientId())
                .orElseThrow(() -> new PatientNotFoundException(rendezVousDTO.getPatientId()));

        // Vérifier que le service existe via Lot 1
        Map<String, Object> serviceData = lot1Client.getServiceById(rendezVousDTO.getServiceId());
        if (serviceData == null) {
            throw new ServiceNotFoundException(rendezVousDTO.getServiceId());
        }

        // Vérifier la disponibilité du médecin
        if (!verifierDisponibilite(rendezVousDTO.getMedecinId(),
                rendezVousDTO.getDate(),
                rendezVousDTO.getHeure())) {
            throw new CreneauIndisponibleException(
                    rendezVousDTO.getMedecinId(),
                    rendezVousDTO.getDate(),
                    rendezVousDTO.getHeure()
            );
        }

        // Créer le rendez-vous
        RendezVous rendezVous = rendezVousMapper.toEntity(rendezVousDTO);
        rendezVous.setPatient(patient);
        rendezVous.setServiceId(rendezVousDTO.getServiceId()); // Utilisation de l'ID

        // Sauvegarder
        RendezVous savedRendezVous = rendezVousRepository.save(rendezVous);

        return toFullResponseDTO(savedRendezVous);
    }

    /**
     * Obtient un rendez-vous par son ID
     */
    @Transactional(readOnly = true)
    public RendezVousResponseDTO obtenirRendezVous(Long id) {
        RendezVous rendezVous = rendezVousRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rendez-vous non trouvé avec l'ID : " + id));

        return toFullResponseDTO(rendezVous);
    }

    /**
     * Obtient tous les rendez-vous d'un patient
     */
    @Transactional(readOnly = true)
    public List<RendezVousResponseDTO> obtenirRendezVousPatient(Long patientId) {
        // Vérifier que le patient existe
        if (!patientRepository.existsById(patientId)) {
            throw new PatientNotFoundException(patientId);
        }

        List<RendezVous> rendezVousList = rendezVousRepository.findByPatientId(patientId);

        return rendezVousList.stream()
        return rendezVousList.stream()
                .map(this::toFullResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtient tous les rendez-vous d'un médecin
     */
    @Transactional(readOnly = true)
    public List<RendezVousResponseDTO> obtenirRendezVousMedecin(Long medecinId) {
        List<RendezVous> rendezVousList = rendezVousRepository.findByMedecinId(medecinId);

        return rendezVousList.stream()
        return rendezVousList.stream()
                .map(this::toFullResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Annule un rendez-vous (annulerRDV dans l'UML)
     */
    public void annulerRendezVous(Long id) {
        // Vérifier que le rendez-vous existe
        if (!rendezVousRepository.existsById(id)) {
            throw new RuntimeException("Rendez-vous non trouvé avec l'ID : " + id);
        }

        // Supprimer le rendez-vous
        rendezVousRepository.deleteById(id);
    }

    /**
     * Vérifie si un médecin est disponible à une date et heure données
     */
    @Transactional(readOnly = true)
    public boolean verifierDisponibilite(Long medecinId, LocalDate date, LocalTime heure) {
        // Retourne true si le médecin est disponible (pas de RDV existant)
        return !rendezVousRepository.existsByMedecinIdAndDateAndHeure(medecinId, date, heure);
    }
    

    private RendezVousResponseDTO toFullResponseDTO(RendezVous rdv) {
        RendezVousResponseDTO dto = rendezVousMapper.toResponseDTO(rdv);
        
        // Enrichir avec les données du service depuis Lot 1
        if (rdv.getServiceId() != null) {
            Map<String, Object> serviceData = lot1Client.getServiceById(rdv.getServiceId());
            if (serviceData != null) {
                dto.setService(RendezVousResponseDTO.ServiceInfoDTO.builder()
                        .id(((Number) serviceData.get("id")).longValue())
                        .nom((String) serviceData.get("nom"))
                        .build());

                // Pour l'instant, on suppose que l'hopital est inclus dans le service ou on l'ignore
                // Si le JSON de Lot 1 contient "hopital", on peut le mapper
                if (serviceData.containsKey("hopital")) {
                     Map<String, Object> hopitalData = (Map<String, Object>) serviceData.get("hopital");
                     dto.setHopital(RendezVousResponseDTO.HopitalInfoDTO.builder()
                            .id(((Number) hopitalData.get("id")).longValue())
                            .nom((String) hopitalData.get("nom"))
                            //.adresse(...)
                            .build());
                }
            }
        }
        return dto;
    }
}
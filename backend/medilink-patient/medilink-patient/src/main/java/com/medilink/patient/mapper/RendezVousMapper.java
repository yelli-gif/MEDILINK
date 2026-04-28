package com.medilink.patient.mapper;

import com.medilink.patient.dto.RendezVousDTO;
import com.medilink.patient.dto.RendezVousResponseDTO;
import com.medilink.patient.entity.RendezVous;
import org.springframework.stereotype.Component;

/**
 * Mapper pour convertir entre l'entité RendezVous et ses DTOs
 */
@Component
public class RendezVousMapper {

    /**
     * Convertit un RendezVousDTO en entité RendezVous (pour création)
     * Note: Les relations (Patient, Service) sont définies dans le Service
     */
    public RendezVous toEntity(RendezVousDTO dto) {
        if (dto == null) {
            return null;
        }

        RendezVous rendezVous = new RendezVous();
        rendezVous.setDate(dto.getDate());
        rendezVous.setHeure(dto.getHeure());
        rendezVous.setMedecinId(dto.getMedecinId());

        return rendezVous;
    }

    /**
     * Convertit une entité RendezVous en RendezVousResponseDTO (pour réponse)
     */
    public RendezVousResponseDTO toResponseDTO(RendezVous rendezVous) {
        if (rendezVous == null) {
            return null;
        }

        // Informations du patient
        RendezVousResponseDTO.PatientInfoDTO patientInfo = null;
        if (rendezVous.getPatient() != null) {
            patientInfo = RendezVousResponseDTO.PatientInfoDTO.builder()
                    .id(rendezVous.getPatient().getId())
                    .nom(rendezVous.getPatient().getNom())
                    .prenom(rendezVous.getPatient().getPrenom())
                    .build();
        }

        // Informations du service et de l'hopital seront peuplées par le service via Lot1Client
        // car l'entité RendezVous ne contient plus que serviceId
        RendezVousResponseDTO.ServiceInfoDTO serviceInfo = null;
        RendezVousResponseDTO.HopitalInfoDTO hopitalInfo = null;
        
        // Logique déplacée dans RendezVousService

        return RendezVousResponseDTO.builder()
                .id(rendezVous.getId())
                .date(rendezVous.getDate())
                .heure(rendezVous.getHeure())
                .dateCreation(rendezVous.getCreatedAt())
                .patient(patientInfo)
                .medecinId(rendezVous.getMedecinId())
                .service(serviceInfo)
                .hopital(hopitalInfo)
                .build();
    }
}
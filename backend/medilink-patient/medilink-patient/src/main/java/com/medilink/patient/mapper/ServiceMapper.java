package com.medilink.patient.mapper;

import com.medilink.patient.dto.ServiceDTO;
import com.medilink.patient.dto.ServiceResponseDTO;
import com.medilink.patient.entity.Service;
import org.springframework.stereotype.Component;

/**
 * Mapper pour convertir entre l'entité Service et ses DTOs
 */
@Component
public class ServiceMapper {

    /**
     * Convertit un ServiceDTO en entité Service (pour création)
     * Note: La relation avec Hopital est définie dans le Service
     */
    public Service toEntity(ServiceDTO dto) {
        if (dto == null) {
            return null;
        }

        Service service = new Service();
        service.setNom(dto.getNom());

        return service;
    }

    /**
     * Convertit une entité Service en ServiceResponseDTO (pour réponse)
     */
    public ServiceResponseDTO toResponseDTO(Service service) {
        if (service == null) {
            return null;
        }

        // Informations de l'hôpital
        ServiceResponseDTO.HopitalInfoDTO hopitalInfo = null;
        if (service.getHopital() != null) {
            hopitalInfo = ServiceResponseDTO.HopitalInfoDTO.builder()
                    .id(service.getHopital().getId())
                    .nom(service.getHopital().getNom())
                    .adresse(service.getHopital().getAdresse())
                    .build();
        }

        return ServiceResponseDTO.builder()
                .id(service.getId())
                .nom(service.getNom())
                .dateCreation(service.getCreatedAt())
                .hopital(hopitalInfo)
                .build();
    }

    /**
     * Met à jour une entité Service existante avec les données d'un ServiceDTO
     */
    public void updateEntity(ServiceDTO dto, Service service) {
        if (dto == null || service == null) {
            return;
        }

        if (dto.getNom() != null) {
            service.setNom(dto.getNom());
        }
    }
}
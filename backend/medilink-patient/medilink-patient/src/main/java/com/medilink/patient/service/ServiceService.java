package com.medilink.patient.service;

import com.medilink.patient.dto.ServiceDTO;
import com.medilink.patient.dto.ServiceResponseDTO;
import com.medilink.patient.entity.Hopital;
import com.medilink.patient.entity.Service;
import com.medilink.patient.exception.HopitalNotFoundException;
import com.medilink.patient.exception.ServiceNotFoundException;
import com.medilink.patient.mapper.ServiceMapper;
import com.medilink.patient.repository.HopitalRepository;
import com.medilink.patient.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service pour la gestion des services hospitaliers
 * Conforme au diagramme UML
 */
@org.springframework.stereotype.Service
@RequiredArgsConstructor
@Transactional
@SuppressWarnings("null")
public class ServiceService {

    private final ServiceRepository serviceRepository;
    private final HopitalRepository hopitalRepository;
    private final ServiceMapper serviceMapper;

    /**
     * Obtient un service par son ID
     */
    @Transactional(readOnly = true)
    public ServiceResponseDTO obtenirService(Long id) {
        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new ServiceNotFoundException(id));

        return serviceMapper.toResponseDTO(service);
    }

    /**
     * Liste tous les services
     */
    @Transactional(readOnly = true)
    public List<ServiceResponseDTO> listerServices() {
        List<Service> services = serviceRepository.findAll();

        return services.stream()
                .map(serviceMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Liste tous les services d'un hôpital
     */
    @Transactional(readOnly = true)
    public List<ServiceResponseDTO> listerServicesParHopital(Long hopitalId) {
        // Vérifier que l'hôpital existe
        if (!hopitalRepository.existsById(hopitalId)) {
            throw new HopitalNotFoundException(hopitalId);
        }

        List<Service> services = serviceRepository.findByHopitalId(hopitalId);

        return services.stream()
                .map(serviceMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Crée un nouveau service hospitalier
     */
    public ServiceResponseDTO creerService(ServiceDTO serviceDTO) {
        // Vérifier que l'hôpital existe
        Hopital hopital = hopitalRepository.findById(serviceDTO.getHopitalId())
                .orElseThrow(() -> new HopitalNotFoundException(serviceDTO.getHopitalId()));

        // Créer le service
        Service service = serviceMapper.toEntity(serviceDTO);
        service.setHopital(hopital);

        // Sauvegarder
        Service savedService = serviceRepository.save(service);

        return serviceMapper.toResponseDTO(savedService);
    }

    /**
     * Modifie un service hospitalier
     */
    public ServiceResponseDTO modifierService(Long id, ServiceDTO serviceDTO) {
        // Vérifier que le service existe
        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new ServiceNotFoundException(id));

        // Mettre à jour
        serviceMapper.updateEntity(serviceDTO, service);

        // Si changement d'hôpital
        if (serviceDTO.getHopitalId() != null && !serviceDTO.getHopitalId().equals(service.getHopital().getId())) {
            Hopital hopital = hopitalRepository.findById(serviceDTO.getHopitalId())
                    .orElseThrow(() -> new HopitalNotFoundException(serviceDTO.getHopitalId()));
            service.setHopital(hopital);
        }

        // Sauvegarder
        Service updatedService = serviceRepository.save(service);

        return serviceMapper.toResponseDTO(updatedService);
    }

    /**
     * Supprime un service hospitalier
     */
    public void supprimerService(Long id) {
        // Vérifier que le service existe
        if (!serviceRepository.existsById(id)) {
            throw new ServiceNotFoundException(id);
        }

        serviceRepository.deleteById(id);
    }
}
package com.medilink.patient.service;

import com.medilink.patient.dto.HopitalDTO;
import com.medilink.patient.dto.HopitalResponseDTO;
import com.medilink.patient.entity.Hopital;
import com.medilink.patient.exception.HopitalNotFoundException;
import com.medilink.patient.mapper.HopitalMapper;
import com.medilink.patient.repository.HopitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service pour la gestion des hôpitaux
 * Fonctionnalité 2 : Recherche d'Hôpital (Géolocalisation simulée - rechercherHopital)
 */
@Service
@RequiredArgsConstructor
@Transactional
public class HopitalService {

    private final HopitalRepository hopitalRepository;
    private final HopitalMapper hopitalMapper;

    /**
     * Obtient un hôpital par son ID
     */
    @Transactional(readOnly = true)
    public HopitalResponseDTO obtenirHopital(Long id) {
        Hopital hopital = hopitalRepository.findById(id)
                .orElseThrow(() -> new HopitalNotFoundException(id));

        return hopitalMapper.toResponseDTO(hopital);
    }

    /**
     * Liste tous les hôpitaux avec pagination
     */
    @Transactional(readOnly = true)
    public Page<HopitalResponseDTO> listerHopitaux(Pageable pageable) {
        return hopitalRepository.findAll(pageable)
                .map(hopitalMapper::toResponseDTO);
    }

    /**
     * Recherche des hôpitaux par nom
     */
    @Transactional(readOnly = true)
    public List<HopitalResponseDTO> rechercherHopitaux(String nom) {
        List<Hopital> hopitaux = hopitalRepository.findByNomContaining(nom);

        return hopitaux.stream()
                .map(hopitalMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    /**
     * Recherche des hôpitaux proches d'une position GPS (rechercherHopital dans l'UML)
     * Utilise la formule de Haversine implémentée dans le repository
     */
    @Transactional(readOnly = true)
    public List<HopitalResponseDTO> rechercherHopitauxProches(Double latitude, Double longitude, Double rayonKm) {
        List<Hopital> hopitaux = hopitalRepository.rechercherHopitauxProches(latitude, longitude, rayonKm);

        return hopitaux.stream()
                .map(hopital -> {
                    HopitalResponseDTO dto = hopitalMapper.toResponseDTO(hopital);
                    // Calculer la distance pour chaque hôpital
                    Double distance = calculerDistance(latitude, longitude,
                            hopital.getLatitude(),
                            hopital.getLongitude());
                    dto.setDistance(distance);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    /**
     * Calcule la distance entre deux points GPS en utilisant la formule de Haversine
     * @param lat1 Latitude du point 1
     * @param lon1 Longitude du point 1
     * @param lat2 Latitude du point 2
     * @param lon2 Longitude du point 2
     * @return Distance en kilomètres
     */
    public Double calculerDistance(Double lat1, Double lon1, Double lat2, Double lon2) {
        if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) {
            return null;
        }

        // Rayon de la Terre en kilomètres
        final double R = 6371.0;

        // Conversion des degrés en radians
        double lat1Rad = Math.toRadians(lat1);
        double lon1Rad = Math.toRadians(lon1);
        double lat2Rad = Math.toRadians(lat2);
        double lon2Rad = Math.toRadians(lon2);

        // Différences
        double dLat = lat2Rad - lat1Rad;
        double dLon = lon2Rad - lon1Rad;

        // Formule de Haversine
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Distance en kilomètres
        return R * c;
    }
}
package com.medilink.patient.mapper;

import com.medilink.patient.dto.HopitalDTO;
import com.medilink.patient.dto.HopitalResponseDTO;
import com.medilink.patient.entity.Hopital;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper pour convertir entre l'entité Hopital et ses DTOs
 */
@Component
public class HopitalMapper {

    private final GeometryFactory geometryFactory = new GeometryFactory();

    /**
     * Convertit un HopitalDTO en entité Hopital (pour création)
     */
    public Hopital toEntity(HopitalDTO dto) {
        if (dto == null) {
            return null;
        }

        Hopital hopital = new Hopital();
        hopital.setNom(dto.getNom());
        hopital.setAdresse(dto.getAdresse());

        // Conversion latitude/longitude → Point
        if (dto.getLatitude() != null && dto.getLongitude() != null) {
            Point point = geometryFactory.createPoint(
                    new Coordinate(dto.getLongitude(), dto.getLatitude())
            );
            point.setSRID(4326);
            hopital.setLocalisation(point);
        }

        return hopital;
    }

    /**
     * Convertit une entité Hopital en HopitalResponseDTO (pour réponse)
     */
    public HopitalResponseDTO toResponseDTO(Hopital hopital) {
        if (hopital == null) {
            return null;
        }

        // Convertir les services
        List<HopitalResponseDTO.ServiceBasicDTO> servicesDTO = new ArrayList<>();
        if (hopital.getServices() != null) {
            servicesDTO = hopital.getServices().stream()
                    .map(service -> HopitalResponseDTO.ServiceBasicDTO.builder()
                            .id(service.getId())
                            .nom(service.getNom())
                            .build())
                    .collect(Collectors.toList());
        }

        return HopitalResponseDTO.builder()
                .id(hopital.getId())
                .nom(hopital.getNom())
                .adresse(hopital.getAdresse())
                .latitude(hopital.getLatitude())
                .longitude(hopital.getLongitude())
                .dateCreation(hopital.getCreatedAt())
                .services(servicesDTO)
                .build();
    }

    /**
     * Met à jour une entité Hopital existante avec les données d'un HopitalDTO
     */
    public void updateEntity(HopitalDTO dto, Hopital hopital) {
        if (dto == null || hopital == null) {
            return;
        }

        if (dto.getNom() != null) {
            hopital.setNom(dto.getNom());
        }
        if (dto.getAdresse() != null) {
            hopital.setAdresse(dto.getAdresse());
        }

        // Mise à jour de la localisation
        if (dto.getLatitude() != null && dto.getLongitude() != null) {
            Point point = geometryFactory.createPoint(
                    new Coordinate(dto.getLongitude(), dto.getLatitude())
            );
            point.setSRID(4326);
            hopital.setLocalisation(point);
        }
    }
}
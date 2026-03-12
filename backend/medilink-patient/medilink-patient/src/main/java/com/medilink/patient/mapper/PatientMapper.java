package com.medilink.patient.mapper;

import com.medilink.patient.dto.PatientDTO;
import com.medilink.patient.dto.PatientResponseDTO;
import com.medilink.patient.entity.Patient;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Component;

/**
 * Mapper pour convertir entre l'entité Patient et ses DTOs
 */
@Component
public class PatientMapper {

    private final GeometryFactory geometryFactory = new GeometryFactory();

    /**
     * Convertit un PatientDTO en entité Patient (pour création)
     */
    public Patient toEntity(PatientDTO dto) {
        if (dto == null) {
            return null;
        }

        Patient patient = new Patient();
        patient.setNom(dto.getNom());
        patient.setPrenom(dto.getPrenom());
        patient.setDateNaissance(dto.getDateNaissance());
        patient.setGroupeSanguin(dto.getGroupeSanguin());
        patient.setPoids(dto.getPoids());
        patient.setAntecedents(dto.getAntecedents());

        // Conversion latitude/longitude → Point
        if (dto.getLatitude() != null && dto.getLongitude() != null) {
            Point point = geometryFactory.createPoint(
                    new Coordinate(dto.getLongitude(), dto.getLatitude())
            );
            point.setSRID(4326);
            patient.setLocalisation(point);
        }

        return patient;
    }

    /**
     * Convertit une entité Patient en PatientResponseDTO (pour réponse)
     */
    public PatientResponseDTO toResponseDTO(Patient patient) {
        if (patient == null) {
            return null;
        }

        return PatientResponseDTO.builder()
                .id(patient.getId())
                .nom(patient.getNom())
                .prenom(patient.getPrenom())
                .dateNaissance(patient.getDateNaissance())
                .groupeSanguin(patient.getGroupeSanguin())
                .poids(patient.getPoids())
                .latitude(patient.getLatitude())
                .longitude(patient.getLongitude())
                .antecedents(patient.getAntecedents())
                .dateCreation(patient.getCreatedAt())
                .nombreRendezVous(patient.getRendezVous() != null ?
                        (long) patient.getRendezVous().size() : 0L)
                .build();
    }

    /**
     * Met à jour une entité Patient existante avec les données d'un PatientDTO
     */
    public void updateEntity(PatientDTO dto, Patient patient) {
        if (dto == null || patient == null) {
            return;
        }

        if (dto.getNom() != null) {
            patient.setNom(dto.getNom());
        }
        if (dto.getPrenom() != null) {
            patient.setPrenom(dto.getPrenom());
        }
        if (dto.getDateNaissance() != null) {
            patient.setDateNaissance(dto.getDateNaissance());
        }
        if (dto.getGroupeSanguin() != null) {
            patient.setGroupeSanguin(dto.getGroupeSanguin());
        }
        if (dto.getPoids() != null) {
            patient.setPoids(dto.getPoids());
        }
        if (dto.getAntecedents() != null) {
            patient.setAntecedents(dto.getAntecedents());
        }

        // Mise à jour de la localisation
        if (dto.getLatitude() != null && dto.getLongitude() != null) {
            Point point = geometryFactory.createPoint(
                    new Coordinate(dto.getLongitude(), dto.getLatitude())
            );
            point.setSRID(4326);
            patient.setLocalisation(point);
        }
    }
}
package com.medilink.medilink.controller;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/pharmacies")
public class PharmacieController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/ajouter")
    public ResponseEntity<?> ajouter(@RequestBody Map<String, Object> payload) {
        try {
            String nom = (String) payload.get("nom");
            String adresse = (String) payload.get("adresse");
            Double lat = Double.parseDouble(payload.get("latitude").toString());
            Double lon = Double.parseDouble(payload.get("longitude").toString());

            // Insertion Native SQL pour la table 'pharmacie' (partagée avec le Lot 5)
            // On utilise ST_SetSRID(ST_MakePoint(lon, lat), 4326) pour le type Geometry
            jdbcTemplate.update(
                "INSERT INTO pharmacie (nom, adresse, localisation) VALUES (?, ?, ST_SetSRID(ST_MakePoint(?, ?), 4326))",
                nom, adresse, lon, lat
            );

            // On récupère le dernier ID inséré
            Long id = jdbcTemplate.queryForObject("SELECT lastval()", Long.class);

            return ResponseEntity.status(201).body(Map.of("id", id, "status", "success"));
        } catch (Exception e) {
            System.err.println("SQL ERROR creation pharmacie: " + e.getMessage());
            return ResponseEntity.status(500).body("Erreur création pharmacie : " + e.getMessage());
        }
    }

    @GetMapping("/liste")
    public List<Map<String, Object>> lister() {
        return jdbcTemplate.queryForList("SELECT id, nom, adresse, ST_Y(localisation) as latitude, ST_X(localisation) as longitude FROM pharmacie");
    }
}

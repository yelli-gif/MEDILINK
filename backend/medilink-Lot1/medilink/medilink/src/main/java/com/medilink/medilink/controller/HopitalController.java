package com.medilink.medilink.controller;

import com.medilink.medilink.model.Hopital;
import com.medilink.medilink.service.HopitalService;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/hopitaux")
public class HopitalController {

    @Autowired
    private HopitalService hopitalService;

    // 1. Endpoint pour AJOUTER (POST)
    @PostMapping("/ajouter")
    public ResponseEntity<?> ajouter(@RequestBody Map<String, Object> payload) {
        try {
            Hopital h = new Hopital();
            h.setNom((String) payload.get("nom"));
            h.setAdresse((String) payload.get("adresse"));

            try {
                GeometryFactory geometryFactory = new GeometryFactory();
                double lat = Double.parseDouble(payload.get("latitude").toString());
                double lon = Double.parseDouble(payload.get("longitude").toString());

                Point p = geometryFactory.createPoint(new Coordinate(lon, lat));
                p.setSRID(4326);
                h.setLocalisation(p);
            } catch (Exception e) {
                System.out.println("WARN: Erreur de géolocalisation ignorée : " + e.getMessage());
                // On continue car localisation est maintenant nullable=true
            }

            Hopital saved = hopitalService.enregistrer(h);
            return ResponseEntity.status(201).body(saved);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur critique : " + e.getMessage());
        }
    }

    // 2. Endpoint pour LISTER (GET) - Tâche 4 complétée
    @GetMapping("/liste")
    public List<Map<String, Object>> lister() {
        return hopitalService.listerTous().stream().map(h -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", h.getId());
            map.put("nom", h.getNom());
            map.put("adresse", h.getAdresse());
            if (h.getLocalisation() != null) {
                map.put("latitude", h.getLocalisation().getY());
                map.put("longitude", h.getLocalisation().getX());
            }
            return map;
        }).collect(Collectors.toList());
    }
}
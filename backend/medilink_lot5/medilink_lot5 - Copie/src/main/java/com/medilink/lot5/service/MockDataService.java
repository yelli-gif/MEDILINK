package com.medilink.lot5.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.medilink.lot5.entity.Pharmacie;
import com.medilink.lot5.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.io.InputStream;

// Importations cruciales pour la géolocalisation (Lot 3)
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;

@Service
@RequiredArgsConstructor
@Slf4j
public class MockDataService implements CommandLineRunner {

    private final PharmacieRepository pharmacieRepository;
    private final PharmacienRepository pharmacienRepository;
    private final DemandeDisponibiliteRepository demandeRepository;
    private final PriseMedicamentRepository priseRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final GeometryFactory geometryFactory = new GeometryFactory(); // Pour créer les points GPS

    private JsonNode ordonnanceMock;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        chargerPharmacies();
        chargerOrdonnance();
    }

    private void chargerPharmacies() {
        try {
            InputStream is = new ClassPathResource("data/fake_pharmacie.json").getInputStream();
            JsonNode root = objectMapper.readTree(is);

            if (root.has("pharmacie")) {
                for (JsonNode node : root.get("pharmacie")) {

                    // 1. Extraction des coordonnées du JSON
                    JsonNode locNode = node.get("localisation");
                    double lat = locNode.get("latitude").asDouble();
                    double lon = locNode.get("longitude").asDouble();

                    // 2. Création du Point Géographique (compatible Hibernate Spatial)
                    // Note : Le standard JTS est souvent (Longitude, Latitude)
                    Point location = geometryFactory.createPoint(new Coordinate(lon, lat));
                    location.setSRID(4326);

                    // 3. Construction de l'objet avec le bon type
                    // Dans MockDataService.java
                    Pharmacie p = new Pharmacie();
                    p.nom = node.get("nom").asText();
                    p.setAdresse(node.get("adresse").asText());
                    p.setLocalisation(location); // Le point JTS (longitude, latitude)

                    pharmacieRepository.save(p);
                }
            }
            log.info("Chargement des pharmacies mockées terminé.");
        } catch (Exception e) {
            log.error("Erreur lors du chargement des pharmacies : {}", e.getMessage());
        }
    }

    private void chargerOrdonnance() {
        try {
            InputStream is = new ClassPathResource("data/fake_ordonnance.json").getInputStream();
            ordonnanceMock = objectMapper.readTree(is);
            log.info("Chargement de l'ordonnance mockée terminé.");
        } catch (Exception e) {
            log.error("Erreur lors du chargement de l'ordonnance : {}", e.getMessage());
        }
    }



    @Transactional
    public void reinitialiserDonnees() {
        // 1. On vide les tables pour éviter les doublons
        priseRepository.deleteAll();
        demandeRepository.deleteAll();
        pharmacienRepository.deleteAll();
        pharmacieRepository.deleteAll();

        // 2. On recharge les données depuis les fichiers JSON
        try {
            run(); // Appelle la méthode qui lit les fichiers
        } catch (Exception e) {
            log.error("Erreur lors de la réinitialisation", e);
        }
    }

    public JsonNode getOrdonnanceMock() {
        return ordonnanceMock;
    }
}
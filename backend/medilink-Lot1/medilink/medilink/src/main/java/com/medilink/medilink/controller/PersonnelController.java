package com.medilink.medilink.controller;

import com.medilink.medilink.model.Acceuil;
import com.medilink.medilink.model.Medecin;
import com.medilink.medilink.model.Users;
import com.medilink.medilink.repository.AcceuilRepository;
import com.medilink.medilink.repository.HopitalRepository;
import com.medilink.medilink.repository.MedecinRepository;
import com.medilink.medilink.repository.ServiceRepository;
import com.medilink.medilink.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/personnel")
public class PersonnelController {

    @Autowired
    private MedecinRepository medecinRepository;

    @Autowired
    private AcceuilRepository acceuilRepository;

    @Autowired
    private org.springframework.jdbc.core.JdbcTemplate jdbcTemplate;

    // ==========================================
    //          MÉTHODES GET (Lister)
    // ==========================================

    /**
     * Lister tous les médecins d'un service spécifique
     * Test : GET http://localhost:8081/api/personnel/medecins/service/1
     */
    @GetMapping("/medecins/service/{serviceId}")
    public List<Medecin> getMedecinsByService(@PathVariable Long serviceId) {
        return medecinRepository.findByService_Id(serviceId);
    }

    /**
     * Lister tout le personnel d'accueil d'un hôpital
     * Test : GET http://localhost:8081/api/personnel/accueil/hopital/1
     */
    @GetMapping("/accueil/hopital/{hopitalId}")
    public List<Acceuil> getAccueilByHopital(@PathVariable Long hopitalId) {
        return acceuilRepository.findByHopital_Id(hopitalId);
    }

    /**
     * Lister TOUT le personnel d'accueil (filtré par hôpital si fourni)
     */
    @GetMapping("/accueil")
    public List<Acceuil> getAllAccueil(@RequestParam(required = false) Long hopitalId) {
        if (hopitalId != null) {
            return acceuilRepository.findByHopital_Id(hopitalId);
        }
        return acceuilRepository.findAll();
    }

    /**
     * Lister TOUS les médecins (filtrés par hôpital si fourni)
     */
    @GetMapping("/medecins")
    public List<Medecin> getAllMedecins(@RequestParam(required = false) Long hopitalId) {
        if (hopitalId != null) {
            return medecinRepository.findByService_Hopital_Id(hopitalId);
        }
        return medecinRepository.findAll();
    }

    // ==========================================
    //          MÉTHODES POST (Ajouter)
    // ==========================================

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private HopitalRepository hopitalRepository;

    /**
     * Ajouter/Associer un médecin à un service
     * Test : POST http://localhost:8081/api/personnel/medecins
     */
    @PostMapping("/medecins")
    public ResponseEntity<?> saveMedecin(@RequestBody java.util.Map<String, Object> payload) {
        try {
            System.out.println("DEBUG: Native SQL Insert pour Medecin: " + payload);
            
            Long id = payload.get("id") != null ? Long.valueOf(payload.get("id").toString()) : null;
            String nom = (String) payload.get("nom");
            String prenom = (String) payload.get("prenom");
            
            if (id == null) return ResponseEntity.badRequest().body("ID manquant");

            // Résolution du service_id
            Long serviceId = null;
            if (payload.get("specialite") != null) {
                String spec = (String) payload.get("specialite");
                serviceId = serviceRepository.findByNom(spec).map(s -> s.getId()).orElse(null);
            }

            // INSERT NATIVE
            jdbcTemplate.update(
                "INSERT INTO medecin (id, nom, prenom, created_at, service_id) VALUES (?, ?, ?, ?, ?)",
                id, nom, prenom, java.time.LocalDateTime.now(), serviceId
            );

            System.out.println("DEBUG: Insert SQL réussi pour Medecin ID=" + id);
            return ResponseEntity.ok().body("{\"id\": " + id + ", \"status\": \"success\"}");
        } catch (Exception e) {
            System.err.println("SQL ERROR: " + e.getMessage());
            return ResponseEntity.status(500).body("Erreur SQL : " + e.getMessage());
        }
    }

    /**
     * Ajouter/Associer un personnel d'accueil à un hôpital
     * Test : POST http://localhost:8081/api/personnel/accueil
     */
    @PostMapping("/accueil")
    public ResponseEntity<?> saveAcceuil(@RequestBody java.util.Map<String, Object> payload) {
        try {
            System.out.println("DEBUG: Native SQL Insert pour Accueil: " + payload);
            
            Long id = payload.get("id") != null ? Long.valueOf(payload.get("id").toString()) : null;
            String nom = (String) payload.get("nom");
            String prenom = (String) payload.get("prenom");
            
            if (id == null) return ResponseEntity.badRequest().body("ID manquant");

            // Résolution hopital_id
            Long hopitalId = null;
            if (payload.get("hopital") != null) {
                java.util.Map<String, Object> hMap = (java.util.Map<String, Object>) payload.get("hopital");
                if (hMap.get("id") != null) hopitalId = Long.valueOf(hMap.get("id").toString());
            }

            // INSERT NATIVE
            jdbcTemplate.update(
                "INSERT INTO acceuil (id, nom, prenom, created_at, hopital_id) VALUES (?, ?, ?, ?, ?)",
                id, nom, prenom, java.time.LocalDateTime.now(), hopitalId
            );

            System.out.println("DEBUG: Insert SQL réussi pour Accueil ID=" + id);
            return ResponseEntity.ok().body("{\"id\": " + id + ", \"status\": \"success\"}");
        } catch (Exception e) {
            System.err.println("SQL ERROR: " + e.getMessage());
            return ResponseEntity.status(500).body("Erreur SQL : " + e.getMessage());
        }
    }

    @GetMapping("/pharmaciens")
    public List<java.util.Map<String, Object>> getPharmaciens() {
        return jdbcTemplate.queryForList("SELECT * FROM pharmacien");
    }

    @PostMapping("/pharmaciens")
    public ResponseEntity<?> savePharmacien(@RequestBody java.util.Map<String, Object> payload) {
        try {
            System.out.println("DEBUG: Native SQL Insert pour Pharmacien: " + payload);
            
            Long id = payload.get("id") != null ? Long.valueOf(payload.get("id").toString()) : null;
            String nom = (String) payload.get("nom");
            Long pharmacieId = payload.get("pharmacieId") != null ? Long.valueOf(payload.get("pharmacieId").toString()) : null;
            
            if (id == null) return ResponseEntity.badRequest().body("ID manquant");

            // INSERT NATIVE (avec pharmacie_id optionnel)
            if (pharmacieId != null) {
                jdbcTemplate.update(
                    "INSERT INTO pharmacien (id, nom, pharmacie_id) VALUES (?, ?, ?)",
                    id, nom, pharmacieId
                );
            } else {
                jdbcTemplate.update(
                    "INSERT INTO pharmacien (id, nom) VALUES (?, ?)",
                    id, nom
                );
            }

            System.out.println("DEBUG: Insert SQL réussi pour Pharmacien ID=" + id);
            return ResponseEntity.ok().body("{\"id\": " + id + ", \"status\": \"success\"}");
        } catch (Exception e) {
            System.err.println("SQL ERROR: " + e.getMessage());
            return ResponseEntity.status(500).body("Erreur SQL : " + e.getMessage());
        }
    }
}
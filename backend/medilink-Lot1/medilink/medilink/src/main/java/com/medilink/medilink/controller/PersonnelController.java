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
    public ResponseEntity<?> saveMedecin(@RequestBody Medecin medecin) {
        try {
            System.out.println("DEBUG: Tentative de création du profil médecin pour l'ID: " + medecin.getId());
            
            // Liaison obligatoire avec l'utilisateur (MapsId)
            if (medecin.getId() != null) {
                Users user = usersRepository.findById(medecin.getId())
                    .orElseThrow(() -> new RuntimeException("Utilisateur introuvable avec l'ID: " + medecin.getId()));
                medecin.setUser(user);
            } else {
                return ResponseEntity.badRequest().body("L'ID de l'utilisateur est obligatoire");
            }

            // Résolution du service par nom si l'ID est manquant
            if (medecin.getService() != null && medecin.getService().getNom() != null) {
                serviceRepository.findByNom(medecin.getService().getNom())
                        .ifPresent(medecin::setService);
            }
            
            if (medecin.getCreatedAt() == null) {
                medecin.setCreatedAt(java.time.LocalDateTime.now());
            }

            Medecin saved = medecinRepository.save(medecin);
            System.out.println("DEBUG: Profil médecin créé avec succès");
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            System.err.println("ERROR during medecin creation: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur interne : " + e.getMessage());
        }
    }

    /**
     * Ajouter/Associer un personnel d'accueil à un hôpital
     * Test : POST http://localhost:8081/api/personnel/accueil
     */
    @PostMapping("/accueil")
    public Acceuil saveAcceuil(@RequestBody Acceuil acceuil) {
        // Liaison obligatoire avec l'utilisateur (MapsId)
        if (acceuil.getId() != null) {
            usersRepository.findById(acceuil.getId()).ifPresent(acceuil::setUser);
        }

        // Liaison avec l'hôpital
        if (acceuil.getHopital() != null && acceuil.getHopital().getId() != null) {
            hopitalRepository.findById(acceuil.getHopital().getId())
                    .ifPresent(acceuil::setHopital);
        }
        if (acceuil.getCreatedAt() == null) {
            acceuil.setCreatedAt(java.time.LocalDateTime.now());
        }
        return acceuilRepository.save(acceuil);
    }
}
package com.medilink.medilink.controller;

import com.medilink.medilink.model.Acceuil;
import com.medilink.medilink.model.Medecin;
import com.medilink.medilink.repository.AcceuilRepository;
import com.medilink.medilink.repository.MedecinRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
     * Lister TOUS les médecins (tous services confondus)
     */
    @GetMapping("/medecins")
    public List<Medecin> getAllMedecins() {
        return medecinRepository.findAll();
    }

    // ==========================================
    //          MÉTHODES POST (Ajouter)
    // ==========================================

    /**
     * Ajouter/Associer un médecin à un service
     * Test : POST http://localhost:8081/api/personnel/medecins
     */
    @PostMapping("/medecins")
    public Medecin saveMedecin(@RequestBody Medecin medecin) {
        return medecinRepository.save(medecin);
    }

    /**
     * Ajouter/Associer un personnel d'accueil à un hôpital
     * Test : POST http://localhost:8081/api/personnel/accueil
     */
    @PostMapping("/accueil")
    public Acceuil saveAcceuil(@RequestBody Acceuil acceuil) {
        return acceuilRepository.save(acceuil);
    }
}
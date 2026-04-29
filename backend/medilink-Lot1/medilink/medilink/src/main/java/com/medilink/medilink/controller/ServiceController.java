package com.medilink.medilink.controller;

import com.medilink.medilink.model.Hopital;
import com.medilink.medilink.model.Service;
import com.medilink.medilink.repository.HopitalRepository;
import com.medilink.medilink.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private HopitalRepository hopitalRepository;

    // Récupère les services filtrés par hôpital
    @GetMapping
    public List<Service> getAll(@RequestParam(required = false) Long hopitalId) {
        if (hopitalId != null) {
            return serviceRepository.findByHopitalId(hopitalId);
        }
        return serviceRepository.findAll();
    }

    @GetMapping("/{id}")
    public Service getOne(@PathVariable Long id) {
        return serviceRepository.findById(id).orElse(null);
    }

    @PostMapping
    public ResponseEntity<?> saveService(@RequestBody Service service) {
        try {
            System.out.println("DEBUG: Réception création service: " + service.getNom());
            
            // Si le JSON contient un hôpital avec un ID, on le recharge proprement
            if (service.getHopital() != null && service.getHopital().getId() != null) {
                Long hId = service.getHopital().getId();
                System.out.println("DEBUG: Recherche de l'hôpital ID: " + hId);
                Hopital h = hopitalRepository.findById(hId)
                        .orElseThrow(() -> new RuntimeException("Hôpital introuvable avec l'ID: " + hId));
                service.setHopital(h);
                System.out.println("DEBUG: Hôpital trouvé et lié: " + h.getNom());
            } else {
                return ResponseEntity.badRequest().body("L'objet hopital avec un ID valide est obligatoire.");
            }

            Service saved = serviceRepository.save(service);
            System.out.println("DEBUG: Service sauvegardé avec succès: " + saved.getId());
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            System.err.println("CRITICAL ERROR during saveService: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur serveur : " + e.getMessage());
        }
    }
}
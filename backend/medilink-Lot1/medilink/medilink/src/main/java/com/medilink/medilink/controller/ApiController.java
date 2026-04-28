package com.medilink.medilink.controller;

import com.medilink.medilink.model.Medecin;
import com.medilink.medilink.model.Medicament;
import com.medilink.medilink.model.Pharmacien;
import com.medilink.medilink.model.Service;
import com.medilink.medilink.repository.MedecinRepository;
import com.medilink.medilink.repository.MedicamentRepository;
import com.medilink.medilink.repository.PharmacienRepository;
import com.medilink.medilink.repository.ServiceRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "API Externe", description = "Endpoints pour les autres lots (Services, Médicaments)")
public class ApiController {

    private final ServiceRepository serviceRepository;
    private final MedicamentRepository medicamentRepository;
    private final MedecinRepository medecinRepository;
    private final PharmacienRepository pharmacienRepository;

    // Constructeur manuel pour l'injection (plus robuste que Lombok si l'IDE bugue)
    public ApiController(ServiceRepository serviceRepository,
                         MedicamentRepository medicamentRepository,
                         MedecinRepository medecinRepository,
                         PharmacienRepository pharmacienRepository) {
        this.serviceRepository = serviceRepository;
        this.medicamentRepository = medicamentRepository;
        this.medecinRepository = medecinRepository;
        this.pharmacienRepository = pharmacienRepository;
    }

    /* Redondant avec ServiceController
    @Operation(summary = "Récupérer un service par son ID", description = "Appelé par Lot 2, Lot 3")
    @GetMapping("/services/{id}")
    public ResponseEntity<Service> getServiceById(@PathVariable Long id) {
        return serviceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    */

    /* Redondant avec ServiceController
    @Operation(summary = "Récupérer la liste des services", description = "Utilisé par le Lot 2 pour la prise de RDV")
    @GetMapping("/services")
    public ResponseEntity<List<Service>> getAllServices() {
        return ResponseEntity.ok(serviceRepository.findAll());
    }
    */

    /* Redondant avec MedicamentController
    @Operation(summary = "Récupérer la liste des médicaments", description = "Utilisé par le Lot 4 pour les ordonnances")
    @GetMapping("/medicaments")
    public ResponseEntity<List<Medicament>> getAllMedicaments() {
        return ResponseEntity.ok(medicamentRepository.findAll());
    }
    */

    @Operation(summary = "Récupérer un médicament par son ID", description = "Appelé par Lot 4, Lot 5")
    @GetMapping("/medicaments/{id}")
    public ResponseEntity<Medicament> getMedicamentById(@PathVariable Long id) {
        return medicamentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Récupérer un médecin par son ID", description = "Appelé par Lot 2, Lot 4")
    @GetMapping("/medecins/{id}")
    public ResponseEntity<Medecin> getMedecinById(@PathVariable Long id) {
        return medecinRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Récupérer un pharmacien par son ID", description = "Appelé par Lot 5")
    @GetMapping("/pharmaciens/{id}")
    public ResponseEntity<Pharmacien> getPharmacienById(@PathVariable Long id) {
        return pharmacienRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

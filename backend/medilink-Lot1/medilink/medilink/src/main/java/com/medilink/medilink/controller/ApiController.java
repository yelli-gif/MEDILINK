package com.medilink.medilink.controller;

import com.medilink.medilink.model.Medicament;
import com.medilink.medilink.model.Service;
import com.medilink.medilink.repository.MedicamentRepository;
import com.medilink.medilink.repository.ServiceRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "API Externe", description = "Endpoints pour les autres lots (Services, Médicaments)")
public class ApiController {

    private final ServiceRepository serviceRepository;
    private final MedicamentRepository medicamentRepository;

    @Operation(summary = "Récupérer la liste des services", description = "Utilisé par le Lot 2 pour la prise de RDV")
    @GetMapping("/services")
    public ResponseEntity<List<Service>> getAllServices() {
        return ResponseEntity.ok(serviceRepository.findAll());
    }

    @Operation(summary = "Récupérer la liste des médicaments", description = "Utilisé par le Lot 4 pour les ordonnances")
    @GetMapping("/medicaments")
    public ResponseEntity<List<Medicament>> getAllMedicaments() {
        return ResponseEntity.ok(medicamentRepository.findAll());
    }
}

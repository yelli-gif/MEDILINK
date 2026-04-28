package com.medilink.patient.controller;

import com.medilink.patient.dto.ServiceDTO;
import com.medilink.patient.dto.ServiceResponseDTO;
import com.medilink.patient.service.ServiceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller REST pour la gestion des services hospitaliers
 * Conforme au diagramme UML
 */
@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
@Tag(name = "Services", description = "API de gestion des services hospitaliers")
public class ServiceController {

    private final ServiceService serviceService;

    /**
     * GET /api/services/{id} - Obtenir un service par son ID
     */
    @GetMapping("/{id}")
    @Operation(summary = "Obtenir un service", description = "Récupère les informations d'un service hospitalier")
    public ResponseEntity<ServiceResponseDTO> obtenirService(@PathVariable Long id) {
        ServiceResponseDTO response = serviceService.obtenirService(id);
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/services - Lister tous les services
     */
    @GetMapping
    @Operation(summary = "Lister les services", description = "Liste tous les services hospitaliers")
    public ResponseEntity<List<ServiceResponseDTO>> listerServices() {
        List<ServiceResponseDTO> response = serviceService.listerServices();
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/services/hopital/{hopitalId} - Lister les services d'un hôpital
     */
    @GetMapping("/hopital/{hopitalId}")
    @Operation(summary = "Services d'un hôpital", description = "Liste tous les services d'un hôpital spécifique")
    public ResponseEntity<List<ServiceResponseDTO>> listerServicesParHopital(@PathVariable Long hopitalId) {
        List<ServiceResponseDTO> response = serviceService.listerServicesParHopital(hopitalId);
        return ResponseEntity.ok(response);
    }

    /**
     * POST /api/services - Créer un nouveau service
     */
    @PostMapping
    @Operation(summary = "Créer un service", description = "Crée un nouveau service hospitalier")
    public ResponseEntity<ServiceResponseDTO> creerService(@Valid @RequestBody ServiceDTO serviceDTO) {
        ServiceResponseDTO response = serviceService.creerService(serviceDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * PUT /api/services/{id} - Modifier un service
     */
    @PutMapping("/{id}")
    @Operation(summary = "Modifier un service", description = "Met à jour un service hospitalier")
    public ResponseEntity<ServiceResponseDTO> modifierService(
            @PathVariable Long id,
            @Valid @RequestBody ServiceDTO serviceDTO) {
        ServiceResponseDTO response = serviceService.modifierService(id, serviceDTO);
        return ResponseEntity.ok(response);
    }

    /**
     * DELETE /api/services/{id} - Supprimer un service
     */
    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un service", description = "Supprime un service hospitalier")
    public ResponseEntity<Void> supprimerService(@PathVariable Long id) {
        serviceService.supprimerService(id);
        return ResponseEntity.noContent().build();
    }
}
package com.medilink.medilink.controller;

import com.medilink.medilink.model.Service;
import com.medilink.medilink.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    // Récupère tous les services (avec leur hôpital grâce au FetchType.EAGER)
    @GetMapping
    public List<Service> getAll() {
        return serviceRepository.findAll();
    }

    // NOUVELLE MÉTHODE : Récupère un service spécifique par son ID
    // C'est cette méthode qui manquait pour éviter la 404 dans Bruno
    @GetMapping("/{id}")
    public Service getOne(@PathVariable Long id) {
        return serviceRepository.findById(id).orElse(null);
    }
}
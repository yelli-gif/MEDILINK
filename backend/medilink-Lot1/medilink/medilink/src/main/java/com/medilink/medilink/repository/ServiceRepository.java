package com.medilink.medilink.repository;

import com.medilink.medilink.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Long> {
    // Cette méthode permet de récupérer les services d'un hôpital spécifique
    List<Service> findByHopitalId(Long hopitalId);
    
    // Recherche par nom pour faciliter l'assignation du personnel
    java.util.Optional<Service> findByNom(String nom);
}
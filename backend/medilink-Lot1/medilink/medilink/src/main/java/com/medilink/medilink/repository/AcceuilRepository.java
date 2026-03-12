package com.medilink.medilink.repository;

import com.medilink.medilink.model.Acceuil;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AcceuilRepository extends JpaRepository<Acceuil, Long> {

    /**
     * Recherche les membres du personnel d'accueil par l'ID de l'hôpital.
     * Cette méthode remplace findByServiceId pour corriger l'erreur de colonne manquante.
     */
    List<Acceuil> findByHopital_Id(Long hopitalId);
}
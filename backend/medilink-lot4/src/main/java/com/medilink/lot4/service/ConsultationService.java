package com.medilink.lot4.service;

import com.medilink.lot4.dto.CreateMedecinDTO;
import com.medilink.lot4.dto.OrdonnanceDTO;
import com.medilink.lot4.dto.LigneOrdonnanceDTO;
import com.medilink.lot4.entity.LigneOrdonnance;
import com.medilink.lot4.entity.Medecin;
import com.medilink.lot4.entity.Ordonnance;
import com.medilink.lot4.enums.StatutOrdonnance;
import com.medilink.lot4.repository.LigneOrdonnanceRepository;
import com.medilink.lot4.repository.LigneOrdonnanceRepository;
import com.medilink.lot4.repository.OrdonnanceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class ConsultationService {

    // Injections des 3 repositories nécessaires pour le Lot 4
    // Injections des repositories Lot 4 et Clients inter-lots
    private final OrdonnanceRepository ordonnanceRepository;
    private final LigneOrdonnanceRepository ligneOrdonnanceRepository;
    private final Lot1Client lot1Client;

    public ConsultationService(OrdonnanceRepository ordonnanceRepository,
            LigneOrdonnanceRepository ligneOrdonnanceRepository,
            Lot1Client lot1Client) {
        this.ordonnanceRepository = ordonnanceRepository;
        this.ligneOrdonnanceRepository = ligneOrdonnanceRepository;
        this.lot1Client = lot1Client;
    }

    // La gestion des médecins est maintenant déportée au Lot 1 (Socle)
    // Les méthodes createMedecin, getAllMedecins, etc. sont supprimées ici.

    /**
     * CARTE 7 : Créer une Ordonnance (Méthode creerOrdonnance() de la classe
     * Medecin)
     */
    @Transactional
    public Ordonnance creerOrdonnance(OrdonnanceDTO dto) {
        Ordonnance ordonnance = new Ordonnance();

        ordonnance.setMedecinId(dto.getMedecinId());
        ordonnance.setPatientId(dto.getPatientId());
        ordonnance.setServiceId(dto.getServiceId());
        ordonnance.setDateDebutTraitement(dto.getDateDebutTraitement());
        ordonnance.setContenu(dto.getContenu());
        ordonnance.setMedecinNom(dto.getMedecinNom());
        ordonnance.setPatientNom(dto.getPatientNom());
        ordonnance.setServiceNom(dto.getServiceNom());

        // Logique métier UML : Statut initial obligatoire
        ordonnance.setStatutOrdonnance(StatutOrdonnance.EN_ATTENTE_PHARMACIE);

        try {
            return ordonnanceRepository.save(ordonnance);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    /**
     * CARTE 8 : Ajouter une Ligne d'Ordonnance (Méthode ajouterLigneOrdonnance() de
     * la classe Ordonnance)
     */
    @Transactional
    public LigneOrdonnance ajouterLigneOrdonnance(Long ordonnanceId, LigneOrdonnanceDTO ligneDto) {
        // 1. On récupère l'ordonnance parente
        Ordonnance ord = ordonnanceRepository.findById(ordonnanceId)
                .orElseThrow(() -> new RuntimeException("Ordonnance non trouvée avec l'ID: " + ordonnanceId));

        // 2. Validation du médicament via Lot 1
        List<Map<String, Object>> medicaments = lot1Client.getMedicaments();
        boolean medicamentValide = medicaments.stream()
                .anyMatch(m -> ligneDto.getMedicamentId().equals(((Number) m.get("id")).longValue()));

        if (!medicamentValide) {
            throw new RuntimeException(
                    "Médicament ID " + ligneDto.getMedicamentId() + " non trouvé dans le référentiel du Lot 1");
        }

        // 3. Création et mapping de la ligne
        LigneOrdonnance ligne = new LigneOrdonnance();
        ligne.setOrdonnance(ord);
        ligne.setMedicamentId(ligneDto.getMedicamentId());
        ligne.setPosologie(ligneDto.getPosologie());
        ligne.setFrequence(ligneDto.getFrequence());
        ligne.setDureeTraitement(ligneDto.getDureeTraitement());
        ligne.setQuantite(ligneDto.getQuantite());

        // Logique métier UML : Indisponible par défaut jusqu'à validation Pharmacie
        // (Lot 5)
        ligne.setEstDisponible(false);

        return ligneOrdonnanceRepository.save(ligne);
    }

    public Ordonnance getOrdonnanceById(Long id) {
        return ordonnanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ordonnance non trouvée avec l'id : " + id));
    }

    @Transactional // Ajoute cette annotation pour garantir la cohérence
    public void supprimerLigneOrdonnance(Long ligneId) {
        LigneOrdonnance ligne = ligneOrdonnanceRepository.findById(ligneId)
                .orElseThrow(() -> new RuntimeException("Ligne non trouvée"));

        // 1. On récupère le parent
        Ordonnance ordonnance = ligne.getOrdonnance();

        // 2. On retire la ligne de la liste du parent (très important pour le cache)
        if (ordonnance != null) {
            ordonnance.getLignes().remove(ligne);
        }

        // 3. On supprime physiquement
        ligneOrdonnanceRepository.delete(ligne);
    }

    public List<Ordonnance> getOrdonnancesByPatientId(Long patientId) {
        return ordonnanceRepository.findByPatientId(patientId);
    }
}
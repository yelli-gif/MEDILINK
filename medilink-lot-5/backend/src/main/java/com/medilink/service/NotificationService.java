package com.medilink.service;

import com.medilink.entity.RappelNotification;
import com.medilink.entity.TypeNotification;
import com.medilink.repository.RappelNotificationRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    private final RappelNotificationRepository notificationRepository;

    public NotificationService(RappelNotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public RappelNotification programmerRappel(Long priseId, int delaiMinutes) {
        RappelNotification rappel = new RappelNotification();
        rappel.setPriseMedicamentId(priseId);
        rappel.setDateHeure(LocalDateTime.now().plusMinutes(delaiMinutes));
        rappel.setType(TypeNotification.RAPPEL_PRISE);
        rappel.setStatut("EN_ATTENTE");
        return notificationRepository.save(rappel);
    }

    @Scheduled(fixedRate = 60000) // Toutes les minutes
    public void envoyerRappelsDus() {
        List<RappelNotification> rappels = notificationRepository.findByStatut("EN_ATTENTE");
        LocalDateTime maintenant = LocalDateTime.now();

        for (RappelNotification rappel : rappels) {
            if (rappel.getDateHeure().isBefore(maintenant)) {
                // Simuler l'envoi de la notification
                System.out.println("Envoi du rappel pour la prise ID: " + rappel.getPriseMedicamentId());
                rappel.setStatut("ENVOYE");
                notificationRepository.save(rappel);
            }
        }
    }
}

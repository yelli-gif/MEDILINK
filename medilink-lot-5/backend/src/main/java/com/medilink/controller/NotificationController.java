package com.medilink.controller;

import com.medilink.entity.RappelNotification;
import com.medilink.repository.RappelNotificationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*") // Autoriser le frontend (Vite)
public class NotificationController {

    private final RappelNotificationRepository notificationRepository;

    public NotificationController(RappelNotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @GetMapping
    public ResponseEntity<List<RappelNotification>> getActiveNotifications() {
        // Renvoie tout pour la démo, en production on filtrerait par patientId et statut
        List<RappelNotification> notifications = notificationRepository.findAll();
        return ResponseEntity.ok(notifications);
    }
}

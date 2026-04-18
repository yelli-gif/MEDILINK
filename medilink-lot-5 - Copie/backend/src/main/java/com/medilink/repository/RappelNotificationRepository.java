package com.medilink.repository;

import com.medilink.entity.RappelNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RappelNotificationRepository extends JpaRepository<RappelNotification, Long> {
    List<RappelNotification> findByStatut(String statut);
}

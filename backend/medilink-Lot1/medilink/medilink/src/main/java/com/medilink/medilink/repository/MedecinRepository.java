package com.medilink.medilink.repository;

import com.medilink.medilink.model.Medecin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedecinRepository extends JpaRepository<Medecin, Long> {

    // Trouve tous les médecins rattachés à un service_id donné
    List<Medecin> findByService_Id(Long serviceId);

    // Trouve tous les médecins d'un hôpital donné
    List<Medecin> findByService_Hopital_Id(Long hopitalId);
}
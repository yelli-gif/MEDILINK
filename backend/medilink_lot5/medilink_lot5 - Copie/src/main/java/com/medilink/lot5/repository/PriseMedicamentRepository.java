package com.medilink.lot5.repository;

import com.medilink.lot5.entity.PriseMedicament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

@Repository
public interface PriseMedicamentRepository extends JpaRepository<PriseMedicament, Long> {

    @Query(value = "SELECT * FROM prise_medicament WHERE patient_id = :pId ORDER BY date_heure_prevue ASC", nativeQuery = true)
    List<PriseMedicament> findByPatientIdOrderByDateHeurePrevueAsc(@Param("pId") String patientId);

}



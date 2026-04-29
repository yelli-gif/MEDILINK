package com.medilink.medilink.repository;

import com.medilink.medilink.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    
    // Trouver les administrateurs d'un hôpital spécifique
    List<Admin> findByHopital_Id(Long hopitalId);
}

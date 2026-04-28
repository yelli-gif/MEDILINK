package com.medilink.medilink.service;

import com.medilink.medilink.model.Hopital;
import com.medilink.medilink.repository.HopitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HopitalService {

    @Autowired
    private HopitalRepository hopitalRepository;

    public Hopital enregistrer(Hopital hopital) {
        return hopitalRepository.save(hopital);
    }

    public List<Hopital> listerTous() {
        return hopitalRepository.findAll();
    }

    public Optional<Hopital> trouverParId(Long id) {
        return hopitalRepository.findById(id);
    }

    public void supprimer(Long id) {
        hopitalRepository.deleteById(id);
    }
}
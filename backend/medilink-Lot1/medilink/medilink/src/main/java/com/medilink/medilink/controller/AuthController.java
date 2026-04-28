package com.medilink.medilink.controller;

import com.medilink.medilink.model.Users;
import com.medilink.medilink.service.UsersService;
import com.medilink.medilink.config.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private UsersService usersService;
    @Autowired private JwtUtils jwtUtils;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users user) {
        return ResponseEntity.ok(usersService.inscrire(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users request) {
        if (usersService.verifierIdentifiants(request.getEmail(), request.getMotDePasse())) {
            // Récupération de l'utilisateur pour obtenir son rôle
            Users user = usersService.getUserByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

            // Le token embarque maintenant le rôle (ex: "MEDECIN", "ACCUEIL", "PHARMACIEN")
            String token = jwtUtils.generateToken(user.getEmail(), user.getRole().name());
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.status(401).body("Email ou mot de passe incorrect");
    }
}
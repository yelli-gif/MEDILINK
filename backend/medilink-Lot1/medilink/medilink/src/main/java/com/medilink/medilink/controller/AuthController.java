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

    @PostMapping("/register") // Sous-tâche : Créer l'inscription
    public ResponseEntity<?> register(@RequestBody Users user) {
        return ResponseEntity.ok(usersService.inscrire(user));
    }

    @PostMapping("/login") // Sous-tâche : Créer la connexion
    public ResponseEntity<?> login(@RequestBody Users request) {
        if (usersService.verifierIdentifiants(request.getEmail(), request.getMotDePasse())) {
            // Sous-tâche : Générer le token JWT
            String token = jwtUtils.generateToken(request.getEmail());
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.status(401).body("Email ou mot de passe incorrect");
    }
}
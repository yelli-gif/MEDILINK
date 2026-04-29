package com.medilink.medilink.controller;

import com.medilink.medilink.model.Users;
import com.medilink.medilink.service.UsersService;
import com.medilink.medilink.config.JwtUtils;
import com.medilink.medilink.repository.MedecinRepository;
import com.medilink.medilink.repository.AcceuilRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private UsersService usersService;
    @Autowired private JwtUtils jwtUtils;
    
    @Autowired private MedecinRepository medecinRepository;
    @Autowired private AcceuilRepository acceuilRepository;
    @Autowired private JdbcTemplate jdbcTemplate;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Users user) {
        return ResponseEntity.ok(usersService.inscrire(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users request) {
        if (usersService.verifierIdentifiants(request.getEmail(), request.getMotDePasse())) {
            Users user = usersService.getUserByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

            Map<String, Object> claims = new HashMap<>();
            String roleStr = user.getRole().name();

            // Injection des IDs spécifiques selon le rôle
            try {
                if ("MEDECIN".equals(roleStr)) {
                    medecinRepository.findById(user.getId()).ifPresent(m -> {
                        claims.put("medecinId", m.getId());
                        if (m.getService() != null) {
                            claims.put("serviceId", m.getService().getId());
                            if (m.getService().getHopital() != null) {
                                claims.put("hopitalId", m.getService().getHopital().getId());
                            }
                        }
                    });
                } else if ("ACCUEIL".equals(roleStr)) {
                    acceuilRepository.findById(user.getId()).ifPresent(a -> {
                        claims.put("personnelId", a.getId());
                        if (a.getHopital() != null) {
                            claims.put("hopitalId", a.getHopital().getId());
                        }
                    });
                } else if ("PHARMACIEN".equals(roleStr)) {
                    // Pour pharmacien, on utilise JDBC car le mapping JPA est parfois complexe
                    List<Map<String, Object>> ph = jdbcTemplate.queryForList(
                        "SELECT id, pharmacie_id FROM pharmacien WHERE id = ?", user.getId());
                    if (!ph.isEmpty()) {
                        claims.put("pharmacienId", ph.get(0).get("id"));
                        claims.put("pharmacieId", ph.get(0).get("pharmacie_id"));
                    }
                }
            } catch (Exception e) {
                System.err.println("Erreur lors de la récupération des infos métier pour le JWT: " + e.getMessage());
            }

            String token = jwtUtils.generateToken(user.getEmail(), roleStr, claims);
            return ResponseEntity.ok(token);
        }
        return ResponseEntity.status(401).body("Email ou mot de passe incorrect");
    }
}
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
            claims.put("id", user.getId()); // Indispensable pour que le frontend connaisse l'ID de l'utilisateur (ex: patientId)

            // Injection des IDs spécifiques selon le rôle
            try {
                if ("MEDECIN".equals(roleStr)) {
                    List<Map<String, Object>> res = jdbcTemplate.queryForList(
                        "SELECT m.id, m.nom, m.prenom, m.service_id, s.nom as service_nom, s.hopital_id FROM medecin m " +
                        "LEFT JOIN service s ON m.service_id = s.id WHERE m.id = ?", user.getId());
                    if (!res.isEmpty()) {
                        claims.put("medecinId", res.get(0).get("id"));
                        claims.put("medecinNom", "Dr. " + res.get(0).get("prenom") + " " + res.get(0).get("nom"));
                        claims.put("serviceId", res.get(0).get("service_id"));
                        claims.put("serviceNom", res.get(0).get("service_nom"));
                        claims.put("hopitalId", res.get(0).get("hopital_id"));
                    }
                } else if ("ACCUEIL".equals(roleStr)) {
                    List<Map<String, Object>> res = jdbcTemplate.queryForList(
                        "SELECT id, hopital_id FROM acceuil WHERE id = ?", user.getId());
                    if (!res.isEmpty()) {
                        claims.put("personnelId", res.get(0).get("id"));
                        claims.put("hopitalId", res.get(0).get("hopital_id"));
                    }
                } else if ("ADMIN".equals(roleStr)) {
                    List<Map<String, Object>> res = jdbcTemplate.queryForList(
                        "SELECT id, hopital_id FROM admin WHERE id = ?", user.getId());
                    if (!res.isEmpty()) {
                        claims.put("adminId", res.get(0).get("id"));
                        claims.put("hopitalId", res.get(0).get("hopital_id"));
                    }
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
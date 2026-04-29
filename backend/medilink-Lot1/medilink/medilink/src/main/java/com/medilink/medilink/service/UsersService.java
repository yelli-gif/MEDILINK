package com.medilink.medilink.service;

import com.medilink.medilink.model.Users;
import com.medilink.medilink.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {

    @Autowired // Connexion automatique au Repository (Tâche 2)
    private UsersRepository usersRepository;

    @Autowired // Connexion automatique à la Sécurité (Tâche 3)
    private PasswordEncoder passwordEncoder;

    // Cette fonction permet de sauvegarder un utilisateur proprement
    public Users enregistrerUtilisateur(Users utilisateur) {
        // Étape de sécurité : on crypte le mot de passe
        String motDePasseHache = passwordEncoder.encode(utilisateur.getMotDePasse());
        utilisateur.setMotDePasse(motDePasseHache);

        // On enregistre ensuite dans la base Railway
        return usersRepository.save(utilisateur);
    }

    // Cette fonction permet de lister tout le monde
    public List<Users> listerToutLeMonde() {
        return usersRepository.findAll();
    }



    public Users inscrire(Users utilisateur) {
        try {
            System.out.println("DEBUG: Tentative d'inscription pour : " + utilisateur.getEmail());
            
            // Vérification si l'email existe déjà
            if (usersRepository.findByEmail(utilisateur.getEmail()).isPresent()) {
                throw new RuntimeException("Cet email est déjà utilisé. Veuillez en choisir un autre.");
            }

            if (utilisateur.getMotDePasse() == null) {
                throw new RuntimeException("Le mot de passe ne peut pas être nul");
            }

            // On hache le mot de passe pour la sécurité
            utilisateur.setMotDePasse(passwordEncoder.encode(utilisateur.getMotDePasse()));

            // Sécurité : Si aucun rôle n'est fourni, on met PATIENT par défaut
            if (utilisateur.getRole() == null) {
                System.out.println("DEBUG: Role was null, setting to PATIENT");
                utilisateur.setRole(com.medilink.medilink.model.Role.PATIENT);
            } else {
                System.out.println("DEBUG: Role provided: " + utilisateur.getRole());
            }

            if (utilisateur.getCreatedAt() == null) {
                utilisateur.setCreatedAt(java.time.LocalDateTime.now());
            }

            System.out.println("DEBUG: Enregistrement en base de données...");
            Users savedUser = usersRepository.save(utilisateur);
            System.out.println("DEBUG: Inscription réussie pour l'ID : " + savedUser.getId());
            return savedUser;
        } catch (Exception e) {
            System.err.println("CRITICAL ERROR during registration: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Erreur lors de l'inscription : " + e.getMessage());
        }
    }

    public boolean verifierIdentifiants(String email, String mdpClair) {
        // On cherche l'utilisateur par email et on compare les mots de passe
        return usersRepository.findByEmail(email)
                .map(u -> passwordEncoder.matches(mdpClair, u.getMotDePasse()))
                .orElse(false);
    }

    /** Retourne l'utilisateur par email (utile pour récupérer le rôle au login). */
    public Optional<Users> getUserByEmail(String email) {
        return usersRepository.findByEmail(email);
    }

}

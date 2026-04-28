package com.medilink.medilink.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity  // active @PreAuthorize dans les controllers
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        // À remplacer par BCryptPasswordEncoder en production
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, CorsConfigurationSource corsConfigurationSource) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(session ->
                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Routes publiques (pas besoin de token)
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/services", "/api/services/**").permitAll()
                .requestMatchers("/api/medicaments", "/api/medicaments/**").permitAll()
                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**").permitAll()
                .requestMatchers("/error").permitAll()

                // Routes réservées à l'ADMIN
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/hopitaux/**").hasRole("ADMIN")
                .requestMatchers("/api/personnel/**").hasRole("ADMIN")

                // Routes réservées au MEDECIN
                .requestMatchers("/api/ordonnances/**").hasRole("MEDECIN")
                .requestMatchers("/api/consultations/**").hasRole("MEDECIN")
                .requestMatchers("/api/medecin/**").hasRole("MEDECIN")

                // Routes réservées à l'ACCUEIL
                .requestMatchers("/api/accueil/**").hasRole("ACCUEIL")
                .requestMatchers("/api/file-attente/**").hasRole("ACCUEIL")
                .requestMatchers("/api/tickets/**").hasRole("ACCUEIL")

                // Routes réservées au PHARMACIEN
                .requestMatchers("/api/pharmacie/**").hasRole("PHARMACIEN")
                .requestMatchers("/api/disponibilite/**").hasRole("PHARMACIEN")

                // Routes accessibles à tout utilisateur authentifié
                .requestMatchers("/api/patients/**").authenticated()
                .requestMatchers("/api/rendez-vous/**").authenticated()

                // Tout le reste nécessite une authentification
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
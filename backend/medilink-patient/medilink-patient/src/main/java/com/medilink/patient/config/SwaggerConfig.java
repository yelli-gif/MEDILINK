package com.medilink.patient.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Configuration Swagger/OpenAPI pour la documentation de l'API
 * Accessible à : http://localhost:8082/swagger-ui.html
 */
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI medilinkOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("MediLink API - LOT 2 : Parcours Patient & Rendez-vous")
                        .description("API REST pour la gestion des patients, des rendez-vous et la recherche d'hôpitaux avec géolocalisation")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Équipe MediLink LOT 2")
                                .email("medilink@example.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8082")
                                .description("Serveur de développement local"),
                        new Server()
                                .url("https://api.medilink.com")
                                .description("Serveur de production (à configurer)")
                ));
    }
}
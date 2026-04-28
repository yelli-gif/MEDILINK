package com.medilink.patient;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;
import java.sql.Connection;

@SpringBootApplication
public class MedilinkPatientApplication {

    public static void main(String[] args) {
        SpringApplication.run(MedilinkPatientApplication.class, args);
    }

    @Bean
    public CommandLineRunner testDatabaseConnection(DataSource dataSource) {
        return args -> {
            try (Connection connection = dataSource.getConnection()) {
                System.out.println("✅ Connexion à la base de données réussie !");
                System.out.println("📊 Base de données : " + connection.getMetaData().getDatabaseProductName());
                System.out.println("🔢 Version : " + connection.getMetaData().getDatabaseProductVersion());
            } catch (Exception e) {
                System.err.println("❌ Erreur de connexion : " + e.getMessage());
            }
        };
    }
}
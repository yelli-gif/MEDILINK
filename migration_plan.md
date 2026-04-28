# Plan de Migration Railway (MySQL) vers Supabase (PostgreSQL)

Ce document récapitule les besoins et les étapes pour migrer le projet Medilink vers Supabase.

## 1. Informations Requises (À confirmer)

Pour configurer les applications Java, j'ai besoin des détails de connexion suivants pour votre instance Supabase (`kqoncuduyigktlvgnlse.supabase.co`) :

- **JDBC URL** : Généralement `jdbc:postgresql://aws-0-eu-central-1.pooler.supabase.com:5432/postgres` (ou similaire).
- **Utilisateur** : Généralement `postgres`.
- **Mot de Passe** : **REQUIS** (Je ne peux pas le deviner).
- **Nom de la Base** : Généralement `postgres`.

> [!IMPORTANT]
> Vous pouvez trouver ces informations dans votre tableau de bord Supabase sous **Project Settings > Database**.

## 2. Synthèse de la Situation Actuelle

- **Source** : Base MySQL sur Railway (utilisant le pilote `com.mysql.cj.jdbc.Driver`).
- **Cible** : Base PostgreSQL sur Supabase.
- **Impact** : 
    - Le schéma SQL doit être traduit (MySQL -> PostgreSQL).
    - Les projets Java (Spring Boot) doivent changer de pilote JDBC et de Dialecte Hibernate.

## 3. Étapes de Travail Proposées

### Étape A : Préparation du Schéma
Je vais créer un fichier `medilink_schema_supabase.sql` compatible PostgreSQL en effectuant les conversions suivantes :
- `AUTO_INCREMENT` -> `GENERATED ALWAYS AS IDENTITY`.
- types `GEOMETRY` -> utilisation de l'extension `PostGIS`.
- Suppression des instructions spécifiques à MySQL (`SET FOREIGN_KEY_CHECKS`).

### Étape B : Mise à jour du Code Backend
Pour chaque lot (`Lot1`, `lot3`, `lot4`, `lot5`, `patient`) :
1. Modifier le `pom.xml` :
    - Remplacer `mysql-connector-java` par `postgresql`.
2. Modifier `application.properties` :
    - Mettre à jour l'URL, le login et le mot de passe.
    - Changer le driver : `org.postgresql.Driver`.
    - Changer le dialecte : `org.hibernate.dialect.PostgreSQLDialect`.

## 4. Validation

1. Je vous fournirai le fichier SQL à exécuter dans l'éditeur SQL de Supabase.
2. Une fois le SQL exécuté de votre côté, je mettrai à jour les fichiers du projet.

---
**Voulez-vous que je génère d'abord le fichier SQL de migration pour examen ?**
Avez-vous le mot de passe de la base de données ?

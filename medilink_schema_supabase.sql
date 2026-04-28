-- ============================================================
--  MEDILINK — Schéma SQL complet (Version PostgreSQL / Supabase)
--  Couvre : Lot 1, Lot 2 (patient), Lot 3 (file d'attente),
--           Lot 4 (ordonnance), Lot 5 (pharmacie)
--  Cible : PostgreSQL (Supabase) avec extension PostGIS
-- ============================================================

-- Activer l'extension PostGIS pour les données géographiques
CREATE EXTENSION IF NOT EXISTS postgis;

-- ============================================================
--  LOT 1 — Socle : Auth, Hôpital, Service, Médecin, Médicament
-- ============================================================

-- Table des comptes utilisateurs (authentification)
CREATE TABLE IF NOT EXISTS users (
    id             BIGINT         GENERATED ALWAYS AS IDENTITY,
    email          VARCHAR(255)   NOT NULL UNIQUE,
    mot_de_passe   VARCHAR(255)   NOT NULL,
    role           VARCHAR(50)    NOT NULL,          -- MEDECIN | ACCUEIL | ADMIN
    PRIMARY KEY (id)
);

-- Hôpitaux
CREATE TABLE IF NOT EXISTS hopital (
    id            BIGINT         GENERATED ALWAYS AS IDENTITY,
    nom           VARCHAR(255)   NOT NULL,
    adresse       VARCHAR(500)   NOT NULL,
    localisation  geometry(Point, 4326) NULL,       -- Point GPS (PostGIS)
    PRIMARY KEY (id)
);

-- Services hospitaliers
CREATE TABLE IF NOT EXISTS service (
    id          BIGINT        GENERATED ALWAYS AS IDENTITY,
    nom         VARCHAR(255)  NOT NULL,
    hopital_id  BIGINT        NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_service_hopital FOREIGN KEY (hopital_id) REFERENCES hopital (id)
);

-- Profils médecins (extension de users)
CREATE TABLE IF NOT EXISTS medecin (
    id          BIGINT        NOT NULL,              -- même ID que users
    nom         VARCHAR(255)  NULL,
    prenom      VARCHAR(255)  NULL,
    service_id  BIGINT        NULL,
    created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_medecin_user    FOREIGN KEY (id)         REFERENCES users   (id),
    CONSTRAINT fk_medecin_service FOREIGN KEY (service_id) REFERENCES service (id)
);

-- Profils personnel d'accueil (extension de users)
CREATE TABLE IF NOT EXISTS acceuil (
    id          BIGINT        NOT NULL,              -- même ID que users
    nom         VARCHAR(255)  NULL,
    prenom      VARCHAR(255)  NULL,
    hopital_id  BIGINT        NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_acceuil_user   FOREIGN KEY (id)        REFERENCES users  (id),
    CONSTRAINT fk_acceuil_hopital FOREIGN KEY (hopital_id) REFERENCES hopital (id)
);

-- Médicaments (catalogue central)
CREATE TABLE IF NOT EXISTS medicament (
    id    BIGINT        GENERATED ALWAYS AS IDENTITY,
    nom   VARCHAR(255)  NOT NULL UNIQUE,
    forme VARCHAR(100)  NULL,                        -- Comprimé, Gélule, Sirop…
    prix  DECIMAL(10,2) NULL,
    PRIMARY KEY (id)
);

-- ============================================================
--  LOT 2 — Patients & Rendez-vous
-- ============================================================

-- Patients
CREATE TABLE IF NOT EXISTS patient (
    id              BIGINT        GENERATED ALWAYS AS IDENTITY,
    nom             VARCHAR(100)  NOT NULL,
    prenom          VARCHAR(100)  NOT NULL,
    date_naissance  DATE          NULL,
    groupe_sanguin  VARCHAR(10)   NULL,
    poids           INT           NULL,
    localisation    geometry(Point, 4326) NULL,      -- Coordonnées GPS du patient
    antecedents     TEXT          NULL,
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Rendez-vous
CREATE TABLE IF NOT EXISTS rendez_vous (
    id          BIGINT    GENERATED ALWAYS AS IDENTITY,
    date        DATE      NULL,
    heure       TIME      NULL,
    patient_id  BIGINT    NULL,
    medecin_id  BIGINT    NULL,
    service_id  BIGINT    NULL,
    created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_rdv_patient  FOREIGN KEY (patient_id)  REFERENCES patient (id),
    CONSTRAINT fk_rdv_medecin  FOREIGN KEY (medecin_id)  REFERENCES medecin (id),
    CONSTRAINT fk_rdv_service  FOREIGN KEY (service_id)  REFERENCES service (id)
);

-- ============================================================
--  LOT 3 — File d'attente & Tickets
-- ============================================================

-- File d'attente par service et par journée
CREATE TABLE IF NOT EXISTS file_attente (
    id              BIGINT       GENERATED ALWAYS AS IDENTITY,
    date            DATE         NULL,
    service_id      BIGINT       NOT NULL,
    ticket_en_cours VARCHAR(50)  NULL,               -- ex : "CN39"
    numero_suivant  INT          NULL,               -- ex : 39
    PRIMARY KEY (id),
    CONSTRAINT fk_fileattente_service FOREIGN KEY (service_id) REFERENCES service (id)
);

-- Tickets de file d'attente
CREATE TABLE IF NOT EXISTS ticket (
    id_ticket       VARCHAR(50)  NOT NULL,           -- ex : "CN39-2024-01-15"
    numero_file     INT          NOT NULL,
    statut          VARCHAR(50)  NULL,               -- EN_ATTENTE | APPELE | TRAITE | ABSENT
    rendez_vous_id  BIGINT       NULL,
    service_id      BIGINT       NULL,
    file_attente_id BIGINT       NOT NULL,
    PRIMARY KEY (id_ticket),
    CONSTRAINT fk_ticket_rdv         FOREIGN KEY (rendez_vous_id)  REFERENCES rendez_vous (id),
    CONSTRAINT fk_ticket_service     FOREIGN KEY (service_id)      REFERENCES service     (id),
    CONSTRAINT fk_ticket_fileattente FOREIGN KEY (file_attente_id) REFERENCES file_attente(id)
);

-- ============================================================
--  LOT 4 — Consultations & Ordonnances
-- ============================================================

-- Ordonnances
CREATE TABLE IF NOT EXISTS ordonnance (
    id                      BIGINT       GENERATED ALWAYS AS IDENTITY,
    date_creation           TIMESTAMP WITH TIME ZONE NULL,
    date_debut_traitement   TIMESTAMP WITH TIME ZONE NULL,
    statut_ordonnance       VARCHAR(100) NULL,       -- EN_ATTENTE_PHARMACIE | VALIDEE | DISPENSEE
    medecin_id              BIGINT       NOT NULL,
    patient_id              BIGINT       NOT NULL,
    service_id              BIGINT       NOT NULL,
    created_at              TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_ordonnance_medecin  FOREIGN KEY (medecin_id) REFERENCES medecin  (id),
    CONSTRAINT fk_ordonnance_patient  FOREIGN KEY (patient_id) REFERENCES patient  (id),
    CONSTRAINT fk_ordonnance_service  FOREIGN KEY (service_id) REFERENCES service  (id)
);

-- Lignes d'ordonnance (un médicament par ligne)
CREATE TABLE IF NOT EXISTS ligne_ordonnance (
    id               BIGINT        GENERATED ALWAYS AS IDENTITY,
    posologie        VARCHAR(255)  NULL,             -- ex : "1 comprimé le matin"
    frequence        VARCHAR(255)  NULL,             -- ex : "2x/jour"
    duree_traitement VARCHAR(100)  NULL,             -- ex : "7 jours"
    quantite         INT           NULL,
    est_disponible   BOOLEAN       NOT NULL DEFAULT FALSE,
    ordonnance_id    BIGINT        NOT NULL,
    medicament_id    BIGINT        NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_ligne_ordonnance FOREIGN KEY (ordonnance_id) REFERENCES ordonnance (id),
    CONSTRAINT fk_ligne_medicament FOREIGN KEY (medicament_id) REFERENCES medicament (id)
);

-- ============================================================
--  LOT 5 — Pharmacie & Suivi médicaments
-- ============================================================

-- Pharmacies partenaires
CREATE TABLE IF NOT EXISTS pharmacie (
    id            BIGINT        GENERATED ALWAYS AS IDENTITY,
    nom           VARCHAR(200)  NOT NULL,
    adresse       VARCHAR(500)  NOT NULL,
    localisation  geometry(Point, 4326) NULL,       -- Point GPS (PostGIS)
    PRIMARY KEY (id)
);

-- Pharmaciens (comptes internes à la pharmacie)
CREATE TABLE IF NOT EXISTS pharmacien (
    id           BIGINT       NOT NULL,              -- même ID que users
    nom          VARCHAR(200) NOT NULL,
    pharmacie_id BIGINT       NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_pharmacien_user      FOREIGN KEY (id)           REFERENCES users    (id),
    CONSTRAINT fk_pharmacien_pharmacie FOREIGN KEY (pharmacie_id) REFERENCES pharmacie (id)
);

-- Demandes de disponibilité d'un médicament auprès d'une pharmacie
CREATE TABLE IF NOT EXISTS demande_disponibilite (
    id               BIGINT     GENERATED ALWAYS AS IDENTITY,
    date_demande     TIMESTAMP WITH TIME ZONE NULL,
    ligne_ordonnance_id BIGINT  NULL,
    pharmacie_id     BIGINT     NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_demande_ligne      FOREIGN KEY (ligne_ordonnance_id) REFERENCES ligne_ordonnance (id),
    CONSTRAINT fk_demande_pharmacie  FOREIGN KEY (pharmacie_id)        REFERENCES pharmacie        (id)
);

-- Suivi des prises de médicaments par le patient
CREATE TABLE IF NOT EXISTS prise_medicament (
    id                BIGINT       GENERATED ALWAYS AS IDENTITY,
    date_heure_prevue TIMESTAMP WITH TIME ZONE NULL,
    date_heure_prise  TIMESTAMP WITH TIME ZONE NULL,
    statut_prise      VARCHAR(50)  NULL,
    commentaire       VARCHAR(500) NULL,
    ligne_ordonnance_id BIGINT     NULL,
    patient_id        BIGINT       NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_prise_ligne    FOREIGN KEY (ligne_ordonnance_id) REFERENCES ligne_ordonnance (id),
    CONSTRAINT fk_prise_patient  FOREIGN KEY (patient_id)          REFERENCES patient          (id)
);

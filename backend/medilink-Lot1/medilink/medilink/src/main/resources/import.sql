-- Nettoyage (optionnel mais recommandé pour les test
DELETE FROM service;
DELETE FROM hopital;

-- 1. Hôpitaux
INSERT INTO hopital (id, nom, adresse) VALUES (1, 'CHU Cocody', 'Abidjan');
INSERT INTO hopital (id, nom, adresse) VALUES (2, 'Hôpital de Bingerville', 'Bingerville');

-- 2. Services
INSERT INTO service (id, nom, hopital_id) VALUES (1, 'Cardiologie', 1);
INSERT INTO service (id, nom, hopital_id) VALUES (2, 'Pédiatrie', 2);

-- 3. Médicaments (Vérifie bien que ton entité s'appelle Medicament)
INSERT INTO medicament (nom, forme, prix) VALUES ('Paracétamol', 'Comprimé', 500);
INSERT INTO medicament (nom, forme, prix) VALUES ('Amoxicilline', 'Sirop', 1500);
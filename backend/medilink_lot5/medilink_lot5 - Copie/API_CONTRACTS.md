##1. Réponse : Statut du Service (GET /api/status)
   Ce JSON confirme que ton module est prêt et que tes données de test sont chargées.

JSON
{
"module": "Lot 5 - Pharmacie & Suivi",
"status": "OPERATIONAL",
"mock_data_loaded": true,
"timestamp": "2026-01-27T02:00:00Z"
}
##2. Réponse : Calendrier Médicaments (GET /api/patient/suivi/calendrier)
   C'est la structure exacte issue de ton fichier fake_ordonnance.json. Les développeurs Mobile doivent utiliser ces noms de champs (nomMedicament, statutPrise).

JSON
[
{
"patientId": "1",
"nomMedicament": "Amoxicilline",
"dateHeurePrevue": "2026-01-27T08:00:00",
"statutPrise": "A_PRENDRE",
"commentaire": "À prendre après le repas"
},
{
"patientId": "1",
"nomMedicament": "Doliprane",
"dateHeurePrevue": "2026-01-27T12:00:00",
"statutPrise": "A_PRENDRE",
"commentaire": "Si douleur uniquement"
}
]
##3. Réponse : Validation de Prise (POST /api/patient/suivi/prises/{id}/valider)
   Cette réponse confirme au Front-end que l'action a été enregistrée.

JSON
{
"success": true,
"message": "La prise du médicament a été validée avec succès."
}
##4.Pour le Lot 4 - Réception des Ordonnances (Nouveau pour le Bloc 11)

Schéma de réception (JSON) :

JSON
{
"id_ordonnance": "ORD-2026",
"patient_id": "1",
"prescriptions": [
{
"medicament": "Amoxicilline",
"posologie": "1 gélule",
"frequence": "3 fois par jour",
"duree": "7 jours"
}
]
}
##4. Demandes de disponibilité (Lot Pharmacie)
Requête Sortante (Ce que ton Lot 5 envoie)
Endpoint cible : POST /api/pharmacie/disponibilite

JSON
{
"demande_id": "REQ-789",
"pharmacie_id": "PHARMA-CENTRAL",
"articles": [
{
"nomMedicament": "Amoxicilline",
"quantiteRequise": 1
},
{
"nomMedicament": "Doliprane",
"quantiteRequise": 2
}
]
}
Réponse Attendue (Ce que tu reçois en retour)

{
"demande_id": "REQ-789",
"statut": "TRAITÉ",
"resultats": [
{
"nomMedicament": "Amoxicilline",
"disponible": true,
"stockRestant": 15
},
{
"nomMedicament": "Doliprane",
"disponible": false,
"message": "En rupture de stock - Livraison prévue demain"
}
]
}
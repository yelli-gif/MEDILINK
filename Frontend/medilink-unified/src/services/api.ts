/**
 * Service API centralisé pour Medilink
 * Route les appels vers les bons microservices backend
 */

// URLs des microservices (lues depuis le fichier .env)
const API = {
  LOT1: import.meta.env.VITE_API_LOT1 || 'http://localhost:8081', // Admin, Auth, Hôpitaux, Services, Personnel, Médicaments
  LOT2: import.meta.env.VITE_API_LOT2 || 'http://localhost:8082', // Patient, Rendez-vous
  LOT3: import.meta.env.VITE_API_LOT3 || 'http://localhost:8083', // Réception, File d'attente, Tickets
  LOT4: import.meta.env.VITE_API_LOT4 || 'http://localhost:8084', // Consultation, Ordonnances
  LOT5: import.meta.env.VITE_API_LOT5 || 'http://localhost:8085', // Pharmacie, Disponibilité
};

// ================================================================
// Fonction utilitaire pour les appels API
// ================================================================
async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  console.log(`[API CALL] Fetching: ${url}`);
  const token = localStorage.getItem('medilink_token');

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Erreur ${response.status}`);
  }

  // Si la réponse est vide (204 No Content)
  if (response.status === 204) return null as T;

  // Si la réponse est du texte brut (comme le JWT du login)
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response.text() as T;
}

// ================================================================
// AUTH (Lot 1 - port 8081)
// ================================================================
export const authAPI = {
  login: (email: string, motDePasse: string) =>
    apiFetch<string>(`${API.LOT1}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, motDePasse }),
    }),

  register: (userData: { email: string; motDePasse: string; role?: string }) =>
    apiFetch<any>(`${API.LOT1}/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
};

// ================================================================
// HÔPITAUX (Lot 1 - port 8081)
// ================================================================
export const hopitalAPI = {
  lister: () =>
    apiFetch<any[]>(`${API.LOT1}/api/hopitaux/liste`),

  ajouter: (data: { nom: string; adresse: string; latitude: number; longitude: number }) =>
    apiFetch<any>(`${API.LOT1}/api/hopitaux/ajouter`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// ================================================================
// SERVICES (Lot 1 - port 8081 & Lot 2 - port 8082)
// ================================================================
export const serviceAPI = {
  // Depuis Lot 1 (Administratif & Personnel)
  listerTous: (hopitalId?: number) =>
    apiFetch<any[]>(`${API.LOT1}/api/services${hopitalId ? `?hopitalId=${hopitalId}` : ''}`),

  getById: (id: number) =>
    apiFetch<any>(`${API.LOT1}/api/services/${id}`),

  creer: (data: any) =>
    apiFetch<any>(`${API.LOT1}/api/services`, {
      method: 'POST',
      body: JSON.stringify({
        nom: data.nom,
        hopital: { id: data.hopitalId } // On envoie l'objet hôpital attendu par le Lot 1
      }),
    }),

  // Depuis Lot 2 (Patient / Public)
  lister: () =>
    apiFetch<any[]>(`${API.LOT2}/api/services`),

  listerParHopital: (hopitalId: number) =>
    apiFetch<any[]>(`${API.LOT2}/api/services/hopital/${hopitalId}`),

  modifier: (id: number, data: any) =>
    apiFetch<any>(`${API.LOT2}/api/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  supprimer: (id: number) =>
    apiFetch<void>(`${API.LOT2}/api/services/${id}`, { method: 'DELETE' }),
};

// ================================================================
// PERSONNEL (Lot 1 - port 8081)
// ================================================================
export const personnelAPI = {
  listerMedecins: (hopitalId?: number) =>
    apiFetch<any[]>(`${API.LOT1}/api/personnel/medecins${hopitalId ? `?hopitalId=${hopitalId}` : ''}`),

  listerMedecinsParService: (serviceId: number) =>
    apiFetch<any[]>(`${API.LOT1}/api/personnel/medecins/service/${serviceId}`),

  listerAccueilParHopital: (hopitalId: number) =>
    apiFetch<any[]>(`${API.LOT1}/api/personnel/accueil/hopital/${hopitalId}`),

  listerToutAccueil: (hopitalId?: number) => 
    apiFetch<any[]>(`${API.LOT1}/api/personnel/accueil${hopitalId ? `?hopitalId=${hopitalId}` : ''}`),

  ajouterMedecin: (data: any) =>
    apiFetch<any>(`${API.LOT1}/api/personnel/medecins`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  ajouterAccueil: (data: any) =>
    apiFetch<any>(`${API.LOT1}/api/personnel/accueil`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  ajouterPharmacien: (data: any) =>
    apiFetch<any>(`${API.LOT1}/api/personnel/pharmaciens`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  ajouterAdmin: (data: any) =>
    apiFetch<any>(`${API.LOT1}/api/personnel/admin`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// ================================================================
// MÉDICAMENTS (Lot 1 - port 8081)
// ================================================================
export const medicamentAPI = {
  lister: () =>
    apiFetch<any[]>(`${API.LOT1}/api/medicaments`),

  ajouter: (data: any) =>
    apiFetch<any>(`${API.LOT1}/api/medicaments`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  modifier: (id: number, data: any) =>
    apiFetch<any>(`${API.LOT1}/api/medicaments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  supprimer: (id: number) =>
    apiFetch<void>(`${API.LOT1}/api/medicaments/${id}`, { method: 'DELETE' }),
};

// ================================================================
// PATIENTS (Lot 2 - port 8082)
// ================================================================
export const patientAPI = {
  creer: (data: any) =>
    apiFetch<any>(`${API.LOT2}/api/patients`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getById: (id: number) =>
    apiFetch<any>(`${API.LOT2}/api/patients/${id}`),

  lister: (page = 0, size = 20) =>
    apiFetch<any>(`${API.LOT2}/api/patients?page=${page}&size=${size}`),

  modifier: (id: number, data: any) =>
    apiFetch<any>(`${API.LOT2}/api/patients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  supprimer: (id: number) =>
    apiFetch<void>(`${API.LOT2}/api/patients/${id}`, { method: 'DELETE' }),

  rechercher: (critere: string) =>
    apiFetch<any[]>(`${API.LOT2}/api/patients/search?critere=${encodeURIComponent(critere)}`),
};

// ================================================================
// RENDEZ-VOUS (Lot 2 - port 8082)
// ================================================================
export const rendezVousAPI = {
  creer: (data: any) =>
    apiFetch<any>(`${API.LOT2}/api/rendez-vous`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getById: (id: number) =>
    apiFetch<any>(`${API.LOT2}/api/rendez-vous/${id}`),

  parPatient: (patientId: number) =>
    apiFetch<any[]>(`${API.LOT2}/api/rendez-vous/patient/${patientId}`),

  parMedecin: (medecinId: number) =>
    apiFetch<any[]>(`${API.LOT2}/api/rendez-vous/medecin/${medecinId}`),

  parHopital: (hopitalId: number) =>
    apiFetch<any[]>(`${API.LOT2}/api/rendez-vous/hopital/${hopitalId}`),

  annuler: (id: number) =>
    apiFetch<void>(`${API.LOT2}/api/rendez-vous/${id}`, { method: 'DELETE' }),
};

// ================================================================
// ACCUEIL / RÉCEPTION (Lot 3 - port 8083)
// ================================================================
export const accueilAPI = {
  arriveePatient: (rendezVousId: number, serviceId: number) =>
    apiFetch<any>(`${API.LOT3}/api/accueil/arrivee?rendezVousId=${rendezVousId}&serviceId=${serviceId}`, {
      method: 'POST',
    }),

  ticketEnCours: (serviceId: number) =>
    apiFetch<any>(`${API.LOT3}/api/file-attente/current?serviceId=${serviceId}`),
};

// ================================================================
// CONSULTATION / ORDONNANCES (Lot 4 - port 8084)
// ================================================================
export const consultationAPI = {
  creerOrdonnance: (data: any) =>
    apiFetch<any>(`${API.LOT4}/api/consultation/ordonnance`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getOrdonnance: (id: number) =>
    apiFetch<any>(`${API.LOT4}/api/consultation/ordonnance/${id}`),

  ajouterLigne: (ordonnanceId: number, data: any) =>
    apiFetch<any>(`${API.LOT4}/api/consultation/ordonnance/${ordonnanceId}/ligne`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  supprimerLigne: (ligneId: number) =>
    apiFetch<void>(`${API.LOT4}/api/consultation/ligne/${ligneId}`, { method: 'DELETE' }),

  // API inter-lots
  getOrdonnanceParId: (id: number) =>
    apiFetch<any>(`${API.LOT4}/api/ordonnances/${id}`),
};

// ================================================================
// PHARMACIE (Lot 5 - port 8085)
// ================================================================
export const pharmacieAPI = {
  verifierDisponibilite: (medicamentNom: string) =>
    apiFetch<any>(`${API.LOT5}/api/disponibilite/check?medicamentNom=${encodeURIComponent(medicamentNom)}`),

  getDemandes: () =>
    apiFetch<any>(`${API.LOT5}/api/pharmacien/demandes`),

  validerDemande: (id: number) =>
    apiFetch<any>(`${API.LOT5}/api/pharmacien/demandes/${id}/valider`, { method: 'POST' }),

  status: () =>
    apiFetch<any>(`${API.LOT5}/api/status`),
};

// ================================================================
// ADMIN PHARMACIE (Lot 1 - port 8081)
// ================================================================
export const pharmacieAdminAPI = {
  lister: () =>
    apiFetch<any[]>(`${API.LOT1}/api/admin/pharmacies/liste`),

  ajouter: (data: { nom: string; adresse: string; latitude: number; longitude: number }) =>
    apiFetch<any>(`${API.LOT1}/api/admin/pharmacies/ajouter`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export default API;

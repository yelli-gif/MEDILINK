import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Pill, 
  FileText, 
  Clock, 
  MapPin, 
  Sun, 
  HeartPulse,
  X, AlertTriangle, Loader2
} from 'lucide-react';
import FloatingNav from '../Composants/FloatingNav';
import TopNavBar from '../Composants/TopNavBar';
import { rendezVousAPI } from '../../../services/api';

interface RendezVousData {
  id: number;
  date: string;
  heure: string;
  medecinId: number;
  service: { id: number; nom: string } | null;
  hopital: { id: number; nom: string; adresse: string } | null;
  patient: { id: number; nom: string; prenom: string } | null;
}

const PatientDashboard: React.FC = () => {
  const userString = localStorage.getItem('medilink_user');
  const userProfile = userString ? JSON.parse(userString) : { name: 'Patient', isNew: true };

  const [showMapModal, setShowMapModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [mapLoading, setMapLoading] = useState(false);

  // Données réelles depuis l'API
  const [rendezVousList, setRendezVousList] = useState<RendezVousData[]>([]);
  const [nextAppointment, setNextAppointment] = useState<RendezVousData | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  // Charger les rendez-vous depuis le backend (Lot 2 - port 8082)
  useEffect(() => {
    const fetchRendezVous = async () => {
      try {
        setLoading(true);
        // Récupérer l'ID du patient depuis le localStorage
        const patientId = userProfile.patientId;

        if (patientId) {
          const rdvList = await rendezVousAPI.parPatient(patientId);
          setRendezVousList(rdvList || []);

          // Le prochain RDV est le premier de la liste (triée par date)
          if (rdvList && rdvList.length > 0) {
            // Trier par date pour trouver le plus proche dans le futur
            const today = new Date().toISOString().split('T')[0];
            const futureRdv = rdvList.filter((r: RendezVousData) => r.date >= today);
            if (futureRdv.length > 0) {
              setNextAppointment(futureRdv[0]);
            }
          }
        }
      } catch (err: any) {
        console.error('Erreur chargement RDV:', err);
        setApiError('Impossible de charger les rendez-vous');
      } finally {
        setLoading(false);
      }
    };

    fetchRendezVous();
  }, []);

  const handleAnnulerRdv = async () => {
    if (!nextAppointment) return;
    try {
      await rendezVousAPI.annuler(nextAppointment.id);
      setNextAppointment(null);
      setRendezVousList(prev => prev.filter(r => r.id !== nextAppointment.id));
      setShowEditModal(false);
    } catch (err) {
      console.error('Erreur annulation RDV:', err);
    }
  };

  const handleOpenMap = () => {
    setShowMapModal(true);
    if (!userLocation && "geolocation" in navigator) {
      setMapLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
          setMapLoading(false);
        },
        () => { setMapLoading(false); }
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans relative">
      <TopNavBar />
      <main className="max-w-[1400px] mx-auto px-6 md:px-12 pt-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#14152A] mb-1">Bonjour {userProfile.name},</h1>
          <p className="text-[#5A5C6B] font-medium">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>

        {/* Cartes statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-600 rounded-[32px] p-8 text-white shadow-xl shadow-blue-500/20 flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md"><Calendar size={32} /></div>
            <div>
              <p className="text-5xl font-bold">{rendezVousList.length}</p>
              <p className="text-white/80 font-bold uppercase text-xs tracking-widest mt-1">Rendez-vous</p>
            </div>
          </div>
          <div className="bg-emerald-500 rounded-[32px] p-8 text-white shadow-xl shadow-emerald-500/20 flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md"><Pill size={32} /></div>
            <div>
              <p className="text-5xl font-bold">0</p>
              <p className="text-white/80 font-bold uppercase text-xs tracking-widest mt-1">Traitements</p>
            </div>
          </div>
          <div className="bg-rose-500 rounded-[32px] p-8 text-white shadow-xl shadow-rose-500/20 flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md"><FileText size={32} /></div>
            <div>
              <p className="text-5xl font-bold">0</p>
              <p className="text-white/80 font-bold uppercase text-xs tracking-widest mt-1">Ordonnances</p>
            </div>
          </div>
        </div>

        {/* Section principale */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest">PROCHAIN SUIVI</span>
              <HeartPulse size={32} className="text-blue-200" />
            </div>

            {loading ? (
              <div className="flex-grow flex flex-col items-center justify-center py-10">
                <Loader2 size={48} className="text-blue-500 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Chargement des rendez-vous...</p>
              </div>
            ) : apiError ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center py-10">
                <AlertTriangle size={48} className="text-amber-400 mb-4" />
                <p className="text-slate-500 font-medium">{apiError}</p>
                <button onClick={() => window.location.reload()} className="text-blue-600 font-bold mt-4 hover:underline">Réessayer</button>
              </div>
            ) : !nextAppointment ? (
              <div className="flex-grow flex flex-col items-center justify-center text-center py-10 opacity-50">
                <Calendar size={64} className="text-slate-300 mb-4" />
                <h3 className="text-xl font-bold">Aucun RDV à venir</h3>
                <button onClick={() => window.location.href='/rdv'} className="text-blue-600 font-bold mt-4 hover:underline">Prendre un rendez-vous</button>
              </div>
            ) : (
              <div className="flex-grow">
                 <div className="flex items-center gap-6 mb-8">
                   <div className="w-24 h-24 bg-blue-100 rounded-full overflow-hidden border-4 border-white shadow-sm flex items-center justify-center">
                      <HeartPulse size={40} className="text-blue-500" />
                   </div>
                   <div>
                     <h2 className="text-3xl font-bold text-slate-900">{nextAppointment.service?.nom || 'Service médical'}</h2>
                     <p className="text-blue-600 font-bold text-lg">{nextAppointment.hopital?.nom || 'Hôpital'}</p>
                   </div>
                 </div>
                 <div className="space-y-4 mb-10">
                   <div className="flex items-center gap-3 text-slate-600 font-medium">
                      <Clock size={20} className="text-slate-300" /> {nextAppointment.date} à {nextAppointment.heure}
                   </div>
                   <div className="flex items-center gap-3 text-slate-600 font-medium">
                      <MapPin size={20} className="text-slate-300" /> {nextAppointment.hopital?.adresse || 'Adresse non renseignée'}
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <button onClick={() => setShowEditModal(true)} className="flex-1 border border-slate-200 font-bold py-4 rounded-2xl hover:bg-slate-50 transition-colors">Annuler</button>
                   <button onClick={handleOpenMap} className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20">Itinéraire</button>
                 </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
             <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold mb-6">Profil Morphologique</h3>
                <div className="grid grid-cols-2 gap-6">
                   <div className="bg-slate-50 p-6 rounded-3xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Poids</p>
                      <p className="text-3xl font-bold text-slate-800">{userProfile.weight || '--'} <span className="text-sm font-medium">kg</span></p>
                   </div>
                   <div className="bg-slate-50 p-6 rounded-3xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Taille</p>
                      <p className="text-3xl font-bold text-slate-800">{userProfile.height || '--'} <span className="text-sm font-medium">cm</span></p>
                   </div>
                </div>
             </div>
             <div className="bg-emerald-50 rounded-[40px] p-8 border border-emerald-100">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="text-xl font-bold text-emerald-900">Conseil IA</h3>
                   <Sun className="text-emerald-400" />
                </div>
                <p className="text-emerald-800/80 leading-relaxed font-medium">
                  N'oubliez pas de boire au moins 2 litres d'eau aujourd'hui. L'hydratation est clé pour votre récupération.
                </p>
             </div>
          </div>
        </div>
      </main>
      <FloatingNav />

      {/* Modal d'annulation */}
      {showEditModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowEditModal(false)}></div>
          <div className="bg-white w-full max-w-md rounded-[32px] p-10 shadow-2xl relative z-10 text-center">
             <AlertTriangle size={48} className="text-rose-500 mx-auto mb-6" />
             <h3 className="text-2xl font-bold mb-2">Annuler ce rendez-vous ?</h3>
             <p className="text-slate-500 mb-8">Cette action libérera votre créneau pour d'autres patients.</p>
             <div className="flex gap-4">
                <button onClick={() => setShowEditModal(false)} className="flex-1 bg-slate-100 font-bold py-4 rounded-2xl">Retour</button>
                <button onClick={handleAnnulerRdv} className="flex-1 bg-rose-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-rose-500/20">Confirmer</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;

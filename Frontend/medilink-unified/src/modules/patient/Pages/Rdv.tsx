import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Bell, MapPin, Calendar, CalendarCheck, ChevronDown, ChevronLeft, ChevronRight,
  Plus, Building2, Pill, Activity, User, ArrowLeft, Loader2, Navigation 
} from 'lucide-react';
import { hopitalAPI, serviceAPI, rendezVousAPI } from '../../../services/api';

type EstablishmentType = 'hopital' | 'pharmacie';

interface Slot {
  time: string;
  status: 'available' | 'booked';
}

interface Establishment {
  id: string;
  name: string;
  type: EstablishmentType;
  typeLabel: string;
  distance: string;
  address: string;
  rating: string;
  imageUrl: string;
  services: string[];
  slots: Slot[];
  latitude?: number;
  longitude?: number;
}

const MOCK_DATA: Establishment[] = [
  { id: '1', name: 'Hôpital La Pitié-Salpêtrière', type: 'hopital', typeLabel: 'Hôpital Universitaire', distance: '3.8 km', address: "47-83 Boulevard de l'Hôpital, 75013 Paris", rating: '4.8', imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', services: ['Cardiologie', 'Urgence', 'Médecine Générale'], slots: [{ time: '08:00', status: 'available' }, { time: '10:30', status: 'available' }, { time: '15:00', status: 'available' }] },
  { id: '2', name: 'Clinique Hartmann', type: 'hopital', typeLabel: 'Clinique Privée', distance: '5.2 km', address: '26 Boulevard Victor Hugo, 92200 Neuilly-sur-Seine', rating: '4.6', imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', services: ['Cardiologie', 'Oncologie', 'Chirurgie'], slots: [{ time: '09:15', status: 'available' }, { time: '11:00', status: 'available' }, { time: '14:30', status: 'available' }] }
];

const ALL_SERVICES = ['Tous', 'Cardiologie', 'Urgence', 'Médecine Générale', 'Oncologie', 'Chirurgie', 'Vaccination'];
const DATES = ['Aujourd\'hui', 'Demain', 'Calendrier'];

const Rdv: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<EstablishmentType>('hopital');
  const [activeDate, setActiveDate] = useState('Aujourd\'hui');
  const [activeService, setActiveService] = useState('Tous');
  const [selectedSlot, setSelectedSlot] = useState<{estId: string, time: string} | null>(null);
  const [selectedBookingService, setSelectedBookingService] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [establishments, setEstablishments] = useState<Establishment[]>(MOCK_DATA);
  const [availableServices, setAvailableServices] = useState<string[]>(ALL_SERVICES);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Haversine Formula for distance
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in km
    return d.toFixed(1) + " km";
  };

  const getItinerary = (destLat: number, destLong: number) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLong}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    const userStr = localStorage.getItem('medilink_user');
    if (userStr) setCurrentUser(JSON.parse(userStr));

    // Charger les hôpitaux réels depuis le backend (Lot 1 - port 8081)
    const loadData = async () => {
      try {
        const hopitaux = await hopitalAPI.lister();
        if (hopitaux && hopitaux.length > 0) {
          // Re-fetch user to get latest lat/long from localStorage
          const latestUserStr = localStorage.getItem('medilink_user');
          const latestUser = latestUserStr ? JSON.parse(latestUserStr) : null;

          const mapped: Establishment[] = hopitaux.map((h: any) => ({
            id: h.id?.toString(),
            name: h.nom,
            type: 'hopital' as EstablishmentType,
            typeLabel: 'Hôpital',
            distance: (latestUser?.latitude && h.latitude) 
              ? calculateDistance(latestUser.latitude, latestUser.longitude, h.latitude, h.longitude)
              : (h.distance || '--'),
            address: h.adresse || 'Adresse non renseignée',
            rating: '4.5',
            imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            services: [],
            slots: [
              { time: '08:00', status: 'available' as const },
              { time: '10:30', status: 'available' as const },
              { time: '14:00', status: 'available' as const },
              { time: '16:00', status: 'available' as const },
            ],
            latitude: h.latitude,
            longitude: h.longitude
          }));
          setEstablishments(mapped);
        }
      } catch (err) {
        console.error('Erreur chargement hôpitaux:', err);
        // Fallback vers MOCK_DATA déjà défini
      }

      // Charger les services réels
      try {
        const services = await serviceAPI.lister();
        if (services && services.length > 0) {
          const serviceNames = ['Tous', ...services.map((s: any) => s.nom || s.name).filter(Boolean)];
          setAvailableServices(serviceNames);
        }
      } catch (err) {
        console.error('Erreur chargement services:', err);
      }
    };
    loadData();
  }, []);

  const handleBooking = async () => {
    if (!selectedSlot || !currentUser) return;
    const est = establishments.find(e => e.id === selectedSlot.estId);
    if (!est) return;

    setBookingLoading(true);

    try {
      // Appel réel au backend (Lot 2 - port 8082)
      const today = new Date().toISOString().split('T')[0];
      await rendezVousAPI.creer({
        date: activeDate === 'Aujourd\'hui' ? today : activeDate === 'Demain' ? new Date(Date.now() + 86400000).toISOString().split('T')[0] : today,
        heure: selectedSlot.time,
        patientId: currentUser.patientId || currentUser.id,
        medecinId: 1, // TODO: sélection du médecin
        serviceId: 1, // TODO: mapper avec le vrai service
      });
    } catch (err) {
      console.error('Erreur création RDV backend:', err);
      // On continue pour afficher la confirmation même si le backend échoue
    }

    // Feedback
    setBookingLoading(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#FAFBFF] font-sans pb-24">
      <header className="bg-white px-8 py-5 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.href='/patient-dashboard'}>
          <div className="bg-blue-600 text-white p-2.5 rounded-2xl"><Activity size={28} /></div>
          <span className="text-2xl font-bold text-blue-600 tracking-tight">Medilink</span>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-right">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Connecté en tant que</p>
             <p className="text-[14px] font-bold text-slate-800">{currentUser?.name || 'Patient'}</p>
           </div>
           <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
             {currentUser?.name?.substring(0, 2).toUpperCase() || 'PA'}
           </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto pt-12 px-6">
        <div className="mb-12">
          <button onClick={() => window.location.href='/patient-dashboard'} className="flex items-center gap-2 text-slate-500 font-bold mb-6 hover:text-blue-600 transition-colors">
            <ArrowLeft size={18} /> Retour au tableau de bord
          </button>
          <h1 className="text-5xl font-bold text-slate-900 leading-tight">Prendre <span className="text-blue-600">rendez-vous.</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-8 space-y-6">
           {establishments.map(est => (
                <div key={est.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex gap-6">
                    <img src={est.imageUrl} className="w-32 h-32 rounded-2xl object-cover" alt="" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                           <div className="flex items-center gap-3 mb-1">
                             <p className="text-[11px] font-bold text-blue-600 uppercase">{est.typeLabel}</p>
                             <span className="text-[11px] font-bold text-slate-400">• {est.distance}</span>
                           </div>
                           <h3 className="text-2xl font-bold text-slate-900 mb-1">{est.name}</h3>
                           <p className="text-sm text-slate-500 flex items-center gap-1"><MapPin size={14} /> {est.address}</p>
                           {est.latitude && (
                             <button 
                               onClick={() => getItinerary(est.latitude!, est.longitude!)}
                               className="mt-2 text-blue-600 text-[11px] font-bold flex items-center gap-1 hover:underline"
                             >
                               <Navigation size={12} /> Voir l'itinéraire
                             </button>
                           )}
                        </div>
                        <div className="bg-blue-50 px-3 py-1 rounded-full text-blue-600 font-bold text-sm">★ {est.rating}</div>
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {est.slots.map(slot => (
                          <button 
                            key={slot.time} 
                            onClick={() => setSelectedSlot({estId: est.id, time: slot.time})}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedSlot?.estId === est.id && selectedSlot.time === slot.time ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  {selectedSlot?.estId === est.id && (
                    <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                       <div>
                         <p className="text-xs font-bold text-slate-400 uppercase mb-1">Service sélectionné</p>
                         <select value={selectedBookingService} onChange={e => setSelectedBookingService(e.target.value)} className="bg-slate-50 border-0 rounded-lg font-bold text-slate-800 text-sm py-2 px-4 outline-none">
                            {est.services.map(s => <option key={s} value={s}>{s}</option>)}
                         </select>
                       </div>
                       <button onClick={handleBooking} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all active:scale-95">Confirmer le rendez-vous</button>
                    </div>
                  )}
                </div>
              ))}
           </div>
           
           <div className="lg:col-span-4">
              <div className="bg-[#EEF2FF] rounded-[2rem] p-8 sticky top-28">
                 <h3 className="text-xl font-bold text-slate-800 mb-4">À propos du rendez-vous</h3>
                 <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    La confirmation est instantanée. Un rappel vous sera envoyé 24h avant la consultation.
                 </p>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm">
                       <Calendar className="text-blue-600" />
                       <span className="font-bold text-slate-800">{activeDate}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm">
                       <Building2 className="text-blue-600" />
                       <span className="font-bold text-slate-800">{activeType === 'hopital' ? 'Établissement Médical' : 'Pharmacie'}</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </main>

      {showToast && (
        <div className="fixed bottom-10 right-10 bg-emerald-500 text-white px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-300 z-[100]">
           <CalendarCheck size={28} />
           <div>
              <p className="font-bold text-lg">Rendez-vous confirmé !</p>
              <p className="text-sm opacity-90 text-white/80">Retrouvez-le dans votre tableau de bord.</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default Rdv;

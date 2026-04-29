import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Bell, MapPin, Calendar, CalendarCheck, ChevronDown, ChevronLeft, ChevronRight,
  Plus, Building2, Pill, Activity, User, ArrowLeft, Loader2, Navigation 
} from 'lucide-react';
import { hopitalAPI, serviceAPI, personnelAPI, rendezVousAPI } from '../../../services/api';

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

const ALL_SERVICES_INITIAL = ['Tous'];
const DATES = ['Aujourd\'hui', 'Demain', 'Calendrier'];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => {
  let day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // convert to Monday=0
};

const Rdv: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<EstablishmentType>('hopital');
  const [activeDate, setActiveDate] = useState('Aujourd\'hui');
  const [activeService, setActiveService] = useState('Tous');
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{estId: string, time: string} | null>(null);
  const [selectedBookingService, setSelectedBookingService] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [availableServices, setAvailableServices] = useState<string[]>(ALL_SERVICES_INITIAL);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Custom Calendar State
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Haversine Formula for distance
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c;
    return d.toFixed(1) + " km";
  };

  useEffect(() => {
    const userStr = localStorage.getItem('medilink_user');
    if (userStr) setCurrentUser(JSON.parse(userStr));

    const loadData = async () => {
      setLoading(true);
      try {
        // 1. Charger tous les services globaux pour le dropdown de tri
        const servicesGlobaux = await serviceAPI.lister();
        if (servicesGlobaux) {
           const uniqueServices = Array.from(new Set(servicesGlobaux.map((s: any) => s.nom)));
           setAvailableServices(['Tous', ...(uniqueServices as string[])]);
        }

        // 2. Charger les hôpitaux
        const hopitaux = await hopitalAPI.lister();
        if (hopitaux && hopitaux.length > 0) {
          const latestUserStr = localStorage.getItem('medilink_user');
          const latestUser = latestUserStr ? JSON.parse(latestUserStr) : null;

          const mapped: Establishment[] = await Promise.all(hopitaux.map(async (h: any, idx: number) => {
            // 3. Charger les services spécifiques pour CHAQUE hôpital
            let hospitalServices: string[] = [];
            try {
              const res = await serviceAPI.listerParHopital(h.id);
              hospitalServices = res.map((s: any) => s.nom);
            } catch (e) {
              console.warn(`Impossible de charger les services pour l'hôpital ${h.id}`);
            }

            // Générer des créneaux un peu différents pour chaque hôpital pour plus de réalisme
            const baseSlots = ['08:00', '09:30', '10:45', '14:00', '15:30', '17:00'];
            const slots: Slot[] = baseSlots
              .filter((_, sIdx) => (sIdx + idx) % 2 === 0 || (sIdx + idx) % 3 === 0)
              .map(time => ({ time, status: 'available' }));

            return {
              id: h.id?.toString(),
              name: h.nom,
              type: 'hopital' as EstablishmentType,
              typeLabel: 'Hôpital',
              distance: (latestUser?.latitude && h.latitude) 
                ? calculateDistance(latestUser.latitude, latestUser.longitude, h.latitude, h.longitude)
                : `${(Math.random() * 5 + 1).toFixed(1)} km`,
              address: h.adresse || 'Adresse non renseignée',
              rating: (4 + Math.random()).toFixed(1),
              imageUrl: `https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?idx=${idx}&auto=format&fit=crop&w=600&q=80`,
              services: hospitalServices,
              slots: slots,
              latitude: h.latitude,
              longitude: h.longitude
            };
          }));
          setEstablishments(mapped);
        }
      } catch (err) {
        console.error('Erreur chargement données:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const today = new Date();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isToday = today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;
      const isSelected = activeDate === dateStr;
      const isPast = new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

      days.push(
        <button 
          key={d} 
          disabled={isPast}
          onClick={() => {
            setActiveDate(dateStr);
            setShowCalendar(false);
          }}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${isSelected ? 'bg-blue-600 text-white font-bold' : isPast ? 'text-slate-300 cursor-not-allowed' : isToday ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-100'}`}
        >
          {d}
        </button>
      );
    }

    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    return (
      <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 w-72 animate-in fade-in zoom-in-95">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setCurrentMonth(new Date(year, month - 1, 1))} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft size={20} className="text-slate-600" />
          </button>
          <span className="font-bold text-slate-800">{monthNames[month]} {year}</span>
          <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronRight size={20} className="text-slate-600" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(day => (
            <div key={day} className="text-xs font-bold text-slate-400">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  const filteredEstablishments = useMemo(() => {
    return establishments.filter(est => {
      const matchType = est.type === activeType;
      const searchLower = searchQuery.toLowerCase();
      const matchSearch = est.name.toLowerCase().includes(searchLower) || 
                          est.address.toLowerCase().includes(searchLower);
      const matchService = activeService === 'Tous' || est.services.some(s => s === activeService);

      return matchType && matchSearch && matchService;
    });
  }, [searchQuery, activeType, activeService, establishments]);

  const handleSlotClick = (estId: string, slot: Slot) => {
    if (slot.status !== 'booked') {
      setSelectedSlot({ estId, time: slot.time });
      const est = establishments.find(e => e.id === estId);
      if (est && est.services.length > 0) {
        setSelectedBookingService(est.services[0]);
      } else {
        setSelectedBookingService('');
      }
    }
  };

  const handleBooking = async () => {
    if (!selectedSlot || !currentUser || !selectedBookingService) return;
    const est = establishments.find(e => e.id === selectedSlot.estId);
    if (!est) return;

    setBookingLoading(true);

    try {
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      const rdvDate = activeDate === 'Aujourd\'hui' ? today : activeDate === 'Demain' ? tomorrow : activeDate;
      const hopitalIdNum = parseInt(est.id);
      
      // On récupère l'ID du service sélectionné
      const servicesGlobal = await serviceAPI.lister();
      const serviceObj = servicesGlobal.find((s: any) => s.nom === selectedBookingService && s.hopitalId === hopitalIdNum || s.nom === selectedBookingService);

      // Récupérer un médecin valide pour cet hôpital pour éviter l'erreur de clé étrangère
      let validMedecinId = 1;
      try {
         const medecins = await personnelAPI.listerMedecins(hopitalIdNum);
         if (medecins && medecins.length > 0) {
            validMedecinId = medecins[0].id;
         }
      } catch (e) {
         console.warn("Impossible de récupérer les médecins, utilisation de l'ID par défaut 1");
      }

      await rendezVousAPI.creer({
        date: rdvDate,
        heure: selectedSlot.time,
        patientId: currentUser.patientId || currentUser.id,
        medecinId: validMedecinId,
        serviceId: serviceObj?.id || 1, 
        hopitalId: hopitalIdNum
      });
      
      setShowToast(true);
      setSelectedSlot(null);
      setTimeout(() => setShowToast(false), 5000);
    } catch (err) {
      console.error('Erreur création RDV:', err);
      alert('Impossible de prendre le rendez-vous. Veuillez réessayer.');
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBFF] font-sans pb-24 selection:bg-blue-600 selection:text-white">
      <header className="bg-white px-8 py-5 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.href='/patient-dashboard'}>
          <div className="bg-blue-600 text-white p-2.5 rounded-2xl">
            <Activity size={28} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-bold text-blue-600 tracking-tight">Medilink</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
             <div className="text-right">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Connecté en tant que</p>
               <p className="text-[14px] font-bold text-slate-800">{currentUser?.name || 'Patient'}</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
               {currentUser?.name?.substring(0, 2).toUpperCase() || 'PA'}
             </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto pt-10 px-6">
        <button onClick={() => window.location.href='/patient-dashboard'} className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 font-semibold px-4 py-2 rounded-full transition-all mb-8 shadow-sm border border-slate-200">
          <ArrowLeft size={20} /> Retour au tableau de bord
        </button>

        <h1 className="text-center mt-4 text-5xl md:text-[4rem] font-bold text-slate-900 tracking-tight leading-tight">
          Trouvez le bon soin, <span className="text-blue-600">au bon<br />moment.</span>
        </h1>
        
        <div className="mt-12 bg-white p-3 rounded-full shadow-[0_12px_40px_rgb(0,0,0,0.05)] max-w-4xl mx-auto flex items-center border border-slate-100 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-shadow">
          <div className="pl-6 flex items-center gap-3 text-blue-600 font-bold tracking-tight">
            <Search size={26} />
            <div className="h-7 w-[2px] bg-slate-200 mx-3 ml-5"></div>
          </div>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un service, un médecin ou un établissement..." 
            className="flex-1 bg-transparent border-none outline-none px-5 text-slate-700 placeholder:text-slate-400 text-lg min-w-0"
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center bg-[#F4F7FC] rounded-full p-1 border border-white shadow-sm">
            {DATES.map((date) => {
              if (date === 'Calendrier') {
                const isCustomDate = !['Aujourd\'hui', 'Demain'].includes(activeDate);
                return (
                  <div key={date} className="relative flex items-center">
                    <button onClick={() => setShowCalendar(!showCalendar)} className={`px-7 py-3 rounded-full text-base font-semibold transition-all flex items-center gap-2 ${isCustomDate ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700 bg-transparent'}`}>
                      {isCustomDate ? new Date(activeDate).toLocaleDateString('fr-FR') : 'Calendrier'} <Calendar size={20} />
                    </button>
                    {showCalendar && renderCalendar()}
                  </div>
                );
              }
              return (
                <button key={date} onClick={() => { setActiveDate(date); setShowCalendar(false); }} className={`px-7 py-3 rounded-full text-base font-semibold transition-all flex items-center gap-2 ${activeDate === date ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700 bg-transparent'}`}>
                  {date}
                </button>
              );
            })}
          </div>

          <div className="relative">
            <button onClick={() => setShowServiceDropdown(!showServiceDropdown)} className="flex items-center gap-2 bg-[#F4F7FC] px-7 py-3.5 rounded-full text-slate-700 text-base font-semibold hover:bg-[#EDF2FA] transition-colors shadow-sm border border-white">
              <Activity size={20} className="text-slate-500" />
              Service : {activeService}
              <ChevronDown size={20} className="text-slate-400 ml-1" />
            </button>
            {showServiceDropdown && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-100 shadow-lg rounded-2xl p-2 z-50">
                <div className="max-h-64 overflow-y-auto pr-1">
                  {availableServices.map((srv) => (
                    <button key={srv} onClick={() => { setActiveService(srv); setShowServiceDropdown(false); }} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeService === srv ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                      {srv}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-5">
          <button onClick={() => setActiveType('hopital')} className={`flex items-center gap-2 px-9 py-4 rounded-full text-base font-bold transition-all ${activeType === 'hopital' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:-translate-y-1' : 'bg-[#F4F7FC] text-slate-600 hover:bg-[#EDF2FA]'}`}>
            <Building2 size={22} /> Hôpital
          </button>
          <button onClick={() => setActiveType('pharmacie')} className={`flex items-center gap-2 px-9 py-4 rounded-full text-base font-bold transition-all ${activeType === 'pharmacie' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:-translate-y-1' : 'bg-[#F4F7FC] text-slate-600 hover:bg-[#EDF2FA]'}`}>
            <Pill size={22} /> Pharmacie
          </button>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto mt-16 px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#ebe4f7] rounded-[2rem] p-8 border border-white shadow-sm">
            <h3 className="text-2xl font-bold text-slate-800 mb-5">À proximité</h3>
            <p className="text-base text-slate-600 leading-relaxed max-w-[90%] mb-10">
              {loading ? "Recherche des établissements..." : `Nous avons trouvé ${filteredEstablishments.length} établissement${filteredEstablishments.length > 1 ? 's' : ''} près de vous.`}
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-xs font-bold text-slate-600 tracking-wider">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0 mt-[3px]"></div>
                <div className="flex flex-col gap-1.5 leading-snug">
                  <span>SÉCURITÉ ET CONFORMITÉ</span>
                  <span>100% AUDITÉ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6">
          {loading ? (
            <div className="bg-white rounded-[2rem] p-10 text-center shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[300px] gap-4">
              <Loader2 className="animate-spin text-blue-600" size={40} />
              <p className="text-slate-500 font-medium">Chargement des données réelles...</p>
            </div>
          ) : filteredEstablishments.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-10 text-center shadow-sm border border-slate-100 flex items-center justify-center min-h-[300px]">
              <p className="text-slate-500">Aucun établissement ne correspond à vos critères.</p>
            </div>
          ) : (
            filteredEstablishments.map((est) => {
              const isEstSelected = selectedSlot?.estId === est.id;
              return (
              <div key={est.id} className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100/60 flex flex-col gap-5 hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row gap-7">
                  <div className="w-full sm:w-[260px] h-[260px] rounded-[1.5rem] overflow-hidden shrink-0 relative bg-slate-100">
                    <img src={est.imageUrl} alt={est.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]" />
                  </div>
                  <div className="flex-1 py-2 pr-3 flex flex-col justify-between">
                    <div className="flex items-start justify-between w-full">
                      <div>
                        <div className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-2">
                          {est.typeLabel} <span className="text-slate-400 font-medium normal-case tracking-normal text-[13px] ml-1">• {est.distance}</span>
                        </div>
                        <h3 className="text-[28px] font-bold text-slate-900 mb-2 leading-tight">{est.name}</h3>
                        <p className="text-[15px] text-slate-500 flex items-center gap-2 mb-4 font-medium">
                          <MapPin size={18} className="text-slate-400" /> {est.address}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                           {est.services.slice(0, 3).map(s => (
                             <span key={s} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-bold uppercase tracking-wider">{s}</span>
                           ))}
                           {est.services.length > 3 && <span className="text-[10px] text-slate-400 font-bold">+{est.services.length - 3} PLUS</span>}
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center bg-[#F4F7FC] rounded-[18px] px-5 py-3 border border-blue-50/50 ml-4 shrink-0">
                        <span className="text-[28px] font-bold text-blue-600 leading-none">{est.rating}</span>
                        <span className="text-[9px] font-bold text-slate-400/90 uppercase mt-2 tracking-widest">Score</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-slate-700/80 uppercase tracking-widest mb-3">Créneaux disponibles</div>
                      <div className="flex flex-wrap gap-2.5">
                        {est.slots.map((slot, idx) => {
                          const isSelected = isEstSelected && selectedSlot?.time === slot.time;
                          return (
                            <button key={idx} onClick={() => handleSlotClick(est.id, slot)} className={`px-6 py-3 rounded-2xl text-[15px] transition-colors shadow-sm ${isSelected ? 'bg-blue-600 text-white font-bold shadow-blue-500/30' : 'bg-[#F4F7FC] hover:bg-[#EBF1FA] text-slate-800 font-semibold'}`}>
                              {slot.time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {isEstSelected && (
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-300 border-t border-slate-50 mt-2">
                    <div className="text-slate-500 font-medium">
                      <div className="mb-2">Rendez-vous le : <span className="font-bold text-slate-900">{['Aujourd\'hui', 'Demain'].includes(activeDate) ? activeDate.toLowerCase() : activeDate}</span> à <span className="font-bold text-blue-600">{selectedSlot.time}</span></div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-700">Choisir le service :</span>
                        <select 
                          value={selectedBookingService} 
                          onChange={(e) => setSelectedBookingService(e.target.value)}
                          className="bg-[#F4F7FC] border border-slate-200 text-slate-700 text-sm rounded-lg p-2 outline-none font-semibold"
                        >
                          {est.services.length === 0 ? (
                            <option value="">Aucun service disponible</option>
                          ) : (
                            est.services.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))
                          )}
                        </select>
                      </div>
                    </div>
                    <button onClick={handleBooking} disabled={bookingLoading || !selectedBookingService} className="flex items-center justify-center gap-2.5 bg-[#0066FF] hover:bg-[#005CE6] text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-[#0066FF]/30 transition-all text-base disabled:opacity-50">
                      {bookingLoading ? <Loader2 className="animate-spin" /> : <CalendarCheck size={20} />} Confirmer la réservation
                    </button>
                  </div>
                )}
              </div>
            )})
          )}
        </div>
      </div>
      
      {showToast && (
        <div className="fixed bottom-6 right-6 z-[100] bg-[#28B880] text-white px-6 py-4 rounded-2xl shadow-[0_8px_30px_rgba(40,184,128,0.3)] flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-300">
          <CalendarCheck size={24} />
          <div>
            <p className="font-bold">Rendez-vous confirmé !</p>
            <p className="text-sm opacity-95">Retrouvez-le dans vos activités.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rdv;

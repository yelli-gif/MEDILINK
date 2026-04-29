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
  { id: '1', name: 'Hôpital La Pitié-Salpêtrière', type: 'hopital', typeLabel: 'Hôpital Universitaire', distance: '3.8 km', address: "47-83 Boulevard de l'Hôpital, 75013 Paris", rating: '4.8', imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', services: ['Cardiologie', 'Urgence', 'Médecine Générale'], slots: [{ time: '08:00', status: 'available' }, { time: '10:30', status: 'available' }, { time: '15:00', status: 'available' }, { time: '16:45', status: 'available' }, { time: 'Complet', status: 'booked' }] },
  { id: '2', name: 'Clinique Hartmann', type: 'hopital', typeLabel: 'Clinique Privée', distance: '5.2 km', address: '26 Boulevard Victor Hugo, 92200 Neuilly-sur-Seine', rating: '4.6', imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', services: ['Cardiologie', 'Oncologie', 'Chirurgie'], slots: [{ time: '09:15', status: 'available' }, { time: '11:00', status: 'available' }, { time: '14:30', status: 'available' }, { time: '15:45', status: 'available' }, { time: '17:30', status: 'available' }] }
];

const ALL_SERVICES = ['Tous', 'Cardiologie', 'Urgence', 'Médecine Générale', 'Oncologie', 'Chirurgie', 'Vaccination'];
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
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{estId: string, time: string} | null>(null);
  const [selectedBookingService, setSelectedBookingService] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [establishments, setEstablishments] = useState<Establishment[]>(MOCK_DATA);
  const [availableServices, setAvailableServices] = useState<string[]>(ALL_SERVICES);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Custom Calendar State
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

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

    const loadData = async () => {
      try {
        const hopitaux = await hopitalAPI.lister();
        if (hopitaux && hopitaux.length > 0) {
          const latestUserStr = localStorage.getItem('medilink_user');
          const latestUser = latestUserStr ? JSON.parse(latestUserStr) : null;

          const mapped: Establishment[] = hopitaux.map((h: any) => ({
            id: h.id?.toString(),
            name: h.nom,
            type: 'hopital' as EstablishmentType,
            typeLabel: 'Hôpital',
            distance: (latestUser?.latitude && h.latitude) 
              ? calculateDistance(latestUser.latitude, latestUser.longitude, h.latitude, h.longitude)
              : (h.distance || '3.5 km'),
            address: h.adresse || 'Adresse non renseignée',
            rating: '4.5',
            imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            services: ['Cardiologie', 'Urgence', 'Médecine Générale'],
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
      }

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
            setCurrentMonth(new Date());
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
                          est.address.toLowerCase().includes(searchLower) ||
                          est.services.some(s => s.toLowerCase().includes(searchLower));
      const matchService = activeService === 'Tous' || est.services.includes(activeService);

      return matchType && matchSearch && matchService;
    });
  }, [searchQuery, activeType, activeService, establishments]);

  const handleSlotClick = (estId: string, slot: Slot) => {
    if (slot.status !== 'booked') {
      setSelectedSlot({ estId, time: slot.time });
      if (activeService !== 'Tous') {
        setSelectedBookingService(activeService);
      } else {
        setSelectedBookingService('Généraliste');
      }
    }
  };

  const handleBooking = async () => {
    if (!selectedSlot || !currentUser) return;
    const est = establishments.find(e => e.id === selectedSlot.estId);
    if (!est) return;

    setBookingLoading(true);

    try {
      const today = new Date().toISOString().split('T')[0];
      await rendezVousAPI.creer({
        date: activeDate === 'Aujourd\'hui' ? today : activeDate === 'Demain' ? new Date(Date.now() + 86400000).toISOString().split('T')[0] : activeDate,
        heure: selectedSlot.time,
        patientId: currentUser.patientId || currentUser.id,
        medecinId: 1, 
        serviceId: 1, 
      });
    } catch (err) {
      console.error('Erreur création RDV backend:', err);
    }

    setBookingLoading(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
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
          <div className="relative">
            <button onClick={() => setShowNotifDropdown(!showNotifDropdown)} className="text-slate-500 hover:text-slate-800 transition-colors p-2">
              <Bell size={24} />
            </button>
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
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold text-base transition duration-200 shadow-md shadow-blue-500/20 whitespace-nowrap">
            Explorer
          </button>
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
              Nous avons trouvé {filteredEstablishments.length} établissement{filteredEstablishments.length > 1 ? 's' : ''} près de vous.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-xs font-bold text-slate-600 tracking-wider">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0 mt-[3px]"></div>
                <div className="flex flex-col gap-1.5 leading-snug">
                  <span>TEMPS D'ATTENTE MOYEN :</span>
                  <span>12 MIN</span>
                </div>
              </div>
              <div className="flex items-start gap-4 text-xs font-bold text-slate-500 tracking-wider">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-400 shrink-0 mt-[1px]"></div>
                <span>URGENCE DISPONIBLE</span>
              </div>
            </div>
          </div>

          <div className="bg-[#DBEAE0] rounded-[2rem] p-8 relative overflow-hidden shadow-sm border border-white">
            <div className="absolute right-0 bottom-0 opacity-20 translate-x-3 translate-y-3">
              <Plus size={150} className="text-[#3b8a66]" strokeWidth={4} />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="text-[11px] font-bold text-[#4B7963] uppercase tracking-widest mb-3 opacity-80">Premium Care</div>
                <h3 className="text-[28px] font-bold text-[#204E38] mb-4">Téléconsultation</h3>
                <p className="text-base text-[#204E38]/85 leading-relaxed mb-6 max-w-[85%] font-medium">
                  Parlez à un médecin en moins de 15 minutes sans vous déplacer.
                </p>
              </div>
              <button className="text-sm font-bold text-[#204E38] border-b-[1.5px] border-[#204E38] pb-0.5 inline-flex items-center transition-opacity hover:opacity-75 self-start">
                Démarrer maintenant
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-6">
          {filteredEstablishments.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-10 text-center shadow-sm border border-slate-100 flex items-center justify-center min-h-[300px]">
              <p className="text-slate-500">Aucun établissement trouvé.</p>
            </div>
          ) : (
            filteredEstablishments.map((est) => {
              const isEstSelected = selectedSlot?.estId === est.id;
              return (
              <div key={est.id} className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100/60 flex flex-col gap-5 hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row gap-7">
                  <div className="w-full sm:w-[260px] h-[260px] rounded-[1.5rem] overflow-hidden shrink-0 relative bg-slate-100">
                    <img src={est.imageUrl} alt={est.name} className="w-full h-full object-cover grayscale opacity-90 mix-blend-multiply transition-transform duration-500 hover:scale-[1.03]" />
                  </div>
                  <div className="flex-1 py-2 pr-3 flex flex-col justify-between">
                    <div className="flex items-start justify-between w-full">
                      <div>
                        <div className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-2">
                          {est.typeLabel} <span className="text-slate-400 font-medium normal-case tracking-normal text-[13px] ml-1">• {est.distance}</span>
                        </div>
                        <h3 className="text-[28px] font-bold text-slate-900 mb-2 leading-tight">{est.name}</h3>
                        <p className="text-[15px] text-slate-500 flex items-center gap-2 mb-6 font-medium">
                          <MapPin size={18} className="text-slate-400" /> {est.address}
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center bg-[#F4F7FC] rounded-[18px] px-5 py-3 border border-blue-50/50 ml-4 shrink-0">
                        <span className="text-[28px] font-bold text-blue-600 leading-none">{est.rating}</span>
                        <span className="text-[9px] font-bold text-slate-400/90 uppercase mt-2 tracking-widest">Rating</span>
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
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-300">
                    <div className="text-slate-500 font-medium">
                      <div className="mb-2">Sélectionnez pour le : <span className="font-bold text-slate-900">{['Aujourd\'hui', 'Demain'].includes(activeDate) ? activeDate.toLowerCase() : activeDate}</span> à <span className="font-bold text-blue-600">{selectedSlot.time}</span></div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-700">Service :</span>
                        <select 
                          value={selectedBookingService} 
                          onChange={(e) => setSelectedBookingService(e.target.value)}
                          className="bg-[#F4F7FC] border border-slate-200 text-slate-700 text-sm rounded-lg p-2 outline-none font-semibold"
                        >
                          <option value="">Sélectionnez un service</option>
                          {availableServices.filter(s => s !== 'Tous').map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button onClick={handleBooking} disabled={bookingLoading} className="flex items-center justify-center gap-2.5 bg-[#0066FF] hover:bg-[#005CE6] text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-[#0066FF]/30 transition-all text-base disabled:opacity-50">
                      {bookingLoading ? <Loader2 className="animate-spin" /> : <CalendarCheck size={20} />} Confirmer
                    </button>
                  </div>
                )}
              </div>
            )})
          )}

          <div className="relative h-[360px] rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 group mt-2">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Carte" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-[1.05]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent flex flex-col justify-end p-10">
              <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Explorer la carte</h3>
              <p className="text-white/95 text-lg max-w-xl mb-8 leading-relaxed font-medium">Visualisez tous les spécialistes et établissements autour de vous en temps réel.</p>
              <button className="bg-white text-blue-600 px-8 py-3.5 rounded-full text-[17px] font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-block self-start">Ouvrir le mode carte</button>
            </div>
          </div>
        </div>
      </div>
      
      {showToast && (
        <div className="fixed bottom-6 right-6 z-[100] bg-[#28B880] text-white px-6 py-4 rounded-2xl shadow-[0_8px_30px_rgba(40,184,128,0.3)] flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-300">
          <CalendarCheck size={24} />
          <div>
            <p className="font-bold">Rendez-vous pris en compte !</p>
            <p className="text-sm opacity-95">Retrouvez-le dans votre tableau de bord.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rdv;

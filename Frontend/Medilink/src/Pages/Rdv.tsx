import React, { useState, useMemo } from 'react';
import { 
  Search, Bell, MapPin, Calendar, CalendarCheck, ChevronDown, ChevronLeft, ChevronRight,
  Plus, Building2, Pill, Activity, User, ArrowLeft 
} from 'lucide-react';

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
}

const MOCK_DATA: Establishment[] = [
  {
    id: '1',
    name: 'Hôpital La Pitié-Salpêtrière',
    type: 'hopital',
    typeLabel: 'Hôpital Universitaire',
    distance: '3.8 km',
    address: "47-83 Boulevard de l'Hôpital, 75013 Paris",
    rating: '4.8',
    imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    services: ['Cardiologie', 'Urgence', 'Médecine Générale'],
    slots: [
      { time: '08:00', status: 'available' },
      { time: '10:30', status: 'available' },
      { time: '15:00', status: 'available' },
      { time: '16:45', status: 'available' },
      { time: 'Complet', status: 'booked' },
    ]
  },
  {
    id: '2',
    name: 'Clinique Hartmann',
    type: 'hopital',
    typeLabel: 'Clinique Privée',
    distance: '5.2 km',
    address: '26 Boulevard Victor Hugo, 92200 Neuilly-sur-Seine',
    rating: '4.6',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    services: ['Cardiologie', 'Oncologie', 'Chirurgie'],
    slots: [
      { time: '09:15', status: 'available' },
      { time: '11:00', status: 'available' },
      { time: '14:30', status: 'available' },
      { time: '15:45', status: 'available' },
      { time: '17:30', status: 'available' },
    ]
  },
  {
    id: '3',
    name: 'Pharmacie des Champs-Élysées',
    type: 'pharmacie',
    typeLabel: 'Pharmacie 24/7',
    distance: '1.2 km',
    address: '84 Avenue des Champs-Élysées, 75008 Paris',
    rating: '4.9',
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    services: ['Test Covid', 'Vaccination', 'Parapharmacie'],
    slots: [
      { time: '08:00', status: 'available' },
      { time: '09:00', status: 'available' },
      { time: '10:00', status: 'available' },
      { time: '18:00', status: 'available' },
    ]
  },
  {
    id: '4',
    name: 'Pharmacie Principale',
    type: 'pharmacie',
    typeLabel: 'Pharmacie de garde',
    distance: '2.5 km',
    address: '12 Rue de Rivoli, 75004 Paris',
    rating: '4.5',
    imageUrl: 'https://images.unsplash.com/photo-1576602975954-7fd16c391781?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    services: ['Vaccination', 'Orthopédie', 'Médecine Générale'],
    slots: [
      { time: '12:00', status: 'available' },
      { time: '14:00', status: 'available' },
      { time: 'Complet', status: 'booked' },
    ]
  }
];

const ALL_SERVICES = ['Tous', 'Cardiologie', 'Urgence', 'Médecine Générale', 'Oncologie', 'Chirurgie', 'Test Covid', 'Vaccination', 'Parapharmacie', 'Orthopédie'];
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

  // Custom Calendar State
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
    return MOCK_DATA.filter(est => {
      const matchType = est.type === activeType;
      const searchLower = searchQuery.toLowerCase();
      const matchSearch = est.name.toLowerCase().includes(searchLower) || 
                          est.address.toLowerCase().includes(searchLower) ||
                          est.services.some(s => s.toLowerCase().includes(searchLower));
      const matchService = activeService === 'Tous' || est.services.includes(activeService);

      return matchType && matchSearch && matchService;
    });
  }, [searchQuery, activeType, activeService]);

  const handleSlotClick = (estId: string, slot: Slot) => {
    if (slot.status !== 'booked') {
      setSelectedSlot({ estId, time: slot.time });
      if (activeService !== 'Tous') {
        setSelectedBookingService(activeService);
      } else {
        setSelectedBookingService(ALL_SERVICES.find(s => s !== 'Tous') || 'Généraliste');
      }
    }
  };

  const handleBooking = () => {
    if (!selectedSlot) return;
    const est = MOCK_DATA.find(e => e.id === selectedSlot.estId);
    if (!est) return;

    // 1. Save appointment to localStorage
    let assignedDoctor = est.name;
    if (est.type === 'hopital') {
      if (est.id === '1') {
        assignedDoctor = 'Dr. Laurent Bernard';
      } else if (est.id === '2') {
        assignedDoctor = 'Dr. Sophie Roux';
      } else {
        assignedDoctor = 'Dr. Marc Lefebvre';
      }
    }

    const newAppointment = {
      id: Date.now().toString(),
      doctor: assignedDoctor,
      speciality: selectedBookingService || est.services[0] || 'Généraliste',
      date: activeDate,
      time: selectedSlot.time,
      location: est.name + ', ' + est.address
    };
    localStorage.setItem('medilink_next_appointment', JSON.stringify(newAppointment));
    localStorage.removeItem('medilink_cleared_appointment');

    // Update medilink_user isNew
    const userString = localStorage.getItem('medilink_user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        user.isNew = false;
        localStorage.setItem('medilink_user', JSON.stringify(user));
      } catch (e) {}
    }

    // 2. Schedule pending notification
    const pendingNotifs = JSON.parse(localStorage.getItem('medilink_pending_notifications') || '[]');
    pendingNotifs.push({
      triggerAt: Date.now() + 30000,
      notification: {
        id: Date.now().toString(),
        title: 'RENDEZ-VOUS CONFIRMÉ',
        doctor: assignedDoctor,
        speciality: selectedBookingService || est.services[0] || 'Généraliste',
        date: activeDate === 'Aujourd\'hui' ? new Date().toLocaleDateString('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'}) : activeDate,
        time: selectedSlot.time,
        location: est.name,
        timeAgo: 'À l\'instant'
      }
    });
    localStorage.setItem('medilink_pending_notifications', JSON.stringify(pendingNotifs));

    // 3. Show Toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#FAFBFF] font-sans pb-24 selection:bg-blue-600 selection:text-white">
      {/* Navbar / Header */}
      <header className="bg-white px-8 py-5 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.hash = ''}>
          <div className="bg-blue-600 text-white p-2.5 rounded-2xl">
            <Activity size={28} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-bold text-blue-600 tracking-tight">Medilink</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <button 
              type="button"
              onClick={() => {
                setShowNotifDropdown(!showNotifDropdown);
                setShowProfileDropdown(false);
              }}
              className="text-slate-500 hover:text-slate-800 transition-colors p-2 relative z-10"
            >
              <Bell size={24} />
            </button>
            {showNotifDropdown && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 animate-in fade-in transition-all">
                <a 
                  href="#notifications" 
                  onClick={() => setShowNotifDropdown(false)}
                  className="block text-center bg-[#F4F7FF] hover:bg-[#EBF1FF] text-[#0055FF] font-bold py-3 rounded-xl transition-colors text-sm"
                >
                  Voir mes notifs
                </a>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div 
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowNotifDropdown(false);
                }}
                className="w-9 h-9 rounded-full bg-[#FFDED1] flex flex-col items-center justify-center text-[#E05F2D] cursor-pointer overflow-hidden border border-[#FFDED1] hover:shadow-md transition-shadow relative z-10"
              >
                <User size={20} fill="#FFDED1" className="mt-1" />
              </div>
              {showProfileDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden z-[100] animate-in fade-in zoom-in-95 transition-all outline outline-1 outline-[#F0F2F5]">
                  <div className="flex flex-col">
                    <button 
                      onClick={() => { setShowProfileDropdown(false); window.location.hash = 'profile'; }}
                      className="text-left px-4 py-3 hover:bg-[#F8FAFC] text-[#14152A] font-medium text-sm transition-colors border-b border-[#F0F2F5] flex items-center gap-2"
                    >
                      <User size={16} />
                      Mon Profil
                    </button>
                    <button 
                      onClick={() => { 
                        setShowProfileDropdown(false); 
                        localStorage.removeItem('medilink_user'); 
                        window.location.hash = ''; 
                      }}
                      className="text-left px-4 py-3 hover:bg-[#FFF5F5] text-[#E64C3C] font-medium text-sm transition-colors flex items-center gap-2"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto pt-10 px-6">
        <button 
          onClick={() => window.location.hash = 'patient-dashboard'} 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 font-semibold px-4 py-2 rounded-full transition-all mb-8 shadow-sm border border-slate-200"
        >
          <ArrowLeft size={20} /> Retour au tableau de bord
        </button>

        <h1 className="text-center mt-4 text-5xl md:text-[4rem] font-bold text-slate-900 tracking-tight leading-tight">
          Trouvez le bon soin, <span className="text-blue-600">au bon<br />moment.</span>
        </h1>
        
        {/* Barre de recherche */}
        <div className="mt-12 bg-white p-3 rounded-full shadow-[0_12px_40px_rgb(0,0,0,0.05)] max-w-4xl mx-auto flex items-center border border-slate-100 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-shadow">
          <div className="pl-6 flex items-center gap-3 text-blue-600 font-bold tracking-tight">
            <Search size={26} />
            <span className="text-xl -mt-1 ml-1" style={{ letterSpacing: '-0.1em' }}></span>
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

        {/* Filtres de date / catégorie */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center bg-[#F4F7FC] rounded-full p-1 border border-white shadow-sm">
            {DATES.map((date) => {
              if (date === 'Calendrier') {
                const isCustomDate = !['Aujourd\'hui', 'Demain'].includes(activeDate);
                return (
                  <div key={date} className="relative flex items-center">
                    <button 
                      onClick={() => setShowCalendar(!showCalendar)}
                      className={`px-7 py-3 rounded-full text-base font-semibold transition-all flex items-center gap-2 ${
                        isCustomDate 
                          ? 'bg-white text-blue-600 shadow-sm font-bold' 
                          : 'text-slate-500 hover:text-slate-700 bg-transparent'
                      }`}
                    >
                      {isCustomDate ? new Date(activeDate).toLocaleDateString('fr-FR') : 'Calendrier'} <Calendar size={20} />
                    </button>
                    {showCalendar && renderCalendar()}
                  </div>
                );
              }
              return (
                <button 
                  key={date}
                  onClick={() => {
                    setActiveDate(date);
                    setShowCalendar(false);
                  }}
                  className={`px-7 py-3 rounded-full text-base font-semibold transition-all flex items-center gap-2 ${
                    activeDate === date 
                      ? 'bg-white text-blue-600 shadow-sm font-bold' 
                      : 'text-slate-500 hover:text-slate-700 bg-transparent'
                  }`}
                >
                  {date}
                </button>
              );
            })}
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowServiceDropdown(!showServiceDropdown)}
              className="flex items-center gap-2 bg-[#F4F7FC] px-7 py-3.5 rounded-full text-slate-700 text-base font-semibold hover:bg-[#EDF2FA] transition-colors shadow-sm border border-white"
            >
              <Activity size={20} className="text-slate-500" />
              Service : {activeService}
              <ChevronDown size={20} className="text-slate-400 ml-1" />
            </button>
            
            {showServiceDropdown && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-100 shadow-lg rounded-2xl p-2 z-50">
                <div className="max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                  {ALL_SERVICES.map((srv) => (
                    <button
                      key={srv}
                      onClick={() => {
                        setActiveService(srv);
                        setShowServiceDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        activeService === srv 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {srv}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Toggle Hôpital / Pharmacie */}
        <div className="mt-8 flex justify-center gap-5">
          <button 
            onClick={() => setActiveType('hopital')}
            className={`flex items-center gap-2 px-9 py-4 rounded-full text-base font-bold transition-all ${
              activeType === 'hopital' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:-translate-y-1' 
                : 'bg-[#F4F7FC] text-slate-600 hover:bg-[#EDF2FA]'
            }`}
          >
            <Building2 size={22} />
            Hôpital
          </button>
          <button 
            onClick={() => setActiveType('pharmacie')}
            className={`flex items-center gap-2 px-9 py-4 rounded-full text-base font-bold transition-all ${
              activeType === 'pharmacie' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:-translate-y-1' 
                : 'bg-[#F4F7FC] text-slate-600 hover:bg-[#EDF2FA]'
            }`}
          >
            <Pill size={22} />
            Pharmacie
          </button>
        </div>
      </div>

      {/* Contenu principal : Grille de résultats */}
      <div className="max-w-[1300px] mx-auto mt-16 px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Colonne de gauche (Sidebar) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Box : À proximité */}
          <div className="bg-[#ebe4f7] rounded-[2rem] p-8 border border-white shadow-sm">
            <h3 className="text-2xl font-bold text-slate-800 mb-5">À proximité</h3>
            <p className="text-base text-slate-600 leading-relaxed max-w-[90%] mb-10">
              Nous avons trouvé {filteredEstablishments.length} établissement{filteredEstablishments.length > 1 ? 's' : ''} disponible{filteredEstablishments.length > 1 ? 's' : ''} près de votre position actuelle à Paris.
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

          {/* Box : Premium Care */}
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
              <div className="mt-4">
                <button className="text-sm font-bold text-[#204E38] border-b-[1.5px] border-[#204E38] pb-0.5 inline-flex items-center transition-opacity hover:opacity-75">
                  Démarrer maintenant
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Colonne de droite (Listings + Carte) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {filteredEstablishments.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-10 text-center shadow-sm border border-slate-100 flex items-center justify-center min-h-[300px]">
              <div>
                <div className="mx-auto w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5">
                  <Search size={32} className="text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Aucun résultat trouvé</h3>
                <p className="text-slate-500">Essayez de modifier vos filtres ou votre recherche pour trouver un établissement.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveService('Tous');
                    setActiveDate('Aujourd\'hui');
                  }}
                  className="mt-6 text-blue-600 font-bold hover:underline"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          ) : (
            filteredEstablishments.map((est) => {
              const isEstSelected = selectedSlot?.estId === est.id;
              return (
              <div key={est.id} className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100/60 flex flex-col gap-5 hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row gap-7">
                  <div className="w-full sm:w-[260px] h-[260px] rounded-[1.5rem] overflow-hidden shrink-0 relative bg-slate-100">
                    <div className="absolute inset-0 bg-slate-900/5 z-10 transition-colors group-hover:bg-transparent"></div>
                    <img 
                      src={est.imageUrl} 
                      alt={est.name} 
                      className="w-full h-full object-cover grayscale opacity-90 mix-blend-multiply transition-transform duration-500 hover:scale-[1.03]" 
                    />
                  </div>
                  <div className="flex-1 py-2 pr-3 flex flex-col justify-between">
                    
                    <div className="flex items-start justify-between w-full">
                      <div>
                        <div className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-1.5 flex-wrap">
                          {est.typeLabel} <span className="text-slate-400 font-medium normal-case tracking-normal text-[13px] ml-1">• {est.distance} de chez vous</span>
                        </div>
                        <h3 className="text-[28px] font-bold text-slate-900 mb-2 leading-tight">{est.name}</h3>
                        <p className="text-[15px] text-slate-500 flex items-center gap-2 mb-6 font-medium">
                          <MapPin size={18} className="text-slate-400" /> {est.address}
                        </p>
                      </div>
                      {/* Rating Badge */}
                      <div className="flex flex-col items-center justify-center bg-[#F4F7FC] rounded-[18px] px-5 py-3 border border-blue-50/50 ml-4 shrink-0">
                        <span className="text-[28px] font-bold text-blue-600 leading-none">{est.rating}</span>
                        <span className="text-[9px] font-bold text-slate-400/90 uppercase mt-2 tracking-widest">Rating</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-[12px] font-bold text-slate-700/80 uppercase tracking-widest mb-3">
                        Créneaux disponibles {['Aujourd\'hui', 'Demain'].includes(activeDate) ? activeDate.toLowerCase() : 'le ' + new Date(activeDate).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {est.slots.map((slot, idx) => {
                          const isSelected = isEstSelected && selectedSlot?.time === slot.time;
                          if (slot.status === 'booked') {
                            return (
                              <button key={idx} disabled className="bg-white border-[1.5px] border-slate-200 text-slate-500 px-6 py-3 rounded-2xl text-[15px] font-medium opacity-60">
                                {slot.time}
                              </button>
                            );
                          }
                          return (
                            <button 
                              key={idx} 
                              onClick={() => handleSlotClick(est.id, slot)}
                              className={`px-6 py-3 rounded-2xl text-[15px] transition-colors shadow-sm ${
                                isSelected 
                                  ? 'bg-blue-600 text-white font-bold shadow-blue-500/30' 
                                  : 'bg-[#F4F7FC] hover:bg-[#EBF1FA] text-slate-800 font-semibold shadow-transparent hover:shadow-sm'
                              }`}
                            >
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
                      <div className="mb-2">
                        Sélectionnez pour le : <span className="font-bold text-slate-900">{['Aujourd\'hui', 'Demain'].includes(activeDate) ? activeDate.toLowerCase() : new Date(activeDate).toLocaleDateString('fr-FR')}</span> à <span className="font-bold text-blue-600 px-1">{selectedSlot.time}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-700">Service :</span>
                        <select 
                          value={selectedBookingService} 
                          onChange={(e) => setSelectedBookingService(e.target.value)}
                          className="bg-[#F4F7FC] border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none font-semibold transition-colors hover:bg-[#EBF1FA] max-w-[200px]"
                        >
                          {ALL_SERVICES.filter(s => s !== 'Tous').map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <button 
                      onClick={handleBooking}
                      className="flex items-center justify-center gap-2.5 bg-[#0066FF] hover:bg-[#005CE6] text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-[#0066FF]/30 hover:-translate-y-0.5 transition-all text-base w-full sm:w-auto"
                    >
                      <CalendarCheck size={20} strokeWidth={2.5} />
                      Confirmer
                    </button>
                  </div>
                )}
              </div>
            )})
          )}

          {/* Carte interactive factice */}
          <div className="relative h-[360px] rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 group mt-2">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Carte" 
              className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-[1.05]" 
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent flex flex-col justify-end p-10">
              <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Explorer la carte</h3>
              <p className="text-white/95 text-lg max-w-xl mb-8 leading-relaxed font-medium">
                Visualisez tous les spécialistes et établissements autour de vous en temps réel.
              </p>
              <div>
                <button className="bg-white text-blue-600 px-8 py-3.5 rounded-full text-[17px] font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-block">
                  Ouvrir le mode carte
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-[100] bg-[#28B880] text-white px-6 py-4 rounded-2xl shadow-[0_8px_30px_rgba(40,184,128,0.3)] flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-white/20 p-2 rounded-full">
            <Bell size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[16px]">Rendez-vous pris en compte !</span>
            <span className="text-[14px] opacity-95">Vous recevrez une notification de confirmation dans quelques minutes.</span>
          </div>
          <button onClick={() => setShowToast(false)} className="ml-2 hover:bg-white/20 p-2 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Rdv;


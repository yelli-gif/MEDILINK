import { 
  BriefcaseMedical, 
  Users, 
  Pencil,
  Share2,
  Calendar,
  BadgeCheck,
  Building,
  MapPin,
  ShieldCheck,
  Info,
  Crosshair,
  Globe,
  RotateCcw
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function HospitalProfile() {
  const [config, setConfig] = useState({
    name: 'Sanctuary Health',
    address: '4500 Medical Plaza Blvd, Austin, TX 78705',
    overseer: 'À assigner',
    photo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    previousPhoto: null as string | null,
    coords: null as { lat: string, lon: string } | null,
    updatedAt: null as string | null,
    totalBeds: 1240,
    totalServices: 48,
    totalStaff: 856
  });
  
  const [activeStatIndex, setActiveStatIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadConfig = () => {
      const saved = localStorage.getItem('sanctuary_hospital_config');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setConfig({
            name: parsed.name || 'Sanctuary Health',
            address: parsed.address || '4500 Medical Plaza Blvd, Austin, TX 78705',
            overseer: parsed.overseer || 'À assigner',
            photo: parsed.photo || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            previousPhoto: parsed.previousPhoto || null,
            coords: parsed.coords || null,
            updatedAt: parsed.updatedAt || null,
            totalBeds: typeof parsed.totalBeds === 'number' ? parsed.totalBeds : 1240,
            totalServices: typeof parsed.totalServices === 'number' ? parsed.totalServices : 48,
            totalStaff: typeof parsed.totalStaff === 'number' ? parsed.totalStaff : 856
          });
        } catch (e) {
          console.error("Failed to parse hospital config", e);
        }
      }
    };

    loadConfig();
    window.addEventListener('hospital_config_updated', loadConfig);

    // Dynamic stats interval
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveStatIndex((prev) => (prev + 1) % CAPACITY_STATS.length);
        setIsTransitioning(false);
      }, 400);
    }, 3000);

    // Clock interval for relative time (every minute)
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      window.removeEventListener('hospital_config_updated', loadConfig);
      clearInterval(interval);
      clearInterval(clockInterval);
    };
  }, []);

  const formatEstablishmentDate = (dateString: string | null) => {
    if (!dateString) return "Octobre 1994 (30 ans)";
    
    const established = new Date(dateString);
    const diffInMs = currentTime.getTime() - established.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInMins < 60) {
      return `Depuis ${diffInMins} minute${diffInMins > 1 ? 's' : ''}`;
    } else if (diffInHours < 24) {
      return `Depuis ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
    } else {
      return `le ${established.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;
    }
  };

  const CAPACITY_STATS = [
    {
      title: 'Disponibilité Immédiate',
      value: Math.floor(config.totalBeds * 0.18).toLocaleString('fr-FR'),
      unit: 'lits',
      label: 'Prêts pour admission',
      percentage: 18,
      color: '#10B981',
      bgColor: 'bg-emerald-500/10',
      barColor: 'bg-emerald-500'
    },
    {
      title: 'Capacité Patients',
      value: config.totalBeds.toLocaleString('fr-FR'),
      unit: 'lits',
      label: "82% d'occupation",
      percentage: 82,
      color: '#0B56FA',
      bgColor: 'bg-[#EEF2F9]',
      barColor: 'bg-[#0B56FA]'
    },
    {
      title: 'Flux des Urgences',
      value: Math.floor(config.totalBeds * 0.01).toLocaleString('fr-FR'),
      unit: 'patients',
      label: 'Triage actif en cours',
      percentage: 45,
      color: '#F59E0B',
      bgColor: 'bg-amber-500/10',
      barColor: 'bg-amber-500'
    },
    {
      title: 'Optimisation de Flux',
      value: '+' + Math.floor(config.totalBeds * 0.04).toLocaleString('fr-FR'),
      unit: 'sorties',
      label: 'Prévues pour aujourd\'hui',
      percentage: 100,
      color: '#8B5CF6',
      bgColor: 'bg-violet-500/10',
      barColor: 'bg-violet-500'
    }
  ];

  const SERVICES_STATS = [
    { title: 'Services Médicaux', value: config.totalServices.toLocaleString('fr-FR'), label: 'Unités actives' },
    { title: 'Blocs Opératoires', value: Math.max(1, Math.floor(config.totalServices * 0.25)).toLocaleString('fr-FR'), label: 'Salles haute précision' },
    { title: 'Spécialités', value: Math.max(1, Math.floor(config.totalServices * 0.50)).toLocaleString('fr-FR'), label: 'Expertises cliniques' },
    { title: 'Pharmacies', value: Math.max(1, Math.floor(config.totalServices * 0.05)).toLocaleString('fr-FR'), label: 'Gestion des stocks' }
  ];

  const STAFF_STATS = [
    { title: 'Personnel Total', value: config.totalStaff.toLocaleString('fr-FR'), label: 'Collaborateurs engagés' },
    { title: 'Médecins', value: Math.floor(config.totalStaff * 0.15).toLocaleString('fr-FR'), label: 'Spécialistes Seniors' },
    { title: 'Soignants', value: Math.floor(config.totalStaff * 0.40).toLocaleString('fr-FR'), label: 'Infirmiers & Aides' },
    { title: 'Administration', value: Math.floor(config.totalStaff * 0.10).toLocaleString('fr-FR'), label: 'Support opérationnel' }
  ];

  const currentStat = CAPACITY_STATS[activeStatIndex];
  const currentService = SERVICES_STATS[activeStatIndex];
  const currentStaff = STAFF_STATS[activeStatIndex];

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        
        // Update Local State with history
        const updatedConfig = { 
          ...config, 
          previousPhoto: config.photo, 
          photo: base64String 
        };
        setConfig(updatedConfig);
        
        // Persist to LocalStorage
        localStorage.setItem('sanctuary_hospital_config', JSON.stringify(updatedConfig));
        
        // Notify other components if needed
        window.dispatchEvent(new Event('hospital_config_updated'));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRevertPhoto = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering file pick
    if (config.previousPhoto) {
      const updatedConfig = { 
        ...config, 
        photo: config.previousPhoto, 
        previousPhoto: config.photo // Toggle logic: current becomes previous
      };
      setConfig(updatedConfig);
      localStorage.setItem('sanctuary_hospital_config', JSON.stringify(updatedConfig));
      window.dispatchEvent(new Event('hospital_config_updated'));
    }
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto">
      
      {/* Header / Profile Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-6">
          {/* Hospital Photo */}
          <div className="relative group cursor-pointer" onClick={handlePhotoClick}>
            <div className="w-[140px] h-[140px] rounded-[24px] overflow-hidden shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)] border-[4px] border-white transition-transform group-hover:scale-[1.02]">
              <img src={config.photo} alt="Hospital Building" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Pencil className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Revert Button Overlay */}
            {config.previousPhoto && (
              <button 
                onClick={handleRevertPhoto}
                className="absolute -top-3 -left-3 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#0B56FA] hover:bg-[#0B56FA] hover:text-white transition-all transform hover:scale-110 active:scale-90 z-20 border border-gray-100/50 group/undo"
                title="Rétablir la photo précédente"
              >
                <RotateCcw className="w-4 h-4 group-hover/undo:rotate-[-45deg] transition-transform" />
              </button>
            )}
            <div className="absolute -bottom-2 -right-2 bg-[#0B56FA] text-white rounded-full p-1 border-[4px] border-[#F8F9FB]">
              <BadgeCheck className="w-6 h-6" />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
          
          {/* Titles */}
          <div>
            <p className="text-[11px] font-extrabold tracking-widest text-[#8C93A1] uppercase mb-1.5 flex gap-2">
              Admin <span className="text-gray-300">/</span> <span className="text-[#0B56FA]">Profil de l'Hôpital</span>
            </p>
            <h2 className="text-[38px] font-extrabold text-gray-900 leading-tight mb-3">{config.name}</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-[13px] font-bold text-[#5D6470]">
               <span className="flex items-center gap-2 bg-[#DBE8E1] text-[#406859] px-3 py-1.5 rounded-lg">
                 <Building className="w-4 h-4" /> Hôpital de soins tertiaires
               </span>
               <span className="flex items-center gap-1.5 text-[#8C93A1]">
                 <MapPin className="w-4 h-4" /> {config.address}
               </span>
            </div>
          </div>
        </div>
        
        {/* Header Actions */}
        <div className="flex gap-4 self-start md:self-auto mt-4 md:mt-0">
          <button 
            onClick={handlePhotoClick}
            className="flex items-center justify-center gap-2.5 bg-white border border-[#E5E9F0] hover:border-[#0B56FA]/30 text-[#0B56FA] font-bold py-3 px-6 rounded-[16px] transition-all shadow-sm hover:shadow-md hover-lift text-[13px] active:scale-95"
          >
            <Pencil className="w-4 h-4" strokeWidth={2.5} /> 
            <span>Modifier le Profil</span>
          </button>
          <button className="flex items-center justify-center bg-white border border-[#E5E9F0] hover:bg-gray-50 text-gray-900 w-12 h-12 rounded-[16px] transition-all shadow-sm hover-lift active:scale-95">
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Capacity Card (Dynamic) */}
        <div 
          onClick={() => setActiveStatIndex((prev) => (prev + 1) % CAPACITY_STATS.length)}
          className="lg:col-span-6 bg-white rounded-[28px] p-8 border border-[#E5E9F0]/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] cursor-pointer hover:border-[#0B56FA]/20 transition-all group overflow-hidden"
        >
          <div className="flex justify-between items-start mb-3">
             <h3 className={`text-[11px] font-bold tracking-widest uppercase transition-all duration-500 ${isTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`} style={{ color: currentStat.color }}>
               {currentStat.title}
             </h3>
             <div className="flex gap-1">
               {CAPACITY_STATS.map((_, i) => (
                 <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === activeStatIndex ? 'w-4' : 'bg-gray-200'}`} style={{ backgroundColor: i === activeStatIndex ? currentStat.color : undefined }}></div>
               ))}
             </div>
          </div>

          <div className={`flex items-baseline gap-2 mb-6 transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
            <span className="text-[52px] font-extrabold text-gray-900 leading-none tracking-tight">
              {currentStat.value}
            </span>
            <span className="text-[20px] font-medium text-[#8C93A1]">
              {currentStat.unit}
            </span>
          </div>
          
          {/* Progress bar */}
          <div className={`w-full h-3 rounded-full overflow-hidden mb-4 transition-colors duration-500 ${currentStat.bgColor}`}>
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out ${currentStat.barColor}`} 
              style={{ width: `${currentStat.percentage}%` }}
            ></div>
          </div>
          
          <div className={`flex items-center justify-between text-[13px] font-bold transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
            <span style={{ color: currentStat.color }}>{currentStat.label}</span>
            <span className="text-[#8C93A1]">Rapport de Flux Temps Réel</span>
          </div>
        </div>

        {/* Medical Services Card (Dynamic Sync) */}
        <div 
          onClick={() => setActiveStatIndex((prev) => (prev + 1) % CAPACITY_STATS.length)}
          className="lg:col-span-3 bg-[#F4F6FC] rounded-[28px] p-8 border-0 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-[#EEF2F9] transition-all group overflow-hidden relative"
        >
          <div className={`w-14 h-14 bg-white rounded-[16px] flex items-center justify-center text-[#0B56FA] shadow-sm mb-5 transition-all duration-500 ${isTransitioning ? 'scale-75 opacity-0' : 'scale-100 opacity-100'}`}>
             <BriefcaseMedical className="w-6 h-6 outline-none" />
          </div>
          <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
            <span className="text-[40px] font-extrabold text-gray-900 leading-none mb-1 tracking-tight">
              {currentService.value}
            </span>
          </div>
          <div className={`transition-all duration-500 delay-100 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
            <span className="text-[11px] font-bold tracking-widest text-[#5D6470] uppercase block">
              {currentService.title}
            </span>
            <span className="text-[10px] font-medium text-[#8C93A1] mt-1 block italic">{currentService.label}</span>
          </div>
        </div>

        {/* Total Staff Card (Dynamic Sync) */}
        <div 
          onClick={() => setActiveStatIndex((prev) => (prev + 1) % CAPACITY_STATS.length)}
          className="lg:col-span-3 bg-[#F4F6FC] rounded-[28px] p-8 border-0 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-[#EEF2F9] transition-all group overflow-hidden relative"
        >
          <div className={`w-14 h-14 bg-white rounded-[16px] flex items-center justify-center text-[#0B56FA] shadow-sm mb-5 transition-all duration-500 ${isTransitioning ? 'scale-75 opacity-0' : 'scale-100 opacity-100'}`}>
             <Users className="w-6 h-6" />
          </div>
          <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
            <span className="text-[40px] font-extrabold text-gray-900 leading-none mb-1 tracking-tight">
              {currentStaff.value}
            </span>
          </div>
          <div className={`transition-all duration-500 delay-100 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
            <span className="text-[11px] font-bold tracking-widest text-[#5D6470] uppercase block">
              {currentStaff.title}
            </span>
            <span className="text-[10px] font-medium text-[#8C93A1] mt-1 block italic">{currentStaff.label}</span>
          </div>
        </div>
      </div>

      {/* Lower Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Hospital Details Card */}
          <div className="bg-white rounded-[28px] p-8 border border-[#E5E9F0]/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)]">
            <h3 className="flex items-center gap-3 text-[18px] font-extrabold text-gray-900 mb-8">
              <div className="w-6 h-6 bg-[#0B56FA] rounded-full flex items-center justify-center">
                <Info className="w-3.5 h-3.5 text-white" />
              </div>
              Détails de l'Hôpital
            </h3>
            
            <div className="space-y-7">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#F4F6FC] flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-[#8C93A1]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-[#8C93A1] uppercase mb-1">Établi</p>
                  <p className="text-[14px] font-extrabold text-gray-900">{formatEstablishmentDate(config.updatedAt)}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#F4F6FC] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#8C93A1]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-[#8C93A1] uppercase mb-1">Superviseur</p>
                  <p className="text-[14px] font-extrabold text-gray-900 leading-snug">{config.overseer}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust & Safety Card */}
          <div className="bg-[#0B56FA] rounded-[28px] p-8 text-white relative overflow-hidden shadow-lg shadow-blue-500/20 flex-1 flex flex-col justify-center">
            
            {/* Plus Background Decoration */}
            <div className="absolute -bottom-10 -right-6 text-blue-500 opacity-60">
               <svg width="180" height="180" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" />
               </svg>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-[22px] font-extrabold mb-3">Confiance & Sécurité</h3>
              <p className="text-[14px] font-medium text-blue-100 leading-relaxed mb-6 max-w-[90%]">
                Toutes les données des patients sont chiffrées selon la norme AES 256 bits en conformité avec les réglementations HIPAA.
              </p>
              <button className="bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold py-2.5 px-5 rounded-full flex items-center gap-2 text-[11px] uppercase tracking-widest transition-colors backdrop-blur-sm self-start inline-flex">
                <span className="w-2 h-2 bg-white rounded-full"></span> Portail Sécurisé
              </button>
            </div>
          </div>

        </div>

        {/* Map Card */}
        <div className="lg:col-span-7">
          <div className="bg-[#E5E9F0] rounded-[24px] w-full h-full min-h-[420px] relative overflow-hidden shadow-inner flex items-center justify-center border border-gray-100">
            
            {/* Real Interactive Map (OpenStreetMap) */}
            {config.coords ? (
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                title="Hospital Location"
                className="absolute inset-0 transition-all duration-700"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(config.coords.lon) - 0.005},${parseFloat(config.coords.lat) - 0.005},${parseFloat(config.coords.lon) + 0.005},${parseFloat(config.coords.lat) + 0.005}&layer=mapnik&marker=${config.coords.lat},${config.coords.lon}`}
              ></iframe>
            ) : (
              <div className="absolute inset-0 bg-[#9ABCAE] flex items-center justify-center">
                {/* Fallback SVG if no coords */}
                <svg width="100%" height="100%" className="absolute inset-0 opacity-40">
                  <pattern id="cityGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.8" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#cityGrid)" />
                </svg>
                <div className="relative z-10 text-center px-6">
                  <Globe className="w-12 h-12 text-white/50 mx-auto mb-3" />
                  <p className="text-white font-bold text-[14px]">Recherchez une adresse en configuration pour activer la carte.</p>
                </div>
              </div>
            )}
            
            {/* Floating Top Left Overlay Card */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md rounded-[16px] px-5 py-3 flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/50 z-10">
              <div className="w-8 h-8 bg-[#0B56FA] rounded-md flex items-center justify-center shadow-inner">
                <MapPin className="text-white w-4 h-4 fill-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest text-[#8C93A1] uppercase mb-0.5">Établissement Actif</p>
                <p className="text-[13px] font-extrabold text-gray-900 leading-none">{config.name}</p>
              </div>
            </div>
            
            {/* Target Icon Button bottom right */}
            <button className="absolute bottom-6 right-6 w-12 h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors border border-gray-100 z-10">
              <Crosshair className="w-5 h-5 text-[#0B56FA]" />
            </button>

          </div>
        </div>
      </div>
      
    </div>
  );
}

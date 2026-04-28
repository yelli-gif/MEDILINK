import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  ArrowRight,
  CircleHelp,
  Loader2,
  ChevronRight,
  Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export default function HospitalCreation() {
  const navigate = useNavigate();
  const addressRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [overseer, setOverseer] = useState('');
  const [totalBeds, setTotalBeds] = useState('1240');
  const [totalServices, setTotalServices] = useState('48');
  const [totalStaff, setTotalStaff] = useState('856');
  
  // Name Search State
  const [nameSuggestions, setNameSuggestions] = useState<any[]>([]);
  const [isNameLoading, setIsNameLoading] = useState(false);
  const [showNameSuggestions, setShowNameSuggestions] = useState(false);

  // Address Search State
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{lat: string, lon: string} | null>(null);

  useEffect(() => {
    // Close suggestions on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (addressRef.current && !addressRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
      if (nameRef.current && !nameRef.current.contains(event.target as Node)) {
        setShowNameSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced Name Search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (name.length > 3 && showNameSuggestions) {
        setIsNameLoading(true);
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(name)}+hospital&limit=5&addressdetails=1`
          );
          const data = await response.json();
          setNameSuggestions(data);
        } catch (error) {
          console.error("Error fetching hospitals:", error);
        } finally {
          setIsNameLoading(false);
        }
      } else {
        setNameSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [name]);

  // Debounced Address Search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (address.length > 3 && showSuggestions) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=5&addressdetails=1`
          );
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error("Error fetching addresses:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [address]);

  const handleSelectName = (item: any) => {
    // Fill Name
    setName(item.name || item.display_name.split(',')[0]);
    // Auto-fill Address
    setAddress(item.display_name);
    // Sync Coords
    setSelectedCoords({ lat: item.lat, lon: item.lon });
    
    setNameSuggestions([]);
    setShowNameSuggestions(false);
  };

  const handleSelectAddress = (item: any) => {
    setAddress(item.display_name);
    setSelectedCoords({ lat: item.lat, lon: item.lon });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleCreate = () => {
    if (!name.trim() || !address.trim()) {
      alert("Veuillez renseigner le nom et l'adresse de l'hôpital.");
      return;
    }

    const config = {
      name: name,
      address: address,
      overseer: overseer,
      coords: selectedCoords,
      updatedAt: new Date().toISOString(),
      totalBeds: parseInt(totalBeds) || 1240,
      totalServices: parseInt(totalServices) || 48,
      totalStaff: parseInt(totalStaff) || 856
    };

    // Initialisation : on efface les anciennes données pour le nouvel établissement
    localStorage.removeItem('sanctuary_services');
    localStorage.removeItem('sanctuary_staff');
    localStorage.setItem('sanctuary_hospital_config', JSON.stringify(config));
    window.dispatchEvent(new Event('hospital_config_updated'));
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans text-gray-900 selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-10 w-full border-b border-gray-100 flex items-center justify-between px-6 md:px-8 py-4">
        <div className="font-bold text-xl text-gray-900">Configuration</div>
        <div className="flex items-center gap-6">
          <span className="hidden sm:block text-sm font-semibold text-gray-500">Configuration du Pilote</span>
          <button className="text-gray-500 hover:text-gray-900 transition-colors">
            <CircleHelp className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#A5D6B6] overflow-hidden flex items-center justify-center border border-gray-200">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Doc&backgroundColor=transparent&top=shortHair&clothing=blazerAndShirt" 
              alt="Avatar" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </nav>

      <main className="flex-grow w-full max-w-[1000px] mx-auto px-6 flex flex-col md:mt-8">
        {/* Header Section */}
        <div className="pt-14 pb-12 animate-fade-in-up">
          <h1 className="text-[44px] leading-tight font-extrabold tracking-tight mb-4 text-[#1A1C20]">
            Initialiser l'Établissement
          </h1>
          <p className="text-[#5D6470] text-[17px] font-medium max-w-[600px] leading-relaxed">
            Developpez le reseau MEDILINK. Définissez votre environnement clinique avec précision et assignez un superviseur principal à l'établissement.
          </p>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            
            {/* Identity Card */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] border border-gray-100/60 animate-reveal-stagger hover-lift card-active-glow">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-[#0B56FA] flex items-center justify-center shadow-md">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-[20px] font-bold text-gray-900">Identité de l'Établissement</h3>
                  <p className="text-[11px] font-bold tracking-widest text-gray-500 mt-1 uppercase">
                    ÉTAPE 01 SUR 02
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="relative" ref={nameRef}>
                  <label className="block text-[14px] font-bold text-[#3B4254] mb-2.5">
                    Nom de l'Hôpital
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setShowNameSuggestions(true);
                      }}
                      onFocus={() => setShowNameSuggestions(true)}
                      placeholder="ex. Centre Commémoratif St. Jude" 
                      className="w-full bg-[#E8EAF1] font-medium text-gray-900 placeholder:text-gray-500 rounded-xl px-4 py-3.5 focus-glow" 
                    />
                    {isNameLoading && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <Loader2 className="h-5 w-5 text-[#0B56FA] animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Name Suggestions Dropdown */}
                  {showNameSuggestions && nameSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 animate-scale-in-soft">
                      <div className="p-2 max-h-[300px] overflow-y-auto">
                        <div className="px-3 py-1.5 text-[10px] font-bold text-[#8C93A1] uppercase tracking-widest flex items-center gap-2">
                          <Building2 className="w-3 h-3" /> Établissements Trouvés
                        </div>
                        {nameSuggestions.map((item, idx) => (
                          <button 
                            key={idx}
                            onClick={() => handleSelectName(item)}
                            className="w-full text-left px-4 py-3 hover:bg-[#F4F6FC] rounded-xl transition-all flex items-start gap-3 group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#EEF4FF] flex items-center justify-center text-[#0B56FA] flex-shrink-0 mt-0.5 group-hover:bg-[#0B56FA] group-hover:text-white transition-colors">
                              <Building2 className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <p className="text-[14px] font-bold text-gray-900 line-clamp-1">{item.name || item.display_name.split(',')[0]}</p>
                              <p className="text-[11px] text-[#8C93A1] font-medium line-clamp-1 italic">{item.display_name.split(',').slice(1).join(',').trim()}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-all mt-1" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="relative" ref={addressRef}>
                  <label className="block text-[14px] font-bold text-[#3B4254] mb-2.5">
                    Détails de l'Emplacement
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-500" />
                    </div>
                    <input 
                      type="text" 
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder="Rechercher une adresse physique..." 
                      className="w-full bg-[#E8EAF1] font-medium text-gray-900 placeholder:text-gray-500 rounded-xl pl-11 pr-11 py-3.5 focus-glow" 
                    />
                    {isLoading && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <Loader2 className="h-5 w-5 text-[#0B56FA] animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Address Suggestions Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 animate-scale-in-soft">
                      <div className="p-2 max-h-[300px] overflow-y-auto">
                        <div className="px-3 py-1.5 text-[10px] font-bold text-[#8C93A1] uppercase tracking-widest flex items-center gap-2">
                          <Globe className="w-3 h-3" /> Suggestions à proximité
                        </div>
                        {suggestions.map((item, idx) => (
                          <button 
                            key={idx}
                            onClick={() => handleSelectAddress(item)}
                            className="w-full text-left px-4 py-3 hover:bg-[#F4F6FC] rounded-xl transition-all flex items-start gap-3 group"
                          >
                            <MapPin className="w-4 h-4 text-[#8C93A1] mt-0.5 group-hover:text-[#0B56FA] transition-colors" />
                            <div className="flex-1">
                              <p className="text-[13px] font-bold text-gray-900 line-clamp-1">{item.display_name}</p>
                              <p className="text-[11px] text-[#8C93A1] font-medium uppercase tracking-tight">{item.address.city || item.address.town || item.address.country}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-all mt-1" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Volume de Données Initiale */}
                <div className="pt-6 border-t border-gray-100/60 mt-4">
                  <label className="block text-[14px] font-bold text-[#3B4254] mb-4 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#0B56FA]" /> Volumes Capacitaires & Effectifs
                  </label>
                  <p className="text-[12px] text-[#5D6470] mb-4">Définissez les volumes initiaux de votre établissement. Ces données alimenteront les statistiques de votre tableau de bord.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Capacité Lits</label>
                      <input 
                         type="number" 
                         value={totalBeds}
                         onChange={(e) => setTotalBeds(e.target.value)}
                         placeholder="ex. 1240"
                         className="w-full bg-[#E8EAF1] font-medium text-gray-900 placeholder:text-gray-500 rounded-xl px-4 py-3 focus-glow"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Services</label>
                      <input 
                         type="number" 
                         value={totalServices}
                         onChange={(e) => setTotalServices(e.target.value)}
                         placeholder="ex. 48"
                         className="w-full bg-[#E8EAF1] font-medium text-gray-900 placeholder:text-gray-500 rounded-xl px-4 py-3 focus-glow"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Effectif Total</label>
                      <input 
                         type="number" 
                         value={totalStaff}
                         onChange={(e) => setTotalStaff(e.target.value)}
                         placeholder="ex. 856"
                         className="w-full bg-[#E8EAF1] font-medium text-gray-900 placeholder:text-gray-500 rounded-xl px-4 py-3 focus-glow"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Map Card */}
            <div className="relative rounded-[24px] overflow-hidden bg-[#489482] h-[340px] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] border border-gray-100/60 p-1 animate-reveal-stagger delay-100 hover-lift">
              <div className="absolute inset-0 bg-[#3A8573]">
                {/* SVG map pattern lines for visual effect */}
                <svg width="100%" height="100%" className="absolute inset-0 opacity-40">
                  <pattern id="gridLarge" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.8" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#gridLarge)" />
                  <path d="M -20 150 Q 150 120 300 180 T 600 200" fill="none" stroke="#fff" strokeWidth="2.5" />
                  <path d="M -20 160 Q 150 130 300 190 T 600 210" fill="none" stroke="#fff" strokeWidth="1" opacity="0.6" />
                  <path d="M 180 -50 L 250 450" fill="none" stroke="#fff" strokeWidth="2" />
                  <path d="M 320 -50 Q 340 200 480 450" fill="none" stroke="#fff" strokeWidth="1.5" />
                  <path d="M 50 400 L 400 50" fill="none" stroke="#fff" strokeWidth="1" opacity="0.8" />
                  <circle cx="150" cy="220" r="3" fill="white" />
                  <circle cx="280" cy="80" r="3" fill="white" />
                  <circle cx="420" cy="300" r="4" fill="white" />
                </svg>
              </div>

              {/* Central Map Pin */}
              <div className="absolute top-[45%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg relative cursor-pointer hover:scale-105 transition-transform">
                  <MapPin className="text-[#0B56FA] w-7 h-7 fill-[#0B56FA]" />
                </div>
              </div>

              {/* Map Information Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#F0F3F8]/95 backdrop-blur-md rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm gap-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">
                    ANCRAGE GÉOGRAPHIQUE
                  </p>
                  <p className="text-[13px] font-bold text-[#1A1C20] mt-0.5 tracking-tight">
                    Coordonnées de Précision : 40.7128° N, 74.0060° W
                  </p>
                </div>
                <button className="whitespace-nowrap px-4 py-2 bg-white rounded-lg text-[13px] font-bold text-[#1A1C20] shadow-sm hover:bg-gray-50 border border-gray-200/50 transition-colors">
                  Ajuster le repère
                </button>
              </div>
            </div>
            
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            
            {/* Appoint Overseer Card */}
            <div className="bg-white rounded-[24px] p-8 pb-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] border border-gray-100/60 flex-grow animate-reveal-stagger delay-200 hover-lift card-active-glow">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-[#E5EAEF] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#5D6470]" />
                </div>
                <div>
                  <h3 className="text-[20px] font-bold text-gray-900">Nommer un Superviseur</h3>
                  <p className="text-[11px] font-bold tracking-widest text-gray-500 mt-1 uppercase">
                    ÉTAPE 02 SUR 02
                  </p>
                </div>
              </div>
              
              <p className="text-[15px] text-[#5D6470] mb-8 leading-relaxed font-medium">
                Assignez un administrateur principal pour gérer les opérations et le personnel de ce nouvel établissement.
              </p>
              
              <div className="mb-10">
                <label className="block text-[14px] font-bold text-[#3B4254] mb-2.5">
                  Nom Complet de l'Administrateur
                </label>
                <input 
                  type="text" 
                  value={overseer}
                  onChange={(e) => setOverseer(e.target.value)}
                  placeholder="ex. Dr Helena Vance" 
                  className="w-full bg-[#E8EAF1] font-medium text-gray-900 placeholder:text-gray-500 rounded-xl px-4 py-3.5 focus-glow" 
                />
              </div>
              
              <button 
                onClick={handleCreate}
                className="w-full bg-[#0B56FA] hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] shadow-md shadow-blue-500/20 active:scale-95"
              >
                Créer l'Établissement <ArrowRight className="w-5 h-5 ml-1" />
              </button>
              
              <p className="text-center text-[10px] font-bold text-[#9BA3AF] tracking-widest mt-8 uppercase">
                TRANSACTION CHIFFRÉE • SÉCURITÉ DE NIVEAU 4
              </p>
            </div>

            {/* Shield Check Data Protocol */}
            <div className="bg-[#F4F6FB] rounded-[16px] p-6 mt-6 flex gap-4 animate-reveal-stagger delay-300">
              <div className="shrink-0 mt-0.5 animate-float-slow">
                <div className="w-5 h-5 rounded-md bg-[#0B56FA] flex items-center justify-center text-white p-0.5">
                  <ShieldCheck className="w-4 h-4" strokeWidth={3} />
                </div>
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#1A1C20] mb-1.5">
                  Protocole de Données Sanctuary
                </h4>
                <p className="text-[13px] text-[#5D6470] leading-snug font-medium">
                  Toutes les entrées d'établissement sont enregistrées dans notre registre distribué sécurisé. Le contrôle d'accès est strictement géré par des normes de chiffrement conformes à l'HIPAA.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-auto py-8">
        <div className="max-w-[1000px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] font-semibold text-[#8C93A1]">
          <p>© 2024 Systèmes de Santé Sanctuary. Chiffré & Sécurisé.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-gray-900 transition-colors">Politique de Confidentialité</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Conditions d'Utilisation</a>
            <a href="#" className="hover:text-gray-900 transition-colors">État du Système</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

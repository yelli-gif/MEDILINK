import {
  Building2,
  MapPin,
  ShieldCheck,
  ArrowRight,
  CircleHelp,
  Loader2,
  ChevronRight,
  Globe,
  Mail,
  Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { hopitalAPI, authAPI } from '../../../services/api';

export default function HospitalCreation() {
  const navigate = useNavigate();
  const addressRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [overseer, setOverseer] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
  const [selectedCoords, setSelectedCoords] = useState<{ lat: string, lon: string } | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addressRef.current && !addressRef.current.contains(event.target as Node)) setShowSuggestions(false);
      if (nameRef.current && !nameRef.current.contains(event.target as Node)) setShowNameSuggestions(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (name.length > 3 && showNameSuggestions) {
        setIsNameLoading(true);
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(name)}+hospital&limit=5&addressdetails=1`);
          const data = await response.json();
          setNameSuggestions(data);
        } catch (e) {} finally { setIsNameLoading(false); }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [name]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (address.length > 3 && showSuggestions) {
        setIsLoading(true);
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=5&addressdetails=1`);
          const data = await response.json();
          setSuggestions(data);
        } catch (e) {} finally { setIsLoading(false); }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [address]);

  const handleSelectName = (item: any) => {
    setName(item.name || item.display_name.split(',')[0]);
    setAddress(item.display_name);
    setSelectedCoords({ lat: item.lat, lon: item.lon });
    setNameSuggestions([]);
    setShowNameSuggestions(false);
  };

  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');

  const handleCreate = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Veuillez remplir les informations d'identification.");
      return;
    }

    setCreateLoading(true);
    setCreateError('');

    try {
      // 1. Créer le compte admin dans le backend (Lot 1)
      await authAPI.register({
        email,
        motDePasse: password,
        role: 'ADMIN',
      });

      // 2. Créer l'hôpital dans le backend (Lot 1)
      await hopitalAPI.ajouter({
        nom: name,
        adresse: address,
        latitude: selectedCoords ? parseFloat(selectedCoords.lat) : 0,
        longitude: selectedCoords ? parseFloat(selectedCoords.lon) : 0,
      });

      // 3. Sauvegarder localement pour l'affichage
      const config = {
        id: 'H-' + Date.now(),
        name,
        address,
        overseer,
        email,
        coords: selectedCoords,
        updatedAt: new Date().toISOString(),
        totalBeds: parseInt(totalBeds),
        totalServices: parseInt(totalServices),
        totalStaff: parseInt(totalStaff)
      };
      localStorage.setItem('sanctuary_hospital_config', JSON.stringify(config));
      window.dispatchEvent(new Event('hospital_config_updated'));
      navigate('/admin/profile');
    } catch (err: any) {
      console.error('Erreur création:', err);
      setCreateError(err.message || 'Erreur lors de la création');
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 w-full border-b px-8 py-4 flex justify-between items-center">
        <span className="font-bold text-xl text-blue-600">Medilink Admin</span>
        <div className="flex items-center gap-4 text-sm font-bold text-slate-400">CONFIGURATION INITIALE</div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12 w-full">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Établir l'Hôpital</h1>
        <p className="text-slate-500 mb-12 max-w-2xl">Définissez l'identité numérique de votre structure hospitalière sur le réseau Medilink.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="space-y-6">
              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100" ref={nameRef}>
                 <label className="block text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-4">1. Identité</label>
                 <div className="space-y-4">
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nom de l'établissement" className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3.5 outline-none" />
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Adresse physique" className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3.5 outline-none" />
                 </div>
              </div>

              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                 <label className="block text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-4">2. Accès Administrateur</label>
                 <div className="space-y-4">
                    <input type="text" value={overseer} onChange={e => setOverseer(e.target.value)} placeholder="Nom du responsable" className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3.5 outline-none" />
                    <div className="relative">
                       <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email de gestion" className="w-full bg-slate-50 border-0 rounded-xl pl-11 py-3.5 outline-none" />
                    </div>
                    <div className="relative">
                       <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" className="w-full bg-slate-50 border-0 rounded-xl pl-11 py-3.5 outline-none" />
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                 <label className="block text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-4">3. Capacités</label>
                 <div className="grid grid-cols-3 gap-3">
                    <div>
                       <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Lits</label>
                       <input type="number" value={totalBeds} onChange={e => setTotalBeds(e.target.value)} className="w-full bg-slate-50 border-0 rounded-xl px-3 py-3 outline-none" />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Services</label>
                       <input type="number" value={totalServices} onChange={e => setTotalServices(e.target.value)} className="w-full bg-slate-50 border-0 rounded-xl px-3 py-3 outline-none" />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Personnel</label>
                       <input type="number" value={totalStaff} onChange={e => setTotalStaff(e.target.value)} className="w-full bg-slate-50 border-0 rounded-xl px-3 py-3 outline-none" />
                    </div>
                 </div>
              </div>

              <div className="bg-blue-600 p-8 rounded-[32px] text-white shadow-xl shadow-blue-500/20">
                 <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><ShieldCheck /> Certification</h3>
                 <p className="text-sm text-blue-100 leading-relaxed mb-8">
                   En créant cet établissement, vous certifiez être autorisé à gérer ses données médicales selon les normes HDS.
                 </p>
                 <button onClick={handleCreate} className="w-full bg-white text-blue-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-transform active:scale-95">
                   Finaliser la création <ArrowRight size={18} />
                 </button>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

import {
  Building2,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Loader2,
  ChevronRight,
  Globe,
  Mail,
  Lock,
  Activity,
  Users,
  Bed,
  Layers,
  Map as MapIcon,
  Navigation,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { hopitalAPI, authAPI, personnelAPI } from '../../../services/api';

export default function HospitalCreation() {
  const navigate = useNavigate();
  const addressRef = useRef<HTMLDivElement>(null);
  
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [prenomAdmin, setPrenomAdmin] = useState('');
  const [nomAdmin, setNomAdmin] = useState('');
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
  const [selectedCoords, setSelectedCoords] = useState<{ lat: string, lon: string }>({ lat: '40.7128', lon: '-74.0060' });

  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addressRef.current && !addressRef.current.contains(event.target as Node)) setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Recherche par NOM
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
  }, [name, showNameSuggestions]);

  // Recherche par ADRESSE
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (address.length > 3 && showSuggestions) {
        setIsLoading(true);
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=5`);
          const data = await response.json();
          setSuggestions(data);
        } catch (e) {} finally { setIsLoading(false); }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [address, showSuggestions]);

  const handleSelectName = (item: any) => {
    setName(item.name || item.display_name.split(',')[0]);
    setAddress(item.display_name);
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

  const handleCreate = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Veuillez remplir toutes les informations, y compris l'email et le mot de passe de l'administrateur.");
      return;
    }

    setCreateLoading(true);
    setCreateError('');

    try {
      // 1. Créer le compte admin
      const savedUser = await authAPI.register({
        email,
        motDePasse: password,
        role: 'ADMIN',
      });

      // 2. Créer l'hôpital
      const savedHopital = await hopitalAPI.ajouter({
        nom: name,
        adresse: address,
        latitude: parseFloat(selectedCoords.lat),
        longitude: parseFloat(selectedCoords.lon),
      });

      // 3. Lier l'admin à l'hôpital dans la table "admin"
      if (savedUser && savedHopital && savedHopital.id) {
         await personnelAPI.ajouterAdmin({
            id: savedUser.id,
            nom: nomAdmin.trim() || 'Admin',
            prenom: prenomAdmin.trim() || 'Super',
            hopital: { id: savedHopital.id }
         });
      }

      // 4. Connexion automatique pour obtenir le token JWT
      try {
        const token = await authAPI.login(email, password);
        localStorage.setItem('medilink_token', token);
      } catch (loginErr) {
        console.error('Erreur auto-login:', loginErr);
      }

      // 5. Sauvegarder localement la config hôpital
      if (!savedHopital?.id) {
        throw new Error("Le backend n'a pas retourné l'ID de l'hôpital. Vérifiez la connexion au serveur.");
      }
      const config = {
        id: savedHopital.id,
        name,
        address,
        overseer: `${prenomAdmin} ${nomAdmin}`,
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
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-600 selection:text-white pb-20">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 w-full border-b px-8 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white">
            <Activity size={24} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">Medilink Admin</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 tracking-widest uppercase">
          Configuration Initiale <ChevronRight size={14} /> <span className="text-blue-600">Hôpital</span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-16">
        <div className="mb-16">
          <h1 className="text-[42px] font-black text-slate-900 leading-tight mb-4">Initialiser l'Établissement</h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
            Développez le réseau MEDILINK. Définissez votre environnement clinique avec précision et assignez un superviseur principal à l'établissement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Colonne GAUCHE - Étape 01 */}
          <div className="lg:col-span-6 space-y-8">
            <div className="bg-white rounded-[32px] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
               <div className="flex items-center gap-5 mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                    <Building2 size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Identité de l'Établissement</h3>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Étape 01 sur 02</p>
                  </div>
               </div>

               <div className="space-y-6">
                 <div className="relative">
                   <label className="block text-[13px] font-bold text-slate-700 mb-2 ml-1">Nom de l'Hôpital</label>
                   <input 
                     type="text" 
                     value={name} 
                     onChange={e => { setName(e.target.value); setShowNameSuggestions(true); }} 
                     placeholder="ex. Centre Commémoratif St. Jude" 
                     className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/10 text-slate-800 font-medium placeholder:text-slate-400" 
                   />
                   {showNameSuggestions && nameSuggestions.length > 0 && (
                     <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2">
                       {nameSuggestions.map((item, idx) => (
                         <button key={idx} onClick={() => handleSelectName(item)} className="w-full text-left px-6 py-4 hover:bg-slate-50 text-sm font-medium text-slate-700 border-b border-slate-50 last:border-0 transition-colors">
                           <div className="font-bold">{item.name || item.display_name.split(',')[0]}</div>
                           <div className="text-[11px] text-slate-400 truncate">{item.display_name}</div>
                         </button>
                       ))}
                     </div>
                   )}
                 </div>

                 <div className="relative" ref={addressRef}>
                   <label className="block text-[13px] font-bold text-slate-700 mb-2 ml-1">Détails de l'Emplacement</label>
                   <div className="relative">
                      <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="text" 
                        value={address} 
                        onChange={e => { setAddress(e.target.value); setShowSuggestions(true); }} 
                        placeholder="Rechercher une adresse physique..." 
                        className="w-full bg-slate-50 border-0 rounded-2xl pl-14 pr-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/10 text-slate-800 font-medium placeholder:text-slate-400" 
                      />
                   </div>
                   {showSuggestions && suggestions.length > 0 && (
                     <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2">
                       {suggestions.map((item, idx) => (
                         <button key={idx} onClick={() => handleSelectAddress(item)} className="w-full text-left px-6 py-4 hover:bg-slate-50 text-sm font-medium text-slate-700 border-b border-slate-50 last:border-0 transition-colors">
                           {item.display_name}
                         </button>
                       ))}
                     </div>
                   )}
                 </div>

                 <div className="pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                        <Activity size={18} />
                      </div>
                      <h4 className="font-bold text-slate-800">Volumes Capacitaires & Effectifs</h4>
                    </div>
                    <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                      Définissez les volumes initiaux de votre établissement. Ces données alimenteront les statistiques de votre tableau de bord.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                       <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-2">Capacité Lits</label>
                          <input type="text" value={totalBeds} onChange={e => setTotalBeds(e.target.value)} className="w-full bg-transparent border-0 outline-none text-xl font-bold text-slate-900" />
                       </div>
                       <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-2">Services</label>
                          <input type="text" value={totalServices} onChange={e => setTotalServices(e.target.value)} className="w-full bg-transparent border-0 outline-none text-xl font-bold text-slate-900" />
                       </div>
                       <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/50">
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-2">Effectif Total</label>
                          <input type="text" value={totalStaff} onChange={e => setTotalStaff(e.target.value)} className="w-full bg-transparent border-0 outline-none text-xl font-bold text-slate-900" />
                       </div>
                    </div>
                 </div>
               </div>
            </div>

            {/* Carte interactive factice */}
            <div className="bg-[#1E3A3A] rounded-[32px] overflow-hidden relative h-[360px] shadow-2xl border-4 border-white">
               <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
               {/* Grillage radar */}
               <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#345151 1px, transparent 1px), linear-gradient(90deg, #345151 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
               
               {/* Lignes de connexion factices */}
               <svg className="absolute inset-0 w-full h-full opacity-30">
                 <path d="M 0 300 Q 200 250 400 320 T 800 280" stroke="#4FD1C5" fill="none" strokeWidth="2" />
                 <path d="M 100 0 Q 150 200 80 400" stroke="#4FD1C5" fill="none" strokeWidth="1" />
               </svg>

               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                     <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping"></div>
                     <div className="bg-white p-3 rounded-full shadow-2xl relative z-10">
                        <div className="bg-blue-600 w-5 h-5 rounded-full"></div>
                     </div>
                  </div>
               </div>

               <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-5 rounded-2xl flex items-center justify-between border border-white shadow-xl">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ancrage Géographique</p>
                    <p className="text-sm font-bold text-slate-800">Coordonnées de Précision : {selectedCoords.lat}° N, {selectedCoords.lon}° W</p>
                  </div>
                  <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs transition-colors">
                    Ajuster le repère
                  </button>
               </div>
            </div>
          </div>

          {/* Colonne DROITE - Étape 02 */}
          <div className="lg:col-span-6 space-y-8">
            <div className="bg-white rounded-[32px] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
               <div className="flex items-center gap-5 mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                    <Shield size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Nommer un Superviseur</h3>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Étape 02 sur 02</p>
                  </div>
               </div>

               <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                 Assignez un administrateur principal pour gérer les opérations et le personnel de ce nouvel établissement.
               </p>

               <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-[13px] font-bold text-slate-700 mb-2 ml-1">Prénom de l'Administrateur</label>
                     <input 
                       type="text" 
                       value={prenomAdmin} 
                       onChange={e => setPrenomAdmin(e.target.value)} 
                       placeholder="ex. Helena" 
                       className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/10 text-slate-800 font-medium placeholder:text-slate-400" 
                     />
                   </div>
                   <div>
                     <label className="block text-[13px] font-bold text-slate-700 mb-2 ml-1">Nom de l'Administrateur</label>
                     <input 
                       type="text" 
                       value={nomAdmin} 
                       onChange={e => setNomAdmin(e.target.value)} 
                       placeholder="ex. Vance" 
                       className="w-full bg-slate-50 border-0 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/10 text-slate-800 font-medium placeholder:text-slate-400" 
                     />
                   </div>
                 </div>

                 {/* Champs techniques (indispensables pour le backend) */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-[13px] font-bold text-slate-700 mb-2 ml-1">Email de gestion</label>
                     <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@hopital.fr" className="w-full bg-slate-50 border-0 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/10 text-slate-800 font-medium" />
                     </div>
                   </div>
                   <div>
                     <label className="block text-[13px] font-bold text-slate-700 mb-2 ml-1">Mot de passe</label>
                     <div className="relative">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-50 border-0 rounded-2xl pl-12 pr-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/10 text-slate-800 font-medium" />
                     </div>
                   </div>
                 </div>

                 {createError && (
                   <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl text-sm font-medium animate-in fade-in slide-in-from-top-2">
                     {createError}
                   </div>
                 )}

                 <button 
                   onClick={handleCreate} 
                   disabled={createLoading}
                   className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-[20px] shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 transition-all hover:-translate-y-1 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0"
                 >
                   {createLoading ? (
                     <><Loader2 className="animate-spin" /> Création en cours...</>
                   ) : (
                     <>Créer l'Établissement <ArrowRight size={20} /></>
                   )}
                 </button>

                 <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest pt-4">
                    Transaction Chiffrée • Sécurité de Niveau 4
                 </p>
               </div>
            </div>

            {/* Protocole Sanctuary */}
            <div className="bg-slate-50 rounded-[32px] p-10 border border-slate-100 flex gap-6">
               <div className="bg-blue-100/50 p-3 rounded-xl h-fit">
                  <ShieldCheck className="text-blue-600" size={24} />
               </div>
               <div>
                  <h4 className="font-bold text-slate-800 mb-2">Protocole de Données Sanctuary</h4>
                  <p className="text-[13px] text-slate-500 leading-relaxed">
                    Toutes les entrées d'établissement sont enregistrées dans notre registre distribué sécurisé. Le contrôle d'accès est strictement géré par des normes de chiffrement conformes à l'HIPAA.
                  </p>
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, Mail, Lock, Eye, EyeOff, CheckCircle2, MapPin, BriefcaseMedical, Calendar, Phone, User as UserIcon, Loader2, Navigation } from 'lucide-react';
import { authAPI, patientAPI } from '../../../services/api';

const Inscription: React.FC = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ 
    nom: '', 
    prenom: '', 
    email: '',
    password: '',
    sexe: 'M',
    numeroSecuriteSociale: '',
    numeroTelephone: '',
    dob: '',
    bloodType: 'O+',
    weight: '',
    height: '',
    location: '',
    antecedents: '',
    latitude: null as number | null,
    longitude: null as number | null
  });
  const [geoLoading, setGeoLoading] = useState(false);

  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }

    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          location: prev.location || `Lat: ${position.coords.latitude.toFixed(4)}, Long: ${position.coords.longitude.toFixed(4)}`
        }));
        setGeoLoading(false);
      },
      (error) => {
        console.error("Erreur géo:", error);
        alert("Impossible de récupérer votre position. Veuillez l'autoriser dans votre navigateur.");
        setGeoLoading(false);
      }
    );
  };

  const handleFinishRegister = async () => {
    setRegisterLoading(true);
    setRegisterError('');

    try {
      // 1. Créer le compte utilisateur dans le backend (Lot 1 - port 8081)
      await authAPI.register({
        email: formData.email,
        motDePasse: formData.password,
        // Les patients n'ont pas de rôle dans la table users du Lot 1
        // Ils sont gérés séparément dans le Lot 2
      });

      // 2. Créer le profil patient dans le backend (Lot 2 - port 8082)
      const patientResponse = await patientAPI.creer({
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        sexe: formData.sexe,
        dateNaissance: formData.dob,
        telephone: formData.numeroTelephone,
        adresse: formData.location,
        poids: formData.weight ? parseFloat(formData.weight) : null,
        taille: formData.height ? parseFloat(formData.height) : null,
        antecedents: formData.antecedents,
        numeroSecuriteSociale: formData.numeroSecuriteSociale,
        latitude: formData.latitude,
        longitude: formData.longitude,
      });

      // 3. Sauvegarder localement pour l'affichage
      localStorage.setItem('medilink_user', JSON.stringify({
        id: patientResponse?.id || 'P-' + Date.now(),
        patientId: patientResponse?.id,
        name: `${formData.prenom} ${formData.nom}`.trim() || 'Nouveau Patient',
        email: formData.email || 'nouveau@medilink.fr',
        role: 'PATIENT',
        isNew: true,
        weight: formData.weight,
        height: formData.height,
      }));

      window.location.href = '/patient-dashboard';
    } catch (err: any) {
      console.error('Erreur inscription:', err);
      setRegisterError(err.message || "Erreur lors de l'inscription");
    } finally {
      setRegisterLoading(false);
    }
  };

  const bgPattern = {
    backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
    backgroundSize: '24px 24px'
  };

  const renderStep1 = () => (
    <main className="flex-grow w-full flex flex-col items-center py-10 z-10 relative px-4">
      <div className="bg-white rounded-[24px] shadow-xl p-8 md:p-12 w-full max-w-[500px] border border-[#F0F2F5]">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
            <UserIcon size={24} />
          </div>
          <h1 className="text-[24px] font-bold text-[#14152A]">Créer mon compte patient</h1>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Prénom</label>
              <input type="text" value={formData.prenom} onChange={e => setFormData({...formData, prenom: e.target.value})} className="w-full bg-[#F5F7FD] border-0 rounded-xl px-4 py-3 font-medium outline-none" placeholder="Jean" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Nom</label>
              <input type="text" value={formData.nom} onChange={e => setFormData({...formData, nom: e.target.value})} className="w-full bg-[#F5F7FD] border-0 rounded-xl px-4 py-3 font-medium outline-none" placeholder="Dupont" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Email</label>
            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#F5F7FD] border-0 rounded-xl px-4 py-3 font-medium outline-none" placeholder="jean.dupont@exemple.com" />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Mot de passe</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-[#F5F7FD] border-0 rounded-xl px-4 py-3 font-medium outline-none" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
          </div>

          <button onClick={() => setStep(2)} className="w-full bg-[#0055FF] text-white font-bold py-4 rounded-full transition-all hover:bg-[#0044CC] mt-6 shadow-lg shadow-blue-500/20">
            Continuer ➔
          </button>
        </div>
      </div>
    </main>
  );

  const renderStep2 = () => (
    <main className="flex-grow w-full flex flex-col items-center py-6 z-10 relative px-4">
      <div className="bg-white rounded-[28px] shadow-2xl p-8 md:p-10 w-full max-w-[800px] border border-[#F0F2F5]">
        <h2 className="text-2xl font-bold text-[#14152A] mb-8">Informations de santé</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">N° Sécurité Sociale</label>
            <input type="text" value={formData.numeroSecuriteSociale} onChange={e => setFormData({...formData, numeroSecuriteSociale: e.target.value})} className="w-full bg-[#F5F7FD] border-0 rounded-xl px-4 py-3 font-medium outline-none" placeholder="1 85 05 75 001 001" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Téléphone</label>
            <div className="relative">
              <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="tel" value={formData.numeroTelephone} onChange={e => setFormData({...formData, numeroTelephone: e.target.value})} className="w-full bg-[#F5F7FD] border-0 rounded-xl pl-11 py-3 font-medium outline-none" placeholder="06 12 34 56 78" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Sexe</label>
            <select value={formData.sexe} onChange={e => setFormData({...formData, sexe: e.target.value})} className="w-full bg-[#F5F7FD] border-0 rounded-xl px-4 py-3 font-medium outline-none">
              <option value="M">Masculin</option>
              <option value="F">Féminin</option>
              <option value="A">Autre</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Date de naissance</label>
            <input type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="w-full bg-[#F5F7FD] border-0 rounded-xl px-4 py-3 font-medium outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Poids (kg)</label>
              <input type="number" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} className="w-full bg-[#F5F7FD] border-0 rounded-xl px-4 py-3 font-medium outline-none" placeholder="70" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Taille (cm)</label>
              <input type="number" value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} className="w-full bg-[#F5F7FD] border-0 rounded-xl px-4 py-3 font-medium outline-none" placeholder="175" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Adresse / Ville</label>
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  value={formData.location} 
                  onChange={e => setFormData({...formData, location: e.target.value})} 
                  className="w-full bg-[#F5F7FD] border-0 rounded-xl pl-11 py-3 font-medium outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" 
                  placeholder="Paris, 75000" 
                />
              </div>
              <button 
                type="button" 
                onClick={handleGetLocation}
                disabled={geoLoading}
                className="bg-blue-50 text-blue-600 px-4 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-blue-100 transition-all border border-blue-100 whitespace-nowrap"
              >
                {geoLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Navigation className="w-4 h-4" />}
                {formData.latitude ? "Position OK" : "Ma position"}
              </button>
            </div>
            {formData.latitude && (
              <p className="text-[10px] text-emerald-600 font-bold mt-2 flex items-center gap-1">
                <CheckCircle2 size={12} /> Coordonnées capturées ({formData.latitude.toFixed(4)}, {formData.longitude?.toFixed(4)})
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Antécédents Médicaux</label>
            <textarea value={formData.antecedents} onChange={e => setFormData({...formData, antecedents: e.target.value})} className="w-full bg-[#F5F7FD] border-0 rounded-xl px-4 py-3 font-medium outline-none h-24" placeholder="Allergies, maladies chroniques, interventions passées..."></textarea>
          </div>
        </div>

        {registerError && (
          <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium flex items-center gap-3">
            <span className="material-symbols-outlined">error</span>
            {registerError}
          </div>
        )}

        <div className="mt-10 flex gap-4">
          <button onClick={() => setStep(1)} disabled={registerLoading} className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-full transition-all hover:bg-slate-200 disabled:opacity-50">Retour</button>
          <button onClick={handleFinishRegister} disabled={registerLoading} className="flex-[2] bg-blue-600 text-white font-bold py-4 rounded-full transition-all hover:bg-blue-700 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-3 disabled:opacity-70">
            {registerLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Inscription en cours...
              </>
            ) : (
              "Finaliser l'inscription"
            )}
          </button>
        </div>
      </div>
    </main>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative flex flex-col font-sans">
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0" style={bgPattern}></div>
      <header className="w-full py-6 px-12 z-50 relative flex justify-between items-center">
        <span className="text-2xl font-bold text-blue-600 tracking-tight cursor-pointer" onClick={() => window.location.href='/'}>Medilink</span>
      </header>
      {step === 1 ? renderStep1() : renderStep2()}
    </div>
  );
};

export default Inscription;

import React, { useState } from 'react';
import { ArrowLeft, User, Building2, ArrowRight, Mail, Lock, Eye, EyeOff, Loader2, Pill } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../../services/api';

interface ConnexionProps {
  mode?: 'login' | 'register';
}

/**
 * Décode un token JWT pour extraire le payload complet
 */
function decodeJWT(token: string): any {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

const Connexion: React.FC<ConnexionProps> = ({ mode = 'login' }) => {
  const isRegister = mode === 'register';
  const actionText = isRegister ? "inscrire" : "connecter";
  const btnText = isRegister ? "S'inscrire" : "Se connecter";

  const navigate = useNavigate();
  const [view, setView] = useState<'selection' | 'patient-form' | 'etablissement-choice'>('selection');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      // Appel réel au backend (Lot 1 - port 8081)
      const token = await authAPI.login(email, password);

      // Stocker le JWT
      localStorage.setItem('medilink_token', token);

      // Décoder le JWT pour récupérer toutes les infos
      const decoded = decodeJWT(token);
      if (!decoded) {
        setError('Erreur lors de la lecture du token');
        setLoading(false);
        return;
      }

      const userRole = decoded.role; // ADMIN, MEDECIN, ACCUEIL, PHARMACIEN
      const userEmail = decoded.sub;

      // Stocker les infos utilisateur dynamiques
      const userData: any = {
        name: userEmail.split('@')[0],
        email: userEmail,
        role: userRole,
        isNew: false,
      };

      // Ajouter les IDs métier si présents dans le token
      if (decoded.hopitalId) userData.hopitalId = decoded.hopitalId;
      if (decoded.medecinId) userData.medecinId = decoded.medecinId;
      if (decoded.personnelId) userData.personnelId = decoded.personnelId;
      if (decoded.pharmacieId) userData.pharmacieId = decoded.pharmacieId;
      if (decoded.serviceId) userData.serviceId = decoded.serviceId;

      localStorage.setItem('medilink_user', JSON.stringify(userData));

      // Redirection selon le rôle
      switch (userRole) {
        case 'ADMIN':
          navigate('/admin/profile');
          break;
        case 'MEDECIN':
          navigate('/medecin/dashboard');
          break;
        case 'ACCUEIL':
          navigate('/reception/dashboard');
          break;
        case 'PHARMACIEN':
          navigate('/pharmacie/dashboard');
          break;
        default:
          navigate('/patient-dashboard');
          break;
      }
    } catch (err: any) {
      console.error('Erreur login:', err);
      setError(err.message || 'Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  const handlePatientClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isRegister) navigate('/inscription');
    else setView('patient-form');
  };

  const handleEtablissementClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isRegister) setView('etablissement-choice');
    else setView('patient-form');
  };

  const handleBackClick = (e: React.MouseEvent) => {
    if (view === 'patient-form' || view === 'etablissement-choice') {
      e.preventDefault();
      setView('selection');
      setError('');
    } else {
      e.preventDefault();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative flex flex-col font-sans">
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0" style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      <header className="w-full flex justify-between items-center py-5 px-6 md:px-12 bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-[#F0F2F5]">
        <button onClick={handleBackClick} className="flex items-center gap-3 group bg-transparent border-0 outline-none">
          <ArrowLeft size={20} className="text-[#14152A] group-hover:-translate-x-1 transition-transform" />
          <span className="text-[#0055FF] font-bold text-xl tracking-tight">Medilink</span>
        </button>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center px-4 sm:px-6 relative z-10 pt-10 pb-20">
        {view === 'selection' ? (
          <div className="max-w-[1024px] w-full flex flex-col items-center">
            <h1 className="text-[36px] md:text-[42px] font-bold text-center leading-tight tracking-tight mb-4">
              <span className="text-[#14152A]">Bienvenue !</span> <span className="text-[#0055FF]">Comment souhaitez-vous vous {actionText} ?</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[900px] mt-12">
              <button onClick={handlePatientClick} className="bg-white rounded-[24px] p-10 flex flex-col items-start text-left transition-all hover:shadow-xl group border border-[#E1E6F0]">
                <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] flex items-center justify-center mb-6"><User size={26} className="text-[#0055FF]" /></div>
                <h3 className="text-[22px] font-bold text-[#14152A] mb-3">Patient</h3>
                <p className="text-[#5A5C6B] text-[15px] mb-8">Accédez à vos dossiers médicaux et ordonnances.</p>
                <div className="flex items-center gap-2 text-[#0055FF] font-bold mt-auto">{btnText} <ArrowRight size={18} /></div>
              </button>
              <button onClick={handleEtablissementClick} className="bg-white rounded-[24px] p-10 flex flex-col items-start text-left transition-all hover:shadow-xl group border border-[#E1E6F0]">
                <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] flex items-center justify-center mb-6"><Building2 size={26} className="text-[#0055FF]" /></div>
                <h3 className="text-[22px] font-bold text-[#14152A] mb-3">Établissement</h3>
                <p className="text-[#5A5C6B] text-[15px] mb-8">Poste de réception, Médecin ou Administrateur.</p>
                <div className="flex items-center gap-2 text-[#0055FF] font-bold mt-auto">{btnText} <ArrowRight size={18} /></div>
              </button>
            </div>
          </div>
        ) : view === 'etablissement-choice' ? (
          <div className="max-w-[1024px] w-full flex flex-col items-center">
            <h1 className="text-[36px] md:text-[42px] font-bold text-center leading-tight tracking-tight mb-4 text-[#14152A]">
              Établissement
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[900px] mt-12">
              <button onClick={() => navigate('/admin/setup')} className="bg-white rounded-[24px] p-10 flex flex-col items-start text-left transition-all hover:shadow-xl group border border-[#E1E6F0]">
                <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] flex items-center justify-center mb-6"><Building2 size={26} className="text-[#0055FF]" /></div>
                <h3 className="text-[22px] font-bold text-[#14152A] mb-3">Hôpital / Clinique</h3>
                <p className="text-[#5A5C6B] text-[15px] mb-8">Gérez un centre hospitalier, les services et le personnel.</p>
                <div className="flex items-center gap-2 text-[#0055FF] font-bold mt-auto">Créer un hôpital <ArrowRight size={18} /></div>
              </button>
              <button onClick={() => navigate('/pharmacie/creation')} className="bg-white rounded-[24px] p-10 flex flex-col items-start text-left transition-all hover:shadow-xl group border border-[#E1E6F0]">
                <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] flex items-center justify-center mb-6"><Pill size={26} className="text-[#0055FF]" /></div>
                <h3 className="text-[22px] font-bold text-[#14152A] mb-3">Pharmacie</h3>
                <p className="text-[#5A5C6B] text-[15px] mb-8">Gérez une pharmacie, les stocks et les prescriptions.</p>
                <div className="flex items-center gap-2 text-[#0055FF] font-bold mt-auto">Créer une pharmacie <ArrowRight size={18} /></div>
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[420px] bg-white rounded-[24px] p-10 shadow-xl border border-[#E1E6F0]">
            <h2 className="text-[26px] font-bold text-[#14152A] mb-2 text-center">Connexion</h2>
            <p className="text-[#5A5C6B] text-[15px] text-center mb-10">Entrez vos identifiants Medilink.</p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
                {error}
              </div>
            )}

            <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-[#14152A]">Email</label>
                <div className="relative">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B8D98]" size={18} />
                   <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="exemple@medilink.fr" className="w-full bg-[#F0F2F5] rounded-xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#0055FF]/20" required />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-[#14152A]">Mot de passe</label>
                <div className="relative">
                   <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B8D98]" size={18} />
                   <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-[#F0F2F5] rounded-xl py-3.5 pl-12 pr-12 outline-none focus:ring-2 focus:ring-[#0055FF]/20" required />
                   <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B8D98]">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0055FF] text-white font-bold py-4 rounded-xl hover:bg-[#0047D6] shadow-lg mt-4 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader2 size={18} className="animate-spin" /> Connexion en cours...</>
                ) : (
                  <>Se connecter <ArrowRight size={18} /></>
                )}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Connexion;

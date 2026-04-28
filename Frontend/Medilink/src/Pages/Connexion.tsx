import React, { useState } from 'react';
import { ArrowLeft, User, Building2, ArrowRight, ShieldCheck, Mail, Lock, Eye, EyeOff, BriefcaseMedical } from 'lucide-react';

interface ConnexionProps {
  mode?: 'login' | 'register';
}

const Connexion: React.FC<ConnexionProps> = ({ mode = 'login' }) => {
  const isRegister = mode === 'register';
  const actionText = isRegister ? "inscrire" : "connecter";
  const btnText = isRegister ? "S'inscrire" : "Se connecter";

  const [view, setView] = useState<'selection' | 'patient-form'>('selection');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Determine profile type
    const isDupont = email.toLowerCase().includes('dupont') && password.includes('1234');
    
    // Fallback/Demo default: If we type nothing or something else, we act like Dupont for demo purposes unless they specifically type a generic test, but let's make the "dupont@gmail.com" + "1234" the strict case
    localStorage.setItem('medilink_user', JSON.stringify({ 
      name: isDupont ? 'Jean Dupont' : 'Utilisateur', 
      email: email || 'utilisateur@demo.fr',
      isNew: !isDupont,
      weight: '72',
      bloodType: 'O+',
      location: 'Lyon'
    }));

    if (isDupont) {
      // Seed demo data for Dupont
      const demoTreatments = [
        { id: 'cardio', title: 'Traitement Cardiovasculaire', doctor: 'Dr. Fontaine', clinic: 'Clinique du Parc', startDate: '12 Fév 2026', endDate: '12 Juin 2026', progress: 70, medsPerDay: 4, daysRemaining: 57, status: 'ACTIF', color: '#0055FF', iconName: 'Heart' },
        { id: 'reeducation', title: 'Rééducation Posture', doctor: 'Dr. Martin', clinic: 'Kinesithérapie', startDate: '12 Avr 2026', endDate: '01 Mai 2026', progress: 30, medsPerDay: 1, daysRemaining: 15, status: 'ACTIF', color: '#E05F2D', iconName: 'Pill' },
        { id: 'paludisme', title: 'Traitement Paludisme', doctor: 'Dr. Dubois', clinic: 'Centre Maladies Infectieuses', startDate: '10 Avr 2026', endDate: '15 Mai 2026', progress: 15, medsPerDay: 3, daysRemaining: 29, status: 'ACTIF', color: '#28B880', iconName: 'FlaskConical' }
      ];
      
      const currentTreatments = localStorage.getItem('medilink_treatments');
      if (!currentTreatments || currentTreatments === '[]') {
        localStorage.setItem('medilink_treatments', JSON.stringify(demoTreatments));
      }
      
      // We don't overwrite if ordonnances_state exists so we don't wipe progress if they just reconnect.
      if (!localStorage.getItem('medilink_ordonnances_state')) {
        localStorage.setItem('medilink_ordonnances_state', '{}');
      }
    } else {
      // Blank slate for new users
      localStorage.setItem('medilink_treatments', '[]');
      localStorage.setItem('medilink_ordonnances_state', '{}');
      localStorage.setItem('medilink_archives', '[]');
      localStorage.removeItem('medilink_cleared_appointment');
      localStorage.removeItem('medilink_next_appointment');
      localStorage.removeItem('medilink_notifications');
      localStorage.removeItem('medilink_pending_notifications');
    }

    window.location.hash = '#patient-dashboard';
  };

  const handlePatientClick = (e: React.MouseEvent) => {
    if (isRegister) {
      // Let it navigate to the href
    } else {
      e.preventDefault();
      setView('patient-form');
    }
  };

  const handleBackClick = (e: React.MouseEvent) => {
    if (view === 'patient-form') {
      e.preventDefault();
      setView('selection');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative flex flex-col font-sans">
      
      {/* Decorative dot background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 z-0" 
        style={{
          backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      ></div>

      {/* Header */}
      <header className="w-full flex justify-between items-center py-5 px-6 md:px-12 bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-[#F0F2F5]">
        <a href="/" onClick={handleBackClick} className="flex items-center gap-3 cursor-pointer group">
          <ArrowLeft size={20} className="text-[#14152A] group-hover:-translate-x-1 transition-transform" />
          <span className="text-[#0055FF] font-bold text-xl tracking-tight">Medilink</span>
        </a>
        
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[#757682] text-[11px] font-medium uppercase tracking-wider">Besoin d'aide ?</p>
            <a href="#" className="text-[#0055FF] text-[13px] font-semibold hover:underline">Support Client</a>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#E6EDFF] flex items-center justify-center text-[#0055FF] font-bold text-sm tracking-widest">
            ML
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-grow flex flex-col justify-center items-center px-4 sm:px-6 relative z-10 pt-10 pb-20">
        
        {view === 'selection' ? (
          <>
            <div className="max-w-[1024px] w-full flex flex-col items-center">
              
              <h1 className="text-[36px] md:text-[42px] font-bold text-center leading-tight tracking-tight mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="text-[#14152A]">Bienvenue !</span> <span className="text-[#0055FF]">Comment souhaitez-vous vous<br className="hidden md:block"/> {actionText} ?</span>
              </h1>
              
              <p className="text-[#5A5C6B] text-[16px] md:text-[18px] text-center mb-16 max-w-lg">
                Choisissez votre profil pour accéder à votre espace sécurisé Medilink.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
                
                {/* Card 1: Individu */}
                <a href={isRegister ? "#inscription" : "#"} onClick={handlePatientClick} className="bg-white rounded-[20px] md:rounded-[24px] p-10 md:p-12 flex flex-col items-start text-left transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,102,255,0.06)] hover:-translate-y-1 group border border-[#E1E6F0] relative overflow-hidden h-full">
                  <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] flex items-center justify-center mb-8">
                    <User size={26} className="text-[#0055FF]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[22px] font-bold text-[#14152A] mb-4">Individu</h3>
                  <p className="text-[#5A5C6B] text-[15px] leading-relaxed mb-10 flex-grow pr-4">
                    Pour les patients, médecins et professionnels libéraux. Accédez à vos dossiers et gérez vos rendez-vous en toute simplicité.
                  </p>
                  <div className="flex items-center gap-2 text-[#0055FF] font-bold text-[15px] group-hover:gap-3 transition-all mt-auto w-full">
                    {btnText} <ArrowRight size={18} />
                  </div>
                </a>

                {/* Card 2: Établissement */}
                <a href={isRegister ? "#inscription" : "#login"} className="bg-white rounded-[20px] md:rounded-[24px] p-10 md:p-12 flex flex-col items-start text-left transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,102,255,0.06)] hover:-translate-y-1 group border border-[#E1E6F0] relative overflow-hidden h-full">
                  <div className="w-14 h-14 rounded-2xl bg-[#F0F4FF] flex items-center justify-center mb-8">
                    <Building2 size={26} className="text-[#0055FF]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[22px] font-bold text-[#14152A] mb-4">Établissement</h3>
                  <p className="text-[#5A5C6B] text-[15px] leading-relaxed mb-10 flex-grow pr-4">
                    Pour les hôpitaux, cliniques, pharmacies et centres de santé. Gérez vos équipes et optimisez votre flux opérationnel.
                  </p>
                  <div className="flex items-center gap-2 text-[#0055FF] font-bold text-[15px] group-hover:gap-3 transition-all mt-auto w-full">
                    {btnText} <ArrowRight size={18} />
                  </div>
                </a>
                
              </div>

            </div>

            {/* Floating Security Badge */}
            <div className="mt-8 sm:mt-12 w-full flex justify-center">
              <div className="flex items-center gap-3 bg-[#F4F6FB] px-6 py-3 rounded-full border border-[#E8ECF5] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                  <div className="relative flex items-center justify-center">
                    <ShieldCheck size={18} className="text-[#0055FF]" strokeWidth={3} />
                  </div>
                  <span className="text-[13px] font-bold text-[#5A5C6B]">
                    Données sécurisées par cryptage de niveau clinique
                  </span>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full max-w-[420px] bg-white rounded-[24px] p-10 md:p-12 flex flex-col items-center mx-auto shadow-[0_8px_30px_rgba(0,102,255,0.08)] border border-[#E1E6F0] relative z-20">
            <div className="w-14 h-14 rounded-full bg-[#0055FF] flex items-center justify-center mb-6 shadow-[0_4px_14px_rgba(0,85,255,0.3)] mt-2">
              <BriefcaseMedical size={24} className="text-white" />
            </div>
            
            <h2 className="text-[26px] font-bold text-[#14152A] mb-2 text-center tracking-tight">
              Bon retour parmi nous !
            </h2>
            <p className="text-[#5A5C6B] text-[15px] text-center mb-10 px-2 leading-relaxed">
              Connectez-vous pour accéder à votre espace santé.
            </p>

            <form className="w-full flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#14152A] ml-1">Email</label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-[#8B8D98] pointer-events-none">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@medilink.fr" 
                    className="w-full bg-[#F0F2F5] text-[#14152A] text-[15px] font-medium rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#0055FF]/20 focus:bg-white transition-all placeholder:text-[#8B8D98] border border-transparent focus:border-[#0055FF]/30"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-2">
                <label className="text-[13px] font-bold text-[#14152A] ml-1">Mot de passe</label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-[#8B8D98] pointer-events-none">
                    <Lock size={18} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full bg-[#F0F2F5] text-[#14152A] text-[15px] font-medium rounded-xl py-4 pl-12 pr-12 outline-none focus:ring-2 focus:ring-[#0055FF]/20 focus:bg-white transition-all placeholder:text-[#8B8D98] border border-transparent focus:border-[#0055FF]/30 tracking-widest"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-[#8B8D98] hover:text-[#14152A] transition-colors">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="button" onClick={handleLogin} className="w-full bg-[#0055FF] text-white font-bold flex items-center justify-center gap-2 py-4 rounded-xl hover:bg-[#0047D6] transition-colors shadow-[0_6px_20px_rgba(0,85,255,0.25)] mt-3 text-[15px]">
                Se connecter <ArrowRight size={18} />
              </button>

              <a href="#" className="text-[#0055FF] text-[14px] font-bold text-center mt-3 mb-2 hover:underline">
                Mot de passe oublié ?
              </a>
            </form>

            <div className="mt-8 mb-2 w-full flex justify-center">
              <div className="flex items-center gap-2 bg-[#F4F6FB] px-5 py-2.5 rounded-full border border-[#E8ECF5]">
                <ShieldCheck size={14} className="text-[#0055FF]" />
                <span className="text-[10px] font-bold text-[#5A5C6B] uppercase tracking-wider">
                  SÉCURISÉ PAR MEDILINK ENCRYPTION
                </span>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-[#8B8D98] text-[12px] font-medium z-10 relative bg-transparent flex justify-center flex-wrap gap-4 sm:gap-6">
        <span>© 2024 Medilink. All rights reserved.</span>
        <a href="#" className="hover:text-[#14152A] transition-colors hidden sm:inline">Privacy Policy</a>
        <a href="#" className="hover:text-[#14152A] transition-colors hidden sm:inline">Terms of Service</a>
        <a href="#" className="hover:text-[#14152A] transition-colors hidden sm:inline">Help Center</a>
      </footer>

      {/* Decorative bottom gradient matching the image's soft white-to-blue glow */}
      <div className="fixed bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-[#F0F4FF] opacity-40 to-transparent pointer-events-none z-0"></div>

    </div>
  );
};

export default Connexion;

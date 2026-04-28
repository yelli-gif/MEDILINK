import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, Mail, Lock, Eye, EyeOff, CheckCircle2, MapPin, BriefcaseMedical, Calendar } from 'lucide-react';

const Inscription: React.FC = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ nom: '', prenom: '', bloodType: '', weight: '', height: '', location: '', dob: '' });

  const handleFinishRegister = () => {
    localStorage.setItem('medilink_user', JSON.stringify({ 
      name: `${formData.prenom} ${formData.nom}`.trim() || 'Nouveau Patient', 
      email: 'nouveau@medilink.fr',
      isNew: true,
      weight: formData.weight || '70',
      height: formData.height || '175',
      bloodType: formData.bloodType || 'A+',
      location: formData.location || 'Paris',
      dob: formData.dob || ''
    }));
    
    // Blank slate for new users
    localStorage.setItem('medilink_treatments', '[]');
    localStorage.setItem('medilink_ordonnances_state', '{}');
    localStorage.setItem('medilink_archives', '[]');
    localStorage.removeItem('medilink_cleared_appointment');
    localStorage.removeItem('medilink_next_appointment');
    localStorage.removeItem('medilink_notifications');
    localStorage.removeItem('medilink_pending_notifications');

    window.location.hash = '#patient-dashboard';
  };

  const bgPattern = {
    backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
    backgroundSize: '24px 24px'
  };

  const renderStep1 = () => (
    <main className="flex-grow w-full flex flex-col items-center py-10 z-10 relative px-4">
      <div className="bg-white rounded-[24px] shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-8 md:p-12 w-full max-w-[500px] border border-[#F0F2F5] relative">
         
         <div className="mb-10">
           <h2 className="text-2xl font-bold text-[#14152A]">Medilink</h2>
         </div>

         <div className="flex items-center gap-4 mb-8">
           <span className="text-[#A5C3FF] text-5xl font-serif italic tracking-tighter">Rp.</span>
           <h1 className="text-[20px] font-bold text-[#14152A]">Inscription Individu</h1>
         </div>

         <div className="space-y-6">
           <div>
             <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Rôle</label>
             <div className="relative">
               <select className="w-full bg-[#F5F7FD] border border-transparent focus:border-[#0055FF] text-[#14152A] rounded-xl px-4 py-3.5 appearance-none font-medium outline-none">
                 <option>Patient</option>
                 <option>Médecin</option>
               </select>
               <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#757682] pointer-events-none" />
             </div>
           </div>

           <div>
             <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Email</label>
             <input type="email" placeholder="nom@exemple.com" className="w-full bg-[#F5F7FD] border border-transparent focus:border-[#0055FF] text-[#14152A] rounded-xl px-4 py-3.5 font-medium outline-none placeholder-[#A0A4B8]" />
           </div>

           <div>
             <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Mot de passe</label>
             <div className="relative">
               <input 
                 type={showPassword ? "text" : "password"} 
                 placeholder="••••••••" 
                 className="w-full bg-[#F5F7FD] border border-transparent focus:border-[#0055FF] text-[#14152A] rounded-xl px-4 py-3.5 pr-12 font-medium outline-none placeholder-[#A0A4B8]" 
               />
               <button 
                 type="button" 
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0A4B8] hover:text-[#14152A] transition-colors"
               >
                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
               </button>
             </div>
             <p className="text-[10px] text-[#A0A4B8] italic mt-2">Minimum 12 caractères avec un symbole.</p>
           </div>

           <button onClick={() => setStep(2)} className="w-full bg-[#0055FF] hover:bg-[#0044CC] text-white font-bold py-4 rounded-full flex justify-center items-center gap-2 transition-colors mt-8 shadow-[0_4px_14px_rgba(0,102,255,0.3)]">
             S'inscrire <span className="text-lg leading-none">➔</span>
           </button>
           <p className="text-center text-[10px] text-[#A0A4B8] mt-4">
             Validé numériquement par le protocole Medilink Encryption Standard.
           </p>
         </div>
         
         {/* Center bottom stamp */}
         <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
           <div className="w-16 h-16 rounded-full border border-[#E6EDFF] bg-white text-[#0055FF] text-[6px] font-bold flex items-center justify-center text-center uppercase tracking-tighter leading-tight shadow-sm opacity-90">
             Authentified<br/>Medilink<br/>2024
           </div>
         </div>

      </div>

      <div className="flex gap-4 mt-16 max-w-[650px] w-full">
        <div className="flex-1 bg-[#F5F7FD] p-4 rounded-xl flex flex-col items-center text-center justify-center gap-2">
          <div className="text-[#0055FF]"><ShieldCheck size={20} fill="#0055FF" stroke="white" /></div>
          <div>
            <h4 className="font-bold text-[#14152A] text-[12px]">RGPD</h4>
            <p className="text-[#757682] text-[10px]">Données protégées</p>
          </div>
        </div>
        <div className="flex-1 bg-[#F5F7FD] p-4 rounded-xl flex flex-col items-center text-center justify-center gap-2">
          <div className="text-[#0055FF]"><Lock size={20} fill="#0055FF" stroke="white" /></div>
          <div>
            <h4 className="font-bold text-[#14152A] text-[12px]">End-to-End</h4>
            <p className="text-[#757682] text-[10px]">Chiffrement total</p>
          </div>
        </div>
        <div className="flex-1 bg-[#F5F7FD] p-4 rounded-xl flex flex-col items-center text-center justify-center gap-2">
          <div className="text-[#0055FF]"><CheckCircle2 size={20} fill="#0055FF" stroke="white" /></div>
          <div>
            <h4 className="font-bold text-[#14152A] text-[12px]">Certifié</h4>
            <p className="text-[#757682] text-[10px]">Hébergement HDS</p>
          </div>
        </div>
      </div>
    </main>
  );

  const renderStep2 = () => (
    <main className="flex-grow w-full flex flex-col items-center py-6 z-10 relative px-4">
      <div className="max-w-[750px] w-full flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#14152A] mb-2">Inscription Patient</h1>
          <p className="text-[13px] text-[#5A5C6B] font-bold flex items-center gap-1.5"><MapPin size={14}/> Centre Médical Numérique Europe • 75008 Paris</p>
        </div>
      </div>

      <div className="bg-white rounded-[28px] shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-8 md:p-10 w-full max-w-[750px] border border-[#F0F2F5] relative overflow-hidden">
        
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
          <span className="text-[350px] font-bold italic tracking-tighter">Rp.</span>
        </div>

        <div className="flex justify-between items-start mb-10 relative z-10">
           <div>
             <p className="text-[10px] text-[#A0A4B8] font-bold uppercase tracking-wider mb-1">ÉTAPE 02/02</p>
             <p className="text-[13px] text-[#14152A] italic font-medium">Informations cliniques obligatoires</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
           <div>
             <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Nom</label>
             <input type="text" value={formData.nom} onChange={e => setFormData({...formData, nom: e.target.value})} placeholder="Entrez votre nom" className="w-full bg-[#F5F7FD] border border-transparent focus:border-[#0055FF] text-[#14152A] rounded-xl px-4 py-3.5 font-medium outline-none placeholder-[#A0A4B8]" />
           </div>
           <div>
             <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Prénom</label>
             <input type="text" value={formData.prenom} onChange={e => setFormData({...formData, prenom: e.target.value})} placeholder="Entrez votre prénom" className="w-full bg-[#F5F7FD] border border-transparent focus:border-[#0055FF] text-[#14152A] rounded-xl px-4 py-3.5 font-medium outline-none placeholder-[#A0A4B8]" />
           </div>
           <div>
             <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Date de naissance</label>
             <div className="relative">
               <input 
                 type="text" 
                 onFocus={(e) => e.target.type = 'date'} 
                 onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }} 
                 value={formData.dob} 
                 onChange={e => setFormData({...formData, dob: e.target.value})} 
                 placeholder="jj/mm/aaaa" 
                 className="w-full bg-[#F5F7FD] border border-transparent focus:border-[#0055FF] text-[#14152A] rounded-xl px-4 py-3.5 font-medium outline-none placeholder-[#A0A4B8]" 
               />
               <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#757682] pointer-events-none" />
             </div>
           </div>
           <div>
             <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Groupe sanguin</label>
             <div className="relative">
               <select value={formData.bloodType} onChange={e => setFormData({...formData, bloodType: e.target.value})} className="w-full bg-[#F5F7FD] border border-transparent focus:border-[#0055FF] text-[#14152A] rounded-xl px-4 py-3.5 appearance-none font-medium outline-none">
                 <option value="" disabled>Sélectionner...</option>
                 <option value="A+">A+</option>
                 <option value="A-">A-</option>
                 <option value="B+">B+</option>
                 <option value="B-">B-</option>
                 <option value="AB+">AB+</option>
                 <option value="AB-">AB-</option>
                 <option value="O+">O+</option>
                 <option value="O-">O-</option>
               </select>
               <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#757682] pointer-events-none" />
             </div>
           </div>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Poids</label>
               <div className="relative">
                 <input type="number" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} placeholder="75" className="w-full bg-[#F5F7FD] border border-transparent focus:border-[#0055FF] text-[#14152A] rounded-xl px-4 py-3.5 font-medium outline-none placeholder-[#A0A4B8]" />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#14152A] font-bold text-sm pointer-events-none">kg</span>
               </div>
             </div>
             <div>
               <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Taille</label>
               <div className="relative">
                 <input type="number" value={formData.height} onChange={e => setFormData({...formData, height: e.target.value})} placeholder="175" className="w-full bg-[#F5F7FD] border border-transparent focus:border-[#0055FF] text-[#14152A] rounded-xl px-4 py-3.5 font-medium outline-none placeholder-[#A0A4B8]" />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#14152A] font-bold text-sm pointer-events-none">cm</span>
               </div>
             </div>
           </div>
           <div>
             <label className="block text-[10px] font-bold text-[#14152A] uppercase tracking-widest mb-2">Localisation (Domicile)</label>
             <div className="flex gap-2">
               <div className="relative flex-1">
                 <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="Ville, Code Postal" className="w-full bg-[#F5F7FD] border border-transparent focus:border-[#0055FF] text-[#14152A] rounded-xl px-4 py-3.5 font-medium outline-none placeholder-[#A0A4B8] pl-11" />
                 <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0055FF] pointer-events-none" />
               </div>
               <button 
                 type="button" 
                 onClick={() => {
                   if ("geolocation" in navigator) {
                     navigator.geolocation.getCurrentPosition(
                       () => {
                         setFormData({...formData, location: "Position GPS obtenue ✅"});
                       },
                       () => {
                         alert("Accès refusé ou erreur GPS. Veuillez vérifier vos autorisations ou taper la ville manuellement.");
                       }
                     );
                   } else {
                     alert("La géolocalisation n'est pas supportée par votre navigateur.");
                   }
                 }}
                 className="bg-[#E6F0FF] hover:bg-[#D4E4FF] text-[#0055FF] px-4 rounded-xl flex items-center justify-center transition-colors shadow-sm"
                 title="Obtenir ma position"
               >
                 <MapPin size={18} />
               </button>
             </div>
           </div>
        </div>

        <div className="mt-12 flex flex-col items-center relative z-10">
          <button onClick={() => setStep(3)} className="w-full max-w-[280px] bg-[#0066FF] hover:bg-[#0055CC] text-white font-bold py-4 rounded-full flex justify-center items-center gap-2 transition-colors shadow-[0_4px_14px_rgba(0,102,255,0.3)]">
            Créer mon compte <span className="text-xl leading-none">➔</span>
          </button>
          <p className="text-[10px] text-[#A0A4B8] text-center mt-4 max-w-sm">
            En créant votre compte, vous acceptez le traitement de vos données de santé conformément à nos politiques de confidentialité.
          </p>
        </div>

        <div className="mt-12 flex justify-center gap-8 border-t border-[#F0F2F5] pt-6 relative z-10">
          <div className="flex items-center gap-2 text-[9px] font-bold text-[#757682] uppercase tracking-wider"><CheckCircle2 size={12}/> CERTIFIÉ HDS</div>
          <div className="flex items-center gap-2 text-[9px] font-bold text-[#757682] uppercase tracking-wider"><ShieldCheck size={12}/> END-TO-END</div>
          <div className="flex items-center gap-2 text-[9px] font-bold text-[#757682] uppercase tracking-wider"><Lock size={12}/> RGPD COMPLIANCE</div>
        </div>

      </div>
    </main>
  );

  const renderStep3 = () => (
    <main className="flex-grow w-full flex flex-col items-center justify-center z-10 relative px-4 py-20">
      <div className="bg-white rounded-[24px] shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-10 md:p-12 w-full max-w-[400px] border border-[#F0F2F5] flex flex-col items-center relative overflow-hidden">
        
        <div className="w-16 h-16 bg-[#0066FF] rounded-[18px] flex items-center justify-center text-white mb-8 shadow-[0_4px_15px_rgba(0,102,255,0.3)]">
          <BriefcaseMedical size={32} />
        </div>

        <h2 className="text-[22px] font-bold text-[#14152A] mb-3 text-center">Votre compte est prêt !</h2>
        <p className="text-[14px] text-[#5A5C6B] text-center mb-10 max-w-xs leading-relaxed">
          Connectez-vous pour accéder à votre espace santé.
        </p>

        <div className="w-full space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-[#A0A4B8] uppercase tracking-widest mb-2">Email</label>
            <div className="relative">
              <input type="email" placeholder="exemple@medilink.fr" className="w-full bg-[#F5F7FD] border border-transparent focus:border-[#0055FF] text-[#14152A] rounded-xl px-4 py-3.5 font-medium outline-none pl-11 placeholder-[#A0A4B8]" />
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0A4B8]" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#A0A4B8] uppercase tracking-widest mb-2">Mot de passe</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full bg-[#F5F7FD] border border-transparent focus:border-[#0055FF] text-[#14152A] rounded-xl px-4 py-3.5 font-medium outline-none pl-11 pr-11 placeholder-[#A0A4B8]" />
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0A4B8]" />
              <div onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#A0A4B8] hover:text-[#0055FF] transition-colors">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          <button onClick={handleFinishRegister} className="w-full bg-[#0066FF] hover:bg-[#0055CC] text-white font-bold py-3.5 rounded-full flex justify-center items-center gap-2 transition-colors mt-8 shadow-[0_4px_14px_rgba(0,102,255,0.3)]">
            Se connecter <span className="text-lg leading-none">➔</span>
          </button>

          <div className="text-center mt-6">
            <a href="#" className="text-[#0055FF] text-[13px] font-bold hover:underline">Mot de passe oublié ?</a>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 bg-[#F5F7FD] px-5 py-2.5 rounded-full text-[#0055FF] text-[9px] font-bold uppercase tracking-wider">
          <ShieldCheck size={14} fill="#0055FF" stroke="white" /> SÉCURISÉ PAR MEDILINK ENCRYPTION
        </div>

      </div>
    </main>
  );

  return (
    <div className="min-h-screen bg-[#FAFAF9] relative flex flex-col font-sans items-center text-[#14152A] overflow-x-hidden">
      {/* Background Dots */}
      <div className="fixed inset-0 pointer-events-none opacity-40 z-0" style={bgPattern}></div>
      <div className="fixed bottom-0 w-full h-[400px] bg-gradient-to-t from-white/60 to-transparent pointer-events-none z-0"></div>

      {/* Header varies per step visually, but we can mount universally if similar, or specifically. */}
      {step === 1 && (
        <header className="w-full max-w-[1200px] mx-auto flex justify-between items-center py-6 px-6 z-10 relative">
          <div className="flex items-center gap-8">
             <span className="text-[#0055FF] font-bold text-2xl tracking-tight cursor-pointer" onClick={() => window.location.hash = ''}>Medilink</span>
             
          </div>
          <a href="#connexion" className="text-[#0055FF] font-bold text-[14px] hover:underline">Login</a>
        </header>
      )}

      {step === 2 && (
        <header className="w-full flex justify-between items-center py-6 px-6 md:px-12 z-10 relative">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.location.hash = ''}>
             <BriefcaseMedical size={22} className="text-[#0055FF]" fill="#0055FF" />
             <span className="text-[#0055FF] font-bold text-xl tracking-tight">Medilink</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[#757682] text-[10px] font-bold uppercase tracking-wider mb-0.5">SESSION SÉCURISÉE</p>
              <p className="text-[#14152A] text-[12px] font-bold">ID: ML-99283-X</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex items-center justify-center text-[#5A5C6B] font-bold text-sm">
              ?
            </div>
          </div>
        </header>
      )}

      {/* NO Header requested for Step 3 in the screenshot other than nothing or blank */}

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}

      {/* Footer varies or is universal */}
      {(step === 1 || step === 3) && (
        <footer className="w-full flex justify-between px-6 py-6 text-[11px] text-[#757682] z-10 relative max-w-[1200px] mt-auto">
          <p>© 2024 Medilink Medical Systems. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#14152A]">Privacy Policy</a>
            <a href="#" className="hover:text-[#14152A]">Terms of Service</a>
            <a href="#" className="hover:text-[#14152A]">Contact Support</a>
          </div>
        </footer>
      )}

      {/* Removed footer for step 2 as requested */}
    </div>
  );
};

export default Inscription;

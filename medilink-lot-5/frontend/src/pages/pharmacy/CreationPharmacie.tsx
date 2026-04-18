import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreationPharmacie(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="bg-background font-body text-on-surface antialiased min-h-screen">
      {/* TopAppBar */}
      <header className="bg-[#faf8ff]/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(25,27,36,0.04)] fixed top-0 z-50 flex justify-between items-center px-8 h-20 w-full">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-2xl font-black font-manrope text-[#191b24] dark:text-slate-50">Administration Medilink</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-full">
            <span className="material-symbols-outlined text-primary text-sm">shield</span>
            <span className="text-xs font-medium text-secondary uppercase tracking-wider">Configuration Sécurisée</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden">
              <img alt="Administrator Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeQOZNWsTf-6E9sCIn-nihM4azUkSoTdlH71mUOXdQnBdC5qXukWzq8Zxf1_4pmzrWCrgyrgh9vXd1bwM97FE9YSz5uRBIZ5aaigewqRoRgpAN-x_zvC9OMy-fLW77QxDRRCvhDMzb8c_q1bCHmQobYx6xuFzQ3NGXDLrY1ZFjy2xYtoq5pnjVLPCIKOgMnCsYYRS7J7uWuelCqpdTbgldRV-mm8zWI3Bsb7o7kyP5YAOHUtEWQJXJssHOM3GfVCgdezkRDDwG52w"/>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        {/* Editorial Header */}
        <div className="mb-16 text-left max-w-2xl">
          <h1 className="font-headline font-extrabold text-4xl sm:text-5xl tracking-tight text-on-surface mb-4">
            Créez votre <span className="text-primary">Pharmacie</span>
          </h1>
          <p className="text-lg text-secondary leading-relaxed">
            Commencez par définir l'identité et les responsables administratifs de votre nouvel établissement de santé.
          </p>
        </div>

        {/* Asymmetric Bento-Style Form Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Primary Identity */}
          <div className="md:col-span-7 space-y-8">
            {/* Pharmacy Name Block */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_20px_40px_rgba(25,27,36,0.02)]">
              <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-6">Identification de l'Établissement</label>
              <div className="relative">
                <input className="w-full bg-surface-container-highest border-none rounded-md px-6 py-4 text-lg focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-outline outline-none" placeholder="ex: Pharmacie du Centre" type="text"/>
              </div>
            </div>

            {/* Admin Creation Block */}
            <div className="bg-surface-container-low p-8 rounded-xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary">admin_panel_settings</span>
                <h2 className="font-headline font-bold text-xl">Créer l'Administrateur</h2>
              </div>
              <p className="text-sm text-secondary mb-8">Désignez le responsable principal de cet établissement. Il recevra ses identifiants via un canal sécurisé.</p>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs font-medium text-on-surface-variant mb-2 ml-1">Nom Complet</label>
                  <input className="w-full bg-surface-container-lowest border-none rounded-md px-5 py-3 focus:ring-2 focus:ring-primary/40 transition-all outline-none" placeholder="Dr. Julian Vance" type="text"/>
                </div>
                <div>
                  <label className="block text-xs font-medium text-on-surface-variant mb-2 ml-1">Email Professionnel</label>
                  <input className="w-full bg-surface-container-lowest border-none rounded-md px-5 py-3 focus:ring-2 focus:ring-primary/40 transition-all outline-none" placeholder="j.vance@medilink.fr" type="email"/>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Location & Visual Map */}
          <div className="md:col-span-5 space-y-8">
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_20px_40px_rgba(25,27,36,0.02)] h-full flex flex-col">
              <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-6">Emplacement Physique</label>
              <div className="relative mb-6">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">location_on</span>
                <input className="w-full bg-surface-container-highest border-none rounded-md pl-12 pr-6 py-4 focus:ring-2 focus:ring-primary/40 transition-all outline-none" placeholder="Entrez l'adresse..." type="text"/>
              </div>
              {/* Map Visual */}
              <div className="flex-grow min-h-[300px] rounded-xl overflow-hidden relative group">
                <img alt="Vue Carte" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700 absolute inset-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOEU1QNwOLWXawixPAZR_y3cv5C-ep0nnLQxZS_Q23kBLAvdHI0-BUss3MXEEwzyJMdXxh-US_wkefwli-a3YuBFAnPi7udmLUm1t5Bhqxwe7SMROjnBbEC-TsRsln0JxAJUGy3MBNd9TNpdACG96mD6YOUx7C7axcortgknw6aiLlQEHJPxpJOH2ULIgHcpWE4JoSzXNZWImV2J6-YV-mF-hIY_rzwInyNNJiGSOP3c4pDqJCtU2yDL7Qh7F8SFEGZW9jg0DdXjo"/>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent"></div>
                {/* Map Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                    <div className="relative bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                      <span className="material-symbols-outlined">local_pharmacy</span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/60 backdrop-blur-md p-4 rounded-lg border border-white/40">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-primary mb-1">Coordonnées Géographiques</p>
                  <p className="font-mono text-xs text-secondary">40.7128° N, 74.0060° W</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 bg-surface-container-highest/50 rounded-2xl backdrop-blur-sm gap-6">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-sm font-medium text-secondary">Création de l'identité de l'établissement</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button className="px-8 py-3 text-sm font-semibold text-secondary hover:text-on-surface transition-colors w-full sm:w-auto">
              Annuler le brouillon
            </button>
            <button onClick={() => navigate('/pharmacie/dashboard')} className="signature-gradient text-white px-10 py-3 rounded-full font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
              Finaliser la Création
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row justify-between items-center px-12 mt-auto w-full py-6 font-body text-xs text-[#586766] gap-4">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="material-symbols-outlined text-[14px]">verified_user</span>
          <span>© 2026 Medilink. Chiffré & Sécurisé.</span>
        </div>
        <div className="flex gap-4 sm:gap-8">
          <a className="text-[#586766] hover:text-[#0066FF] transition-colors" href="#">Politique de Confidentialité</a>
          <a className="text-[#586766] hover:text-[#0066FF] transition-colors" href="#">Conditions d'Utilisation</a>
          <a className="text-[#586766] hover:text-[#0066FF] transition-colors" href="#">État du Système</a>
        </div>
      </footer>
    </div>
  );
}

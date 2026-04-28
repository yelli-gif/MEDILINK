import { 
  Shield, 
  MapPin, 
  ArrowRight,
  Globe,
  Lock,
  Compass
} from 'lucide-react';

export default function PharmacyCreation() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col font-sans text-[#1A1C20] selection:bg-blue-500/30">
      {/* Navigation En-tête */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-20 w-full px-8 py-4 flex items-center justify-between border-b border-gray-100/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0B56FA] flex items-center justify-center shadow-sm">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">Admin Sanctuary</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-[#EEF2FF] px-3 py-1.5 rounded-full border border-blue-100/50">
            <Lock className="w-3.5 h-3.5 text-[#0B56FA]" />
            <span className="text-[10px] font-bold text-[#0B56FA] tracking-wider uppercase">Configuration Sécurisée</span>
          </div>
          <div className="w-9 h-9 rounded-full border border-gray-200 overflow-hidden shadow-sm">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=DocAdmin&backgroundColor=transparent&top=shortHair&clothing=blazerAndShirt" 
              alt="Profil" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </nav>

      <main className="flex-grow w-full max-w-[1100px] mx-auto px-8 py-12 flex flex-col animate-fade-in-up">
        {/* En-tête de la Page */}
        <div className="mb-12">
          <h1 className="text-[48px] leading-tight font-extrabold tracking-tight mb-4 text-[#1A1C20]">
            Établir votre <span className="text-[#0B56FA]">Pharmacie</span>
          </h1>
          <p className="text-[#5D6470] text-[17px] font-medium max-w-[700px] leading-relaxed">
            Commencez par définir l'identité de base et la direction administrative de votre nouvelle installation clinique au sein de l'écosystème Sanctuary Health.
          </p>
        </div>

        {/* Grille Principale */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-20">
          
          {/* Colonne Gauche : Identification et Admin */}
          <div className="space-y-6">
            
            {/* Identification de l'Établissement */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] border border-gray-100/80">
              <label className="block text-[11px] font-bold tracking-widest text-[#0B56FA] uppercase mb-4">
                Identification de l'Établissement
              </label>
              <input 
                type="text" 
                placeholder="ex. Centre Pharmaceutique du Chêne" 
                className="w-full bg-[#EAECEF] font-semibold text-gray-900 placeholder:text-gray-400 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-[#0B56FA]/20 transition-all border border-transparent focus:border-[#0B56FA]/20" 
              />
            </div>

            {/* Création de l'Administrateur */}
            <div className="bg-[#EEF2FF]/50 rounded-[24px] p-8 border border-blue-50/50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#0B56FA] flex items-center justify-center shadow-blue-500/20 shadow-lg">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-[20px] font-bold text-gray-900">Créer un Administrateur</h3>
              </div>
              
              <p className="text-[14px] text-[#5D6470] mb-8 leading-relaxed font-medium">
                Désignez le contrôleur principal de cet établissement. Ils recevront leurs identifiants d'invitation via un canal sécurisé.
              </p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[13px] font-bold text-[#3B4254] mb-2.5">
                    Nom Complet Légal
                  </label>
                  <input 
                    type="text" 
                    placeholder="Dr. Julian Vane" 
                    className="w-full bg-white font-semibold text-gray-900 placeholder:text-gray-400 rounded-xl px-4 py-4 outline-none border border-white focus:border-blue-500/30 shadow-sm" 
                  />
                </div>
                
                <div>
                  <label className="block text-[13px] font-bold text-[#3B4254] mb-2.5">
                    Email Professionnel
                  </label>
                  <input 
                    type="email" 
                    placeholder="j.vane@sanctuaryhealth.com" 
                    className="w-full bg-white font-semibold text-gray-900 placeholder:text-gray-400 rounded-xl px-4 py-4 outline-none border border-white focus:border-blue-500/30 shadow-sm" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Emplacement et Carte */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] border border-gray-100/80 flex flex-col h-full">
            <label className="block text-[11px] font-bold tracking-widest text-[#0B56FA] uppercase mb-4">
              Position Physique
            </label>
            
            <div className="relative mb-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-[#8C93A1]" />
              </div>
              <input 
                type="text" 
                placeholder="Entrez l'adresse de la rue..." 
                className="w-full bg-[#EAECEF] font-semibold text-gray-900 placeholder:text-gray-400 rounded-xl pl-11 pr-4 py-4 outline-none border border-transparent focus:border-[#0B56FA]/20 transition-all shadow-sm" 
              />
            </div>

            {/* Visualisation de la Carte */}
            <div className="relative flex-grow min-h-[300px] rounded-[18px] bg-[#E5E9F0] overflow-hidden group">
              {/* SVG Pattern for Map Simulation */}
              <div className="absolute inset-0 bg-[#E5E9F0]">
                <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
                  <pattern id="city-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <rect width="100" height="100" fill="none" stroke="#2D3748" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="1.5" fill="#2D3748" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#city-grid)" />
                  <path d="M 0 50 Q 250 80 500 20 Z" fill="none" stroke="#2D3748" strokeWidth="20" opacity="0.1" />
                  <path d="M 200 0 L 250 500 Z" fill="none" stroke="#2D3748" strokeWidth="15" opacity="0.1" />
                </svg>
              </div>

              {/* Map Focus Point */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping scale-150"></div>
                  <div className="w-12 h-12 bg-[#0B56FA] rounded-full flex items-center justify-center shadow-xl shadow-blue-500/30 relative z-10">
                    <Compass className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Coordinates Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md rounded-xl p-4 border border-white/50 shadow-sm">
                <p className="text-[10px] font-bold text-[#8C93A1] tracking-widest uppercase mb-1">Coordonnées Géographiques</p>
                <p className="text-[13px] font-bold text-gray-900 tracking-tight">40.7128° N, 74.0068° W</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Barre d'Action Inférieure */}
      <div className="sticky bottom-0 z-30 w-full bg-white/70 backdrop-blur-xl border-t border-gray-100 px-8 py-5">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-[14px] font-bold text-[#5D6470]">Rédaction de l'Identité de l'Établissement</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 text-[14px] font-bold text-[#5D6470] hover:text-red-600 transition-colors">
              Abandonner le Brouillon
            </button>
            <button className="bg-[#0B56FA] hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/20">
              Terminer la Création <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Minimal */}
      <footer className="w-full py-8 border-t border-gray-100 mt-20">
        <div className="max-w-[1100px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-bold text-[#8C93A1]">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" />
            <p>© 2024 Systèmes de Santé Sanctuary. Chiffré & Sécurisé.</p>
          </div>
          <div className="flex gap-8 uppercase tracking-wider">
            <a href="#" className="hover:text-gray-900 transition-colors">Politique de Confidentialité</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Conditions d'Utilisation</a>
            <a href="#" className="hover:text-gray-900 transition-colors">État du Système</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

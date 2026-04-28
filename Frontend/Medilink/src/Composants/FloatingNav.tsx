import React, { useState, useEffect } from 'react';
import { Home, BriefcaseMedical, FileText } from 'lucide-react';

const FloatingNav: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#patient-dashboard');

  useEffect(() => {
    const onLocationChange = () => setCurrentPath(window.location.hash);
    window.addEventListener('hashchange', onLocationChange);
    
    // Si l'utilisateur charge la racine sans hash ou avec un autre hash, on met à jour
    setCurrentPath(window.location.hash || '#patient-dashboard');

    return () => window.removeEventListener('hashchange', onLocationChange);
  }, []);

  const navItems = [
    {
      id: 'patient-dashboard',
      hash: '#patient-dashboard',
      label: 'Accueil',
      icon: Home
    },
    {
      id: 'traitement',
      hash: '#traitement',
      label: 'Traitements',
      icon: BriefcaseMedical
    },
    {
      id: 'ordonnances',
      hash: '#ordonnances',
      label: 'Ordonnances',
      icon: FileText
    }
  ];

  // Permet de surligner Accueil si on est sur la racine (pour PatientDashboard)
  const activePath = currentPath === '' ? '#patient-dashboard' : currentPath;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[500px] md:max-w-[600px] px-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-[28px] md:rounded-full px-10 py-3.5 flex justify-between items-center shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-[#F0F2F5] transition-all">
        {navItems.map((item) => {
          const isActive = activePath === item.hash;
          const Icon = item.icon;

          return (
            <button 
              key={item.id}
              onClick={() => window.location.hash = item.id}
              className="flex flex-col items-center gap-1.5 cursor-pointer group"
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-full mb-0.5 transition-colors ${isActive ? 'bg-[#F4F7FF]' : 'group-hover:bg-gray-50'}`}>
                <Icon size={22} className={`transition-colors ${isActive ? 'text-[#0055FF]' : 'text-[#8B8D98] group-hover:text-[#14152A]'}`} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[11px] font-bold tracking-wide transition-colors ${isActive ? 'text-[#0055FF]' : 'text-[#8B8D98] group-hover:text-[#14152A]'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FloatingNav;

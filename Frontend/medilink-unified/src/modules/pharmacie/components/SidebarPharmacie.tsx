import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

export default function SidebarPharmacie(): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  // État local pré-configuré pour s'adapter au travail du collègue (Authentification)
  const [userProfile, setUserProfile] = useState({
    name: 'Dr. Julian Vance',
    role: 'Pharmacien Chef',
    pharmacieName: 'Pharmacie Centrale',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeQOZNWsTf-6E9sCIn-nihM4azUkSoTdlH71mUOXdQnBdC5qXukWzq8Zxf1_4pmzrWCrgyrgh9vXd1bwM97FE9YSz5uRBIZ5aaigewqRoRgpAN-x_zvC9OMy-fLW77QxDRRCvhDMzb8c_q1bCHmQobYx6xuFzQ3NGXDLrY1ZFjy2xYtoq5pnjVLPCIKOgMnCsYYRS7J7uWuelCqpdTbgldRV-mm8zWI3Bsb7o7kyP5YAOHUtEWQJXJssHOM3GfVCgdezkRDDwG52w'
  });

  // Listener pour récupérer les informations de l'utilisateur stockées par le collègue
  useEffect(() => {
    // Le collègue pourra sauvegarder l'utilisateur sous la clé 'medilink_user' lors du login
    const storedUser = localStorage.getItem('medilink_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserProfile((prev) => ({
          ...prev,
          name: parsed.name || prev.name,
          role: parsed.role || prev.role,
          pharmacieName: parsed.pharmacieName || prev.pharmacieName,
          avatarUrl: parsed.avatarUrl || prev.avatarUrl
        }));
      } catch (err) {
        console.error("Erreur de parsing JSON pour l'utilisateur", err);
      }
    }
  }, []);

  const navItems: NavItem[] = [
    { path: '/pharmacie/dashboard', icon: 'dashboard', label: "Vue d'ensemble" },
    { path: '/pharmacie/historique', icon: 'history', label: 'Historique' },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 z-40 bg-white flex flex-col py-8 px-4 border-r border-slate-100 font-manrope text-sm font-medium tracking-tight hidden md:flex">
        <div className="mb-10 px-2 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/pharmacie/dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-900/10 transition-transform hover:scale-110 active:scale-95">
            <span className="material-symbols-outlined">medical_services</span>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 font-manrope">Medilink</h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">{userProfile.pharmacieName}</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1.5">
          <p className="px-4 mb-2 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Menu Principal</p>
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path) || (location.pathname === '/pharmacie/dashboard' && item.path === '/pharmacie/dashboard');
            return (
              <button 
                key={item.path}
                onClick={() => navigate(item.path)} 
                className={`w-full flex items-center gap-3 px-4 py-3.5 transition-all duration-300 rounded-2xl cursor-pointer group ${isActive ? 'text-blue-600 font-bold bg-blue-50/50 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <span className={`material-symbols-outlined transition-transform group-hover:scale-110 ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>{item.icon}</span>
                <span className="tracking-tight">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="mt-auto p-4 bg-slate-50 rounded-[24px] flex items-center gap-3 border border-slate-100/50">
          <div className="relative">
             <img alt="Profil" className="w-10 h-10 rounded-full object-cover shadow-md" src={userProfile.avatarUrl} />
             <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></div>
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-black truncate text-slate-900 tracking-tight">{userProfile.name}</p>
            <p className="text-[10px] text-slate-400 truncate font-bold uppercase tracking-widest">{userProfile.role}</p>
          </div>
        </div>
    </aside>
  );
}

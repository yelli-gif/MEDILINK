import React from 'react';
import { LayoutGrid, Users, FileText, Settings, LogOut, Plus, Activity } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarMedecin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutGrid size={20} />, path: '/medecin/dashboard' },
    { id: 'patients', label: 'Patients', icon: <Users size={20} />, path: '/medecin/patients' },
    { id: 'ordonnances', label: 'Ordonnances', icon: <FileText size={20} />, path: '/medecin/ordonnances' },
    { id: 'settings', label: 'Paramètres', icon: <Settings size={20} />, path: '/medecin/settings' },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-[#F0F2F5] flex flex-col sticky top-0">
      {/* Logo */}
      <div className="p-8 pb-10 flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0055FF] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Activity size={24} />
          </div>
          <span className="text-2xl font-bold text-[#14152A] tracking-tight">Medilink</span>
        </div>
        <span className="text-[10px] font-bold text-[#8B8D98] tracking-[0.2em] uppercase mt-2 ml-1">Espace Médecin</span>
      </div>

      {/* Profile summary if needed (from Image 1) */}
      <div className="px-6 mb-8">
        <div className="bg-[#F8FAFC] rounded-2xl p-4 flex items-center gap-3 border border-[#F1F5F9]">
          <div className="w-10 h-10 rounded-full bg-[#E6EDFF] flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
             <img src="https://i.pravatar.cc/150?u=doc" alt="Doctor" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#14152A]">Dr. Jean Dupont</span>
            <span className="text-[11px] text-[#5A5C6B]">Chirurgien Dentiste</span>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-grow px-4 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 font-bold text-[14px] ${
                isActive 
                  ? 'bg-[#F0F5FF] text-[#0055FF]' 
                  : 'text-[#8B8D98] hover:text-[#14152A] hover:bg-[#F8FAFC]'
              }`}
            >
              <span className={isActive ? 'text-[#0055FF]' : 'text-[#8B8D98]'}>
                {item.icon}
              </span>
              {item.label}
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0055FF]" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-6 flex flex-col gap-4">
        <button className="w-full bg-[#0055FF] hover:bg-[#0047D6] text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-[0_8px_20px_rgba(0,85,255,0.15)] flex items-center justify-center gap-2 text-[14px]">
          <Plus size={20} />
          Nouveau Patient
        </button>

        <button 
          onClick={() => navigate('/connexion')}
          className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-[#8B8D98] hover:text-[#E64C3C] hover:bg-red-50 transition-all duration-300 font-bold text-[14px]"
        >
          <LogOut size={20} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
};

export default SidebarMedecin;

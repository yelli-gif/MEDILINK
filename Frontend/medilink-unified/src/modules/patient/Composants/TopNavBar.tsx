import React, { useState } from 'react';
import { Plus, PlusCircle, Bell, User } from 'lucide-react';

const TopNavBar: React.FC = () => {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-[0_4px_24px_rgba(0,0,0,0.02)] border-b border-[#F0F2F5]">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.hash = ''}>
        <div className="w-8 h-8 rounded-lg bg-[#0055FF] flex items-center justify-center text-white font-bold leading-none">
          <Plus size={20} strokeWidth={3} />
        </div>
        <span className="text-xl font-bold text-[#14152A] tracking-tight">Medilink</span>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={() => window.location.href = '/rdv'}
          className="flex items-center justify-center gap-2 bg-[#0055FF] hover:bg-[#0047D6] text-white w-10 h-10 sm:w-auto sm:px-5 sm:py-2.5 rounded-full font-semibold text-sm transition-colors shadow-[0_4px_14px_rgba(0,85,255,0.2)]"
          title="Prendre RDV"
        >
          <span className="hidden sm:inline">Prendre RDV</span>
          <PlusCircle size={18} />
        </button>
        <div className="relative">
          <button 
            type="button"
            onClick={() => {
              setShowNotifDropdown(!showNotifDropdown);
              setShowProfileDropdown(false);
            }}
            className="text-[#8B8D98] hover:text-[#14152A] transition-colors p-2 relative z-10"
          >
            <Bell size={22} />
          </button>
          {showNotifDropdown && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)] p-3 z-[100] animate-in fade-in zoom-in-95 transition-all">
              <a 
                href="/notifications" 
                onClick={() => setShowNotifDropdown(false)}
                className="block text-center bg-[#F4F7FF] hover:bg-[#EBF1FF] text-[#0055FF] font-bold py-3 rounded-xl transition-colors text-sm"
              >
                Voir mes notifs
              </a>
            </div>
          )}
        </div>
        <div className="relative">
          <div 
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowNotifDropdown(false);
            }}
            className="w-9 h-9 rounded-full bg-[#FFDED1] flex flex-col items-center justify-center text-[#E05F2D] cursor-pointer overflow-hidden border border-[#FFDED1] hover:shadow-md transition-shadow relative z-10"
          >
            <User size={20} fill="#FFDED1" className="mt-1" />
          </div>
          {showProfileDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)] overflow-hidden z-[100] animate-in fade-in zoom-in-95 transition-all outline outline-1 outline-[#F0F2F5]">
               <div className="flex flex-col">
                 <button 
                   onClick={() => { setShowProfileDropdown(false); window.location.href = '/profile'; }}
                   className="text-left px-4 py-3 hover:bg-[#F8FAFC] text-[#14152A] font-medium text-sm transition-colors border-b border-[#F0F2F5] flex items-center gap-2"
                 >
                   <User size={16} />
                   Mon Profil
                 </button>
                 <button 
                   onClick={() => { 
                     setShowProfileDropdown(false); 
                     localStorage.removeItem('medilink_user'); 
                     // We intentionally don't clear treatments to preserve demo robustness if needed next, but forcing unauth.
                     window.location.hash = ''; 
                   }}
                   className="text-left px-4 py-3 hover:bg-[#FFF5F5] text-[#E64C3C] font-medium text-sm transition-colors flex items-center gap-2"
                 >
                   Déconnexion
                 </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;

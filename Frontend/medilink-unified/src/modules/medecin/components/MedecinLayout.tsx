import React from 'react';
import SidebarMedecin from './SidebarMedecin';
import { Search, Bell, HelpCircle } from 'lucide-react';

interface MedecinLayoutProps {
  children: React.ReactNode;
}

const MedecinLayout: React.FC<MedecinLayoutProps> = ({ children }) => {
  const [userProfile, setUserProfile] = React.useState({
    name: 'Dr. Dupont',
    role: 'Médecin'
  });

  React.useEffect(() => {
    const storedUser = localStorage.getItem('medilink_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserProfile({
          name: parsed.name || 'Dr. Dupont',
          role: parsed.role || 'Médecin'
        });
      } catch (err) {}
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <SidebarMedecin />
      
      <div className="flex-grow flex flex-col min-w-0 overflow-hidden">
        {/* Header Bar */}
        <header className="h-20 bg-white border-b border-[#F0F2F5] flex items-center justify-between px-8 z-10 sticky top-0">
          <div className="max-w-xl w-full">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B8D98] group-focus-within:text-[#0055FF] transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Rechercher un dossier, un acte, un patient..."
                className="w-full bg-[#F3F4F6] border border-transparent focus:bg-white focus:border-[#0055FF]/20 focus:ring-4 focus:ring-[#0055FF]/5 rounded-2xl py-3 pl-12 pr-4 text-[14px] outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-[#8B8D98] hover:text-[#14152A] transition-colors">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#E64C3C] rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-[#8B8D98] hover:text-[#14152A] transition-colors">
              <HelpCircle size={22} />
            </button>
            
            <div className="h-8 w-px bg-[#F0F2F5]"></div>

            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-[13px] font-bold text-[#14152A]">{userProfile.name}</p>
                <p className="text-[11px] text-[#8B8D98]">{userProfile.role}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0055FF] to-[#0047D6] flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                 <img src="https://i.pravatar.cc/150?u=doc" alt="Doctor" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-grow overflow-y-auto p-8 lg:p-10">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MedecinLayout;

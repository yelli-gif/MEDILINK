import { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  LayoutDashboard, 
  BriefcaseMedical, 
  Users, 
  Settings,
  History,
  Bell,
  Search,
  AlertOctagon,
  CircleHelp,
  User,
  Activity,
  ChevronRight,
  SearchX
} from 'lucide-react';
import { EmergencyIncomingModal, type EmergencyDetails } from './modals/EmergencyIncomingModal';

const DEFAULT_SERVICES = [
  { id: '1', name: 'Unité de Cardiologie', category: 'Médecine Interne', type: 'service' },
  { id: '2', name: "Soins d'Urgence", category: 'Urgences', type: 'service' },
  { id: '3', name: 'Laboratoire de Pathologie', category: 'Diagnostic', type: 'service' }
];

const DEFAULT_STAFF = [
  { id: '1', name: 'Dr. Julian Vane', role: 'Médecin Principal', type: 'staff' },
  { id: '2', name: 'Sarah Jenkins', role: 'Chef de Réception', type: 'staff' },
  { id: '3', name: 'Dr. Elena Rodriguez', role: 'Pédiatre', type: 'staff' },
  { id: '4', name: 'Marcus Thorne', role: 'Réceptionniste en Chef', type: 'staff' }
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const [hospitalName, setHospitalName] = useState('Sanctuary Health');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<{ services: any[], staff: any[] }>({ services: [], staff: [] });
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Emergency System
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [activeEmergency, setActiveEmergency] = useState<EmergencyDetails | null>(null);

  useEffect(() => {
    const loadConfig = () => {
      const savedConfig = localStorage.getItem('sanctuary_hospital_config');
      if (savedConfig) {
        try {
          const config = JSON.parse(savedConfig);
          if (config.name) setHospitalName(config.name);
        } catch (e) { console.error(e); }
      }
      setActiveEmergency(JSON.parse(localStorage.getItem('sanctuary_active_emergency') || 'null'));
    };

    const loadNotifications = () => {
      const saved = localStorage.getItem('sanctuary_notifications');
      if (saved) {
        try {
          const notifications = JSON.parse(saved);
          const unread = notifications.filter((n: any) => !n.read).length;
          setUnreadCount(unread);
        } catch (e) { console.error(e); }
      } else {
        setUnreadCount(0);
      }
    };

    loadConfig();
    loadNotifications();

    // Close search on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('hospital_config_updated', loadConfig);
    window.addEventListener('notifications_updated', loadNotifications);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('hospital_config_updated', loadConfig);
      window.removeEventListener('notifications_updated', loadNotifications);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Search Logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults({ services: [], staff: [] });
      setIsSearchOpen(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    
    // Services
    const storedServices = JSON.parse(localStorage.getItem('sanctuary_services') || '[]');
    const allServices = [...DEFAULT_SERVICES, ...storedServices.map((s: any) => ({ ...s, type: 'service' }))];
    const filteredServices = allServices.filter(s => 
      s.name.toLowerCase().includes(query) || (s.category && s.category.toLowerCase().includes(query))
    ).slice(0, 4);

    // Staff
    const storedStaff = JSON.parse(localStorage.getItem('sanctuary_staff') || '[]');
    const allStaff = [...DEFAULT_STAFF, ...storedStaff.map((s: any) => ({ ...s, type: 'staff' }))];
    const filteredStaff = allStaff.filter(s => 
      s.name.toLowerCase().includes(query) || (s.role && s.role.toLowerCase().includes(query))
    ).slice(0, 4);

    setSearchResults({ services: filteredServices, staff: filteredStaff });
    setIsSearchOpen(true);
  }, [searchQuery]);

  const formatName = (name: string) => {
    const words = name.split(' ');
    if (words.length > 1) {
      return <>{words[0]} <br/>{words.slice(1).join(' ')}</>;
    }
    return name;
  };

  const handleSelectResult = (type: 'service' | 'staff') => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(type === 'service' ? '/services' : '/staff');
  };

  const handleTriggerEmergency = (details: EmergencyDetails) => {
    setActiveEmergency(details);
    localStorage.setItem('sanctuary_active_emergency', JSON.stringify(details));
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden font-sans text-[#1A1C20] selection:bg-blue-500/30">
      
      {/* GLOBAL EMERGENCY ALERT BANNER */}
      {activeEmergency && (
        <div className="bg-[#DC2626] text-white py-3 px-6 shadow-md z-50 flex items-center justify-between" style={{ animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
           <div className="flex items-center gap-4">
             <AlertOctagon className="w-7 h-7" />
             <div>
               <p className="font-bold text-[14px]">
                 <span className="uppercase tracking-widest text-red-200 mr-2 text-[11px] bg-black/20 px-2 py-0.5 rounded mr-3">Afflux Vital</span> 
                 {activeEmergency.expectedCount} patients ({activeEmergency.type}) attendus dans {activeEmergency.etaMinutes} min.
               </p>
               {activeEmergency.notes && <p className="text-[12px] text-red-100 font-medium mt-0.5">{activeEmergency.notes}</p>}
             </div>
           </div>
           <button 
             onClick={() => {
               setActiveEmergency(null);
               localStorage.removeItem('sanctuary_active_emergency');
             }}
             className="bg-black/20 hover:bg-black/40 px-4 py-2 flex-shrink-0 rounded-xl text-[13px] font-bold transition-all border border-white/10"
           >
             Cessation d'alerte
           </button>
        </div>
      )}

      <div className="flex-1 flex bg-[#F8F9FB] overflow-hidden relative">
        {/* Sidebar */}
        <aside className="w-[240px] bg-white border-r border-[#E5E9F0]/80 flex flex-col hidden lg:flex flex-shrink-0 h-full overflow-y-auto z-20 shadow-[4px_0_24px_-4px_rgba(0,0,0,0.02)]">
          {/* Logo Section */}
        <div className="px-6 py-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0B56FA] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-[15.5px] leading-tight text-gray-900">{formatName(hospitalName)}</h1>
            <p className="text-[10px] uppercase tracking-widest text-[#8C93A1] font-bold mt-0.5">Portail Admin</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="px-4 py-4 flex-1">
           <nav className="space-y-1.5">
              <Link 
                to="/profile" 
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[14px] font-bold transition-all ${
                  location.pathname === '/profile' 
                  ? 'bg-[#EEF4FF] text-[#0B56FA]' 
                  : 'text-[#5D6470] hover:text-gray-900 hover:bg-[#F4F6FC]'
                }`}
              >
                <LayoutDashboard className={`w-5 h-5 ${location.pathname === '/profile' ? 'text-[#0B56FA]' : 'text-[#8C93A1]'}`} />
                Tableau de bord
              </Link>
              <Link 
                to="/services" 
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[14px] font-bold transition-all ${
                  location.pathname.startsWith('/services') 
                  ? 'bg-[#EEF4FF] text-[#0B56FA]' 
                  : 'text-[#5D6470] hover:text-gray-900 hover:bg-[#F4F6FC]'
                }`}
              >
                <BriefcaseMedical className={`w-5 h-5 ${location.pathname.startsWith('/services') ? 'text-[#0B56FA]' : 'text-[#8C93A1]'}`} />
                Services
              </Link>
              <Link 
                to="/staff" 
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[14px] font-bold transition-all ${
                  location.pathname === '/staff' || location.pathname.startsWith('/staff/') 
                  ? 'bg-[#EEF4FF] text-[#0B56FA]' 
                  : 'text-[#5D6470] hover:text-gray-900 hover:bg-[#F4F6FC]'
                }`}
              >
                <Users className={`w-5 h-5 ${location.pathname.startsWith('/staff') ? 'text-[#0B56FA]' : 'text-[#8C93A1]'}`} /> Personnel
              </Link>
              <Link 
                to="/settings" 
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[14px] font-bold transition-all ${
                  location.pathname === '/settings' 
                  ? 'bg-[#EEF4FF] text-[#0B56FA]' 
                  : 'text-[#5D6470] hover:text-gray-900 hover:bg-[#F4F6FC]'
                }`}
              >
                <Settings className={`w-5 h-5 ${location.pathname === '/settings' ? 'text-[#0B56FA]' : 'text-[#8C93A1]'}`} /> Paramètres
              </Link>
           </nav>
        </div>

        {/* Bottom Sidebar Action */}
        <div className="px-4 pb-8 space-y-2">
           <button 
             onClick={() => setIsEmergencyModalOpen(true)}
             className="w-full bg-[#C52A2A] hover:bg-red-800 text-white font-bold py-3.5 px-4 rounded-xl transition-colors shadow-md shadow-red-500/20 flex items-center justify-center gap-2 text-[14px]"
           >
              <AlertOctagon className="w-4 h-4" /> Alerte Urgence
           </button>
           <Link to="/help" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-bold text-[#5D6470] hover:text-gray-900 hover:bg-[#F4F6FC] transition-colors">
              <CircleHelp className="w-5 h-5 text-[#8C93A1]" /> Centre d'aide
           </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="bg-transparent sticky top-0 z-30 w-full px-10 py-5 flex items-center justify-between">
          <div className="flex-1 max-w-xl" ref={searchRef}>
            {location.pathname === '/services' && (
              <div className="relative hidden md:block w-full">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim() && setIsSearchOpen(true)}
                  placeholder="Rechercher des services ou du personnel..." 
                  className="w-full bg-[#EAECEF] text-[14px] font-medium text-gray-900 placeholder:text-gray-500 rounded-full pl-11 pr-4 py-2.5 outline-none border border-transparent focus:bg-white focus:ring-2 focus:ring-[#0B56FA]/10 transition-all shadow-sm"
                />

                {/* Search Suggestions Dropdown */}
                {isSearchOpen && (
                  <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-2 max-h-[420px] overflow-y-auto">
                      
                      {/* No Results */}
                      {searchResults.services.length === 0 && searchResults.staff.length === 0 ? (
                        <div className="py-10 px-6 text-center">
                          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                            <SearchX className="w-6 h-6 text-gray-400" />
                          </div>
                          <p className="text-[14px] font-extrabold text-gray-900">Service ou personnel introuvable</p>
                          <p className="text-[12px] text-[#8C93A1] mt-1 font-medium">Réessayez avec un autre terme de recherche.</p>
                        </div>
                      ) : (
                        <>
                          {/* Services Section */}
                          {searchResults.services.length > 0 && (
                            <div className="mb-2">
                              <h4 className="px-4 py-2 text-[10px] font-bold text-[#8C93A1] uppercase tracking-widest">Services</h4>
                              {searchResults.services.map(service => (
                                <button 
                                  key={service.id} 
                                  onClick={() => handleSelectResult('service')}
                                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F4F6FC] rounded-xl transition-colors text-left group"
                                >
                                  <div className="w-9 h-9 rounded-lg bg-[#EEF4FF] flex items-center justify-center text-[#0B56FA]">
                                    <Activity className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-[14px] font-bold text-gray-900">{service.name}</p>
                                    <p className="text-[11px] font-medium text-[#8C93A1]">{service.category}</p>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-all" />
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Staff Section */}
                          {searchResults.staff.length > 0 && (
                            <div>
                              <h4 className="px-4 py-2 text-[10px] font-bold text-[#8C93A1] uppercase tracking-widest">Personnel</h4>
                              {searchResults.staff.map(member => (
                                <button 
                                  key={member.id} 
                                  onClick={() => handleSelectResult('staff')}
                                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F4F6FC] rounded-xl transition-colors text-left group"
                                >
                                  <div className="w-9 h-9 rounded-full bg-[#EAF5EF] flex items-center justify-center text-[#218F42]">
                                    <User className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-[14px] font-bold text-gray-900">{member.name}</p>
                                    <p className="text-[11px] font-medium text-[#8C93A1]">{member.role}</p>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-all" />
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-5">
            <button className="text-gray-500 hover:text-gray-900 transition-colors">
              <History className="w-5 h-5" />
            </button>
            <Link 
              to="/notifications" 
              className={`relative transition-colors ${location.pathname === '/notifications' ? 'text-[#0B56FA]' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <Bell className={`w-5 h-5 ${location.pathname === '/notifications' ? 'fill-current' : 'fill-none'}`} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1.5 min-w-[18px] h-[18px] bg-red-500 border-2 border-[#F8F9FB] rounded-full text-white text-[9px] font-extrabold flex items-center justify-center px-1">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>
            <Link 
              to="/admissions"
              className="bg-[#0B56FA] hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full flex items-center justify-center text-[13px] transition-colors ml-2 shadow-sm"
            >
              Nouvelle Admission
            </Link>
            <div className="w-9 h-9 rounded-full border border-gray-200 overflow-hidden cursor-pointer ml-2">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica&backgroundColor=b6e3f4" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-10 pb-12 pt-2 animate-fade-in-up">
          <Outlet />
        </main>
      </div>
      
      </div> {/* Fermeture manquante du conteneur flex horizontal */}

      {/* EMERGENCY MODAL COMPONENT */}
      <EmergencyIncomingModal 
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        onTrigger={handleTriggerEmergency}
      />

    </div>
  );
}

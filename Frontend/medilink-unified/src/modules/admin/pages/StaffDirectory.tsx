import { 
  Users, 
  Download, 
  Filter, 
  ChevronDown, 
  MoreVertical,
  TrendingUp,
  LayoutGrid,
  List,
  ShieldCheck
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { personnelAPI, serviceAPI } from '../../../services/api';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Actif' | 'En Congé' | 'Inactif';
}

const DEFAULT_STAFF: StaffMember[] = [
  {
    id: '1',
    name: 'Dr. Julian Vane',
    email: 'julian.v@sanctuary.com',
    role: 'Médecin Principal',
    department: 'Cardiologie',
    status: 'Actif'
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    email: 's.jenkins@sanctuary.com',
    role: 'Chef de Réception',
    department: 'Administratif',
    status: 'Actif'
  },
  {
    id: '3',
    name: 'Dr. Elena Rodriguez',
    email: 'e.rodriguez@sanctuary.com',
    role: 'Pédiatre',
    department: 'Médecine Générale',
    status: 'En Congé'
  },
  {
    id: '4',
    name: 'Marcus Thorne',
    email: 'm.thorne@sanctuary.com',
    role: 'Réceptionniste en Chef',
    department: "Soins d'Urgence",
    status: 'Actif'
  },
  { id: '5', name: 'Dr. Alan Grant', email: 'a.grant@sanctuary.com', role: 'Chirurgien', department: 'Cardiologie', status: 'Actif' },
  { id: '6', name: 'Dr. Ellie Sattler', email: 'e.sattler@sanctuary.com', role: 'Botaniste Médical', department: 'Médecine Générale', status: 'En Congé' },
  { id: '7', name: 'Ian Malcolm', email: 'i.malcolm@sanctuary.com', role: 'Administrateur Système', department: 'Administratif', status: 'Inactif' },
  { id: '8', name: 'Dr. John Hammond', email: 'j.hammond@sanctuary.com', role: 'Directeur Médical', department: 'Administratif', status: 'Actif' },
  { id: '9', name: 'Lex Murphy', email: 'l.murphy@sanctuary.com', role: 'Réceptionniste', department: 'Administratif', status: 'Actif' },
  { id: '10', name: 'Tim Murphy', email: 't.murphy@sanctuary.com', role: 'Technicien Labo', department: 'Laboratoire de Pathologie', status: 'Actif' },
  { id: '11', name: 'Dr. Henry Wu', email: 'h.wu@sanctuary.com', role: 'Chercheur en Chef', department: 'Laboratoire de Pathologie', status: 'Actif' },
  { id: '12', name: 'Ray Arnold', email: 'r.arnold@sanctuary.com', role: 'Admin Réseau', department: 'Administratif', status: 'Actif' },
  { id: '13', name: 'Robert Muldoon', email: 'r.muldoon@sanctuary.com', role: 'Chef de la Sécurité', department: 'Administratif', status: 'Actif' },
  { id: '14', name: 'Dr. Gerry Harding', email: 'g.harding@sanctuary.com', role: 'Médecin Urgentiste', department: "Soins d'Urgence", status: 'Actif' },
  { id: '15', name: 'Donald Gennaro', email: 'd.gennaro@sanctuary.com', role: 'Conseiller Juridique', department: 'Administratif', status: 'En Congé' },
  { id: '16', name: 'Dennis Nedry', email: 'd.nedry@sanctuary.com', role: 'Technicien IT', department: 'Administratif', status: 'Inactif' },
  { id: '17', name: 'Dr. Sarah Harding', email: 's.harding@sanctuary.com', role: 'Pédiatre', department: 'Médecine Générale', status: 'Actif' },
  { id: '18', name: 'Nick Van Owen', email: 'n.vanowen@sanctuary.com', role: 'Communicant', department: 'Administratif', status: 'Actif' }
];

export default function StaffDirectory() {
  const [staff, setStaff] = useState<StaffMember[]>(DEFAULT_STAFF);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [availableServices, setAvailableServices] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState('Tous les Rôles');
  const [selectedDept, setSelectedDept] = useState('Tous les Services');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCompact, setIsCompact] = useState(false);
  const [activeStatCycle, setActiveStatCycle] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [graphTick, setGraphTick] = useState(0);
  const [sparkData, setSparkData] = useState<number[]>([30, 55, 42, 68, 50, 75, 60, 88, 72, 95, 80, 62]);
  const [barValues, setBarValues] = useState([78, 55, 34, 91]);

  useEffect(() => {
    // 1. Load Staff from backend API (Lot 1 - port 8081)
    const loadStaff = async () => {
      try {
        const medecins = await personnelAPI.listerMedecins();
        const apiStaff: StaffMember[] = medecins.map((m: any) => ({
          id: m.id?.toString() || String(Math.random()),
          name: m.nom ? `Dr. ${m.nom} ${m.prenom || ''}`.trim() : `Dr. ${m.id}`,
          email: m.email || `medecin${m.id}@medilink.fr`,
          role: m.specialite || 'Médecin',
          department: m.service?.nom || 'Non assigné',
          status: 'Actif' as const,
        }));
        // Merge API data with defaults (API data takes priority)
        const combined = apiStaff.length > 0 ? [...apiStaff, ...DEFAULT_STAFF] : DEFAULT_STAFF;
        const unique = combined.filter((s, index, self) => 
          index === self.findIndex((t) => t.email === s.email)
        );
        setStaff(unique);
      } catch (e) {
        console.error('Erreur chargement personnel:', e);
        // Fallback to default staff if API fails
        setStaff(DEFAULT_STAFF);
      }
    };
    loadStaff();

    // 2. Load Services from backend API (Lot 1 - port 8081)
    const loadServices = async () => {
      const defaultServiceNames = ['Cardiologie', "Soins d'Urgence", 'Laboratoire de Pathologie'];
      try {
        const services = await serviceAPI.listerTous();
        const apiDepts = services.map((s: any) => s.nom || s.name).filter(Boolean);
        const allDepts = [...new Set([...defaultServiceNames, ...apiDepts])];
        setAvailableServices(allDepts.sort());
      } catch (e) {
        console.error('Erreur chargement services:', e);
        setAvailableServices(defaultServiceNames.sort());
      }
    };
    loadServices();

    // 3. Load UI Preferences
    const loadPrefs = () => {
      const prefs = JSON.parse(localStorage.getItem('sanctuary_preferences') || '{}');
      setIsCompact(prefs.density === 'Compacte (Vue experte)');
    };
    loadPrefs();
    
    window.addEventListener('sanctuary_settings_updated', loadPrefs);

    // 4. Start Animation Cycle (stat labels - 5s)
    const cycleInterval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveStatCycle(prev => (prev === 0 ? 1 : 0));
        setIsTransitioning(false);
      }, 400);
    }, 5000);

    // 5. Fast Graph Animation (800ms)
    const graphInterval = setInterval(() => {
      setGraphTick(t => t + 1);
      setSparkData(prev => {
        const next = [...prev.slice(1), Math.floor(Math.random() * 70) + 25];
        return next;
      });
      setBarValues([
        Math.floor(Math.random() * 30) + 60,
        Math.floor(Math.random() * 35) + 40,
        Math.floor(Math.random() * 25) + 25,
        Math.floor(Math.random() * 20) + 75,
      ]);
    }, 800);

    return () => {
      window.removeEventListener('sanctuary_settings_updated', loadPrefs);
      clearInterval(cycleInterval);
      clearInterval(graphInterval);
    };
  }, []);

  const filteredStaff = staff.filter(member => {
    const roleMatch = selectedRole === 'Tous les Rôles' || member.role.includes(selectedRole);
    const deptMatch = selectedDept === 'Tous les Services' || member.department === selectedDept;
    return roleMatch && deptMatch;
  });

  const ITEMS_PER_PAGE = viewMode === 'grid' ? 6 : 8;
  const totalPages = Math.ceil(filteredStaff.length / ITEMS_PER_PAGE);
  const currentStaffList = filteredStaff.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Reset page when filters or view mode change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedRole, selectedDept, viewMode]);

  const totalPhysicians = staff.filter(s => s.role.includes('Médecin') || s.role.includes('Pédiatre')).length;
  const totalAdmin = staff.filter(s => s.role.includes('Réception') || s.role.includes('Admin')).length;

  const handleExport = () => {
    if (filteredStaff.length === 0) return;
    
    const headers = ['Nom', 'Email', 'Role', 'Departement', 'Statut'];
    const rows = filteredStaff.map(m => [
      `"${m.name.replace(/"/g, '""')}"`,
      m.email,
      `"${m.role.replace(/"/g, '""')}"`,
      `"${m.department.replace(/"/g, '""')}"`,
      m.status
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Sanctuary_Personnel_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto pb-12 pt-4">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-[34px] font-extrabold text-gray-900 leading-tight mb-2">
            Répertoire du Personnel
          </h2>
          <p className="text-[#5D6470] text-[15px] font-medium leading-relaxed max-w-2xl">
            Gérez et surveillez l'ensemble du personnel des départements de l'hôpital.
          </p>
        </div>
        <div className="flex bg-[#EAECEF] rounded-[14px] p-1 shadow-inner h-fit border border-[#D1D5DB]/20">
          <button 
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 text-[13px] font-bold py-2 px-4 rounded-[10px] transition-all ${
              viewMode === 'list' 
              ? 'bg-white text-[#0B56FA] shadow-sm' 
              : 'text-[#5D6470] hover:text-gray-900'
            }`}
          >
            <List className="w-4 h-4" /> Vue Liste
          </button>
          <button 
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 text-[13px] font-bold py-2 px-4 rounded-[10px] transition-all ${
              viewMode === 'grid' 
              ? 'bg-white text-[#0B56FA] shadow-sm' 
              : 'text-[#5D6470] hover:text-gray-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> Vue Grille
          </button>
        </div>
      </div>

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        
        {/* === FIRST CARD: LIVE CHART PANEL === */}
        <div className="lg:col-span-6 bg-[#0B56FA] rounded-[24px] p-7 text-white relative overflow-hidden shadow-lg shadow-blue-500/20">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-blue-200 uppercase mb-0.5">Analyse en Direct</p>
              <h3 className={`text-[28px] font-extrabold leading-none tracking-tight transition-all duration-400 ${isTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
                {activeStatCycle === 0 ? (staff.length + 138).toString() : '24'}
                <span className="text-[14px] font-medium text-blue-200 ml-2">
                  {activeStatCycle === 0 ? 'collaborateurs' : 'en formation'}
                </span>
              </h3>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-bold text-white/90">LIVE</span>
            </div>
          </div>

          {/* Sparkline Chart */}
          <div className="relative z-10 mb-4 bg-white/10 rounded-2xl px-4 pt-3 pb-2 border border-white/10 backdrop-blur-sm overflow-hidden">
            <p className="text-[9px] font-bold uppercase tracking-widest text-blue-200/80 mb-1.5">Flux d'activité — 12 dernières mesures</p>
            <svg viewBox="0 0 300 60" className="w-full h-[52px]" preserveAspectRatio="none">
              {/* Gradient fill under the curve */}
              <defs>
                <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="white" stopOpacity="0.35"/>
                  <stop offset="100%" stopColor="white" stopOpacity="0.03"/>
                </linearGradient>
              </defs>

              {/* Area fill */}
              <path
                d={`M ${sparkData.map((v, i) => `${(i / (sparkData.length - 1)) * 300},${58 - (v / 100) * 50}`).join(' L ')} L 300,60 L 0,60 Z`}
                fill="url(#sparkGrad)"
                className="transition-all duration-700"
              />
              {/* Line */}
              <polyline
                points={sparkData.map((v, i) => `${(i / (sparkData.length - 1)) * 300},${58 - (v / 100) * 50}`).join(' ')}
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                className="transition-all duration-700"
              />
              {/* Last point dot */}
              {(() => {
                const lastVal = sparkData[sparkData.length - 1];
                const x = 300;
                const y = 58 - (lastVal / 100) * 50;
                return (
                  <>
                    <circle cx={x} cy={y} r="4" fill="white" className="transition-all duration-700"/>
                    <circle cx={x} cy={y} r="7" fill="white" fillOpacity="0.25" className="transition-all duration-700"/>
                  </>
                );
              })()}
            </svg>
          </div>

          {/* Bottom metrics bars */}
          <div className="relative z-10 grid grid-cols-4 gap-2">
            {[
              { label: 'Actifs', color: 'bg-emerald-400' },
              { label: 'Congé', color: 'bg-amber-400' },
              { label: 'Inactifs', color: 'bg-red-400' },
              { label: 'Présence', color: 'bg-violet-400' },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 rounded-xl px-3 py-2.5 border border-white/10 backdrop-blur-sm">
                <div className="flex items-end gap-1 mb-1.5">
                  <span className="text-[18px] font-extrabold leading-none">{barValues[i]}</span>
                  <span className="text-[10px] text-blue-200 font-bold mb-0.5">%</span>
                </div>
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-1">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-700 ease-out`}
                    style={{ width: `${barValues[i]}%` }}
                  />
                </div>
                <p className="text-[9px] font-bold text-blue-200/80 uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Physicians Card */}
        <div className="lg:col-span-3 bg-white rounded-[24px] p-8 border border-[#E5E9F0]/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] flex flex-col justify-center overflow-hidden">
           <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
             <p className="text-[13px] font-semibold text-[#5D6470] mb-2">{activeStatCycle === 0 ? 'Médecins Titulaires' : 'Spécialistes Externes'}</p>
             <h4 className="text-[36px] font-extrabold text-gray-900 leading-none mb-6">{activeStatCycle === 0 ? totalPhysicians + 45 : '18'}</h4>
             
             <div className="w-full h-2 bg-[#EAECEF] rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-1000 ${activeStatCycle === 0 ? 'bg-[#0B56FA] w-[65%]' : 'bg-[#10B981] w-[35%]'}`}></div>
             </div>
           </div>
        </div>

        {/* Reception & Admin Card */}
        <div className="lg:col-span-3 bg-white rounded-[24px] p-8 border border-[#E5E9F0]/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] flex flex-col justify-center overflow-hidden">
           <div className={`transition-all duration-500 delay-75 ${isTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
             <p className="text-[13px] font-semibold text-[#5D6470] mb-2">{activeStatCycle === 0 ? 'Réception & Admin' : 'Force de Nuit'}</p>
             <h4 className="text-[36px] font-extrabold text-gray-900 leading-none mb-6">{activeStatCycle === 0 ? totalAdmin + 22 : '36'}</h4>
             
             <div className="w-full h-2 bg-[#EAECEF] rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-1000 ${activeStatCycle === 0 ? 'bg-amber-500 w-[40%]' : 'bg-indigo-500 w-[55%]'}`}></div>
             </div>
           </div>
        </div>

      </div>

      {/* Main Content Area (Conditional Rendering) */}
      <div className={viewMode === 'list' ? 'bg-white rounded-[24px] overflow-hidden border border-[#E5E9F0]/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)]' : ''}>
        
        {/* Filter Bar (Visible in both modes) */}
        <div className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${viewMode === 'list' ? 'border-b border-[#E5E9F0]/80' : 'bg-white rounded-[24px] mb-8 border border-[#E5E9F0]/80 shadow-[0_2px_12px_rgba(0,0,0,0.01)]'}`}>
           <div className="flex items-center gap-3">
             <span className="flex items-center gap-2 text-[13px] font-bold text-gray-900 mr-2">
               <Filter className="w-4 h-4 text-gray-500" /> Filtrer Par :
             </span>
             
             <div className="relative">
                <select 
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="appearance-none bg-[#F4F6FC] text-[#5D6470] font-bold text-[13px] rounded-xl pl-4 pr-10 py-2 outline-none border border-transparent hover:bg-[#EAECEF] transition-colors cursor-pointer"
                >
                   <option>Tous les Rôles</option>
                   <option>Médecin</option>
                   <option>Réception</option>
                   <option>Admin</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                   <ChevronDown className="w-4 h-4" />
                </div>
             </div>

             <div className="relative">
                <select 
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="appearance-none bg-[#F4F6FC] text-[#5D6470] font-bold text-[13px] rounded-xl pl-4 pr-10 py-2 outline-none border border-transparent hover:bg-[#EAECEF] transition-colors cursor-pointer"
                >
                   <option>Tous les Services</option>
                   {availableServices.map(service => (
                     <option key={service} value={service}>{service}</option>
                   ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                   <ChevronDown className="w-4 h-4" />
                </div>
             </div>
           </div>

           <button 
             onClick={handleExport}
             className="flex items-center gap-2 text-[#0B56FA] bg-blue-50/50 hover:bg-blue-50 font-bold py-2 px-4 rounded-xl text-[13px] transition-colors border border-blue-100 shadow-sm active:scale-95"
           >
             <Download className="w-4 h-4" /> Exporter le Répertoire
           </button>
        </div>

        {viewMode === 'list' ? (
          /* List View (Table) */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F4F6FC] border-b border-[#E5E9F0]/80">
                  <th className={`px-6 text-[11px] font-bold tracking-widest text-[#8C93A1] uppercase ${isCompact ? 'py-2' : 'py-4'}`}>Nom & Identité</th>
                  <th className={`px-6 text-[11px] font-bold tracking-widest text-[#8C93A1] uppercase ${isCompact ? 'py-2' : 'py-4'}`}>Rôle</th>
                  <th className={`px-6 text-[11px] font-bold tracking-widest text-[#8C93A1] uppercase ${isCompact ? 'py-2' : 'py-4'}`}>Affectation du Service</th>
                  <th className={`px-6 text-[11px] font-bold tracking-widest text-[#8C93A1] uppercase ${isCompact ? 'py-2' : 'py-4'}`}>Statut</th>
                  <th className={`px-6 text-[11px] font-bold tracking-widest text-[#8C93A1] uppercase text-right ${isCompact ? 'py-2' : 'py-4'}`}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E9F0]/80">
                {currentStaffList.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'}`}>
                      <div className="flex items-center gap-4">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}&backgroundColor=${member.status === 'Actif' ? 'D1F0FF' : 'EAECEF'}`} 
                          className={`${isCompact ? 'w-8 h-8' : 'w-10 h-10'} rounded-full border border-gray-200 transition-all`} 
                          alt="Avatar"
                        />
                        <div>
                          <p className="text-[14px] font-extrabold text-gray-900 leading-tight">{member.name}</p>
                          <p className="text-[12px] font-medium text-[#8C93A1] mt-0.5">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className={`px-6 text-[14px] font-bold text-[#5D6470] ${isCompact ? 'py-2' : 'py-4'}`}>{member.role}</td>
                    <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'}`}>
                      <span className="flex items-center gap-2 text-[14px] font-bold text-gray-900">
                        <span className={`w-2 h-2 rounded-full ${member.department === 'Cardiologie' || member.department === 'Médecine Générale' ? 'bg-[#0B56FA]' : 'bg-[#8C93A1]'}`}></span> 
                        {member.department}
                      </span>
                    </td>
                    <td className={`px-6 ${isCompact ? 'py-2' : 'py-4'}`}>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        member.status === 'Actif' 
                        ? 'bg-[#DDEFDF] text-[#2F6B43]' 
                        : (member.status === 'En Congé' ? 'bg-[#EAECEF] text-[#5D6470]' : 'bg-[#FDF2F2] text-[#EF4444]')
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className={`px-6 text-right ${isCompact ? 'py-2' : 'py-4'}`}>
                      <button className="text-gray-400 hover:text-gray-900 p-2"><MoreVertical className="w-5 h-5"/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredStaff.length === 0 && (
              <div className="py-20 text-center text-[#8C93A1] font-bold italic bg-gray-50/30">
                 Aucun membre trouvé pour ces critères.
              </div>
            )}
          </div>
        ) : (
          /* Grid View (Cards) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {currentStaffList.map((member) => (
              <div key={member.id} className={`bg-white rounded-[28px] border border-[#E5E9F0]/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all group relative overflow-hidden ${isCompact ? 'p-4' : 'p-6'}`}>
                <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-10 rounded-full -mr-10 -mt-10 ${member.status === 'Actif' ? 'bg-emerald-500' : 'bg-gray-500'}`}></div>
                
                <div className={`flex justify-between items-start relative z-10 ${isCompact ? 'mb-3' : 'mb-6'}`}>
                   <div className="relative">
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}&backgroundColor=${member.status === 'Actif' ? 'D1F0FF' : 'EAECEF'}`} 
                        className={`${isCompact ? 'w-12 h-12' : 'w-16 h-16'} rounded-2xl border-2 border-white shadow-md relative z-10 p-0.5 bg-white transition-all`} 
                        alt="Avatar"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white z-20 ${member.status === 'Actif' ? 'bg-emerald-500' : 'bg-amber-400'}`}></div>
                   </div>
                   <button className="text-gray-300 hover:text-gray-600 p-1.5 hover:bg-gray-50 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5" />
                   </button>
                </div>

                <div className={`relative z-10 ${isCompact ? 'mb-3' : 'mb-6'}`}>
                   <h4 className="text-[17px] font-extrabold text-gray-900 mb-0.5 group-hover:text-[#0B56FA] transition-colors">{member.name}</h4>
                   <p className="text-[13px] font-bold text-[#8C93A1]">{member.role}</p>
                </div>

                <div className={`space-y-4 border-t border-gray-50 relative z-10 ${isCompact ? 'pt-3' : 'pt-4'}`}>
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0B56FA]"></div>
                        <p className="text-[12px] font-bold text-[#5D6470]">{member.department}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-extrabold uppercase tracking-widest ${
                        member.status === 'Actif' 
                        ? 'bg-[#E2F0E8] text-[#1E7444]' 
                        : 'bg-[#F4F6F9] text-[#5D6470]'
                      }`}>
                        {member.status}
                      </span>
                   </div>
                   <div className="flex items-center gap-2 text-[11px] font-medium text-[#8C93A1]">
                      <span className="truncate">{member.email}</span>
                   </div>
                </div>

                <div className="mt-6 flex gap-2 relative z-10">
                   <button className="flex-1 bg-white border border-[#E5E9F0] hover:border-[#0B56FA]/30 text-[#0B56FA] text-[12px] font-bold py-2 rounded-xl transition-all active:scale-95">
                      Profil
                   </button>
                   <button className="flex-1 bg-[#F4F6F9] hover:bg-[#EAECEF] text-gray-600 text-[12px] font-bold py-2 rounded-xl transition-all active:scale-95">
                      Contacter
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Footer (Visible in both modes) */}
        <div className={`p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${viewMode === 'list' ? 'border-t border-[#E5E9F0]/80' : 'bg-white rounded-[24px] border border-[#E5E9F0]/80 shadow-[0_2px_12px_rgba(0,0,0,0.01)] mb-12'}`}>
           <p className="text-[14px] font-semibold text-[#5D6470]">
             Affichage de {currentStaffList.length} sur {filteredStaff.length} employés filtrés
           </p>
           {totalPages > 1 && (
             <div className="flex items-center gap-2">
               <button 
                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                 disabled={currentPage === 1}
                 className={`w-8 h-8 flex items-center justify-center font-bold transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-900'}`}
               >
                 &lt;
               </button>
               
               {Array.from({ length: totalPages }).map((_, i) => (
                 <button 
                   key={i + 1}
                   onClick={() => setCurrentPage(i + 1)}
                   className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center transition-all ${
                     currentPage === i + 1 
                     ? 'bg-[#0B56FA] text-white shadow-sm scale-110' 
                     : 'text-gray-600 hover:bg-[#F4F6FC]'
                   }`}
                 >
                   {i + 1}
                 </button>
               ))}
               
               <button 
                 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                 disabled={currentPage === totalPages}
                 className={`w-8 h-8 flex items-center justify-center font-bold transition-colors ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-900'}`}
               >
                 &gt;
               </button>
             </div>
           )}
        </div>

      </div>
    </div>
  );
}

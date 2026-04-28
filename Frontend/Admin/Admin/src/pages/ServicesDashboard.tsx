import { 
  Briefcase,
  Users,
  HeartPulse,
  Clock,
  MoreVertical,
  Activity as Asterisk,
  Syringe,
  AlertTriangle,
  ArrowRight,
  Lock,
  TrendingDown,
  UserPlus,
  PlusCircle,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface MedicalService {
  id: string;
  name: string;
  category: string;
  description: string;
  hours: {
    [key: string]: {
      active: boolean;
      start: string;
      end: string;
    }
  };
  practitioner?: string;
  staffCount?: number;
  status?: 'normal' | 'warning';
  statusText?: string;
  iconType?: 'heart' | 'asterisk' | 'syringe' | 'activity';
}

const DEFAULT_SERVICES: MedicalService[] = [
  {
    id: '1',
    name: 'Unité de Cardiologie',
    category: 'Médecine Interne',
    description: 'Spécialisée dans les troubles cardiaques.',
    hours: { 'Lundi': { active: true, start: '08:00', end: '20:00' } }, // Simplified for display
    practitioner: 'Dr Sarah Jenkins',
    staffCount: 10,
    status: 'normal',
    iconType: 'heart'
  },
  {
    id: '2',
    name: "Soins d'Urgence",
    category: 'Urgences',
    description: 'Soins immédiats 24/7.',
    hours: { 'Tous les jours': { active: true, start: '00:00', end: '23:59' } },
    practitioner: 'Dr Michael Chen',
    staffCount: 26,
    status: 'normal',
    iconType: 'asterisk'
  },
  {
    id: '3',
    name: 'Laboratoire de Pathologie',
    category: 'Diagnostic',
    description: 'Analyses médicales approfondies.',
    hours: { 'Lun - Ven': { active: true, start: '09:00', end: '18:00' } },
    practitioner: 'Alex Thompson',
    staffCount: 3,
    status: 'warning',
    statusText: "En sous-effectif aujourd'hui",
    iconType: 'syringe'
  }
];

export default function ServicesDashboard() {
  const [services, setServices] = useState<MedicalService[]>(DEFAULT_SERVICES);
  const [activeStep, setActiveStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sanctuary_services');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as MedicalService[];
        const combined = [...parsed, ...DEFAULT_SERVICES];
        const unique = combined.filter((s, index, self) => 
          index === self.findIndex((t) => t.name === s.name)
        );
        setServices(unique);
      } catch (e) {
        console.error("Failed to parse services", e);
      }
    }

    // Animation interval (matched with dashboard style)
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveStep(prev => (prev === 0 ? 1 : 0));
        setIsTransitioning(false);
      }, 400); // 400ms toggle to match dashboard
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type?: string) => {
    switch(type) {
      case 'heart': return <HeartPulse className="w-7 h-7" />;
      case 'asterisk': return <Asterisk className="w-7 h-7" />;
      case 'syringe': return <Syringe className="w-7 h-7" />;
      default: return <Activity className="w-7 h-7" />;
    }
  };

  const formatHours = (service: MedicalService) => {
    if (service.name === "Soins d'Urgence") return "Opérations 24/7";
    
    // For custom services, find the first active day or show a summary
    const activeDays = Object.entries(service.hours).filter(([_, h]) => h.active);
    if (activeDays.length === 0) return "Fermé";
    if (activeDays.length === 7) return "Tous les jours : " + activeDays[0][1].start + " - " + activeDays[0][1].end;
    
    // Default display logic for custom services
    const first = activeDays[0];
    const last = activeDays[activeDays.length - 1];
    if (activeDays.length > 1) {
      return `${first[0].slice(0, 3)} - ${last[0].slice(0, 3)} : ${first[1].start} - ${first[1].end}`;
    }
    return `${first[0]} : ${first[1].start} - ${first[1].end}`;
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto">
      
      {/* Top Cards Row - Rebalanced (4-4-4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
        {/* Facility Overview Card */}
        <div className="lg:col-span-4 bg-white rounded-[24px] p-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] border border-[#E5E9F0]/80 relative overflow-hidden flex flex-col justify-between group">
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl group-hover:bg-blue-100 transition-colors duration-700"></div>
          <div>
            <h2 className="text-[20px] font-extrabold text-gray-900 mb-2 relative z-10 transition-all duration-500">Établissement</h2>
            <p className="text-[#5D6470] text-[13px] font-medium leading-relaxed mb-6 relative z-10 underline decoration-blue-500/20 decoration-2 underline-offset-4">
               Gérez vos services et votre personnel avec une précision éditoriale.
            </p>
          </div>
          <div className="flex flex-col gap-2 relative z-10">
             <Link to="/services/add" className="w-full bg-[#0B56FA] hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-[12px] transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]">
                <PlusCircle className="w-4 h-4" /> Nouveau Service
             </Link>
             <Link to="/staff/add" className="w-full bg-[#B8E1B0]/30 hover:bg-[#B8E1B0]/50 text-[#2D5A42] font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-[12px] transition-all hover:scale-[1.02] active:scale-[0.98]">
                <UserPlus className="w-4 h-4" /> Nouveau Personnel
             </Link>
          </div>
        </div>

        {/* Total Services Card (Animated - Dashboard Style) */}
        <div className="lg:col-span-4 bg-[#EEF2F9] rounded-[24px] p-6 border-0 flex flex-col justify-between cursor-pointer hover:bg-[#E4ECFA] transition-all duration-500 group overflow-hidden">
           <div className="flex gap-2 justify-between items-start">
             <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#0B56FA] shadow-sm">
                <Briefcase className="w-5 h-5 transition-transform group-hover:scale-110" />
             </div>
             <div className="flex flex-col items-end gap-1.5">
               <span className={`bg-white/60 backdrop-blur-sm text-[#0B56FA] text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm transition-all duration-500 ${isTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
                  {activeStep === 0 ? '+4 Nouveaux' : '100% Actif'}
               </span>
               <div className="flex gap-1 mr-1">
                 <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${activeStep === 0 ? 'w-4 bg-[#0B56FA]' : 'bg-gray-300'}`}></div>
                 <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${activeStep === 1 ? 'w-4 bg-[#0B56FA]' : 'bg-gray-300'}`}></div>
               </div>
             </div>
           </div>
           <div className="mt-8">
             <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
               <h3 className="text-[42px] font-extrabold text-gray-900 leading-none mb-1 tracking-tight">
                  {activeStep === 0 ? services.length : '12'}
               </h3>
             </div>
             <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
               <p className="text-[14px] font-semibold text-[#5D6470]">
                  {activeStep === 0 ? 'Services Actifs' : 'Unités Cruciales'}
               </p>
             </div>
           </div>
        </div>

        {/* Staff Members Card (Animated - Dashboard Style) */}
        <div className="lg:col-span-4 bg-[#F4F5F7] rounded-[24px] p-6 border-0 flex flex-col justify-between cursor-pointer hover:bg-[#EAECEF] transition-all duration-500 group overflow-hidden">
           <div className="flex gap-2 justify-between items-start">
             <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#5D6470] shadow-sm">
                <Users className="w-5 h-5 transition-transform group-hover:scale-110" />
             </div>
             <div className="flex flex-col items-end gap-1.5">
               <span className={`bg-white/60 backdrop-blur-sm text-[#1E7444] text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm transition-all duration-500 ${isTransitioning ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
                  {activeStep === 0 ? '98% Actif' : 'En Poste'}
               </span>
               <div className="flex gap-1 mr-1">
                 <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${activeStep === 0 ? 'w-4 bg-[#1E7444]' : 'bg-gray-300'}`}></div>
                 <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${activeStep === 1 ? 'w-4 bg-[#1E7444]' : 'bg-gray-300'}`}></div>
               </div>
             </div>
           </div>
           <div className="mt-8">
             <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
                <h3 className="text-[42px] font-extrabold text-gray-900 leading-none mb-1 tracking-tight">
                    {activeStep === 0 ? '142' : '48'}
                </h3>
             </div>
             <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                <p className="text-[14px] font-semibold text-[#5D6470]">
                    {activeStep === 0 ? 'Collaborateurs' : 'Praticiens en Service'}
                </p>
             </div>
           </div>
        </div>
      </div>

      {/* Directory & Status Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column - Active Services Directory */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[18px] font-extrabold text-gray-900">Répertoire des Services</h3>
            <Link to="/services/all" className="flex items-center gap-1 text-[13px] font-bold text-[#0B56FA] hover:text-blue-700">
              Voir Tout <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-[24px] p-5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] border border-[#E5E9F0]/80 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden">
                {service.status === 'warning' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                )}
                
                <div className="flex items-center gap-5">
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.status === 'warning' ? 'bg-[#FDF2F2] text-[#EF4444]' : 'bg-[#F5F7FA] text-[#0B56FA]'}`}>
                     {getIcon(service.iconType)}
                   </div>
                   <div>
                     <h4 className="text-[15px] font-extrabold text-gray-900 mb-0.5">{service.name}</h4>
                     <div className={`flex items-center gap-1.5 text-[11px] ${service.status === 'warning' ? 'font-bold text-[#D92D20]' : 'font-semibold text-[#8C93A1]'}`}>
                       {service.status === 'warning' ? <AlertTriangle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                       {service.status === 'warning' ? service.statusText : formatHours(service)}
                     </div>
                   </div>
                </div>
                
                <div className="hidden sm:flex items-center gap-12">
                  <div className="text-right">
                     <p className="text-[10px] font-bold text-[#8C93A1] uppercase mb-0.5">Responsable</p>
                     <p className="text-[13px] font-extrabold text-gray-900">{service.practitioner || "Libre"}</p>
                  </div>
                  <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                    <Users className="w-3.5 h-3.5 text-gray-400 mr-2" />
                    <span className="text-[12px] font-extrabold text-gray-900">{service.staffCount || 0}</span>
                  </div>
                </div>
                
                <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Monitoring (Reordered) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* 1. Wait Time Index (Critical Metric First) */}
          <div className="bg-gradient-to-br from-[#0B56FA] to-[#0842C4] rounded-[24px] p-6 text-white relative overflow-hidden shadow-lg shadow-blue-500/10">
             <div className="relative z-10">
               <p className="text-[10px] font-bold tracking-widest text-blue-200 uppercase mb-2">Temps d'Attente Moyen</p>
               <h3 className="text-[32px] font-extrabold leading-none mb-3">12.4 min</h3>
               <p className="text-[12px] font-semibold text-blue-100 flex items-center gap-1.5">
                  <TrendingDown className="w-3.5 h-3.5" /> -4% cette semaine
               </p>
             </div>
             <div className="absolute -right-6 -bottom-6 opacity-10">
                <Activity className="w-24 h-24" />
             </div>
          </div>

          {/* 2. System Status & Security */}
          <div className="bg-[#F6F8FC] border border-[#E5E9F0]/80 rounded-[24px] p-6">
             <div className="flex gap-3 mb-6">
               <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#0B56FA]">
                 <Lock className="w-5 h-5" />
               </div>
               <div>
                 <h4 className="text-[14px] font-extrabold text-gray-900">Sécurité Active</h4>
                 <p className="text-[12px] font-medium text-[#8C93A1]">Chiffrement AES-256</p>
               </div>
             </div>

             <h5 className="text-[10px] font-bold tracking-widest text-[#8C93A1] uppercase mb-4 pl-1">Journal d'Activité</h5>

             <div className="space-y-4">
                <div className="flex gap-3 p-2 hover:bg-white rounded-xl transition-colors">
                   <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                   <div>
                      <p className="text-[13px] font-bold text-gray-900 leading-tight">Dr Jenkins a pointé</p>
                      <p className="text-[11px] font-semibold text-[#8C93A1]">Cardiologie • 07:55 AM</p>
                   </div>
                </div>
                
                <div className="flex gap-3 p-2 hover:bg-white rounded-xl transition-colors">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2"></div>
                   <div>
                      <p className="text-[13px] font-bold text-gray-900 leading-tight">Planning mis à jour</p>
                      <p className="text-[11px] font-semibold text-[#8C93A1]">Général • 09:12 AM</p>
                   </div>
                </div>

                <div className="flex gap-3 p-2 hover:bg-white rounded-xl transition-colors">
                   <div className="w-2 h-2 rounded-full bg-orange-500 mt-2"></div>
                   <div>
                      <p className="text-[13px] font-bold text-gray-900 leading-tight">Nouveau profil créé</p>
                      <p className="text-[11px] font-semibold text-[#8C93A1]">Infirmiers • 10:04 AM</p>
                   </div>
                </div>
             </div>

             <button className="w-full mt-6 bg-white border border-[#E5E9F0] hover:border-gray-300 text-[12px] font-bold py-2.5 rounded-xl transition-all shadow-sm">
                Audit de Sécurité
             </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

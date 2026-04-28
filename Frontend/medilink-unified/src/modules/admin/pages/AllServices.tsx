import { 
  Search, 
  ArrowLeft, 
  Plus, 
  ChevronRight, 
  HeartPulse, 
  Activity, 
  Syringe, 
  Clock,
  MoreVertical,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    hours: { 'Lundi': { active: true, start: '08:00', end: '20:00' } },
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
    iconType: 'activity'
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
    statusText: "En sous-effectif",
    iconType: 'syringe'
  }
];

const CATEGORIES = ['Tous', 'Médecine Interne', 'Chirurgie', 'Pédiatrie', 'Diagnostic', 'Urgences'];

export default function AllServices() {
  const navigate = useNavigate();
  const [services, setServices] = useState<MedicalService[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  useEffect(() => {
    const saved = localStorage.getItem('sanctuary_services');
    let combined = [...DEFAULT_SERVICES];
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as MedicalService[];
        combined = [...parsed, ...DEFAULT_SERVICES];
      } catch (e) {
        console.error("Failed to parse services", e);
      }
    }
    // Unique by name
    const unique = combined.filter((s, index, self) => 
      index === self.findIndex((t) => t.name === s.name)
    );
    setServices(unique);
  }, []);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getIcon = (type?: string) => {
    switch(type) {
      case 'heart': return <HeartPulse className="w-5 h-5" />;
      case 'syringe': return <Syringe className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const formatHours = (service: MedicalService) => {
    if (service.name === "Soins d'Urgence") return "H24 / 7J";
    const activeDays = Object.values(service.hours).filter(h => h.active);
    if (activeDays.length === 0) return "Fermé";
    return `${activeDays[0].start} - ${activeDays[0].end}`;
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto pb-12 pt-4">
      
      {/* Header with Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <button 
            onClick={() => navigate('/services')}
            className="flex items-center gap-2 text-[13px] font-bold text-[#8C93A1] hover:text-[#0B56FA] transition-colors mb-3 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Retour au Dashboard
          </button>
          <h2 className="text-[34px] font-extrabold text-gray-900 tracking-tight">Répertoire des Services</h2>
          <p className="text-[#5D6470] text-[15px] font-medium leading-relaxed">
            Consultez et gérez l'ensemble des départements médicaux de votre établissement.
          </p>
        </div>
        
        <Link 
          to="/services/add"
          className="bg-[#0B56FA] hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95 text-[14px]"
        >
          <Plus className="w-5 h-5" /> Nouveau Service
        </Link>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] border border-[#E5E9F0]/80 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Rechercher un service ou une spécialité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F4F6F9] border-none rounded-2xl pl-12 pr-5 py-3.5 font-bold text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#0B56FA]/20 outline-none"
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <Filter className="w-4 h-4 text-gray-400 mr-2 hidden md:block" />
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-[12px] font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                  ? 'bg-[#0B56FA] text-white shadow-md shadow-blue-500/20' 
                  : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] border border-[#E5E9F0]/80">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F9FB] border-b border-gray-100">
                <th className="px-8 py-5 text-[11px] font-extrabold text-[#8C93A1] uppercase tracking-widest uppercase">Service / Département</th>
                <th className="px-8 py-5 text-[11px] font-extrabold text-[#8C93A1] uppercase tracking-widest uppercase">Responsable</th>
                <th className="px-8 py-5 text-[11px] font-extrabold text-[#8C93A1] uppercase tracking-widest uppercase">Statut / Horaires</th>
                <th className="px-8 py-5 text-[11px] font-extrabold text-[#8C93A1] uppercase tracking-widest uppercase">Eff.</th>
                <th className="px-8 py-5 text-[11px] font-extrabold text-[#8C93A1] uppercase tracking-widest uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.status === 'warning' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-[#0B56FA]'}`}>
                        {getIcon(service.iconType)}
                      </div>
                      <div>
                        <p className="text-[15px] font-extrabold text-gray-900 mb-0.5">{service.name}</p>
                        <p className="text-[11px] font-bold text-[#8C93A1] uppercase tracking-tighter">{service.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${service.practitioner || 'Doc'}`} alt="" className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[14px] font-bold text-gray-700">{service.practitioner || "Non assigné"}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1.5">
                       <div className="flex items-center gap-2">
                          {service.status === 'warning' ? (
                            <span className="flex items-center gap-1 text-[11px] font-extrabold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                              <AlertCircle className="w-3 h-3" /> Alerte
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3 h-3" /> Opérationnel
                            </span>
                          )}
                       </div>
                       <div className="flex items-center gap-1.5 text-[12px] font-bold text-gray-400">
                          <Clock className="w-3.5 h-3.5" /> {formatHours(service)}
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[14px] font-extrabold text-gray-900 bg-gray-50 w-8 h-8 rounded-lg flex items-center justify-center border border-gray-100">
                      {service.staffCount || 0}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2.5 text-gray-400 hover:text-[#0B56FA] hover:bg-blue-50 rounded-xl transition-all">
                          <Plus className="w-5 h-5" />
                       </button>
                       <button className="p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                          <MoreVertical className="w-5 h-5" />
                       </button>
                       <button className="p-2.5 text-[#0B56FA] opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="w-5 h-5" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredServices.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-[18px] font-bold text-gray-900">Aucun service trouvé</h3>
            <p className="text-gray-500 text-[14px] font-medium">Réessayez avec d'autres mots-clés ou filtres.</p>
          </div>
        )}
      </div>

    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  Search,
  CheckCircle,
  FileText,
  Thermometer,
  Stethoscope,
  ChevronDown,
  Heart,
  Pill,
  FlaskConical,
  ShieldCheck
} from 'lucide-react';
import FloatingNav from '../Composants/FloatingNav';
import TopNavBar from '../Composants/TopNavBar';

interface ArchivedTreatment {
  id: string;
  title: string;
  category: string;
  doctor: string;
  endDate: string;
  status: string;
  icon: any;
  color: string;
}

const ARCHIVED_DATA: ArchivedTreatment[] = [
  {
    id: 'bilan-2025',
    title: 'Bilan Sanguin Annuel',
    category: 'Prévi',
    doctor: 'Laboratoire SYNLAB',
    endDate: '12 Novembre 2025',
    status: 'Terminé',
    icon: Stethoscope,
    color: '#0055FF'
  },
  {
    id: 'grippe-2025',
    title: 'Grippe Saisonnière',
    category: 'Maladie Infectieuse',
    doctor: 'Dr. Martin (Généraliste)',
    endDate: '28 Décembre 2025',
    status: '100% Guéri',
    icon: Thermometer,
    color: '#FF6A5A'
  },
  {
    id: 'entorse-2024',
    title: 'Entorse Cheville',
    category: 'Traumatologie',
    doctor: 'Clinique du Sport',
    endDate: '15 Juin 2024',
    status: 'Terminé',
    icon: FileText,
    color: '#28B880'
  }
];

const Archives: React.FC = () => {
  const [search, setSearch] = useState('');
  const [archives, setArchives] = useState<ArchivedTreatment[]>(ARCHIVED_DATA);

  useEffect(() => {
    const ICONS: {[key:string]: any} = {
      Stethoscope, Thermometer, FileText, Heart, Pill, FlaskConical, ShieldCheck
    };
    
    let isBlankSlate = false;
    try {
      const trtsString = localStorage.getItem('medilink_treatments');
      if (trtsString === '[]') isBlankSlate = true;
    } catch(e) {}

    try {
      const stored = JSON.parse(localStorage.getItem('medilink_archives') || '[]');
      const mapped = stored.map((item: any) => ({...item, icon: ICONS[item.iconName] || FileText}));
      setArchives(isBlankSlate ? mapped : [...mapped, ...ARCHIVED_DATA]);
    } catch(e) {
      setArchives(isBlankSlate ? [] : ARCHIVED_DATA);
    }
  }, []);

  const filteredData = archives.filter((item) => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase()) ||
    item.doctor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-32 relative">
      <TopNavBar />

      <main className="max-w-6xl mx-auto px-4 md:px-8 xl:px-12 pt-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <button 
                onClick={() => window.history.back()}
                className="w-10 h-10 bg-white shadow-sm border border-[#F0F2F5] rounded-full flex items-center justify-center text-[#5A5C6B] hover:bg-[#F4F7FF] transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-3xl md:text-5xl font-bold text-[#14152A] tracking-tight">Historique Médical</h1>
            </div>
            <p className="text-[#5A5C6B] text-lg leading-relaxed max-w-lg md:ml-14">
              Retrouvez ici tous vos anciens bilans, ordonnances et traitements terminés à 100%.
            </p>
          </div>
          
          {/* Search bar */}
          <div className="relative w-full md:w-80">
             <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search size={20} className="text-[#8B8D98]" />
             </div>
             <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un ancien soin..."
                className="w-full bg-white border border-[#F0F2F5] text-[#14152A] rounded-full py-4 pl-12 pr-4 shadow-[0_8px_30px_rgba(0,0,0,0.03)] focus:outline-none focus:border-[#0055FF] focus:ring-2 focus:ring-[#0055FF]/10 transition-all font-medium"
             />
          </div>
        </div>

        {/* Section: Traitements terminés */}
        <div className="mb-6 flex items-center justify-between">
           <h2 className="text-2xl font-bold text-[#14152A] flex items-center gap-3">
             <CheckCircle className="text-[#28B880]" size={28} /> 
             Dossiers Clôturés
           </h2>
           <button className="flex items-center gap-2 text-[#5A5C6B] font-bold text-[14px] hover:text-[#0055FF] transition-colors bg-white px-4 py-2 rounded-full border border-[#F0F2F5] shadow-sm">
             Toutes les années <ChevronDown size={18} />
           </button>
        </div>

        <div className="flex flex-col gap-4">
           {filteredData.map((item) => (
             <div key={item.id} className="bg-white rounded-[24px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-[#F0F2F5] hover:-translate-y-1 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer">
                <div className="flex items-center gap-5">
                   <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}1A` }}>
                     <item.icon size={32} style={{ color: item.color }} strokeWidth={2.5} />
                   </div>
                   <div>
                     <p className="font-bold text-[11px] uppercase tracking-widest mb-1" style={{ color: item.color, opacity: 0.8 }}>{item.category}</p>
                     <h3 className="text-[20px] font-bold text-[#14152A] leading-tight mb-1 group-hover:text-[#0055FF] transition-colors">{item.title}</h3>
                     <p className="text-[#5A5C6B] text-[14px] font-medium">{item.doctor}</p>
                   </div>
                </div>
                
                <div className="flex flex-wrap items-center justify-between md:justify-end gap-4 md:gap-8 border-t md:border-t-0 border-[#F0F2F5] pt-4 md:pt-0">
                   <div className="hidden md:block">
                     <span className="bg-[#E5F7ED] text-[#1E9565] text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-[#D5E8DD]">
                       {item.status}
                     </span>
                   </div>
                   <div className="md:text-right">
                     <span className="block text-[#8B8D98] text-[10px] font-bold uppercase tracking-wider mb-1">FIN DU TRAITEMENT</span>
                     <span className="text-[#14152A] font-bold text-[15px]">{item.endDate}</span>
                   </div>
                   <div className="md:hidden">
                     <span className="bg-[#E5F7ED] text-[#1E9565] text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-[#D5E8DD]">
                       {item.status}
                     </span>
                   </div>
                   <button className="text-[#0055FF] font-bold text-[14px] hover:underline underline-offset-4 border border-[#0055FF]/10 bg-[#F4F7FF] px-4 py-2 rounded-xl group-hover:bg-[#0055FF] group-hover:text-white transition-colors">
                     Voir dossier
                   </button>
                </div>
             </div>
           ))}
        </div>

        {filteredData.length === 0 && (
           <div className="text-center py-20 flex flex-col items-center justify-center">
              <Search className="text-[#F0F2F5] mb-5 w-24 h-24" />
              {search ? (
                <p className="text-[#8B8D98] font-bold text-lg">Aucun historique trouvé pour "{search}"</p>
              ) : (
                <p className="text-[#8B8D98] font-bold text-lg">Votre historique médical est vide.</p>
              )}
           </div>
        )}

      </main>

      <FloatingNav />
    </div>
  );
};

export default Archives;

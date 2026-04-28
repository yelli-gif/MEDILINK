import React, { useState } from 'react';
import { 
  Heart,
  Calendar,
  Zap,
  Pill,
  FlaskConical,
  ShieldCheck,
  ChevronRight,
 
} from 'lucide-react';
import FloatingNav from '../Composants/FloatingNav';
import TopNavBar from '../Composants/TopNavBar';

const Traitement: React.FC = () => {
  const userStr = localStorage.getItem('medilink_user');
  const user = userStr ? JSON.parse(userStr) : { name: 'Dupont' };
  const firstName = user.name ? user.name.split(' ')[0] : 'Dupont';

  const ICONS: {[key:string]: any} = {
    Heart, Pill, FlaskConical, ShieldCheck
  };

  const DEFAULT_TREATMENTS = [
    { id: 'cardio', title: 'Traitement Cardiovasculaire', doctor: 'Dr. Fontaine', clinic: 'Clinique du Parc', startDate: '12 Fév 2026', endDate: '12 Juin 2026', progress: 70, medsPerDay: 4, daysRemaining: 57, status: 'ACTIF', color: '#0055FF', icon: Heart },
    { id: 'reeducation', title: 'Rééducation Posture', doctor: 'Dr. Martin', clinic: 'Kinesithérapie', startDate: '12 Avr 2026', endDate: '01 Mai 2026', progress: 30, medsPerDay: 1, daysRemaining: 15, status: 'ACTIF', color: '#E05F2D', icon: Pill },
    { id: 'paludisme', title: 'Traitement Paludisme', doctor: 'Dr. Dubois', clinic: 'Centre Maladies Infectieuses', startDate: '10 Avr 2026', endDate: '15 Mai 2026', progress: 15, medsPerDay: 3, daysRemaining: 29, status: 'ACTIF', color: '#28B880', icon: FlaskConical }
  ];

  const [treatments] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem('medilink_treatments');
      if (stored) {
         const parsed = JSON.parse(stored);
         return parsed.map((t: any) => ({...t, icon: ICONS[t.iconName] || Heart}));
      }
      
      const userStr = localStorage.getItem('medilink_user');
      const user = userStr ? JSON.parse(userStr) : { isNew: false };
      return user.isNew ? [] : DEFAULT_TREATMENTS;
    } catch(e) {
      return DEFAULT_TREATMENTS;
    }
  });

  const sortedTreatments = [...treatments].sort((a, b) => a.daysRemaining - b.daysRemaining);
  const [activeId, setActiveId] = useState(sortedTreatments[0]?.id || '');

  const mainTreatment = treatments.find((t) => t.id === activeId) || sortedTreatments[0];
  const otherTreatments = treatments.filter((t) => t.id !== activeId);

  // Logique de "Storytelling" du Résumé
  const globalAdherence = 98; // Pourrait provenir de l'état
  const feedbackMessage = globalAdherence >= 90 ? "Excellent ! Vous avez pris tous vos traitements à l'heure cette semaine." : 
                          globalAdherence >= 60 ? "Bien. Pensez à vérifier vos prises de midi pour tenir le rythme." : 
                          "Attention. Votre régularité a baissé. Avez-vous besoin d'un rappel supplémentaire ?";

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-32 relative">
      {/* Navbar */}
      <TopNavBar />

      <main className="max-w-6xl mx-auto px-4 md:px-8 xl:px-12 pt-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#14152A] tracking-tight mb-3">Bonjour {firstName}</h1>
            <p className="text-[#14152A]/60 text-lg leading-relaxed max-w-lg">
              Retrouvez ici le suivi détaillé de vos parcours de soins et l'évolution de vos traitements en cours.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm" style={{ backgroundColor: '#28B8801A', color: '#28B880' }}>
            <ShieldCheck size={18} />
            Dossier à jour
          </div>
        </div>

        {/* Top Grid - Focus dynamically on mainTreatment */}
        {mainTreatment ? (
        <>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 mb-6">
          
          {/* Main Card */}
          <div className="bg-white rounded-[32px] p-8 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.06)] flex flex-col md:flex-row gap-8 transition-all">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${mainTreatment.color}1A` }}>
                  <mainTreatment.icon size={28} color={mainTreatment.color} fill={mainTreatment.color} fillOpacity={0.2} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#14152A] mb-1">{mainTreatment.title}</h2>
                  <p className="text-[#14152A]/60 text-sm font-medium">{mainTreatment.doctor} • {mainTreatment.clinic}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 font-bold text-[15px] mb-8" style={{ color: mainTreatment.color }}>
                <Calendar size={20} />
                {mainTreatment.startDate} — {mainTreatment.endDate}
              </div>

              <div className="flex gap-4">
                <div className="flex-1 rounded-2xl p-5" style={{ backgroundColor: `${mainTreatment.color}0A` }}>
                  <span className="block text-xs font-bold mb-1 uppercase tracking-widest" style={{ color: mainTreatment.color, opacity: 0.8 }}>Médicaments</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[#14152A]">{mainTreatment.medsPerDay}</span>
                    <span className="text-[#14152A]/60 font-medium text-sm">/ jour</span>
                  </div>
                </div>
                <div className="flex-1 rounded-2xl p-5" style={{ backgroundColor: `${mainTreatment.color}0A` }}>
                  <span className="block text-xs font-bold mb-1 uppercase tracking-widest" style={{ color: mainTreatment.color, opacity: 0.8 }}>Jours restants</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[#14152A]">{mainTreatment.daysRemaining !== 999 ? mainTreatment.daysRemaining : '∞'}</span>
                    <span className="text-[#14152A]/60 font-medium text-sm">jours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Circular Progress */}
            <div className="w-full md:w-[240px] rounded-[24px] p-6 flex flex-col items-center justify-center" style={{ backgroundColor: `${mainTreatment.color}05` }}>
               <div className="relative w-32 h-32 mb-6">
                 {/* Background Circle */}
                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke={`${mainTreatment.color}1A`} strokeWidth="8" />
                    {/* Foreground Circle - Dash array calc: 2 * PI * 40 = 251.2 */}
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke={mainTreatment.color} strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * mainTreatment.progress / 100)} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[28px] font-bold text-[#14152A] leading-none mb-1">{mainTreatment.progress}%</span>
                    <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: mainTreatment.color, opacity: 0.8 }}>Complété</span>
                 </div>
               </div>
               <button 
                  onClick={() => window.location.href = `/ordonnances?id=${mainTreatment.id}`}
                  className="flex items-center justify-center gap-2 font-bold text-sm hover:underline transition-opacity" style={{ color: mainTreatment.color }}
               >
                 Voir les détails <ChevronRight size={16} strokeWidth={3} />
               </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Résumé hebdomadaire */}
            <div className="bg-white rounded-[24px] p-6 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.06)] relative overflow-hidden group">
               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at top right, #36595210, transparent)` }}></div>
               <div className="flex items-center gap-2 mb-6 text-[#365952]">
                 <Zap size={20} className="fill-[#365952]" />
                 <h3 className="font-bold text-lg">Résumé hebdomadaire</h3>
               </div>
               <div className="flex justify-between items-end mb-2">
                 <span className="text-[#14152A]/60 font-medium text-sm">Adhésion</span>
                 <span className="text-[#14152A] font-bold text-[15px]">{globalAdherence}%</span>
               </div>
               {/* Rail pastel 10% */}
               <div className="w-full h-2 rounded-full overflow-hidden mb-5" style={{ backgroundColor: '#28B8801A' }}>
                 <div className="h-full rounded-full transition-all duration-1000" style={{ backgroundColor: '#28B880', width: `${globalAdherence}%` }}></div>
               </div>
               <p className="text-[#14152A]/90 text-sm leading-relaxed font-medium">
                 {feedbackMessage}
               </p>
            </div>

            {/* Prochains rendez-vous (Data Linked au Main Treatment) */}
            <div className="bg-white rounded-[24px] p-6 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.06)]">
               <h3 className="text-[#14152A] font-bold text-lg mb-5">Prochains rendez-vous</h3>
               <button 
                 onClick={() => window.location.href = `/rdv?treatment_id=${mainTreatment.id}`}
                 className="w-full flex items-center gap-4 text-left hover:-translate-y-0.5 transition-transform cursor-pointer"
               >
                 <div className="w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0" style={{ backgroundColor: `${mainTreatment.color}1A` }}>
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: mainTreatment.color }}>Avr</span>
                    <span className="text-lg font-bold leading-none" style={{ color: mainTreatment.color }}>20</span>
                 </div>
                 <div>
                   <h4 className="font-bold text-[#14152A] text-[15px] mb-1">Bilan {mainTreatment.clinic.split(' ')[1] || mainTreatment.clinic}</h4>
                   <p className="text-[#14152A]/60 text-[13px] font-medium">14:30 • {mainTreatment.doctor}</p>
                 </div>
               </button>
            </div>
          </div>
        </div>

        {/* Bottom Grid for Secondary Treatments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherTreatments.map((treatment) => (
            <div 
              key={treatment.id} 
              onClick={() => setActiveId(treatment.id)}
              className="bg-white rounded-[32px] p-8 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.06)] relative group hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div 
                className="absolute top-8 right-8 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: `${treatment.color}1A`, color: treatment.color }}
              >
                {treatment.status}
              </div>
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${treatment.color}1A`, color: treatment.color }}>
                   <treatment.icon size={24} fill={treatment.color} fillOpacity={0.2} strokeWidth={2.5} />
                 </div>
                 <div>
                    <h3 className="text-[20px] font-bold text-[#14152A] mb-1">{treatment.title}</h3>
                    <p className="text-[#14152A]/60 text-[13px] font-medium">{treatment.clinic} • {treatment.doctor}</p>
                 </div>
              </div>
              <div className="flex justify-between items-end mb-4">
                <div>
                   <span className="block text-[#14152A]/40 text-[11px] font-bold mb-1 uppercase tracking-widest">Date de fin</span>
                   <span className="text-[#14152A] font-bold text-[15px]">{treatment.endDate}</span>
                </div>
                <div className="text-right">
                   <span className="block text-[#14152A]/40 text-[11px] font-bold mb-1 uppercase tracking-widest">Progression</span>
                   <span className="font-bold text-[15px]" style={{ color: treatment.color }}>{treatment.progress}%</span>
                </div>
              </div>
              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: `${treatment.color}1A` }}>
                <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ backgroundColor: treatment.color, width: `${treatment.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
        </>
        ) : (
          <div className="w-full flex justify-center py-20 opacity-60">
             <div className="flex flex-col items-center max-w-sm text-center">
                <FlaskConical size={64} className="text-[#8B8D98] mb-6" />
                <h2 className="text-2xl font-bold text-[#14152A] mb-2">Aucun traitement en cours</h2>
                <p className="text-[#5A5C6B]">Vous n'avez aucun traitement actif pour le moment. Tout va bien !</p>
             </div>
          </div>
        )}

      </main>

      {/* Floating Bottom Nav */}
      <FloatingNav />
    </div>
  );
};

export default Traitement;

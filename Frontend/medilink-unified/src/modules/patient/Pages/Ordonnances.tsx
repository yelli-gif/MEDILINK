import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Pill, 
  Check, 
  Plus, 
  Lightbulb,
  BriefcaseMedical,
 
  AlertCircle
} from 'lucide-react';
import FloatingNav from '../Composants/FloatingNav';
import TopNavBar from '../Composants/TopNavBar';
import { consultationAPI } from '../../../services/api';

const getInitialDoses = () => {
  try {
    const trtsString = localStorage.getItem('medilink_treatments');
    if (trtsString) {
      const trts = JSON.parse(trtsString);
      if (trts.length === 0) return [];
    } else {
      const userStr = localStorage.getItem('medilink_user');
      const user = userStr ? JSON.parse(userStr) : { isNew: false };
      if (user.isNew) return [];
    }
  } catch(e) {}

  const hash = window.location.search;
  let treatmentId = 'cardio';
  if (hash.includes('?')) {
    const params = new URLSearchParams(hash.split('?')[1]);
    treatmentId = params.get('id') || 'cardio';
  }

  if (treatmentId === 'paludisme') {
    return [
      { id: 1, name: 'Luméfantrine', dosage: '120mg', time: '08:00', timeNum: 8 * 60, taken: true, takenAt: '08:15', icon: Pill },
      { id: 2, name: 'Artéméther', dosage: '20mg', time: '14:00', timeNum: 14 * 60, taken: false, takenAt: null, icon: BriefcaseMedical },
      { id: 3, name: 'Luméfantrine', dosage: '120mg', time: '20:00', timeNum: 20 * 60, taken: false, takenAt: null, icon: Pill }
    ];
  } else if (treatmentId === 'reeducation') {
    return [
      { id: 1, name: 'Séance Kiné', dosage: '45min', time: '10:00', timeNum: 10 * 60, taken: false, takenAt: null, icon: BriefcaseMedical },
      { id: 2, name: 'Antalgique', dosage: '500mg', time: '20:00', timeNum: 20 * 60, taken: false, takenAt: null, icon: Pill }
    ];
  }
  // cardio by default
  return [
    { id: 1, name: 'Aspirine', dosage: '100mg', time: '08:00', timeNum: 8 * 60, taken: true, takenAt: '08:05', icon: Pill },
    { id: 2, name: 'Aspirine', dosage: '100mg', time: '20:00', timeNum: 20 * 60, taken: false, takenAt: null, icon: Pill },
    { id: 3, name: 'Atorvastatine', dosage: '20mg', time: '21:00', timeNum: 21 * 60, taken: false, takenAt: null, icon: BriefcaseMedical },
    { id: 4, name: 'Bisoprolol', dosage: '5mg', time: '08:00', timeNum: 8 * 60, taken: true, takenAt: '08:05', icon: Pill }
  ];
};

const Ordonnances: React.FC = () => {
  const [modalState, setModalState] = useState<{isOpen: boolean, doseId: number | null}>({isOpen: false, doseId: null});
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  // Ticker temps réel
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // MaJ chaque minute
    return () => clearInterval(timer);
  }, []);

  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const timeNum = currentHour * 60 + currentMinute;

  const getTreatmentId = () => {
    const hash = window.location.search;
    if (hash.includes('?')) {
      return new URLSearchParams(hash.split('?')[1]).get('id') || 'cardio';
    }
    return 'cardio';
  };

  const getTreatmentInfo = (id: string) => {
    if (id === 'paludisme') return { title: 'Paludisme', startDate: '10 Avr 2026', endDate: '15 Mai 2026', daysRemaining: 29 };
    if (id === 'reeducation') return { title: 'Rééducation Posture', startDate: '12 Avr 2026', endDate: '01 Mai 2026', daysRemaining: 15 };
    return { title: 'Cardiovasculaire', startDate: '12 Fév 2026', endDate: '12 Juin 2026', daysRemaining: 57 };
  };

  const [treatmentId, setTreatmentId] = useState(getTreatmentId());
  const [doses, setDoses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrescriptions = async () => {
      try {
        const userStr = localStorage.getItem('medilink_user');
        const user = userStr ? JSON.parse(userStr) : null;
        
        if (user?.patientId) {
          const data = await consultationAPI.parPatient(user.patientId);
          if (data && data.length > 0) {
            // Transformer les ordonnances en "doses" pour l'UI existante
            const allDoses: any[] = [];
            data.forEach((ord: any) => {
              // On peut splitter le contenu si c'est formaté avec des pipes
              const medications = (ord.contenu || "").split(' | ');
              medications.forEach((med: string, idx: number) => {
                allDoses.push({
                  id: `${ord.id}_${idx}`,
                  name: med.split(' (')[0],
                  dosage: med.includes('(') ? med.split('(')[1].split(',')[0] : '',
                  time: '08:00', // Par défaut si non spécifié
                  timeNum: 8 * 60,
                  taken: false,
                  icon: Pill,
                  ordId: ord.id
                });
              });
            });
            setDoses(allDoses);
          } else {
             setDoses(getInitialDoses());
          }
        } else {
          setDoses(getInitialDoses());
        }
      } catch (err) {
        console.error("Erreur chargement ordonnances:", err);
        setDoses(getInitialDoses());
      } finally {
        setLoading(false);
      }
    };

    loadPrescriptions();
  }, []);

  useEffect(() => {
    // Garder la logique de changement de hash pour la demo
    const handleHashChange = () => {
      setTreatmentId(getTreatmentId());
    };
    window.addEventListener('popstate', handleHashChange);
    return () => window.removeEventListener('popstate', handleHashChange);
  }, []);

  const treatmentInfo = getTreatmentInfo(treatmentId);

  // Logique de validation
  const handleTakeDose = (id: number) => {
    const dose = doses.find(d => d.id === id);
    if (!dose) return;
    
    // Alerte d'anticipation (plus de 2 heures en avance)
    if (timeNum < dose.timeNum - 120 && !dose.taken) {
      setModalState({ isOpen: true, doseId: id });
      return;
    }

    confirmTakeDose(id);
  };

  const confirmTakeDose = (id: number) => {
    const nowStr = currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    setDoses(prev => prev.map(d => d.id === id ? { ...d, taken: true, takenAt: nowStr } : d));
    
    // Save to local storage
    try {
      const stateStr = localStorage.getItem('medilink_ordonnances_state') || '{}';
      const stateObj = JSON.parse(stateStr);
      stateObj[`${treatmentId}_${id}`] = { taken: true, takenAt: nowStr };
      localStorage.setItem('medilink_ordonnances_state', JSON.stringify(stateObj));
    } catch (e) {}

    setModalState({ isOpen: false, doseId: null });
  };

  // Calculs dynamiques
  const takenCount = doses.filter((d: any) => d.taken).length;
  const totalDoses = doses.length;
  const percentage = totalDoses > 0 ? Math.round((takenCount / totalDoses) * 100) : 0;
  const isFinished = totalDoses > 0 && takenCount === totalDoses;

  const nextDose = [...doses].filter(d => !d.taken).sort((a, b) => a.timeNum - b.timeNum)[0];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans relative">
      {/* Navbar */}
      <TopNavBar />
      
      <main className="max-w-4xl mx-auto px-4 pt-8 pb-10">
        {loading ? (
          <div className="w-full flex justify-center py-20">
            <div className="text-[#5A5C6B] font-medium flex items-center gap-3">
               <div className="w-5 h-5 border-2 border-[#0055FF] border-t-transparent rounded-full animate-spin"></div>
               Chargement de vos ordonnances...
            </div>
          </div>
        ) : totalDoses === 0 ? (
          <div className="w-full flex justify-center py-20 opacity-60">
             <div className="flex flex-col items-center max-w-sm text-center">
                <Pill size={64} className="text-[#8B8D98] mb-6" />
                <h2 className="text-2xl font-bold text-[#14152A] mb-2">Aucune ordonnance</h2>
                <p className="text-[#5A5C6B]">Vous n'avez aucun traitement régulier à suivre pour le moment.</p>
             </div>
          </div>
        ) : (
          <>
        {/* En-tête */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-[#E6EFFF] text-[#0055FF] px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider mb-4">
            <div className="w-4 h-4 bg-[#0055FF] rounded flex items-center justify-center">
              <Plus size={12} className="text-white" strokeWidth={3} />
            </div>
            Dossier Médical
          </div>
          <h1 className="text-3xl md:text-[40px] font-bold text-[#14152A] tracking-tight mb-4 leading-tight">
            Ordonnance : {treatmentInfo.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-[#5A5C6B] text-[15px] font-medium">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#8B8D98]" /> {treatmentInfo.startDate} - {treatmentInfo.endDate}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[#8B8D98]" /> {treatmentInfo.daysRemaining} jours restants
            </div>
          </div>
        </div>

        {/* Global Progress KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-6 mb-12">
          {/* Progression Globale */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-[#F0F2F5] flex flex-col justify-center">
            <div className="flex justify-between items-end mb-6">
              <span className="text-[#5A5C6B] text-[15px] font-bold uppercase tracking-wide">Progression du jour</span>
              <span className="text-[36px] font-black text-[#14152A] leading-none transition-all duration-500 ease-out">{percentage}%</span>
            </div>
            <div className="w-full h-4 bg-[#F4F7FF] rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-gradient-to-r from-[#0055FF] to-[#4080FF] rounded-full transition-all duration-1000 ease-out" style={{ width: `${percentage}%` }}></div>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="bg-[#F4F7FF] rounded-[24px] p-6 flex justify-between items-center transition-colors">
              <div>
                 <span className="text-[#0055FF] text-[11px] font-black uppercase tracking-wider block mb-1">HORLOCGE</span>
                 <span className="text-[24px] font-bold text-[#14152A] leading-none">
                    {currentTime.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}
                 </span>
              </div>
              <div className="w-12 h-12 bg-[#E6EFFF] rounded-xl flex items-center justify-center animate-pulse">
                  <Clock size={20} className="text-[#0055FF]" />
              </div>
            </div>
            
            <div className={`rounded-[24px] p-6 flex justify-between items-center transition-all ${isFinished ? 'bg-[#E4F1E9] border border-[#D5E8DD]' : 'bg-[#FFF8F5] border border-[#FFE8E0]'}`}>
              <div>
                <span className={`text-[11px] font-black uppercase tracking-wider block mb-1 ${isFinished ? 'text-[#365952]' : 'text-[#E05F2D]'}`}>
                  PRISES EFFECTUÉES
                </span>
                <span className="text-[24px] font-bold text-[#14152A] leading-none">{takenCount}/{totalDoses}</span>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isFinished ? 'bg-[#D5E8DD]' : 'bg-[#FFE8E0]'}`}>
                  {isFinished ? (
                     <Check size={20} className="text-[#28B880]" strokeWidth={3} />
                  ) : (
                     <Plus size={20} className="text-[#E05F2D]" strokeWidth={3} />
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Intelligente */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[22px] font-bold text-[#14152A]">
               {isFinished ? "🎉 Vous avez terminé pour aujourd'hui !" : "Aujourd'hui - À prendre"}
            </h2>
            {!isFinished && nextDose && (
              <div className="inline-flex items-center gap-2 bg-[#E8ECF5] text-[#5A5C6B] px-4 py-2 rounded-full text-[13px] font-medium animate-pulse">
                <div className="w-2 h-2 bg-[#0055FF] rounded-full"></div>
                Prochaine dose: {nextDose.time}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {doses.map((dose) => {
              const Icon = dose.icon;
              const isPastDue = !dose.taken && timeNum > dose.timeNum + 30; // 30 min de retard
              const isDueSoon = !dose.taken && timeNum >= dose.timeNum - 60 && timeNum <= dose.timeNum + 30; // Dans l'heure
              const isFuture = !dose.taken && timeNum < dose.timeNum - 60;
              
              let cardStyle = "bg-white border-[#F0F2F5] shadow-[0_8px_30px_rgba(0,0,0,0.03)] opacity-100";
              let iconBg = "bg-[#F4F7FF] border-[#E6EFFF] text-[#5A5C6B]";
              let alertText = null;

              if (dose.taken) {
                 cardStyle = "bg-white border-[#F0F2F5] shadow-none scale-[0.98] transition-all";
                 iconBg = "bg-[#E1EDEB] text-[#365952]";
              } else if (isPastDue) {
                 cardStyle = "bg-[#FFF4F4] border-[#FFD5D5] shadow-[0_8px_30px_rgba(255,0,0,0.05)]";
                 iconBg = "bg-[#FFE5E5] text-[#E64C3C]";
                 alertText = "En retard";
              } else if (isDueSoon) {
                 cardStyle = "bg-white border-[#0055FF] shadow-[0_8px_30px_rgba(0,85,255,0.1)] ring-1 ring-[#0055FF] scale-[1.02] transition-transform";
                 iconBg = "bg-[#E6EFFF] text-[#0055FF]";
                 alertText = "C'est l'heure";
              } else if (isFuture) {
                 cardStyle = "bg-white border-[#F0F2F5] opacity-90";
                 iconBg = "bg-[#F4F7FF] text-[#8B8D98]";
                 alertText = "À venir";
              }

              return (
                <div key={dose.id} className={`rounded-[24px] p-6 flex items-center justify-between transition-all duration-500 ease-in-out border ${cardStyle}`}>
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-[16px] flex items-center justify-center transition-colors ${iconBg}`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-[18px] font-bold text-[#14152A]">{dose.name} {dose.dosage}</h3>
                        {alertText && !dose.taken && (
                          <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${isPastDue ? 'bg-[#FFE5E5] text-[#E64C3C]' : isDueSoon ? 'bg-[#E6EFFF] text-[#0055FF]' : 'bg-[#F0F2F5] text-[#8B8D98]'}`}>
                            {alertText}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-1.5 text-[14px] font-medium ${isPastDue && !dose.taken ? 'text-[#E64C3C]' : 'text-[#8B8D98]'}`}>
                          {isPastDue && !dose.taken ? <AlertCircle size={16} /> : <Clock size={16} />} 
                          {dose.time}
                        </div>
                        {dose.taken && (
                          <span className="bg-[#E4F1E9] text-[#28B880] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider animate-in slide-in-from-left-2 fade-in">
                            PRIS À {dose.takenAt}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Bouton d'action avec micro-interactions */}
                  {dose.taken ? (
                    <div className="w-12 h-12 bg-[#28B880] rounded-full flex items-center justify-center shadow-lg shadow-[#28B880]/30 animate-in zoom-in-50 spin-in-12 duration-300">
                      <Check size={24} className="text-white" strokeWidth={3} />
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleTakeDose(dose.id)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 shadow-md hover:shadow-lg ${isDueSoon ? 'bg-[#0055FF] text-white hover:bg-[#0047D6]' : isPastDue ? 'bg-[#E64C3C] text-white hover:bg-[#D64333]' : 'bg-white border-2 border-[#E8ECF5] text-[#8B8D98] hover:border-[#0055FF] hover:text-[#0055FF]'}`}
                    >
                      <Plus size={24} strokeWidth={isDueSoon ? 3 : 2} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Conseil clinique */}
        {!isFinished && (
           <div className="bg-gradient-to-r from-[#F4F7FF] to-[#EBF1FF] rounded-[24px] p-6 md:p-8 flex gap-5 items-start">
             <div className="w-12 h-12 bg-white rounded-[16px] flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(0,85,255,0.1)]">
               <Lightbulb size={24} className="text-[#0055FF]" />
             </div>
             <div>
               <h3 className="text-[18px] font-bold text-[#14152A] mb-2">Conseil clinique</h3>
               <p className="text-[#5A5C6B] text-[15px] leading-relaxed">
                 Le respect des horaires est crucial. Vous avez maintenu une régularité de 92% cette semaine. N'oubliez pas votre prochaine dose !
               </p>
             </div>
           </div>
        )}
          </>
        )}
      </main>

      {/* Floating Bottom Nav */}
      <FloatingNav />

      {/* Modal d'anticipation */}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-[#14152A]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.1)] animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-[#FFF4F4] text-[#E64C3C] rounded-full flex items-center justify-center mb-6 mx-auto">
              <AlertCircle size={28} strokeWidth={2.5} />
            </div>
            <h3 className="text-[22px] font-bold text-[#14152A] text-center mb-3">Validation anticipée</h3>
            <p className="text-[#5A5C6B] text-[15px] text-center leading-relaxed mb-8">
              Êtes-vous sûr de vouloir valider cette dose très en avance ? Il n'est que <span className="font-bold text-[#14152A]">{currentTime.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}</span>.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => modalState.doseId && confirmTakeDose(modalState.doseId)}
                className="w-full bg-[#0055FF] hover:bg-[#0047D6] text-white font-bold py-4 rounded-xl transition-colors shadow-md shadow-[#0055FF]/20"
              >
                Oui, valider la prise
              </button>
              <button 
                onClick={() => setModalState({ isOpen: false, doseId: null })}
                className="w-full bg-[#F4F7FF] hover:bg-[#EBF1FF] text-[#5A5C6B] font-bold py-4 rounded-xl transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ordonnances;

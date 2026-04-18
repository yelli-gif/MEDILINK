import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import SidebarPharmacie from '../../components/SidebarPharmacie';
import { usePrescriptions } from '../../context/PrescriptionContext';
import { HistoryRecord } from '../../types';

export default function ValidationDisponibilite(): React.JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const { getPrescriptionById, updatePrescriptionStatus } = usePrescriptions();
  
  const [record, setRecord] = useState<HistoryRecord | null>(null);
  const [availabilities, setAvailabilities] = useState<boolean[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      const found = getPrescriptionById(id);
      if (found) {
        setRecord(found);
        setAvailabilities(new Array(found.medicationList.length).fill(true));
        
        if (location.search.includes('print=true')) {
           setTimeout(() => window.print(), 500);
        }
      }
    }
  }, [id, getPrescriptionById, location.search]);

  const toggleAvailability = (index: number) => {
    const newAvail = [...availabilities];
    newAvail[index] = !newAvail[index];
    setAvailabilities(newAvail);
  };

  const handleSend = () => {
    if (!id) return;
    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      // PERSISTENT UPDATE: Change status in global state
      updatePrescriptionStatus(id, 'Validé');
      
      setIsSending(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        navigate('/pharmacie/dashboard');
      }, 2000);
    }, 1200);
  };

  const handleLitige = () => {
    if (!id) return;
    setIsSending(true);
    // Simulate API logic for Litige
    setTimeout(() => {
      updatePrescriptionStatus(id, 'Refusé');
      setIsSending(false);
      navigate('/pharmacie/dashboard');
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!record) {
    return (
      <div className="flex min-h-screen bg-[#f8fafb] items-center justify-center font-manrope">
         <div className="text-center">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tighter">Fiche introuvable</h2>
            <p className="text-slate-400 text-sm mb-6 uppercase font-bold tracking-widest">Le code session {id} n'existe pas.</p>
            <button onClick={() => navigate('/pharmacie/dashboard')} className="px-8 py-3 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl">Retour au HUB</button>
         </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafb] text-slate-900 font-manrope relative printable-area">
      <SidebarPharmacie />

      {/* Success Overlay */}
      {isSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/70 backdrop-blur-xl animate-in fade-in duration-700 print-hidden">
           <div className="bg-white p-12 rounded-[50px] shadow-2xl border border-slate-100 text-center animate-in zoom-in duration-500 max-w-sm">
              <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                 <span className="material-symbols-outlined text-5xl">check_circle</span>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter">Dossier Certifié</h3>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-8">Statut mis à jour : Validé</p>
              <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full"></div>
           </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col pb-24 md:pb-0">
        {/* TopAppBar */}
        <header className="sticky top-0 right-0 h-16 z-30 flex justify-between items-center px-4 md:px-10 w-full bg-white/60 backdrop-blur-xl border-b border-slate-100/50 print-hidden">
          <div className="flex items-center gap-4 flex-1">
             <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest hidden lg:block">Pôle de Validation Officinale</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] hidden sm:block">ID-PHARMA-{id}</span>
              <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-xs font-black">JV</div>
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <div className="p-4 md:p-10 max-w-6xl mx-auto w-full flex-1">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 md:mb-10 print-hidden">
            <span className="cursor-pointer hover:text-slate-900 transition-colors" onClick={() => navigate('/pharmacie/dashboard')}>Tableau de bord</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="hidden sm:inline cursor-pointer hover:text-slate-900 transition-colors" onClick={() => navigate('/pharmacie/historique')}>Archives</span>
            <span className="material-symbols-outlined text-[14px] hidden sm:inline">chevron_right</span>
            <span className="text-blue-600">ID {id}</span>
          </nav>

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8 md:mb-12 gap-6">
            <div className="printable-title">
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 mb-4 leading-tight">Dossier de Délivrance</h2>
              <div className="flex flex-wrap items-center gap-3">
                 <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${record.status === 'Validé' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{record.status}</span>
                 <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.1em] mt-0.5 whitespace-nowrap">Certificat N° {record.id} • {record.date}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 print-hidden w-full md:w-auto">
              <button 
                onClick={handlePrint}
                className="flex-1 md:flex-none px-6 md:px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-600 items-center justify-center gap-3 bg-white border border-slate-100 hover:bg-slate-50 hover:shadow-xl transition-all flex cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">print</span>
                PDF / Imprimer
              </button>
              <button 
                onClick={handleLitige}
                disabled={isSending || record.status === 'Validé' || record.status === 'Refusé'}
                className={`flex-1 md:flex-none px-4 md:px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white flex items-center justify-center gap-2 bg-rose-500 shadow-xl shadow-rose-500/20 hover:bg-rose-600 transition-all cursor-pointer ${(isSending || record.status === 'Validé' || record.status === 'Refusé') ? 'opacity-0 hidden' : ''}`}
              >
                <span className="material-symbols-outlined text-[16px]">warning</span>
                Litige / Refus
              </button>
              <button 
                onClick={handleSend}
                disabled={isSending || record.status === 'Validé' || record.status === 'Refusé'}
                className={`flex-1 md:flex-none px-6 md:px-12 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-white flex items-center justify-center gap-3 bg-blue-600 shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all cursor-pointer ${(isSending || record.status === 'Validé' || record.status === 'Refusé') ? 'bg-slate-300 shadow-none pointer-events-none text-slate-500' : ''}`}
              >
                {isSending ? (
                  <span className="material-symbols-outlined animate-spin">sync</span>
                ) : record.status === 'Validé' ? (
                  <span className="material-symbols-outlined">verified</span>
                ) : record.status === 'Refusé' ? (
                  <span className="material-symbols-outlined">block</span>
                ) : (
                  <span className="material-symbols-outlined">send</span>
                )}
                {record.status === 'Validé' ? 'Déjà Validé' : record.status === 'Refusé' ? 'Dossier Refusé' : 'Envoyer Signature'}
              </button>
            </div>
          </div>

          {/* Bento Layout */}
          <div className="grid grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column (Patient Info) */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
              <section className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100/50 relative overflow-hidden">
                <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-8">Données Patient</h3>
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-20 h-20 rounded-[30px] bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 shrink-0">
                    <span className="material-symbols-outlined text-4xl">person</span>
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter uppercase">{record.patient}</h4>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full inline-block mt-1">Vérifié via Medilink</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-end py-2 border-b border-slate-50">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inscrit depuis</span>
                    <span className="text-sm font-bold text-slate-900 underline decoration-blue-500/20 underline-offset-4">Oct. 2025</span>
                  </div>
                  <div className="flex justify-between items-end py-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secteur</span>
                    <span className="text-sm font-bold text-slate-900">Pharmacie de Garde</span>
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-4 print-hidden">
                   <span className="material-symbols-outlined text-slate-50 text-6xl">qr_code_2</span>
                </div>
              </section>

              <section className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden group shadow-2xl shadow-slate-900/20">
                <h3 className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em] mb-10 text-white group-hover:opacity-60 transition-opacity">Expert Médical Référent</h3>
                <div className="flex items-center gap-5 relative z-10">
                   <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400 backdrop-blur-3xl shadow-lg">
                      <span className="material-symbols-outlined text-3xl">stethoscope_check</span>
                   </div>
                   <div>
                      <p className="text-lg font-black text-white tracking-tight">{record.doctor}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-blue-400/80">{record.specialty}</p>
                   </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px]"></div>
              </section>
            </div>

            {/* Right Column (Medications) */}
            <div className="col-span-12 lg:col-span-8 space-y-10">
              <section className="bg-white rounded-[48px] overflow-hidden shadow-sm border border-slate-100/50">
                <div className="p-8 md:p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Posologies & Disponibilité</h3>
                  <div className="bg-slate-900 text-white px-5 py-2 rounded-2xl flex items-center gap-2">
                     <span className="text-[10px] font-black uppercase tracking-widest">{record.medicationList.length}</span>
                     <span className="material-symbols-outlined text-[16px]">medication</span>
                  </div>
                </div>
                <div className="divide-y divide-slate-50">
                  {record.medicationList.map((med, idx) => (
                    <div key={idx} className="p-8 md:p-10 flex flex-col sm:flex-row sm:items-center justify-between group gap-8 relative transition-all hover:bg-slate-50/50">
                      <div className="flex gap-6">
                        <div className="w-14 h-14 rounded-[20px] bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-blue-500 group-hover:shadow-xl transition-all duration-500 hover:rotate-6 shrink-0">
                          <span className="material-symbols-outlined text-3xl">pill</span>
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-xl mb-1 tracking-tight">{med.name}</p>
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 bg-blue-50/50 inline-block px-3 py-1 rounded-lg">{med.dosage}</p>
                          <p className="text-xs text-slate-400 font-bold leading-relaxed italic pr-6">{med.instructions}</p>
                        </div>
                      </div>
                      <label className="flex items-center gap-5 cursor-pointer select-none print-hidden shrink-0">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest whitespace-nowrap">Disponible en stock</span>
                        <input 
                          checked={availabilities[idx]} 
                          onChange={() => toggleAvailability(idx)} 
                          className="sr-only" 
                          type="checkbox"
                        />
                        <div 
                          className={`flex items-center rounded-full shrink-0 transition-colors duration-300 ${availabilities[idx] ? 'bg-blue-600' : 'bg-slate-200'}`}
                          style={{ minWidth: '56px', width: '56px', height: '32px', padding: '4px' }}
                        >
                          <div 
                            className={`bg-white rounded-full shadow-sm transition-transform duration-300 ${availabilities[idx] ? 'shadow-lg' : ''}`}
                            style={{ 
                              minWidth: '24px', width: '24px', height: '24px', 
                              transform: availabilities[idx] ? 'translateX(24px)' : 'translateX(0)' 
                            }}
                          ></div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </section>

              {/* Action Footer Card */}
              <div className="bg-blue-600 rounded-[48px] p-8 md:p-12 flex flex-wrap items-center justify-between gap-8 relative overflow-hidden shadow-3xl shadow-blue-600/30 print-hidden">
                <div className="flex items-center gap-6 z-10 flex-1 min-w-[280px]">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-[30px] bg-white/10 flex items-center justify-center text-white shrink-0 backdrop-blur-2xl ring-1 ring-white/20">
                    <span className="material-symbols-outlined text-4xl">task_alt</span>
                  </div>
                  <div className="text-white min-w-0">
                    <p className="text-2xl md:text-3xl font-black tracking-tighter mb-1 truncate">Délivrance Finale</p>
                    <p className="text-[10px] font-black opacity-50 uppercase tracking-[0.2em] break-words">Certifié conforme par Medilink Pharmanet</p>
                  </div>
                </div>
                <div className="flex items-center justify-center sm:justify-end gap-3 md:gap-4 w-full sm:w-auto z-10 shrink-0 flex-wrap">
                  <button 
                    onClick={handleLitige}
                    disabled={isSending || record.status === 'Validé' || record.status === 'Refusé'}
                    className={`px-6 py-6 rounded-[30px] w-auto text-[11px] font-black uppercase tracking-widest text-rose-100 hover:text-white bg-rose-500/20 hover:bg-rose-500 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer ${(isSending || record.status === 'Validé' || record.status === 'Refusé') ? 'opacity-0 hidden' : ''}`}
                  >
                    <span className="material-symbols-outlined text-xl">gavel</span>
                  </button>
                  <button 
                    onClick={handleSend}
                    disabled={isSending || record.status === 'Validé' || record.status === 'Refusé'}
                    className="flex-1 md:flex-none w-auto px-8 md:px-16 py-6 rounded-[30px] text-[11px] font-black uppercase tracking-widest text-blue-600 bg-white shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:grayscale disabled:scale-100 disabled:bg-slate-200 disabled:text-slate-500 whitespace-nowrap"
                  >
                    {isSending ? 'Finalisation...' : record.status === 'Validé' ? 'Validé' : record.status === 'Refusé' ? 'Refusé' : 'Soumettre'}
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

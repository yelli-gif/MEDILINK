import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarPharmacie from '../../components/SidebarPharmacie';
import SyncStatusPopup from '../../components/SyncStatusPopup';
import { usePrescriptions } from '../../context/PrescriptionContext';

export default function DashboardPharmacie(): React.JSX.Element {
  const navigate = useNavigate();
  const [showStatus, setShowStatus] = useState(false);
  const { prescriptions } = usePrescriptions();

  // Filter strictly for tasks needing action
  const pendingPrescriptions = prescriptions.filter(p => p.status === 'En Attente');
  const recentHistory = pendingPrescriptions.slice(0, 5);
  const archivedCount = prescriptions.length - pendingPrescriptions.length;

  return (
    <div className="bg-[#f8fafb] text-slate-900 min-h-screen flex relative font-manrope">
      <SidebarPharmacie />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen relative w-full pb-24 md:pb-0">
        {/* TopAppBar */}
        <header className="fixed top-0 right-0 left-0 md:left-64 h-16 z-30 flex justify-between items-center px-4 md:px-8 w-full bg-white/60 backdrop-blur-2xl border-b border-slate-100/50">
          <div className="flex items-center gap-4 md:gap-6 flex-1">
            <h2 className="text-sm md:text-lg font-black text-slate-900 font-manrope tracking-tight whitespace-nowrap">Tableau de Bord</h2>
            <div className="relative w-full max-w-sm hidden lg:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
              <input className="w-full bg-slate-50 border-none rounded-2xl py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400 outline-none font-bold" placeholder="Rechercher..." type="text"/>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex gap-1 sm:gap-2">
              <button 
                onClick={() => setShowStatus(!showStatus)}
                className={`p-2 transition-all rounded-xl cursor-pointer ${showStatus ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-blue-600'}`}
              >
                <span className="material-symbols-outlined">sync</span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest hidden sm:block">Pharmacie</span>
              <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg shadow-slate-900/10">JV</div>
            </div>
          </div>

          {/* Status Popup */}
          {showStatus && (
            <SyncStatusPopup onClose={() => setShowStatus(false)} />
          )}
        </header>

        {/* Content Canvas */}
        <div className="flex-1 mt-16 p-4 md:p-8 flex flex-col gap-6 md:gap-10">
          {/* Summary Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
            <div className="bg-white p-7 rounded-[32px] flex flex-col justify-between min-h-[160px] group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 shadow-sm border border-slate-100/50 relative overflow-hidden">
              <div className="flex justify-between items-start relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <span className="material-symbols-outlined text-2xl">local_shipping</span>
                </div>
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">Flux du jour</span>
              </div>
              <div className="relative z-10">
                <p className="text-4xl font-black text-slate-900 tracking-tighter mb-1">{pendingPrescriptions.length}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">En attente de validation</p>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-50/30 rounded-full blur-2xl group-hover:bg-blue-600/10 transition-all duration-700"></div>
            </div>

            <div onClick={() => navigate('/pharmacie/historique')} className="bg-white p-7 rounded-[32px] flex flex-col justify-between min-h-[160px] group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer shadow-sm border border-slate-100/50 relative overflow-hidden">
              <div className="flex justify-between items-start relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-slate-600 group-hover:text-white transition-all duration-500">
                  <span className="material-symbols-outlined text-2xl">inventory_2</span>
                </div>
                <span className="text-[10px] font-black text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full">Classé</span>
              </div>
              <div className="relative z-10">
                <p className="text-4xl font-black text-slate-900 tracking-tighter mb-1">{archivedCount}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Dossiers en Archivage</p>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-slate-50/100 rounded-full blur-2xl group-hover:bg-slate-200/50 transition-all duration-700"></div>
            </div>

            <div onClick={() => pendingPrescriptions.length > 0 ? navigate(`/pharmacie/validation/${pendingPrescriptions[0].id}`) : null} className={`bg-white p-7 rounded-[32px] flex flex-col justify-between h-40 group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 shadow-sm border border-slate-100/50 relative overflow-hidden hidden md:flex ${pendingPrescriptions.length > 0 ? 'cursor-pointer' : 'opacity-70 pointer-events-none'}`}>
              <div className="flex justify-between items-start relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500">
                  <span className="material-symbols-outlined text-2xl">arrow_forward</span>
                </div>
                <span className="text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full">Traiter le prochain</span>
              </div>
              <div className="relative z-10">
                <p className="text-4xl font-black text-slate-900 tracking-tighter mb-1">Go</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Prêt pour Finalisation</p>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-slate-50/50 rounded-full blur-2xl group-hover:bg-blue-600/10 transition-all duration-700"></div>
            </div>
          </section>

          {/* Main Visual Hub */}
          <section className="bg-white rounded-[40px] p-8 md:p-10 shadow-sm border border-slate-100/50 flex flex-col gap-10">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Historique Récent</h3>
                <p className="text-xs text-slate-400 font-medium">Flux numérique en temps réel du réseau Medilink</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => navigate('/pharmacie/historique')} className="px-6 py-3 bg-slate-50 text-[11px] font-black uppercase tracking-widest rounded-2xl text-slate-500 hover:bg-slate-900 hover:text-white transition-all duration-300">Tout consulter</button>

              </div>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-4">
              {recentHistory.map((item, idx) => {
                const statusColor = item.status === 'Validé' ? 'bg-emerald-50 text-emerald-700' : 
                                    item.status === 'Refusé' ? 'bg-rose-50 text-rose-700' : 
                                    'bg-amber-50 text-amber-700';
                return (
                  <div key={idx} onClick={() => navigate(`/pharmacie/validation/${item.id}`)} className="bg-[#fcfdfe] p-6 rounded-[24px] flex flex-col sm:flex-row sm:items-center justify-between hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 cursor-pointer border border-transparent hover:border-slate-100 group">
                    <div className="flex items-center gap-6 w-full sm:w-1/3">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 transition-all group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                        <span className="material-symbols-outlined text-3xl">person</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-slate-900 text-lg truncate group-hover:text-blue-600 transition-colors uppercase tracking-tight">{item.patient}</h4>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">ID: {item.id}</p>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/4 mt-4 sm:mt-0 flex justify-between sm:block border-t sm:border-none pt-4 sm:pt-0">
                      <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.2em] mb-1">Prescripteur</p>
                      <p className="text-xs font-bold text-slate-700">{item.doctor}</p>
                    </div>
                    <div className="w-full sm:w-1/6 flex justify-between sm:block">
                      <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.2em] mb-1">Archivage</p>
                      <p className="text-xs font-bold text-slate-700">{item.date} • {item.time}</p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6 mt-6 sm:mt-0">
                      <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${statusColor} shadow-sm animate-in fade-in duration-500`}>{item.status}</span>
                      <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-200 hover:text-slate-900 transition-colors">
                        <span className="material-symbols-outlined text-2xl font-light">keyboard_arrow_right</span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </div>

        {/* Mobile Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-3xl border-t border-slate-100 px-6 z-50 flex justify-around items-center">
             <div onClick={() => navigate('/pharmacie/dashboard')} className="flex flex-col items-center gap-1.5 cursor-pointer text-blue-600">
               <div className="bg-blue-50 p-2 rounded-xl">
                  <span className="material-symbols-outlined text-2xl">dashboard</span>
               </div>
               <span className="text-[9px] font-black uppercase tracking-widest">Board</span>
             </div>
             <div onClick={() => navigate('/pharmacie/historique')} className="flex flex-col items-center gap-1.5 cursor-pointer text-slate-400 hover:text-blue-500 transition-all">
               <span className="material-symbols-outlined text-2xl">history</span>
               <span className="text-[9px] font-black uppercase tracking-widest">Historique</span>
             </div>
        </nav>
      </main>
    </div>
  );
}

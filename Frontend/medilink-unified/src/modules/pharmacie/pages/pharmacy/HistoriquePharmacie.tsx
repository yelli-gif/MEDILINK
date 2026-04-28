import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarPharmacie from '../../components/SidebarPharmacie';
import SyncStatusPopup from '../../components/SyncStatusPopup';
import PrescriptionModal from '../../components/PrescriptionModal';
import ActionMenu from '../../components/ActionMenu';
import type { HistoryRecord } from '../../types';
import { usePrescriptions } from '../../context/PrescriptionContext';
import { pharmacieAPI } from '../../../../services/api';
import { useEffect } from 'react';

export default function HistoriquePharmacie(): React.JSX.Element {
  const navigate = useNavigate();
  const { prescriptions, updatePrescriptionStatus } = usePrescriptions();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Tous' | 'Validé' | 'Refusé' | 'En Attente'>('Tous');
  const [showStatus, setShowStatus] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<HistoryRecord | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const [realPrescriptions, setRealPrescriptions] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPrescriptions = async () => {
      try {
        setLoading(true);
        const data = await pharmacieAPI.getDemandes();
        if (Array.isArray(data)) {
          const mapped: HistoryRecord[] = data.map((p: any) => ({
            id: p.id?.toString() || Math.random().toString(),
            patient: p.patientName || `Patient ${p.patientId}`,
            date: p.dateDemande || new Date().toLocaleDateString('fr-FR'),
            time: p.heureDemande || '--:--',
            medication: p.medicaments || 'Non spécifié',
            doctor: p.medecinName || 'Dr. Inconnu',
            status: p.statut === 'VALIDE' ? 'Validé' : p.statut === 'REFUSE' ? 'Refusé' : 'En Attente',
            specialty: p.service || 'Pharmacie',
            medicationList: [] // TODO: map properly if available
          }));
          setRealPrescriptions(mapped);
        }
      } catch (err) {
        console.error("Erreur chargement prescriptions pharma:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPrescriptions();
  }, []);

  const displayList = realPrescriptions.length > 0 ? realPrescriptions : prescriptions;

  const filteredHistory = displayList.filter(record => {
    const matchesSearch = record.patient.toLowerCase().includes(searchTerm.toLowerCase()) || record.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tous' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAction = (id: string, action: string) => {
    if (action === 'print' || action === 'export') {
      navigate(`/pharmacie/validation/${id}?print=true`);
    } else if (action === 'report') {
      updatePrescriptionStatus(id, 'Refusé');
    }
  };

  return (
    <div className="bg-[#f8fafb] text-slate-900 min-h-screen flex w-full relative font-manrope printable-area">
      <SidebarPharmacie />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col min-w-0 bg-[#f8fafb] h-body">
        {/* Top Navigation Bar */}
        <header className="glass-header sticky top-0 z-30 flex items-center justify-between px-6 md:px-10 py-5 border-b border-slate-100/50 bg-white/60 backdrop-blur-3xl print-hidden">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-[20px] bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-900/10">
                <span className="material-symbols-outlined text-2xl">history</span>
             </div>
             <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900">Archive Hub</h2>
                <div className="flex items-center gap-2 group cursor-help">
                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Flux Officinal</p>
                   <span className="material-symbols-outlined text-[14px] text-slate-300 group-hover:text-blue-500 transition-colors">info</span>
                </div>
             </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="relative w-80 hidden lg:block">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-lg">search</span>
                <input 
                  type="text" 
                  placeholder="ID Dossier, Patient..." 
                  className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-6 text-xs focus:ring-2 focus:ring-blue-500/20 transition-all outline-none font-manrope font-bold"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <div className="relative">
                <button 
                  onClick={() => setShowStatus(!showStatus)}
                  className={`w-12 h-12 rounded-2xl border transition-all ${showStatus ? 'bg-primary/10 text-primary border-primary/20' : 'border-slate-100 bg-white text-slate-400 hover:text-blue-500 hover:shadow-lg'}`}
                >
                    <span className="material-symbols-outlined text-2xl">sync</span>
                </button>
                {showStatus && <SyncStatusPopup onClose={() => setShowStatus(false)} />}
             </div>

          </div>
        </header>

        <div className="px-6 md:px-10 py-10 space-y-10 print-hidden">
           {/* Stats Section */}
           <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                  { label: 'Total Archives', val: prescriptions.length, color: 'text-slate-900', bg: 'bg-white' },
                  { label: 'Validées', val: prescriptions.filter(p => p.status === 'Validé').length, color: 'text-emerald-600', bg: 'bg-emerald-50/30' },
                  { label: 'Réfusées', val: prescriptions.filter(p => p.status === 'Refusé').length, color: 'text-rose-600', bg: 'bg-rose-50/30' },
                  { label: 'En attente', val: prescriptions.filter(p => p.status === 'En Attente').length, color: 'text-amber-600', bg: 'bg-amber-50/30' }
              ].map((s, idx) => (
                <div key={idx} className={`${s.bg} p-8 rounded-[32px] shadow-sm border border-slate-100/50 flex flex-col justify-between h-36`}>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{s.label}</span>
                    <p className={`text-4xl font-black ${s.color} tracking-tighter`}>{s.val}</p>
                </div>
              ))}
           </section>

           {/* Filters */}
           <section className="flex flex-col sm:flex-row gap-6 items-center justify-between">
              <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm w-full sm:w-auto">
                 {['Tous', 'Validé', 'Refusé', 'En Attente'].map((f) => (
                    <button 
                      key={f}
                      onClick={() => setStatusFilter(f as any)}
                      className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === f ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        {f === 'Tous' ? 'Tout' : f}
                    </button>
                 ))}
              </div>
           </section>

           {/* Table */}
           <section className="bg-white rounded-[48px] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-5 duration-700">
              <div className="overflow-x-auto scrollbar-hide">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-slate-50/50">
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Patient Core ID</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Horodatage</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Médication</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Signature</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Validation</th>
                          <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Détails</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {filteredHistory.map((record) => (
                          <tr key={record.id} className="hover:bg-slate-50 transition-all duration-300 group cursor-pointer" onClick={(e) => {
                             if ((e.target as HTMLElement).closest('button')) return;
                              if (record.status === 'En Attente') {
                                 navigate(`/pharmacie/validation/${record.id}`);
                              } else {
                                 setSelectedRecord(record);
                              }
                          }}>
                             <td className="px-10 py-7">
                                <div className="flex items-center gap-5">
                                   <div className="w-12 h-12 rounded-2xl bg-[#fcfdfe] border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:shadow-lg transition-all">
                                      <span className="material-symbols-outlined text-2xl">person</span>
                                   </div>
                                   <div>
                                      <p className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors uppercase tracking-tight">{record.patient}</p>
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID: {record.id}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="px-10 py-7">
                                <p className="text-sm font-bold text-slate-700">{record.date}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase">{record.time}</p>
                             </td>
                             <td className="px-10 py-7">
                                <div className="flex items-center gap-3">
                                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
                                   <p className="text-sm font-bold text-slate-700">{record.medication}</p>
                                </div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">{record.specialty}</p>
                             </td>
                             <td className="px-10 py-7 text-xs font-black text-slate-400 uppercase tracking-widest italic">{record.doctor}</td>
                             <td className="px-10 py-7">
                                <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${record.status === 'Validé' ? 'bg-emerald-50 text-emerald-700' : record.status === 'Refusé' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}`}>
                                   {record.status}
                                </span>
                             </td>
                             <td className="px-10 py-7 text-right">
                                <div className="flex items-center justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative">
                                   <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveMenuId(activeMenuId === record.id ? null : record.id);
                                      }}
                                      className={`w-9 h-9 rounded-xl border transition-all ${activeMenuId === record.id ? 'bg-slate-900 text-white shadow-xl' : 'bg-white border-slate-100 text-slate-400 hover:text-slate-900 hover:shadow-lg'}`}
                                   >
                                      <span className="material-symbols-outlined text-xl">more_horiz</span>
                                   </button>
                                   {activeMenuId === record.id && (
                                     <ActionMenu 
                                        onClose={() => setActiveMenuId(null)} 
                                        onAction={(action) => handleAction(record.id, action)} 
                                     />
                                   )}
                                </div>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              {filteredHistory.length === 0 && (
                 <div className="p-32 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        {loading ? <span className="material-symbols-outlined text-4xl text-blue-500 animate-spin">sync</span> : <span className="material-symbols-outlined text-4xl text-slate-200">search_off</span>}
                    </div>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-xs">
                       {loading ? 'Chargement des archives...' : 'Aucune archive correspondante'}
                    </p>
                 </div>
              )}
           </section>
        </div>
      </main>

      {/* Prescription Modal */}
      {selectedRecord && (
        <PrescriptionModal 
          record={selectedRecord} 
          onClose={() => setSelectedRecord(null)} 
        />
      )}
    </div>
  );
}

import React from 'react';
import type { HistoryRecord } from '../types';

interface PrescriptionModalProps {
  record: HistoryRecord;
  onClose: () => void;
}

export default function PrescriptionModal({ record, onClose }: PrescriptionModalProps): React.JSX.Element {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-0">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in slide-in-from-bottom-10 duration-500 font-manrope">
        <header className="p-8 border-b border-slate-100 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">Ordonnance Numerisée</span>
               <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${record.status === 'Validé' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{record.status}</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Détails de Prescription</h2>
            <p className="text-sm text-slate-400 font-medium">Référence : {record.id} • {record.date}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all">
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </header>

        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto scrollbar-hide">
          {/* Patient & Doctor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ring-1 ring-slate-100 p-6 rounded-3xl bg-slate-50/50">
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Bénéficiaire</p>
                <p className="font-bold text-slate-900">{record.patient}</p>
                <p className="text-xs text-slate-400 italic">Dossier Médical Partagé actif</p>
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Prescripteur</p>
                <p className="font-bold text-slate-900">{record.doctor}</p>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-[0.1em]">{record.specialty}</p>
             </div>
          </div>

          {/* Diagnosis */}
          {record.diagnosis && (
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Diagnostic Associe</p>
               <p className="text-sm text-slate-700 leading-relaxed font-medium bg-blue-50/30 p-4 rounded-2xl border border-blue-100/50">{record.diagnosis}</p>
            </div>
          )}

          {/* Medications */}
          <div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Traitements Prescrits</p>
             <div className="space-y-4">
                {record.medicationList.map((med, idx) => (
                  <div key={idx} className="p-5 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all">
                     <div className="flex justify-between items-start mb-2">
                        <h4 className="font-extrabold text-slate-900">{med.name}</h4>
                        <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">{med.dosage}</span>
                     </div>
                     <p className="text-xs text-slate-500 leading-relaxed italic">{med.instructions}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <footer className="p-8 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center sm:block">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-4">
               <div className="flex flex-col gap-1 print-hidden">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Signature Électronique</p>
                  <p className="text-xs font-black text-slate-400">Certifiée par Medilink Hub • ID-SIGN-00X32</p>
               </div>
               <div className="flex gap-4 print-hidden">
                  <button onClick={() => window.print()} className="flex-1 sm:flex-none px-6 py-3 bg-slate-900 text-[11px] font-black uppercase tracking-widest text-white rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">Imprimer</button>
               </div>
            </div>
         </footer>
      </div>
    </div>
  );
}

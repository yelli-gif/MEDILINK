import React from 'react';

interface SyncStatusPopupProps {
  onClose: () => void;
}

export default function SyncStatusPopup({ onClose }: SyncStatusPopupProps): React.JSX.Element {
  return (
    <div className="absolute top-20 right-8 w-80 p-7 bg-white/95 backdrop-blur-[40px] rounded-[32px] border-none shadow-2xl z-50 animate-in fade-in zoom-in duration-300 origin-top-right">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
        <h5 className="text-sm font-black text-slate-900 tracking-tight">Système Opérationnel</h5>
      </div>
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">Liaison Medilink</span>
          <span className="text-emerald-600 font-black text-[10px] bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">Connecté</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div className="bg-emerald-500 w-[94%] h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.2)]"></div>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
          Chiffrement de bout en bout actif. Vos données officinales sont synchronisées avec le Hub National en temps réel.
        </p>
        <div className="pt-3 flex justify-end border-t border-slate-50">
            <button 
              onClick={onClose} 
              className="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-slate-900 hover:bg-slate-50 transition-all"
            >
              Masquer
            </button>
        </div>
      </div>
    </div>
  );
}

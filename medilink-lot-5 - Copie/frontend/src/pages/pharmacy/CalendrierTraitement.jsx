import React from 'react';
import { Calendar, ChevronLeft, ChevronRight, Pill } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CalendrierTraitement() {
  const navigate = useNavigate();
  const jours = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const dates = [
    { num: '10', type: 'COMPLETED' },
    { num: '11', type: 'COMPLETED' },
    { num: '12', type: 'MISSED' },
    { num: '13', type: 'COMPLETED' },
    { num: '14', type: 'TODAY' },
    { num: '15', type: 'FUTURE' },
    { num: '16', type: 'FUTURE' }
  ];

  return (
    <div className="size-full min-h-screen bg-clinical-bg flex flex-col font-sans">
      <div className="bg-clinical-surface shadow-sm p-6 sticky top-0 z-10 border-b border-clinical-border flex items-center justify-between">
        <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 border border-clinical-border rounded-xl text-clinical-text-muted hover:text-clinical-text-dark bg-clinical-surface hover:bg-clinical-surface-hover transition cursor-pointer">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-clinical-text-dark">Calendrier</h1>
              <p className="text-sm text-clinical-text-muted">Jours de traitement</p>
            </div>
        </div>
        <div className="bg-clinical-primary-10 rounded-xl p-2 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-clinical-primary" />
        </div>
      </div>

      <div className="p-6 space-y-6 pb-24">
         <div className="bg-clinical-surface rounded-2xl shadow-clinical border border-clinical-border p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-clinical-text-dark text-lg">Semaine actuelle</h3>
                <div className="flex gap-2">
                    <button className="p-1 rounded-lg border border-clinical-border text-clinical-text-muted hover:text-clinical-text-dark transition cursor-pointer"><ChevronLeft className="w-5 h-5"/></button>
                    <button className="p-1 rounded-lg border border-clinical-border text-clinical-text-muted hover:text-clinical-text-dark transition cursor-pointer"><ChevronRight className="w-5 h-5"/></button>
                </div>
            </div>
            
            <div className="flex justify-between">
                {jours.map((jour, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <span className="text-xs font-semibold text-clinical-text-muted uppercase">{jour}</span>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                            dates[i].type === 'TODAY' ? 'bg-clinical-primary text-white shadow-md' :
                            dates[i].type === 'COMPLETED' ? 'bg-green-50 text-green-600 border border-green-100' :
                            dates[i].type === 'MISSED' ? 'bg-red-50 text-red-600 border border-red-100' :
                            'bg-clinical-bg text-clinical-text-muted border border-clinical-border'
                        }`}>
                            {dates[i].num}
                        </div>
                    </div>
                ))}
            </div>
         </div>

         <div>
             <h3 className="font-semibold text-clinical-text-dark mb-4">Programme du Jour (14 Avril)</h3>
             <div className="bg-clinical-surface rounded-2xl p-5 shadow-sm border border-clinical-border flex items-center gap-4">
                 <div className="w-12 h-12 bg-clinical-primary-10 rounded-xl flex items-center justify-center shrink-0">
                     <Pill className="w-6 h-6 text-clinical-primary" />
                 </div>
                 <div className="flex-1">
                     <h4 className="font-bold text-clinical-text-dark text-lg">Amoxicilline</h4>
                     <p className="text-sm text-clinical-text-muted">1 comprimé • Après le repas</p>
                 </div>
                 <div className="text-right">
                     <span className="block text-xl font-bold text-clinical-text-dark">20:00</span>
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
}

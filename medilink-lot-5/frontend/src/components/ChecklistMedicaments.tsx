import React from 'react';
import { Check } from 'lucide-react';

interface Medicament {
  id: string | number;
  nom: string;
  dosage: string;
  disponible: boolean;
  quantiteRequise: number | string;
  quantiteDisponible: number | string;
}

interface ChecklistMedicamentsProps {
  medicaments: Medicament[];
  onToggleDispo: (id: string | number) => void;
}

export default function ChecklistMedicaments({ medicaments, onToggleDispo }: ChecklistMedicamentsProps): React.JSX.Element {
  return (
    <div className="space-y-4">
      {medicaments.map(med => (
        <div 
          key={med.id} 
          onClick={() => onToggleDispo(med.id)} 
          className="border border-clinical-border rounded-xl p-4 cursor-pointer hover:border-clinical-primary hover:bg-clinical-surface-hover transition bg-clinical-surface shadow-sm"
        >
          <div className="flex items-center gap-3">
            <button 
              type="button" 
              role="checkbox" 
              aria-checked={med.disponible}
              className={`peer flex shrink-0 items-center justify-center rounded-[4px] border outline-none transition-all size-5 shadow-sm ${med.disponible ? 'bg-clinical-primary border-clinical-primary text-white' : 'bg-clinical-surface border-clinical-border text-transparent'}`}
            >
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
            </button>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-clinical-text-dark">{med.nom}</h4>
                {med.disponible && (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <p className="text-sm text-clinical-text-muted">{med.dosage}</p>
              <div className="mt-2 text-xs font-medium bg-clinical-bg p-2 rounded-lg text-clinical-text-muted border border-clinical-border">
                Qté. demandée: <span className="font-bold text-clinical-text-dark">{med.quantiteRequise}</span>
                {' | '}
                Qté. dispo: <span className="font-bold text-clinical-text-dark">{med.quantiteDisponible}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

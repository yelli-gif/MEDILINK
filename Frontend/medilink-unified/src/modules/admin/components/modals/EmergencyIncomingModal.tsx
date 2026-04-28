import { useState } from 'react';
import { AlertOctagon, X, Siren, ShieldAlert } from 'lucide-react';

interface EmergencyIncomingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrigger: (details: EmergencyDetails) => void;
}

export type EmergencyDetails = {
  type: string;
  expectedCount: number;
  etaMinutes: number;
  notes: string;
}

export function EmergencyIncomingModal({ isOpen, onClose, onTrigger }: EmergencyIncomingModalProps) {
  const [type, setType] = useState('Accident de la Route Multiple');
  const [expectedCount, setExpectedCount] = useState<number>(5);
  const [etaMinutes, setEtaMinutes] = useState<number>(15);
  const [notes, setNotes] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  if (!isOpen) return null;

  const handleTrigger = () => {
    if (confirmationCode === 'URGENCE') {
      onTrigger({ type, expectedCount, etaMinutes, notes });
      onClose();
      // Reset
      setConfirmationCode('');
      setIsConfirming(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white rounded-[28px] w-full max-w-2xl shadow-[0_20px_60px_-15px_rgba(220,38,38,0.3)] relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="bg-[#DC2626] p-6 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10">
            <Siren className="w-48 h-48 -mt-10 -mr-10" />
          </div>
          <div className="relative z-10 flex justify-between items-start">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <AlertOctagon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-[24px] font-extrabold leading-tight">Déclaration d'Afflux Urgent</h2>
                <p className="text-red-100 text-[14px] font-medium mt-1">Prévenir instantanément les équipes de l'arrivée de cas critiques.</p>
              </div>
            </div>
            <button onClick={onClose} className="text-red-200 hover:text-white transition-colors bg-white/10 p-2 rounded-xl">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-8">
          
          {!isConfirming ? (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[13px] font-bold text-[#5D6470] mb-2">Nature de l'Événement</label>
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-[#F4F6FC] border border-transparent rounded-xl px-4 py-3 text-[14px] font-bold text-gray-900 outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 cursor-pointer transition-all"
                  >
                    <option>Accident de la Route Multiple</option>
                    <option>Incendie / Brulés</option>
                    <option>Catastrophe Naturelle</option>
                    <option>Attaque / Fusillade</option>
                    <option>Intoxication Massive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#5D6470] mb-2">Nombre Estimé de Patients</label>
                  <input 
                    type="number" 
                    value={expectedCount}
                    onChange={(e) => setExpectedCount(Number(e.target.value))}
                    min="1"
                    className="w-full bg-[#F4F6FC] border border-transparent rounded-xl px-4 py-3 text-[14px] font-bold text-gray-900 outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#5D6470] mb-2">Délai d'Arrivée Estimé (ETA)</label>
                <div className="flex gap-4">
                  {[5, 15, 30, 60].map(mins => (
                    <button
                      key={mins}
                      onClick={() => setEtaMinutes(mins)}
                      className={`flex-1 py-3 rounded-xl text-[14px] font-bold transition-all border-2 ${
                        etaMinutes === mins 
                        ? 'border-red-500 bg-red-50 text-red-600' 
                        : 'border-[#E5E9F0] bg-white text-[#5D6470] hover:border-red-200'
                      }`}
                    >
                      {mins} min
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#5D6470] mb-2">Détails Cliniques (Optionnel)</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: 2 traumas crâniens sévères, besoin de blocs opératoires immédiats..."
                  className="w-full bg-[#F4F6FC] border border-transparent rounded-xl px-4 py-3 text-[14px] font-medium text-gray-900 outline-none focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all resize-none h-24"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={() => setIsConfirming(true)}
                  className="bg-[#DC2626] hover:bg-red-700 text-white px-8 py-3.5 rounded-xl font-bold text-[15px] flex items-center gap-2 transition-transform active:scale-95 shadow-lg shadow-red-500/25"
                >
                  <ShieldAlert className="w-5 h-5" /> Continuer
                </button>
              </div>

            </div>
          ) : (
            
            <div className="animate-in fade-in slide-in-from-right-8 duration-300">
               <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center mb-8">
                  <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 scale-110">
                    <Siren className="w-8 h-8 animate-pulse" />
                  </div>
                  <h3 className="text-[20px] font-extrabold text-red-900 mb-2">Alerte Générale de Niveau Rouge</h3>
                  <p className="text-[14px] font-medium text-red-700/80 max-w-md mx-auto">
                    Vous êtes sur le point de déclencher l'alerte pour <strong>{expectedCount} patients ({type})</strong> arrivant dans <strong>{etaMinutes} minutes</strong>. Toutes les équipes d'astreinte seront notifiées.
                  </p>
               </div>

               <div className="mb-8">
                  <label className="block text-center text-[13px] font-bold text-[#5D6470] mb-3">
                    Pour éviter un faux positif, tapez <strong className="text-red-600">URGENCE</strong> ci-dessous :
                  </label>
                  <input 
                    type="text" 
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value.toUpperCase())}
                    placeholder="Tapez URGENCE"
                    className="w-full max-w-[250px] mx-auto block bg-white border-2 border-red-200 rounded-xl px-4 py-3 text-[18px] text-center font-black tracking-widest text-red-600 outline-none focus:border-red-500 transition-all uppercase"
                  />
               </div>

               <div className="flex gap-4">
                  <button 
                    onClick={() => setIsConfirming(false)}
                    className="flex-1 bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl font-bold text-[15px] transition-colors"
                  >
                    Retour
                  </button>
                  <button 
                    onClick={handleTrigger}
                    disabled={confirmationCode !== 'URGENCE'}
                    className="flex-1 bg-[#DC2626] hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold text-[15px] flex justify-center items-center gap-2 transition-all shadow-lg shadow-red-500/25"
                  >
                    DÉCLENCHER L'ALERTE
                  </button>
               </div>
            </div>

          )}

        </div>
      </div>
    </div>
  );
}

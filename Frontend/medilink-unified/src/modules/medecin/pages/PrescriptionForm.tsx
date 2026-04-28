import React, { useState, useEffect } from 'react';
import MedecinLayout from '../components/MedecinLayout';
import { Plus, Trash2, ShieldCheck, HelpCircle, PenTool, MessageSquare, ChevronDown, FileText, Loader2 } from 'lucide-react';
import { consultationAPI, patientAPI } from '../../../services/api';

interface LigneOrdonnance {
  id: number;
  medicamentName: string;
  quantite: string;
  frequence: string;
  duree: string;
  instructions: string;
}

const PrescriptionForm: React.FC = () => {
  const [medications, setMedications] = useState<LigneOrdonnance[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [newMedName, setNewMedName] = useState('');
  const [newMedQuantite, setNewMedQuantite] = useState('');
  const [newMedFrequence, setNewMedFrequence] = useState('');
  const [newMedDuree, setNewMedDuree] = useState('');
  const [newMedInstructions, setNewMedInstructions] = useState('');

  useEffect(() => {
    const loadPatients = async () => {
      try {
        setLoading(true);
        const data = await patientAPI.lister(0, 50);
        const list = data.content || data;
        setPatients(list);
        if (list.length > 0) setSelectedPatientId(list[0].id.toString());
      } catch (err) {
        console.error("Erreur chargement patients:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPatients();
  }, []);

  const handleSignAndSubmit = async () => {
    if (!selectedPatientId || medications.length === 0) {
      alert("Veuillez sélectionner un patient et ajouter au moins un médicament.");
      return;
    }

    setSubmitting(true);

    try {
      const userStr = localStorage.getItem('medilink_user');
      const user = userStr ? JSON.parse(userStr) : null;
      const medecinId = user?.medecinId || 1;

      // Lot 4 - Consultation API (port 8084)
      await consultationAPI.creerOrdonnance({
        patientId: parseInt(selectedPatientId),
        medecinId: parseInt(medecinId),
        dateOrdonnance: new Date().toISOString().split('T')[0],
        contenu: medications.map(m => `${m.medicamentName} (${m.quantite}, ${m.frequence}, ${m.duree}) - ${m.instructions}`).join(' | ')
      });

      alert("Ordonnance signée et transmise avec succès !");
      setMedications([]);
    } catch (err: any) {
      console.error("Erreur transmission ordonnance:", err);
      alert("Erreur lors de la transmission de l'ordonnance.");
    } finally {
      setSubmitting(false);
    }
  };

  const addMedication = () => {
    if (!newMedName) return;
    const newItem: LigneOrdonnance = {
      id: Date.now(),
      medicamentName: newMedName,
      quantite: newMedQuantite,
      frequence: newMedFrequence,
      duree: newMedDuree,
      instructions: newMedInstructions,
    };
    setMedications([...medications, newItem]);
    setNewMedName('');
    setNewMedQuantite('');
    setNewMedFrequence('');
    setNewMedDuree('');
    setNewMedInstructions('');
  };

  const removeMedication = (id: number) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  return (
    <MedecinLayout>
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-[40px] font-bold text-[#14152A] tracking-tight mb-2">Nouvelle Ordonnance</h1>
          <p className="text-[#5A5C6B] font-medium text-[16px]">Rédaction précise et sécurisée du traitement patient.</p>
        </div>
        <div className="bg-[#E5F7ED] text-[#1E9565] px-4 py-2.5 rounded-xl font-bold text-[13px] flex items-center gap-2 border border-[#B7E4CB]">
          <ShieldCheck size={18} />
          Connexion Sécurisée RPPS
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10">
        <div className="space-y-8">
          {/* Patient Selection */}
          <div className="bg-white rounded-[32px] p-8 border border-[#F0F2F5] shadow-sm">
            <label className="block text-[14px] font-bold text-[#14152A] mb-4">Sélection du Patient</label>
            <div className="relative group">
              <select 
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#F0F2F5] rounded-2xl p-5 text-[15px] font-medium text-[#14152A] outline-none appearance-none"
              >
                {patients.length > 0 ? (
                  patients.map((p: any) => (
                    <option key={p.id} value={p.id}>{p.prenom} {p.nom} ({p.id})</option>
                  ))
                ) : (
                  <option value="">Chargement des patients...</option>
                )}
              </select>
              <ChevronDown size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#8B8D98] pointer-events-none" />
            </div>
          </div>

          {/* Add Medication Form */}
          <div className="bg-white rounded-[32px] p-8 border border-[#F0F2F5] shadow-sm">
            <h3 className="text-[20px] font-bold text-[#14152A] mb-8">Ajouter un Médicament</h3>

            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-[#14152A] ml-1">MÉDICAMENT</label>
                <input
                  type="text"
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  placeholder="Ex: Amoxicilline 500mg"
                  className="w-full bg-[#F3F4F6] border border-transparent rounded-2xl py-4 px-6 text-[15px] outline-none focus:bg-white focus:border-[#0055FF]/20 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#14152A] ml-1">QUANTITÉ</label>
                  <input
                    type="text"
                    value={newMedQuantite}
                    onChange={(e) => setNewMedQuantite(e.target.value)}
                    placeholder="Ex: 1 boîte"
                    className="w-full bg-[#F3F4F6] border border-transparent rounded-2xl py-4 px-6 text-[15px] outline-none focus:bg-white focus:border-[#0055FF]/20 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#14152A] ml-1">FRÉQUENCE</label>
                  <input
                    type="text"
                    value={newMedFrequence}
                    onChange={(e) => setNewMedFrequence(e.target.value)}
                    placeholder="Ex: 3x/jour"
                    className="w-full bg-[#F3F4F6] border border-transparent rounded-2xl py-4 px-6 text-[15px] outline-none focus:bg-white focus:border-[#0055FF]/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#14152A] ml-1">DURÉE</label>
                  <input
                    type="text"
                    value={newMedDuree}
                    onChange={(e) => setNewMedDuree(e.target.value)}
                    placeholder="Ex: 7 jours"
                    className="w-full bg-[#F3F4F6] border border-transparent rounded-2xl py-4 px-6 text-[15px] outline-none focus:bg-white focus:border-[#0055FF]/20 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-[#14152A] ml-1">INSTRUCTIONS</label>
                  <input
                    type="text"
                    value={newMedInstructions}
                    onChange={(e) => setNewMedInstructions(e.target.value)}
                    placeholder="Ex: Pendant les repas"
                    className="w-full bg-[#F3F4F6] border border-transparent rounded-2xl py-4 px-6 text-[15px] outline-none focus:bg-white focus:border-[#0055FF]/20 transition-all"
                  />
                </div>
              </div>

              <button
                onClick={addMedication}
                className="w-full bg-[#0055FF] hover:bg-[#0047D6] text-white font-bold py-5 rounded-[24px] flex items-center justify-center gap-2 transition-all shadow-[0_8px_20px_rgba(0,85,255,0.15)] mt-4"
              >
                <Plus size={20} />
                Ajouter à l'ordonnance
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[40px] p-10 border border-[#F0F2F5] shadow-xl flex flex-col min-h-[600px]">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-[#F0F5FF] rounded-2xl flex items-center justify-center text-[#0055FF]">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-[20px] font-bold text-[#14152A]">Aperçu de l'Ordonnance</h3>
              <p className="text-[12px] text-[#8B8D98] font-medium uppercase tracking-wider">
                RPPS: 10100088291 — Paris, le {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>

          <div className="space-y-4 flex-grow overflow-y-auto mb-10">
            {medications.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <p className="text-[#5A5C6B] font-bold">Aucun médicament ajouté</p>
              </div>
            ) : (
              medications.map((med) => (
                <div key={med.id} className="relative group bg-white border border-l-4 border-l-[#0055FF] border-[#F0F2F5] rounded-3xl p-6 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-[17px] font-bold text-[#14152A] mb-1">{med.medicamentName}</h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-[#5A5C6B]">
                        <span><strong>Quantité:</strong> {med.quantite}</span>
                        <span><strong>Fréquence:</strong> {med.frequence}</span>
                        <span><strong>Durée:</strong> {med.duree}</span>
                      </div>
                      {med.instructions && <p className="text-[12px] text-[#8B8D98] mt-2 italic">Note: {med.instructions}</p>}
                    </div>
                    <button onClick={() => removeMedication(med.id)} className="text-[#E64C3C] p-2 hover:bg-red-50 rounded-full transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-2xl p-6 flex gap-4 mb-8">
            <HelpCircle size={20} className="text-[#64748B] shrink-0" />
            <p className="text-[12px] text-[#64748B] leading-relaxed">
              Ce document sera transmis de manière sécurisée à la pharmacie et au DMP du patient.
            </p>
          </div>

          <button 
            onClick={handleSignAndSubmit}
            disabled={submitting}
            className="w-full bg-[#0055FF] hover:bg-[#0047D6] text-white font-bold py-6 rounded-[24px] flex items-center justify-center gap-3 transition-all shadow-[0_10px_30px_rgba(0,85,255,0.25)] disabled:opacity-50"
          >
            {submitting ? <Loader2 className="animate-spin" size={22} /> : <PenTool size={22} />}
            {submitting ? "Transmission..." : "Signer et transmettre"}
          </button>
        </div>
      </div>
    </MedecinLayout>
  );
};

export default PrescriptionForm;

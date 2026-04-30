import React, { useState, useEffect } from 'react';
import MedecinLayout from '../components/MedecinLayout';
import { Plus, Trash2, ShieldCheck, HelpCircle, PenTool, MessageSquare, ChevronDown, FileText, Loader2 } from 'lucide-react';
import { consultationAPI, patientAPI, medicamentAPI } from '../../../services/api';

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
  const [medSearchTerm, setMedSearchTerm] = useState('');
  const [isMedDropdownOpen, setIsMedDropdownOpen] = useState(false);
  const [newMedQuantite, setNewMedQuantite] = useState('');
  const [newMedFrequence, setNewMedFrequence] = useState('');
  const [newMedDuree, setNewMedDuree] = useState('');
  const [newMedInstructions, setNewMedInstructions] = useState('');

  // Catalog State
  const [catalogMeds, setCatalogMeds] = useState<any[]>([]);
  const [showAddMedModal, setShowAddMedModal] = useState(false);
  const [newCatalogMed, setNewCatalogMed] = useState({ nom: '', forme: '', prix: 0 });

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
    const loadMedicaments = async () => {
      try {
        const meds = await medicamentAPI.rechercher('');
        setCatalogMeds(meds);
      } catch (err) {
        console.error("Erreur chargement médicaments:", err);
      }
    };

    loadPatients();
    loadMedicaments();
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
    setMedSearchTerm('');
    setNewMedName('');
    setNewMedQuantite('');
    setNewMedFrequence('');
    setNewMedDuree('');
    setNewMedInstructions('');
  };

  const removeMedication = (id: number) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  const handleCreateCatalogMed = async () => {
    if (!newCatalogMed.nom) return;
    try {
      const saved = await medicamentAPI.ajouterCatalogue(newCatalogMed);
      setCatalogMeds([...catalogMeds, saved]);
      setShowAddMedModal(false);
      setNewMedName(saved.nom);
      setMedSearchTerm(saved.nom);
      setNewCatalogMed({ nom: '', forme: '', prix: 0 });
      alert("Médicament ajouté au catalogue avec succès !");
    } catch (err) {
      console.error("Erreur lors de l'ajout au catalogue:", err);
      alert("Erreur lors de l'ajout du médicament au catalogue.");
    }
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
              <div className="flex flex-col gap-2 relative">
                <div className="flex justify-between items-end">
                  <label className="text-[13px] font-bold text-[#14152A] ml-1">MÉDICAMENT</label>
                  <button 
                    onClick={() => setShowAddMedModal(true)}
                    className="text-[#0055FF] text-[12px] font-bold hover:underline"
                  >
                    + Nouveau médicament en base
                  </button>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    value={medSearchTerm}
                    onChange={(e) => {
                      setMedSearchTerm(e.target.value);
                      setNewMedName(e.target.value);
                      setIsMedDropdownOpen(true);
                    }}
                    onFocus={() => setIsMedDropdownOpen(true)}
                    onBlur={() => {
                      // Petit délai pour permettre le clic sur un élément de la liste
                      setTimeout(() => setIsMedDropdownOpen(false), 200);
                    }}
                    placeholder="Rechercher ou sélectionner un médicament..."
                    className="w-full bg-[#F3F4F6] border border-transparent rounded-2xl py-4 px-6 pr-12 text-[15px] outline-none focus:bg-white focus:border-[#0055FF]/20 transition-all"
                  />
                  <ChevronDown size={20} className={`absolute right-4 top-1/2 -translate-y-1/2 text-[#8B8D98] transition-transform pointer-events-none ${isMedDropdownOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* Menu déroulant personnalisé */}
                {isMedDropdownOpen && (
                  <div className="absolute z-20 w-full top-[90px] bg-white border border-[#F0F2F5] rounded-2xl shadow-xl max-h-64 overflow-y-auto">
                    {catalogMeds.filter(m => m.nom.toLowerCase().includes(medSearchTerm.toLowerCase())).length > 0 ? (
                      catalogMeds
                        .filter(m => m.nom.toLowerCase().includes(medSearchTerm.toLowerCase()))
                        .map((m: any) => (
                          <div 
                            key={m.id}
                            onClick={() => {
                              setNewMedName(m.nom);
                              setMedSearchTerm(m.nom);
                              setIsMedDropdownOpen(false);
                            }}
                            className="px-6 py-3.5 hover:bg-[#F8FAFC] cursor-pointer border-b border-[#F0F2F5] last:border-b-0 transition-colors"
                          >
                            <span className="text-[14px] font-bold text-[#14152A]">{m.nom}</span>
                            {m.forme && <span className="text-[#8B8D98] text-[12px] ml-2 italic">({m.forme})</span>}
                          </div>
                        ))
                    ) : (
                      <div className="px-6 py-6 text-center">
                        <p className="text-[14px] text-[#8B8D98] font-medium mb-3">Aucun médicament trouvé</p>
                        <button 
                          onClick={() => {
                            setIsMedDropdownOpen(false);
                            setNewCatalogMed({...newCatalogMed, nom: medSearchTerm});
                            setShowAddMedModal(true);
                          }}
                          className="text-[#0055FF] text-[13px] font-bold bg-[#F0F5FF] px-4 py-2 rounded-xl hover:bg-[#E0EBFF] transition-colors"
                        >
                          L'ajouter au catalogue ?
                        </button>
                      </div>
                    )}
                  </div>
                )}
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

      {/* MODAL POUR AJOUTER UN NOUVEAU MÉDICAMENT AU CATALOGUE */}
      {showAddMedModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-[22px] font-bold text-[#14152A] mb-2">Ajouter un médicament</h3>
            <p className="text-[#5A5C6B] text-[14px] mb-8">Ce médicament sera ajouté définitivement à la base de données et sera disponible pour tous les médecins.</p>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-[12px] font-bold text-[#14152A] mb-2 uppercase">Nom complet</label>
                <input 
                  type="text" 
                  value={newCatalogMed.nom}
                  onChange={e => setNewCatalogMed({...newCatalogMed, nom: e.target.value})}
                  className="w-full bg-[#F8FAFC] border border-[#F0F2F5] rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#0055FF]/40"
                  placeholder="Ex: Doliprane 1000mg"
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[#14152A] mb-2 uppercase">Forme (Optionnel)</label>
                <input 
                  type="text" 
                  value={newCatalogMed.forme}
                  onChange={e => setNewCatalogMed({...newCatalogMed, forme: e.target.value})}
                  className="w-full bg-[#F8FAFC] border border-[#F0F2F5] rounded-xl px-4 py-3 text-[14px] outline-none focus:border-[#0055FF]/40"
                  placeholder="Ex: Comprimé, Sirop..."
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setShowAddMedModal(false)}
                className="flex-1 py-3.5 rounded-xl font-bold text-[#5A5C6B] bg-[#F8FAFC] hover:bg-[#F0F2F5] transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={handleCreateCatalogMed}
                disabled={!newCatalogMed.nom}
                className="flex-1 py-3.5 rounded-xl font-bold text-white bg-[#0055FF] hover:bg-[#0047D6] transition-colors disabled:opacity-50"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

    </MedecinLayout>
  );
};

export default PrescriptionForm;

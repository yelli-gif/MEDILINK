import React, { useState, useEffect } from 'react';
import MedecinLayout from '../components/MedecinLayout';
import { Search, Plus, Filter, MoreHorizontal, X, Edit2, Printer, Activity, HeartPulse, Loader2 } from 'lucide-react';
import { patientAPI } from '../../../services/api';

const PatientsList: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Données de fallback si le backend ne répond pas
  const fallbackPatients = [
    { id: '1', name: 'Marc Laurent', age: '42 ans', gender: 'Masculin', lastVisit: '12 Oct 2023', status: 'Dossier Complet', avatar: 'ML' },
    { id: '2', name: 'Sophie Dubois', age: '28 ans', gender: 'Féminin', lastVisit: '08 Oct 2023', status: 'Dossier Complet', avatar: 'SD' },
    { id: '3', name: 'Hélène Girard', age: '65 ans', gender: 'Féminin', lastVisit: 'Aujourd\'hui', status: 'Dossier Complet', avatar: 'HG', blood: 'O+', weight: '64.5', height: '162', imc: '24.5', birthDate: '14 Mai 1958' },
    { id: '4', name: 'Thomas Martin', age: '35 ans', gender: 'Masculin', lastVisit: '02 Oct 2023', status: 'Dossier Complet', avatar: 'TM' },
  ];

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await patientAPI.lister(0, 50);
        // Le backend retourne un objet Page avec .content
        const data = response.content || response;
        const mapped = (Array.isArray(data) ? data : []).map((p: any) => ({
          id: p.id?.toString(),
          name: `${p.prenom || ''} ${p.nom || ''}`.trim() || `Patient ${p.id}`,
          age: p.dateNaissance ? `${new Date().getFullYear() - new Date(p.dateNaissance).getFullYear()} ans` : '--',
          gender: p.sexe || '--',
          lastVisit: '--',
          status: 'Dossier Complet',
          avatar: `${(p.prenom || 'P')[0]}${(p.nom || 'X')[0]}`.toUpperCase(),
          weight: p.poids,
          height: p.taille,
        }));
        setPatients(mapped.length > 0 ? mapped : fallbackPatients);
      } catch (err) {
        console.error('Erreur chargement patients:', err);
        setPatients(fallbackPatients);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  // Recherche en temps réel
  useEffect(() => {
    if (searchTerm.length > 2) {
      const searchPatients = async () => {
        try {
          const results = await patientAPI.rechercher(searchTerm);
          const mapped = results.map((p: any) => ({
            id: p.id?.toString(),
            name: `${p.prenom || ''} ${p.nom || ''}`.trim(),
            age: p.dateNaissance ? `${new Date().getFullYear() - new Date(p.dateNaissance).getFullYear()} ans` : '--',
            gender: p.sexe || '--',
            lastVisit: '--',
            status: 'Dossier Complet',
            avatar: `${(p.prenom || 'P')[0]}${(p.nom || 'X')[0]}`.toUpperCase(),
          }));
          if (mapped.length > 0) setPatients(mapped);
        } catch (e) { /* silently fall back to current list */ }
      };
      searchPatients();
    }
  }, [searchTerm]);

  const antecedents = [
    { title: 'Hypertension artérielle', detail: 'Diagnostiquée en 2015. Suivi régulier.', color: '#E64C3C' },
    { title: 'Allergie : Pénicilline', detail: 'Réaction cutanée sévère rapportée.', color: '#F1C40F' },
    { title: 'Chirurgie : Appendicectomie', detail: 'Effectuée en 1982 sans complications.', color: '#0055FF' },
  ];

  return (
    <MedecinLayout>
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-[32px] font-bold text-[#14152A] tracking-tight mb-2">Base de données Patients</h1>
          <p className="text-[#5A5C6B] font-medium">Gérez et consultez les dossiers de vos 1,284 patients enregistrés.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white border border-[#F0F2F5] text-[#14152A] font-bold px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-[#F8FAFC] transition-all shadow-sm">
            <Filter size={18} />
            Filtrer
          </button>
          <button className="bg-[#0055FF] text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-[#0047D6] transition-all shadow-[0_8px_20px_rgba(0,85,255,0.15)]">
            <Plus size={18} />
            Nouveau Patient
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[28px] border border-[#F0F2F5] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#F0F2F5] flex justify-between items-center bg-[#FAFBFF]">
          <h3 className="text-[18px] font-bold text-[#14152A]">Dernières Activités</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8D98]" size={16} />
            <input 
              type="text" 
              placeholder="Rechercher..."
              className="w-full bg-white border border-[#F0F2F5] rounded-xl py-2 pl-10 pr-4 text-[13px] outline-none focus:border-[#0055FF]/30 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#F0F2F5] text-[12px] font-bold text-[#8B8D98] uppercase tracking-wider">
                <th className="px-8 py-5">PATIENT</th>
                <th className="px-8 py-5">ÂGE</th>
                <th className="px-8 py-5">SEXE</th>
                <th className="px-8 py-5">DERNIER RDV</th>
                <th className="px-8 py-5">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F2F5]">
              {patients.map((patient) => (
                <tr 
                  key={patient.id} 
                  className="hover:bg-[#F8FAFF] transition-colors cursor-pointer group"
                  onClick={() => setSelectedPatient(patient)}
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E6EDFF] to-[#D0DFFF] flex items-center justify-center text-[#0055FF] font-bold text-[14px]">
                        {patient.avatar}
                      </div>
                      <span className="text-[15px] font-bold text-[#14152A] group-hover:text-[#0055FF] transition-colors">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[14px] text-[#5A5C6B] font-medium">{patient.age}</td>
                  <td className="px-8 py-5 text-[14px] text-[#5A5C6B] font-medium">{patient.gender}</td>
                  <td className="px-8 py-5">
                    <span className={`text-[14px] font-bold ${patient.lastVisit === 'Aujourd\'hui' ? 'text-[#0055FF]' : 'text-[#5A5C6B]'}`}>
                      {patient.lastVisit}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <button className="p-2 text-[#8B8D98] hover:text-[#14152A] transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Detail Modal (Image 1) */}
      {selectedPatient && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end p-4">
          <div className="absolute inset-0 bg-[#14152A]/40 backdrop-blur-sm" onClick={() => setSelectedPatient(null)}></div>
          
          <div className="bg-white w-full max-w-xl h-[calc(100vh-2rem)] rounded-[40px] shadow-2xl relative z-10 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-8 flex justify-between items-center">
              <button 
                onClick={() => setSelectedPatient(null)}
                className="p-3 bg-[#F8FAFC] hover:bg-[#F1F5F9] rounded-full text-[#8B8D98] transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex gap-3">
                <button className="p-3 bg-[#F8FAFC] hover:bg-[#F1F5F9] rounded-full text-[#8B8D98] transition-colors">
                  <Edit2 size={20} />
                </button>
                <button className="p-3 bg-[#F8FAFC] hover:bg-[#F1F5F9] rounded-full text-[#8B8D98] transition-colors">
                  <Printer size={20} />
                </button>
              </div>
            </div>

            <div className="px-8 flex-grow overflow-y-auto pb-10">
              {/* Profile Image & Name */}
              <div className="flex flex-col items-center mb-10">
                <div className="w-32 h-32 rounded-[40px] bg-gradient-to-br from-[#0055FF] to-[#0047D6] flex items-center justify-center mb-6 overflow-hidden border-4 border-white shadow-xl">
                   <img src={`https://i.pravatar.cc/150?u=${selectedPatient.id}`} alt={selectedPatient.name} className="w-full h-full object-cover" />
                </div>
                <h2 className="text-[32px] font-bold text-[#14152A] mb-1">{selectedPatient.name}</h2>
                <p className="text-[#8B8D98] font-medium mb-4">Née le {selectedPatient.birthDate || '14 Mai 1958'} ({selectedPatient.age})</p>
                <span className="bg-[#E5F7ED] text-[#1E9565] text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1E9565] animate-pulse"></div>
                  Dossier Complet
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-[#F4F7FF] rounded-3xl p-6 border border-[#E8ECF5]">
                  <p className="text-[#8B8D98] text-[10px] font-bold uppercase tracking-wider mb-2">POIDS</p>
                  <p className="text-2xl font-bold text-[#14152A]">{selectedPatient.weight || '64.5'} <span className="text-[14px] text-[#5A5C6B] font-medium">kg</span></p>
                </div>
                <div className="bg-[#F4F7FF] rounded-3xl p-6 border border-[#E8ECF5]">
                  <p className="text-[#8B8D98] text-[10px] font-bold uppercase tracking-wider mb-2">TAILLE</p>
                  <p className="text-2xl font-bold text-[#14152A]">{selectedPatient.height || '162'} <span className="text-[14px] text-[#5A5C6B] font-medium">cm</span></p>
                </div>
                <div className="bg-[#F4F7FF] rounded-3xl p-6 border border-[#E8ECF5]">
                  <p className="text-[#8B8D98] text-[10px] font-bold uppercase tracking-wider mb-2">GROUPE SANGUIN</p>
                  <p className="text-2xl font-bold text-[#E64C3C]">{selectedPatient.blood || 'O+'}</p>
                </div>
                <div className="bg-[#F4F7FF] rounded-3xl p-6 border border-[#E8ECF5]">
                  <p className="text-[#8B8D98] text-[10px] font-bold uppercase tracking-wider mb-2">IMC</p>
                  <p className="text-2xl font-bold text-[#14152A]">{selectedPatient.imc || '24.5'}</p>
                </div>
              </div>

              {/* Antecedents Section */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-[#14152A]">Antécédents médicaux</h3>
                  <button className="text-[#0055FF] text-[14px] font-bold hover:underline">+ Ajouter</button>
                </div>
                <div className="space-y-4">
                  {antecedents.map((ant, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="mt-2 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: ant.color }}></div>
                      <div>
                        <h4 className="text-[16px] font-bold text-[#14152A]">{ant.title}</h4>
                        <p className="text-[13px] text-[#5A5C6B] leading-relaxed">{ant.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="p-8 pt-0 mt-auto">
              <button className="w-full bg-[#0055FF] hover:bg-[#0047D6] text-white font-bold py-5 rounded-[24px] text-[16px] transition-all shadow-[0_8px_30px_rgba(0,85,255,0.25)]">
                Ouvrir le dossier médical complet
              </button>
            </div>
          </div>
        </div>
      )}
    </MedecinLayout>
  );
};

export default PatientsList;

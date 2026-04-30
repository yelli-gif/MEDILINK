import React, { useState, useEffect } from 'react';
import MedecinLayout from '../components/MedecinLayout';
import { Calendar, FileText, UserPlus, ArrowUpRight, Clock, ChevronRight, ShieldCheck, Download, AlertTriangle, Loader2 } from 'lucide-react';
import { rendezVousAPI } from '../../../services/api';
import { useNavigate } from 'react-router-dom';

const MedecinDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [rdvCount, setRdvCount] = useState(0);
  const [userProfile, setUserProfile] = useState({ name: 'Médecin' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('medilink_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserProfile({ name: parsed.name || 'Médecin' });
      } catch (err) {}
    }

    const loadAppointments = async () => {
      try {
        const userStr = localStorage.getItem('medilink_user');
        const user = userStr ? JSON.parse(userStr) : null;
        if (user?.medecinId) {
          const rdvs = await rendezVousAPI.parMedecin(user.medecinId);
          if (rdvs && rdvs.length > 0) {
            const mapped = rdvs.map((r: any, idx: number) => ({
              time: r.heure || '--:--',
              status: idx === 0 ? 'EN COURS' : idx === 1 ? 'PROCHAIN' : 'ATTENTE',
              patient: r.patient ? `${r.patient.prenom} ${r.patient.nom}` : 'Patient',
              detail: r.service?.nom || 'Consultation',
              type: idx === 1 ? 'NOUVEAU' : idx === 0 ? 'ANCIEN PATIENT' : '',
              id: r.id ? `#${r.id}` : '',
              action: idx === 0 ? 'Continuer' : idx === 1 ? 'Démarrer la consultation' : '',
            }));
            setAppointments(mapped);
            setRdvCount(rdvs.length);
          }
        }
      } catch (err) {
        console.error('Erreur chargement RDV médecin:', err);
      }
    };
    loadAppointments();
  }, []);

  return (
    <MedecinLayout>
      {/* Title & Actions */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-[32px] font-bold text-[#14152A] tracking-tight mb-2">Bonjour {userProfile.name}</h1>
          <div className="flex items-center gap-3 text-[#5A5C6B] font-medium">
            <Calendar size={18} className="text-[#8B8D98]" />
            <span>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} — Vous avez {rdvCount} rendez-vous aujourd'hui.</span>
          </div>
        </div>
        <button className="bg-white border border-[#F0F2F5] text-[#14152A] font-bold px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-[#F8FAFC] transition-all shadow-sm">
          <Download size={18} />
          Exporter
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-[28px] border border-[#F0F2F5] shadow-sm flex items-center justify-between group hover:border-[#0055FF]/20 transition-all">
          <div>
            <p className="text-[#8B8D98] text-[12px] font-bold uppercase tracking-wider mb-2">RDV AUJOURD'HUI</p>
            <h3 className="text-[40px] font-bold text-[#14152A] leading-none mb-2">{rdvCount}</h3>
            <p className="text-[#28B880] text-[12px] font-bold flex items-center gap-1">
              <ArrowUpRight size={14} /> Flux réel
            </p>
          </div>
          <div className="w-14 h-14 bg-[#F0F5FF] rounded-2xl flex items-center justify-center text-[#0055FF] group-hover:scale-110 transition-transform">
            <Calendar size={28} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-[28px] border border-[#F0F2F5] shadow-sm flex items-center justify-between group hover:border-[#0055FF]/20 transition-all">
          <div>
            <p className="text-[#8B8D98] text-[12px] font-bold uppercase tracking-wider mb-2">ORDONNANCES SEMAINE</p>
            <h3 className="text-[40px] font-bold text-[#14152A] leading-none mb-2">0</h3>
            <p className="text-[#5A5C6B] text-[12px] font-medium flex items-center gap-1">
              Aucune ordonnance
            </p>
          </div>
          <div className="w-14 h-14 bg-[#F0F5FF] rounded-2xl flex items-center justify-center text-[#0055FF] group-hover:scale-110 transition-transform">
            <FileText size={28} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-[28px] border border-[#F0F2F5] shadow-sm flex items-center justify-between group hover:border-[#0055FF]/20 transition-all">
          <div>
            <p className="text-[#8B8D98] text-[12px] font-bold uppercase tracking-wider mb-2">PATIENTS EN ATTENTE</p>
            <h3 className="text-[40px] font-bold text-[#14152A] leading-none mb-2">{appointments.filter(a => a.status === 'ATTENTE').length}</h3>
            <p className="text-[#5A5C6B] text-[12px] font-bold flex items-center gap-1">
              <Clock size={14} /> Aucun retard
            </p>
          </div>
          <div className="w-14 h-14 bg-[#F0F5FF] rounded-2xl flex items-center justify-center text-[#0055FF] group-hover:scale-110 transition-transform">
            <UserPlus size={28} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Agenda Section */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-[#14152A] tracking-tight">Agenda du jour</h3>
            <span className="bg-[#EBF1FF] text-[#0055FF] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
              En direct
            </span>
          </div>

          <div className="space-y-4">
            {appointments.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 border border-[#F0F2F5] text-center text-[#8B8D98]">
                Aucun rendez-vous prévu pour le moment.
              </div>
            ) : (
              appointments.map((appt, idx) => (
                <div 
                  key={idx} 
                  className={`group bg-white rounded-3xl p-6 border border-[#F0F2F5] flex items-center gap-6 shadow-sm transition-all hover:shadow-md ${appt.status === 'EN COURS' ? 'border-l-4 border-l-[#0055FF]' : ''}`}
                >
                  <div className="flex flex-col items-center justify-center w-24 border-r border-[#F0F2F5] pr-6">
                    <span className="text-2xl font-bold text-[#14152A]">{appt.time}</span>
                    <span className="text-[10px] font-bold text-[#8B8D98] uppercase tracking-wider">{appt.status}</span>
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-[18px] font-bold text-[#14152A]">{appt.patient}</h4>
                      {appt.type && (
                        <span className={`text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-widest ${appt.type === 'NOUVEAU' ? 'bg-[#E5F7ED] text-[#1E9565]' : 'bg-[#EBF1FF] text-[#0055FF]'}`}>
                          {appt.type}
                        </span>
                      )}
                      {appt.id && <span className="text-[11px] font-medium text-[#8B8D98]">{appt.id}</span>}
                    </div>
                    <p className="text-[#5A5C6B] text-[14px] font-medium">{appt.detail}</p>
                  </div>

                  {appt.action && (
                    <button 
                      onClick={() => navigate('/medecin/ordonnances')}
                      className={`px-6 py-3 rounded-2xl font-bold text-[14px] transition-all ${appt.status === 'EN COURS' ? 'bg-[#0055FF] text-white hover:bg-[#0047D6]' : 'bg-white border border-[#0055FF] text-[#0055FF] hover:bg-[#F0F5FF]'}`}
                    >
                      {appt.action}
                    </button>
                  )}
                  {!appt.action && (
                    <ChevronRight className="text-[#D1D5DB]" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar Info Section */}
        <div className="space-y-8">
          {/* Alerts Section */}
          <div className="bg-white rounded-[28px] p-6 border border-[#F0F2F5] shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[18px] font-bold text-[#14152A]">Alertes Patient</h3>
              <AlertTriangle className="text-[#8B8D98]" size={20} />
            </div>

            <div className="space-y-4">
              <div className="text-center py-4 text-[#8B8D98] text-sm">
                Aucune alerte critique.
              </div>
            </div>
          </div>

          {/* Daily Notes */}
          <div className="bg-[#F4F7FF] rounded-[28px] p-6 border border-[#E0E7FF] shadow-sm">
            <h3 className="text-[18px] font-bold text-[#14152A] mb-4">Notes de la journée</h3>
            <textarea 
              placeholder="Ajouter une note rapide pour plus tard..."
              className="w-full bg-white/60 border border-white rounded-2xl p-4 text-[14px] text-[#5A5C6B] min-h-[120px] outline-none focus:ring-2 focus:ring-[#0055FF]/20 focus:bg-white transition-all resize-none mb-4"
            ></textarea>
            <div className="flex justify-end">
              <button className="text-[#0055FF] font-bold text-[14px] hover:underline">Enregistrer</button>
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center gap-3 px-4 py-3 bg-white/50 border border-white rounded-2xl">
            <ShieldCheck size={18} className="text-[#0055FF]" />
            <span className="text-[10px] font-bold text-[#8B8D98] uppercase tracking-[0.1em]">
              DONNÉES DE SANTÉ SÉCURISÉES HDS
            </span>
          </div>
        </div>
      </div>
    </MedecinLayout>
  );
};

export default MedecinDashboard;

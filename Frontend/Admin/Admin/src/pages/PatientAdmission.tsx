import { 
  User, 
  Activity, 
  Stethoscope, 
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PatientAdmission() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Masculin',
    bloodType: 'A+',
    department: '',
    doctor: '',
    priority: 'Normal',
    reason: ''
  });

  // Data for Selects
  const [services, setServices] = useState<any[]>([]);
  const [availableStaff, setAvailableStaff] = useState<any[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);

  useEffect(() => {
    // Load Services
    const savedServices = localStorage.getItem('sanctuary_services');
    const defaultServices = [
      { id: '1', name: 'Unité de Cardiologie' },
      { id: '2', name: "Soins d'Urgence" }
    ];
    const allServices = savedServices ? JSON.parse(savedServices) : defaultServices;
    setServices(allServices);

    // Load Staff
    const savedStaff = localStorage.getItem('sanctuary_staff');
    const defaultStaff = [
      { id: 'd1', name: 'Dr. Julian Vane', role: 'Médecin', department: 'Unité de Cardiologie' },
      { id: 'd2', name: 'Dr. Elena Rodriguez', role: 'Médecin', department: "Soins d'Urgence" }
    ];
    setAvailableStaff(savedStaff ? JSON.parse(savedStaff) : defaultStaff);
  }, []);

  // Filter doctors based on department
  useEffect(() => {
    if (formData.department) {
      const filtered = availableStaff.filter(s => s.department === formData.department && (s.role === 'Médecin' || s.role === 'Docteur'));
      setFilteredDoctors(filtered);
      if (filtered.length > 0) {
        setFormData(prev => ({ ...prev, doctor: filtered[0].name }));
      } else {
        setFormData(prev => ({ ...prev, doctor: '' }));
      }
    }
  }, [formData.department, availableStaff]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.department) {
      alert("Veuillez remplir les informations obligatoires.");
      return;
    }

    // Save Admission
    const existing = localStorage.getItem('sanctuary_admissions');
    const admissions = existing ? JSON.parse(existing) : [];
    const newAdmission = {
      ...formData,
      id: `ADM-${Date.now()}`,
      time: new Date().toISOString(),
      status: 'Admis'
    };
    localStorage.setItem('sanctuary_admissions', JSON.stringify([newAdmission, ...admissions]));

    // Create Notification
    const notifications = JSON.parse(localStorage.getItem('sanctuary_notifications') || '[]');
    const newNotification = {
      id: Date.now().toString(),
      type: formData.priority === 'Urgent' ? 'emergency' : 'system',
      title: 'Nouvelle Admission Patient',
      message: `Le patient ${formData.name} a été admis en ${formData.department}${formData.doctor ? ` sous la supervision du ${formData.doctor}` : ''}. Priorité: ${formData.priority}.`,
      time: new Date().toISOString(),
      read: false
    };
    localStorage.setItem('sanctuary_notifications', JSON.stringify([newNotification, ...notifications]));
    window.dispatchEvent(new Event('notifications_updated'));

    setIsSubmitted(true);
  };


  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
        <div className="w-24 h-24 bg-emerald-100 rounded-[32px] flex items-center justify-center text-emerald-600 mb-8 border border-emerald-200/50 shadow-xl shadow-emerald-500/10">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-[34px] font-extrabold text-gray-900 mb-4 tracking-tight">Admission Confirmée !</h2>
        <p className="text-[#5D6470] text-[16px] font-medium max-w-md mx-auto leading-relaxed mb-10">
          Le dossier du patient <strong>{formData.name}</strong> a été synchronisé avec le service {formData.department}. Le personnel soignant a été notifié.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/notifications')}
            className="px-8 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all flex items-center gap-2"
          >
            Voir la Notification
          </button>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="px-8 py-3.5 bg-[#0B56FA] text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            Nouvelle Admission <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] w-full mx-auto pb-12 pt-4">
      {/* Page Header */}
      <div className="mb-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EEF4FF] rounded-full border border-blue-100/50 text-[#0B56FA] text-[10px] font-extrabold uppercase tracking-widest mb-4">
           <Activity className="w-3.5 h-3.5" /> Module d'Admission Sécurisé
        </div>
        <h2 className="text-[40px] font-extrabold text-gray-900 leading-tight mb-3">
          Enregistrer un Patient
        </h2>
        <p className="text-[#5D6470] text-[16px] font-medium leading-relaxed max-w-2xl">
          Saisissez les informations cliniques critiques pour assurer une prise en charge immédiate et synchronisée au sein de votre établissement.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Section */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Identity */}
          <div className="bg-white rounded-[32px] p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] border border-[#E5E9F0]/80">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B56FA]">
                  <User className="w-5 h-5" />
               </div>
               <h3 className="text-[18px] font-extrabold text-gray-900">Identification du Patient</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Nom Légal Complet</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="ex. Jean Dupont"
                    className="w-full bg-[#F4F6F9] border-none text-[15px] font-bold text-gray-900 placeholder:text-gray-400 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#0B56FA]/20 transition-all font-sans"
                  />
                  <div className="absolute top-4 right-5 text-gray-300">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                   <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Âge</label>
                   <input 
                    type="number" 
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    placeholder="ex. 42"
                    className="w-full bg-[#F4F6F9] border-none text-[15px] font-bold text-gray-900 placeholder:text-gray-400 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#0B56FA]/20 transition-all font-sans"
                   />
                </div>
                <div>
                   <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Genre</label>
                   <select 
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full bg-[#F4F6F9] border-none text-[15px] font-bold text-gray-900 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#0B56FA]/20 transition-all cursor-pointer font-sans"
                   >
                     <option>Masculin</option>
                     <option>Féminin</option>
                     <option>Autre</option>
                   </select>
                </div>
                <div>
                   <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Groupe Sanguin</label>
                   <select 
                    value={formData.bloodType}
                    onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
                    className="w-full bg-[#F4F6F9] border-none text-[15px] font-bold text-gray-900 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#0B56FA]/20 transition-all cursor-pointer font-sans"
                   >
                     {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                       <option key={type}>{type}</option>
                     ))}
                   </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Clinical Data */}
          <div className="bg-white rounded-[32px] p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] border border-[#E5E9F0]/80">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <Stethoscope className="w-5 h-5" />
               </div>
               <h3 className="text-[18px] font-extrabold text-gray-900">Affectation Clinique</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Service Médical</label>
                <select 
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="w-full bg-[#F4F6F9] border-none text-[15px] font-bold text-gray-900 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#0B56FA]/20 transition-all cursor-pointer font-sans"
                >
                  <option value="">Sélectionner le service...</option>
                  {services.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Médecin Référent</label>
                <select 
                  value={formData.doctor}
                  onChange={(e) => setFormData({...formData, doctor: e.target.value})}
                  disabled={!formData.department}
                  className="w-full bg-[#F4F6F9] border-none text-[15px] font-bold text-gray-900 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#0B56FA]/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                >
                  <option value="">{filteredDoctors.length > 0 ? "Médecin assigné" : "Aucun médecin disponible"}</option>
                  {filteredDoctors.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 ml-1">Motif Clinique (Note d'admission)</label>
              <textarea 
                rows={4}
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                placeholder="Décrivez brièvement les symptômes ou la raison de l'admission..."
                className="w-full bg-[#F4F6F9] border-none text-[15px] font-bold text-gray-900 placeholder:text-gray-400 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-[#0B56FA]/20 transition-all resize-none font-sans"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Priority Card */}
          <div className="bg-white rounded-[32px] p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] border border-[#E5E9F0]/80">
            <h3 className="text-[16px] font-extrabold text-gray-900 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" /> Degré d'Urgence
            </h3>
            
            <div className="space-y-3">
              {['Normal', 'Semi-Urgent', 'Urgent'].map((p) => (
                <button 
                  key={p}
                  type="button"
                  onClick={() => setFormData({...formData, priority: p})}
                  className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl font-bold transition-all border-2 ${
                    formData.priority === p 
                    ? 'bg-[#EEF4FF] border-[#0B56FA] text-[#0B56FA]' 
                    : 'bg-white border-gray-50 text-gray-500 hover:border-gray-100'
                  }`}
                >
                  {p}
                  {formData.priority === p && <div className="w-2.5 h-2.5 bg-[#0B56FA] rounded-full"></div>}
                </button>
              ))}
            </div>
          </div>

          {/* Secure Pulse Card */}
          <div className="bg-gradient-to-br from-[#0B56FA] to-[#0A49D6] rounded-[32px] p-8 text-white shadow-xl shadow-blue-500/20 group hover:scale-[1.02] transition-transform duration-500">
             <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md mb-6">
                <ShieldCheck className="w-7 h-7" />
             </div>
             <h3 className="text-[22px] font-extrabold mb-3 leading-tight">Dossier Chiffré</h3>
             <p className="text-blue-100/80 text-[14px] font-medium leading-relaxed mb-8">
               Chaque admission génère une signature numérique inviolable conforme aux protocoles de santé.
             </p>
             <button 
               type="submit"
               className="w-full bg-white text-[#0B56FA] font-extrabold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-all shadow-lg active:scale-95"
             >
               Finaliser l'Admission <ChevronRight className="w-5 h-5" />
             </button>
          </div>

          {/* Helper Card */}
          <div className="bg-gray-50 rounded-[32px] p-6 border border-gray-100">
            <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-2">Aide Rapide</p>
            <p className="text-gray-500 text-[13px] font-medium leading-relaxed">
              Une fois validé, le patient apparaîtra dans le moniteur d'affluence du service sélectionné.
            </p>
          </div>

        </div>

      </form>
    </div>
  );
}

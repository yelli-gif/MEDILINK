import { 
  Briefcase,
  ShieldCheck,
  Info,
  Key
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AddStaff() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');

  // Fetch dynamic services from localStorage
  const savedServices = localStorage.getItem('sanctuary_services');
  const dynamicServices = savedServices ? JSON.parse(savedServices).map((s: any) => s.name) : [];
  
  const roles = [
    "Médecin",
    "Accueil"
  ];

  const departments = Array.from(new Set([
    ...dynamicServices,
    "Unité de Cardiologie",
    "Soins d'Urgence"
  ]));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !role || !department) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Generate a simple email based on name
    const emailName = fullName.toLowerCase().replace(/\s+/g, '.').replace(/[^\w.]/g, '');
    const email = `${emailName}@sanctuary.com`;

    const newStaff = {
      id: Date.now().toString(),
      name: fullName,
      email: email,
      role: role,
      department: department,
      status: 'Actif'
    };

    const existing = localStorage.getItem('sanctuary_staff');
    const staffList = existing ? JSON.parse(existing) : [];
    localStorage.setItem('sanctuary_staff', JSON.stringify([newStaff, ...staffList]));

    // Create Notification
    const notifications = JSON.parse(localStorage.getItem('sanctuary_notifications') || '[]');
    const newNotification = {
      id: Date.now().toString(),
      type: 'staff',
      title: 'Nouveau membre intégré',
      message: `${fullName} a été ajouté avec succès au service ${department}.`,
      time: new Date().toISOString(),
      read: false
    };
    localStorage.setItem('sanctuary_notifications', JSON.stringify([newNotification, ...notifications]));
    window.dispatchEvent(new Event('notifications_updated'));

    navigate('/staff');
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto pb-12 pt-4">
      
      {/* Header Info */}
      <div className="mb-10">
        <p className="text-[11px] font-extrabold tracking-widest text-[#0B56FA] flex gap-2 mb-2 items-center uppercase">
          <UsersIcon className="w-3.5 h-3.5" /> CROISSANCE DE L'ÉTABLISSEMENT
        </p>
        <h2 className="text-[34px] font-extrabold text-gray-900 leading-tight mb-3">
          Intégrer un Nouveau Personnel
        </h2>
        <p className="text-[#5D6470] text-[15px] font-medium leading-relaxed max-w-2xl">
          Agrandissez la capacité opérationnelle de votre établissement en créant une identité numérique sécurisée. Une fois créées, des informations de connexion temporaires seront générées pour une activation immédiate.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white rounded-[24px] p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] border border-[#E5E9F0]/80 h-fit">
           
           <div className="space-y-6">
              
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">
                  Nom Légal Complet
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Dr. Julianne Sterling" 
                    className="w-full bg-[#EAECEF] font-semibold text-gray-900 placeholder:text-gray-400 rounded-xl pl-4 pr-11 py-3.5 outline-none focus:ring-2 focus:ring-[#0B56FA]/20 transition-all font-sans" 
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                     <Briefcase className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-[13px] font-bold text-gray-900 mb-2">
                       Rôle du Personnel
                    </label>
                    <div className="relative">
                       <select 
                         value={role}
                         onChange={(e) => setRole(e.target.value)}
                         className="appearance-none w-full bg-[#EAECEF] font-semibold text-gray-900 rounded-xl pl-4 pr-11 py-3.5 outline-none focus:ring-2 focus:ring-[#0B56FA]/20 transition-all cursor-pointer font-sans"
                       >
                         <option value="">Sélectionner le Rôle</option>
                         {roles.map(r => <option key={r} value={r}>{r}</option>)}
                       </select>
                       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                       </div>
                    </div>
                 </div>
                 
                 <div>
                    <label className="block text-[13px] font-bold text-gray-900 mb-2">
                       Affectation du Service
                    </label>
                    <div className="relative">
                       <select 
                         value={department}
                         onChange={(e) => setDepartment(e.target.value)}
                         className="appearance-none w-full bg-[#EAECEF] font-semibold text-gray-900 rounded-xl pl-4 pr-11 py-3.5 outline-none focus:ring-2 focus:ring-[#0B56FA]/20 transition-all cursor-pointer font-sans"
                       >
                         <option value="">Sélectionner le Service</option>
                         {departments.map(d => <option key={d} value={d}>{d}</option>)}
                       </select>
                       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-[#F8F9FA] border border-[#E5E9F0] rounded-2xl p-6 mt-8 flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-[#0B56FA] flex-shrink-0">
                     <Key className="w-5 h-5" />
                  </div>
                  <div>
                     <h4 className="text-[15px] font-extrabold text-gray-900 mb-1">Générer les Identifiants Automatiquement</h4>
                     <p className="text-[12px] text-gray-500 leading-relaxed font-medium mb-5">
                       Un mot de passe temporaire unique et un ID système seront créés et envoyés à l'administrateur pour une transmission sécurisée hors ligne.
                     </p>
                     <div className="flex gap-4 items-center">
                        <button type="submit" className="bg-[#0B56FA] hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-full text-[13px] transition-colors shadow-md shadow-blue-500/20">
                           Confirmer & Créer le Personnel
                        </button>
                        <button type="button" onClick={() => navigate('/staff')} className="text-[13px] font-bold text-gray-500 hover:text-gray-900">
                           Annuler
                        </button>
                     </div>
                  </div>
              </div>

           </div>
        </form>

        {/* Right Column - Info Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
           
           {/* Blue Secure Card */}
           <div className="bg-gradient-to-br from-[#0B56FA] to-[#0A49D6] rounded-[24px] p-8 text-white relative overflow-hidden shadow-[0_12px_24px_-8px_rgba(11,86,250,0.4)]">
              {/* Hexagon shape in background */}
              <svg className="absolute -right-8 -bottom-8 w-48 h-48 opacity-20" viewBox="0 0 24 24" fill="currentColor">
                 <polygon points="12 2 22 8 22 19 12 23 2 19 2 8 12 2" />
              </svg>

              <div className="relative z-10">
                 <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md mb-6">
                    <ShieldCheck className="w-6 h-6 text-white" />
                 </div>
                 
                 <h3 className="text-[24px] font-extrabold mb-4 leading-tight">
                   Accès Sécurisé <br/>Garanti.
                 </h3>
                 <p className="text-[14px] text-blue-100/90 font-medium leading-relaxed mb-8">
                   Tous les comptes du personnel sont protégés par un chiffrement 256 bits. Les journaux d'accès au système sont conservés pour chaque session conformément aux exigences réglementaires.
                 </p>

                 <div className="bg-blue-600/50 border border-blue-500/50 backdrop-blur-md rounded-full py-2 px-4 shadow-inner inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1FE294] animate-pulse"></span>
                    <span className="text-[10px] font-bold tracking-widest uppercase">Protocole Actif</span>
                 </div>
              </div>
           </div>

           {/* Pro Tip Card */}
           <div className="bg-[#E4ECE7] rounded-[24px] p-8 border border-[#D1E0D7] text-[#3F6A52]">
             <h4 className="flex items-center gap-2 text-[15px] font-extrabold mb-3">
               <Info className="w-5 h-5" /> Conseil Pro
             </h4>
             <p className="text-[13px] font-medium leading-relaxed">
               Assurez-vous que "l'Affectation du Service" est exacte. Cela détermine quels dossiers de patients et cliniques le membre du personnel peut consulter au sein du module des dossiers médicaux.
             </p>
           </div>
           
           {/* Micro Stats */}
           <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#E5E9F0]/80">
                 <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-1">Personnel Actif</p>
                 <p className="text-[32px] font-extrabold text-gray-900 leading-none tracking-tight">124</p>
              </div>
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#E5E9F0]/80">
                 <p className="text-[10px] font-bold tracking-widest text-[#E65A10] uppercase mb-1">Synchronisation</p>
                 <p className="text-[32px] font-extrabold text-gray-900 leading-none tracking-tight">03</p>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}

// Inline Icon
function UsersIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="8.5" cy="7" r="4"></circle>
      <polyline points="17 11 19 13 23 9"></polyline>
    </svg>
  );
}

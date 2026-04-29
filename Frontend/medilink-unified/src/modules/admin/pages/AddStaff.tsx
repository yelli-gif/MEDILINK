import {
  Briefcase,
  ShieldCheck,
  Info,
  Key,
  Mail,
  Lock,
  User as UserIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authAPI, personnelAPI, serviceAPI } from '../../../services/api';

export default function AddStaff() {
  const navigate = useNavigate();
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('1234'); // Default temp password
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [availableServices, setAvailableServices] = useState<string[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const configRaw = localStorage.getItem('sanctuary_hospital_config');
        const config = configRaw ? JSON.parse(configRaw) : null;
        const hopitalId = config?.id;

        const services = await serviceAPI.listerTous(hopitalId);
        setAvailableServices(services.map(s => s.nom).filter(Boolean));
      } catch (err) {
        console.error("Erreur chargement services:", err);
      } finally {
        setServicesLoading(false);
      }
    };
    loadServices();
  }, []);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const services = await serviceAPI.listerTous();
        // On récupère uniquement les noms des services réels
        const apiDepts = services.map((s: any) => s.nom || s.name).filter(Boolean);
        setDepartments(apiDepts);
      } catch (err) {
        console.error("Erreur chargement services:", err);
      }
    };
    loadServices();
  }, []);

  const roles = [
    { label: "Médecin", value: "MEDECIN" },
    { label: "Accueil / Réception", value: "ACCUEIL" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prenom || !nom || !email || !role || !department) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setLoading(true);

    try {
      // 0. Récupérer l'ID de l'hôpital
      const configRaw = localStorage.getItem('sanctuary_hospital_config');
      const config = configRaw ? JSON.parse(configRaw) : null;
      const hopitalId = config?.id || 1;

      // 1. Register user in Lot 1 (port 8081)
      const savedUser = await authAPI.register({
        email: email,
        motDePasse: password,
        role: role // Backend expected role (MEDECIN or ACCUEIL)
      });

      // 2. If it's a doctor, add to personnel table in Lot 1
      if (role === "MEDECIN") {
        await personnelAPI.ajouterMedecin({
          id: savedUser.id, // ID partagé
          nom: nom,
          prenom: prenom,
          email: email,
          specialite: department,
          service: { nom: department } 
        });
      } else if (role === "ACCUEIL") {
        await personnelAPI.ajouterAccueil({
          id: savedUser.id,
          nom: nom,
          prenom: prenom,
          email: email,
          hopital: { id: parseInt(hopitalId) }
        });
      }

      // Success Notification
      const notifications = JSON.parse(localStorage.getItem('sanctuary_notifications') || '[]');
      const newNotification = {
        id: Date.now().toString(),
        type: 'staff',
        title: 'Nouveau membre intégré',
        message: `${prenom} ${nom} a été ajouté avec succès au service ${department}.`,
        time: new Date().toISOString(),
        read: false
      };
      localStorage.setItem('sanctuary_notifications', JSON.stringify([newNotification, ...notifications]));
      window.dispatchEvent(new Event('notifications_updated'));

      navigate('/admin/staff');
    } catch (err: any) {
      console.error("Erreur ajout personnel:", err);
      alert(err.message || "Erreur lors de l'ajout du personnel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto pb-12 pt-4">
      <div className="mb-10">
        <p className="text-[11px] font-extrabold tracking-widest text-[#0B56FA] flex gap-2 mb-2 items-center uppercase">
          <UserIcon className="w-3.5 h-3.5" /> GESTION DES RESSOURCES HUMAINES
        </p>
        <h2 className="text-[34px] font-extrabold text-gray-900 leading-tight mb-3">
          Ajouter un membre du personnel
        </h2>
        <p className="text-[#5D6470] text-[15px] font-medium leading-relaxed max-w-2xl">
          Créez un accès sécurisé pour vos médecins et agents d'accueil.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white rounded-[24px] p-8 shadow-sm border border-[#E5E9F0]/80">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">Prénom *</label>
                <input type="text" required value={prenom} onChange={e => setPrenom(e.target.value)} className="w-full bg-[#F3F4F6] border-0 rounded-xl px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Julianne" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">Nom *</label>
                <input type="text" required value={nom} onChange={e => setNom(e.target.value)} className="w-full bg-[#F3F4F6] border-0 rounded-xl px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Sterling" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-900 mb-2">Email Professionnel *</label>
              <div className="relative">
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#F3F4F6] border-0 rounded-xl pl-11 py-3 font-medium outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="j.sterling@hopital.fr" />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-gray-900 mb-2">Mot de passe temporaire</label>
              <div className="relative">
                <input type="text" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-[#F3F4F6] border-0 rounded-xl pl-11 py-3 font-medium outline-none" />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">Rôle *</label>
                <select required value={role} onChange={e => setRole(e.target.value)} className="w-full bg-[#F3F4F6] border-0 rounded-xl px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-blue-500/20">
                  <option value="">Sélectionner...</option>
                  {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-900 mb-2">Service d'affectation *</label>
                <select required value={department} onChange={e => setDepartment(e.target.value)} className="w-full bg-[#F3F4F6] border-0 rounded-xl px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-blue-500/20">
                  <option value="">{availableServices.length === 0 ? "Aucun service créé" : "Sélectionner..."}</option>
                  {availableServices.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                {availableServices.length === 0 && !servicesLoading && (
                  <p className="text-[11px] text-red-500 mt-1 font-bold">Veuillez d'abord créer un service dans l'onglet "Services".</p>
                )}
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#0B56FA] text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 mt-4 disabled:opacity-50">
              {loading ? "Enregistrement..." : "Enregistrer le nouveau personnel"}
            </button>
          </div>
        </form>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#EEF2FF] rounded-[24px] p-8 border border-blue-100">
             <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2"><ShieldCheck size={20} /> Sécurité</h3>
             <p className="text-sm text-blue-800/80 leading-relaxed">
               Les informations de connexion seront transmises de manière sécurisée. Le personnel devra changer son mot de passe lors de sa première connexion.
             </p>
          </div>
          <div className="bg-[#FDF2F2] rounded-[24px] p-8 border border-red-100">
             <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2"><Info size={20} /> Important</h3>
             <p className="text-sm text-red-800/80 leading-relaxed">
               L'email doit être unique dans le système Medilink. Pour un médecin, son numéro RPPS pourra être ajouté ultérieurement dans son profil.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

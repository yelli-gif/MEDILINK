import {
  Shield,
  MapPin,
  ArrowRight,
  Mail,
  Lock,
  PlusCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function PharmacyCreation() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreate = () => {
    if (!name || !email || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const config = {
      id: 'PH-' + Date.now(),
      nom: name,
      adresse: address,
      email: email,
      motDePasse: password,
      type: 'PHARMACIE'
    };

    localStorage.setItem('medilink_pharmacy_config', JSON.stringify(config));
    navigate('/admin/pharmacy/setup'); // Or where appropriate
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <nav className="bg-white px-8 py-4 flex items-center justify-between border-b">
        <span className="font-bold text-xl text-blue-600 flex items-center gap-2">
          <PlusCircle className="text-emerald-500" /> Medilink Pharmacie
        </span>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12 w-full">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Enregistrer une Pharmacie</h1>
        <p className="text-slate-500 mb-12">Configurez une nouvelle officine pour le réseau de distribution Medilink.</p>

        <div className="bg-white rounded-[32px] p-10 shadow-sm border border-slate-100">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                 <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nom de l'Officine</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Pharmacie du Centre" className="w-full bg-slate-50 border-0 rounded-xl px-4 py-3.5 outline-none font-medium" />
                 </div>
                 <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Adresse</label>
                    <div className="relative">
                       <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="12 Rue de la Paix, Paris" className="w-full bg-slate-50 border-0 rounded-xl pl-11 py-3.5 outline-none font-medium" />
                    </div>
                 </div>
              </div>

              <div className="space-y-6">
                 <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Email de l'Officine</label>
                    <div className="relative">
                       <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="contact@pharmacie-centre.fr" className="w-full bg-slate-50 border-0 rounded-xl pl-11 py-3.5 outline-none font-medium" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Mot de passe</label>
                    <div className="relative">
                       <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                       <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-slate-50 border-0 rounded-xl pl-11 py-3.5 outline-none font-medium" />
                    </div>
                 </div>
              </div>
           </div>

           <button onClick={handleCreate} className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 mt-12 transition-all hover:bg-blue-700 shadow-lg shadow-blue-500/20">
             Enregistrer la pharmacie <ArrowRight size={18} />
           </button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
           <Shield size={14} /> Sécurisé par le protocole Medilink HDS
        </div>
      </main>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, ChevronDown, MapPin, Calendar, Heart, ShieldCheck } from 'lucide-react';
import TopNavBar from '../Composants/TopNavBar';
import FloatingNav from '../Composants/FloatingNav';

const Profile: React.FC = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    bloodType: '', 
    weight: '', 
    height: '', 
    location: '', 
    dob: '' 
  });
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const userString = localStorage.getItem('medilink_user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setFormData({
          name: user.name || '',
          bloodType: user.bloodType || '',
          weight: user.weight || '',
          height: user.height || '',
          location: user.location || '',
          dob: user.dob || ''
        });
      } catch(e) {}
    }
  }, []);

  const handleSave = () => {
    try {
      const userString = localStorage.getItem('medilink_user');
      let user = userString ? JSON.parse(userString) : { isNew: true, email: 'nouveau@medilink.fr' };
      user = { ...user, ...formData };
      localStorage.setItem('medilink_user', JSON.stringify(user));
      
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch(e) {}
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-32 relative">
      <TopNavBar />

      <main className="max-w-4xl mx-auto px-4 md:px-8 pt-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => window.history.back()}
            className="w-10 h-10 bg-white shadow-sm border border-[#F0F2F5] rounded-full flex items-center justify-center text-[#5A5C6B] hover:bg-[#F4F7FF] transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-[#14152A] tracking-tight">Mon Profil</h1>
        </div>

        {/* Profile Form Card */}
        <div className="bg-white rounded-[28px] p-6 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-[#F0F2F5]">
          
          <div className="flex items-center gap-4 mb-10 pb-8 border-b border-[#F0F2F5]">
            <div className="w-20 h-20 bg-[#F4F7FF] rounded-full flex items-center justify-center text-[#0055FF] border-[4px] border-white shadow-md">
              <span className="text-3xl font-bold">{formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#14152A]">{formData.name || 'Utilisateur'}</h2>
              <div className="flex items-center gap-2 text-[#28B880] text-[12px] font-bold mt-1 bg-[#E5F7ED] px-3 py-1 rounded-full w-max">
                <ShieldCheck size={14} /> COMPTE VÉRIFIÉ
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <label className="block text-[11px] font-bold text-[#A0A4B8] uppercase tracking-widest mb-3">Nom complet</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                className="w-full bg-[#F8FAFC] border border-[#F0F2F5] focus:bg-white focus:border-[#0055FF] focus:ring-4 focus:ring-[#0055FF]/10 text-[#14152A] rounded-2xl px-5 py-4 font-bold outline-none transition-all" 
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#A0A4B8] uppercase tracking-widest mb-3">Date de naissance</label>
              <div className="relative">
                <input 
                  type="text" 
                  onFocus={(e) => e.target.type = 'date'} 
                  onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }} 
                  value={formData.dob} 
                  onChange={e => setFormData({...formData, dob: e.target.value})} 
                  placeholder="jj/mm/aaaa" 
                  className="w-full bg-[#F8FAFC] border border-[#F0F2F5] focus:bg-white focus:border-[#0055FF] focus:ring-4 focus:ring-[#0055FF]/10 text-[#14152A] rounded-2xl px-5 py-4 font-bold outline-none transition-all" 
                />
                <Calendar size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#A0A4B8] pointer-events-none" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#A0A4B8] uppercase tracking-widest mb-3">Poids</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={formData.weight} 
                    onChange={e => setFormData({...formData, weight: e.target.value})} 
                    className="w-full bg-[#F8FAFC] border border-[#F0F2F5] focus:bg-white focus:border-[#0055FF] focus:ring-4 focus:ring-[#0055FF]/10 text-[#14152A] rounded-2xl px-5 py-4 font-bold outline-none transition-all" 
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[#14152A] font-bold">kg</span>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#A0A4B8] uppercase tracking-widest mb-3">Taille</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={formData.height} 
                    onChange={e => setFormData({...formData, height: e.target.value})} 
                    className="w-full bg-[#F8FAFC] border border-[#F0F2F5] focus:bg-white focus:border-[#0055FF] focus:ring-4 focus:ring-[#0055FF]/10 text-[#14152A] rounded-2xl px-5 py-4 font-bold outline-none transition-all" 
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[#14152A] font-bold">cm</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-[#A0A4B8] uppercase tracking-widest mb-3">Groupe sanguin</label>
              <div className="relative">
                <select 
                  value={formData.bloodType} 
                  onChange={e => setFormData({...formData, bloodType: e.target.value})} 
                  className="w-full bg-[#F8FAFC] border border-[#F0F2F5] focus:bg-white focus:border-[#0055FF] focus:ring-4 focus:ring-[#0055FF]/10 text-[#14152A] rounded-2xl px-5 py-4 appearance-none font-bold outline-none transition-all"
                >
                  <option value="" disabled>Sélectionner...</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
                <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#A0A4B8] pointer-events-none" />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold text-[#A0A4B8] uppercase tracking-widest mb-3">Localisation (Domicile)</label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    value={formData.location} 
                    onChange={e => setFormData({...formData, location: e.target.value})} 
                    placeholder="Ville, Code Postal" 
                    className="w-full bg-[#F8FAFC] border border-[#F0F2F5] focus:bg-white focus:border-[#0055FF] focus:ring-4 focus:ring-[#0055FF]/10 text-[#14152A] rounded-2xl px-5 py-4 font-bold outline-none pl-12 transition-all" 
                  />
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0055FF] pointer-events-none" />
                </div>
                <button 
                  type="button" 
                  onClick={async () => {
                    try {
                      const res = await fetch('https://ipapi.co/json/');
                      const data = await res.json();
                      if (data.city) {
                        setFormData({...formData, location: `${data.city}, ${data.postal}`});
                      }
                    } catch(err) {
                      if ("geolocation" in navigator) {
                         navigator.geolocation.getCurrentPosition(
                           () => setFormData({...formData, location: "Position GPS obtenue ✅"})
                         );
                      }
                    }
                  }}
                  className="bg-[#EBF1FF] hover:bg-[#D4E4FF] text-[#0055FF] px-6 rounded-2xl flex items-center justify-center transition-colors shadow-sm"
                  title="Obtenir ma position"
                >
                  <MapPin size={22} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-[#F0F2F5]">
            <button 
              onClick={handleSave} 
              className="bg-[#0055FF] hover:bg-[#0047D6] text-white font-bold py-4 px-10 rounded-full flex items-center gap-3 transition-colors shadow-[0_6px_20px_rgba(0,85,255,0.25)]"
            >
              <Save size={18} /> Sauvegarder les modifications
            </button>
          </div>
        </div>
      </main>

      <FloatingNav />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#14152A] text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <Heart size={20} className="text-[#28B880]" />
          <p className="font-bold text-[14px]">Vos données ont été enregistrées avec succès !</p>
        </div>
      )}
    </div>
  );
};

export default Profile;

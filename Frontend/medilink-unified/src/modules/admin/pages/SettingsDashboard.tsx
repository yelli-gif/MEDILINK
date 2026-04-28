import { useState, useEffect } from 'react';
import { 
  Building2, 
  BellRing, 
  ShieldCheck, 
  Palette, 
  Save, 
  Globe, 
  Clock, 
  Smartphone,
  Mail,
  Fingerprint,
  Moon,
  Sun,
  LayoutGrid,
  CheckCircle2
} from 'lucide-react';

type TabType = 'general' | 'notifications' | 'security' | 'appearance';

export default function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // States
  const [hospitalName, setHospitalName] = useState('Sanctuary Admin');
  const [language, setLanguage] = useState('Français (FR)');
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [density, setDensity] = useState('Aérée (Confortable)');

  // Load saved preferences
  useEffect(() => {
    const config = JSON.parse(localStorage.getItem('sanctuary_hospital_config') || '{}');
    if (config.name) setHospitalName(config.name);
    if (config.language) setLanguage(config.language);

    const prefs = JSON.parse(localStorage.getItem('sanctuary_preferences') || '{}');
    if (prefs.emergencyAlerts !== undefined) setEmergencyAlerts(prefs.emergencyAlerts);
    if (prefs.emailDigest !== undefined) setEmailDigest(prefs.emailDigest);
    if (prefs.twoFactor !== undefined) setTwoFactor(prefs.twoFactor);
    if (prefs.darkMode !== undefined) setDarkMode(prefs.darkMode);
    if (prefs.density) setDensity(prefs.density);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    
    // Persist data
    localStorage.setItem('sanctuary_hospital_config', JSON.stringify({ name: hospitalName, language }));
    localStorage.setItem('sanctuary_preferences', JSON.stringify({ 
      emergencyAlerts, 
      emailDigest, 
      twoFactor, 
      darkMode,
      density 
    }));

    // Alert layout to update
    window.dispatchEvent(new Event('hospital_config_updated'));
    window.dispatchEvent(new Event('sanctuary_settings_updated'));

    setTimeout(() => {
      setIsSaving(false);
      setToastMessage("Paramètres enregistrés avec succès !");
      setTimeout(() => setToastMessage(null), 3000);
    }, 800);
  };

  const tabs = [
    { id: 'general', label: 'Établissement', icon: Building2, desc: 'Infos globales' },
    { id: 'notifications', label: 'Notifications', icon: BellRing, desc: 'Règles d\'alerte' },
    { id: 'security', label: 'Sécurité & Accès', icon: ShieldCheck, desc: 'Mots de passe, 2FA' },
    { id: 'appearance', label: 'Apparence', icon: Palette, desc: 'Thèmes & Layouts' }
  ] as const;

  return (
    <div className="max-w-[1200px] w-full mx-auto pb-12 pt-4">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-[34px] font-extrabold text-gray-900 leading-tight mb-2">
            Paramètres du Portail
          </h2>
          <p className="text-[#5D6470] text-[15px] font-medium leading-relaxed max-w-2xl">
            Configurez le fonctionnement global de votre environnement Sanctuary Admin.
          </p>
        </div>
        <div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 text-white bg-[#0B56FA] hover:bg-blue-700 font-bold py-3 px-6 rounded-xl text-[14px] transition-all shadow-md shadow-blue-500/20 active:scale-95 disabled:opacity-70 disabled:scale-100"
          >
            <Save className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} /> 
            {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Settings Navigation Sidebar */}
        <div className="lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-[24px] p-4 flex flex-col gap-2 border border-[#E5E9F0]/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] sticky top-28">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`w-full text-left flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
                    isActive 
                    ? 'bg-[#EEF4FF] text-[#0B56FA]' 
                    : 'text-[#5D6470] hover:bg-[#F4F6FC] hover:text-gray-900'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive ? 'bg-blue-100/50' : 'bg-gray-50'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold">{tab.label}</h3>
                    <p className={`text-[11px] font-medium mt-0.5 ${isActive ? 'text-blue-500/70' : 'text-[#8C93A1]'}`}>
                      {tab.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 bg-white rounded-[24px] p-8 md:p-12 border border-[#E5E9F0]/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] min-h-[500px]">
          
          {/* TAB 1: GENERAL */}
          {activeTab === 'general' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-[20px] font-extrabold text-gray-900 mb-6">Identité de l'Établissement</h3>
              
              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-[13px] font-bold text-[#5D6470] mb-2">Nom Officiel du Centre Hospitalier</label>
                  <input 
                    type="text" 
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    className="w-full bg-[#F4F6FC] border border-transparent focus:bg-white focus:border-[#0B56FA] focus:ring-4 focus:ring-[#0B56FA]/10 rounded-xl px-4 py-3 text-[14px] font-bold text-gray-900 outline-none transition-all"
                  />
                </div>
                
                <div className="flex gap-6">
                  <div className="flex-1">
                    <label className="block text-[13px] font-bold text-[#5D6470] mb-2 flex items-center gap-2">
                       <Globe className="w-4 h-4 text-gray-400" /> Langue du Système
                    </label>
                    <select 
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full bg-[#F4F6FC] border border-transparent rounded-xl px-4 py-3 text-[14px] font-bold text-gray-900 outline-none appearance-none cursor-pointer"
                    >
                      <option>Français (FR)</option>
                      <option>Anglais (US)</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-[13px] font-bold text-[#5D6470] mb-2 flex items-center gap-2">
                       <Clock className="w-4 h-4 text-gray-400" /> Fuseau Horaire
                    </label>
                    <select className="w-full bg-[#F4F6FC] border border-transparent rounded-xl px-4 py-3 text-[14px] font-bold text-gray-900 outline-none appearance-none cursor-pointer">
                      <option>Europe/Paris (GMT+1)</option>
                      <option>Europe/London (GMT)</option>
                    </select>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-[20px] font-extrabold text-gray-900 mb-6 flex items-center gap-3">
                 Règles d'Alerte et Routage
              </h3>
              
              <div className="space-y-6 max-w-2xl">
                {/* Toggle 1 */}
                <div className="flex items-center justify-between p-5 bg-[#F4F6FC] rounded-2xl border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 mt-1">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-gray-900 mb-1">Alertes SMS Critiques</h4>
                      <p className="text-[13px] text-[#5D6470] font-medium leading-relaxed max-w-sm">Envoie un ping direct sur les téléphones des superviseurs en cas d'urgence Code Rouge.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setEmergencyAlerts(!emergencyAlerts)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${emergencyAlerts ? 'bg-[#0B56FA]' : 'bg-gray-300'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${emergencyAlerts ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>

                {/* Toggle 2 */}
                <div className="flex items-center justify-between p-5 bg-[#F4F6FC] rounded-2xl border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0B56FA] flex items-center justify-center shrink-0 mt-1">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-gray-900 mb-1">Rapport Quotidien E-mail</h4>
                      <p className="text-[13px] text-[#5D6470] font-medium leading-relaxed max-w-sm">Recevez le résumé des admissions et de l'état des effectifs tous les soirs à 20h00.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setEmailDigest(!emailDigest)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${emailDigest ? 'bg-[#0B56FA]' : 'bg-gray-300'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${emailDigest ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY */}
          {activeTab === 'security' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-[20px] font-extrabold text-gray-900 mb-6">Sécurité du Compte Administrateur</h3>
              
              <div className="space-y-6 max-w-2xl">
                 <div className="flex items-center justify-between p-6 bg-amber-50/50 rounded-2xl border border-amber-100 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 blur-3xl rounded-full"></div>
                   <div className="relative z-10 flex items-start gap-4">
                     <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                       <Fingerprint className="w-5 h-5" />
                     </div>
                     <div>
                       <h4 className="text-[15px] font-bold text-gray-900 mb-1">Authentification à Double Facteur (2FA)</h4>
                       <p className="text-[13px] text-[#5D6470] font-medium leading-relaxed max-w-md">Protège l'accès au portail Sanctuary en exigeant un code temporaire en plus de votre mot de passe.</p>
                     </div>
                   </div>
                   <button 
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={`relative z-10 w-12 h-6 rounded-full transition-colors ${twoFactor ? 'bg-[#0B56FA]' : 'bg-gray-300'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${twoFactor ? 'left-7' : 'left-1'}`}></div>
                  </button>
                 </div>

                 <div>
                  <label className="block text-[13px] font-bold text-[#5D6470] mb-2 flex items-center gap-2">Délai d'inactivité avant déconnexion automatique</label>
                  <select className="w-[300px] bg-[#F4F6FC] border border-transparent rounded-xl px-4 py-3 text-[14px] font-bold text-gray-900 outline-none appearance-none cursor-pointer">
                    <option>15 Minutes (Recommandé HIPAA)</option>
                    <option>30 Minutes</option>
                    <option>1 Heure</option>
                    <option>Jamais (Non Recommandé)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: APPEARANCE */}
          {activeTab === 'appearance' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-[20px] font-extrabold text-gray-900 mb-6">Apparence Visuelle de l'UI</h3>
              
              <div className="space-y-8 max-w-2xl">
                 
                 <div>
                    <h4 className="text-[14px] font-bold text-gray-900 mb-4">Thème Préféré</h4>
                    <div className="grid grid-cols-2 gap-4">
                       <button 
                         onClick={() => setDarkMode(false)}
                         className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${!darkMode ? 'border-[#0B56FA] bg-[#EEF4FF]' : 'border-[#E5E9F0] bg-white hover:border-gray-300'}`}
                       >
                          <div className="flex items-center gap-3">
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!darkMode ? 'bg-white text-yellow-500 shadow-sm' : 'bg-[#F4F6FC] text-gray-400'}`}>
                               <Sun className="w-5 h-5" />
                             </div>
                             <span className={`font-bold ${!darkMode ? 'text-[#0B56FA]' : 'text-[#5D6470]'}`}>Thème Clair</span>
                          </div>
                          {!darkMode && <div className="w-4 h-4 rounded-full bg-[#0B56FA] ring-2 ring-[#0B56FA] ring-offset-2"></div>}
                       </button>

                       <button 
                         onClick={() => setDarkMode(true)}
                         className={`p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${darkMode ? 'border-[#0B56FA] bg-[#0F172A]' : 'border-[#E5E9F0] bg-white hover:border-gray-300'}`}
                       >
                          <div className="flex items-center gap-3">
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-slate-800 text-blue-400 shadow-sm' : 'bg-[#F4F6FC] text-gray-400'}`}>
                               <Moon className="w-5 h-5" />
                             </div>
                             <span className={`font-bold ${darkMode ? 'text-white' : 'text-[#5D6470]'}`}>Thème Sombre</span>
                          </div>
                          {darkMode && <div className="w-4 h-4 rounded-full bg-[#0B56FA] ring-2 ring-[#0B56FA] ring-offset-2 ring-offset-[#0F172A]"></div>}
                       </button>
                    </div>
                 </div>

                 <div>
                    <h4 className="text-[14px] font-bold text-gray-900 mb-4 flex items-center gap-2"><LayoutGrid className="w-4 h-4 text-gray-400"/> Densité de la Grille (Data)</h4>
                    <select 
                      value={density}
                      onChange={(e) => setDensity(e.target.value)}
                      className="w-[300px] bg-[#F4F6FC] border border-transparent rounded-xl px-4 py-3 text-[14px] font-bold text-gray-900 outline-none appearance-none cursor-pointer"
                    >
                      <option>Aérée (Confortable)</option>
                      <option>Compacte (Vue experte)</option>
                    </select>
                 </div>

              </div>
            </div>
          )}

        </div>
      </div>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-10 right-10 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-gray-900/95 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-[14px] font-bold">{toastMessage}</p>
          </div>
        </div>
      )}

    </div>
  );
}

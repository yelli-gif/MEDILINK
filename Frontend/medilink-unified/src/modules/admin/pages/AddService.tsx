import {
  Clock,
  ChevronDown,
  ChevronRight,
  Search,
  Stethoscope,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { serviceAPI } from '../../../services/api';

interface DaySchedule {
  active: boolean;
  start: string;
  end: string;
}

interface ServiceHours {
  [key: string]: DaySchedule;
}

const HOSPITAL_SERVICES = [
  // Médecine Interne & Spécialités
  { name: 'Cardiologie', category: 'Médecine Interne', icon: 'heart' },
  { name: 'Neurologie', category: 'Médecine Interne', icon: 'brain' },
  { name: 'Pneumologie', category: 'Médecine Interne', icon: 'wind' },
  { name: 'Gastro-entérologie', category: 'Médecine Interne', icon: 'activity' },
  { name: 'Néphrologie', category: 'Médecine Interne', icon: 'droplets' },
  { name: 'Endocrinologie', category: 'Médecine Interne', icon: 'thermometer' },
  { name: 'Rhumatologie', category: 'Médecine Interne', icon: 'bone' },
  { name: 'Dermatologie', category: 'Médecine Interne', icon: 'shield' },
  { name: 'Oncologie médical', category: 'Médecine Interne', icon: 'activity' },
  { name: 'Hématologie', category: 'Médecine Interne', icon: 'test-tube' },
  { name: 'Gériatrie', category: 'Médecine Interne', icon: 'user' },
  { name: 'Maladies Infectieuses', category: 'Médecine Interne', icon: 'shield-alert' },
  { name: 'Médecine Interne Polyvalente', category: 'Médecine Interne', icon: 'stethoscope' },
  { name: 'Addictologie', category: 'Médecine Interne', icon: 'frown' },
  { name: 'Soins Palliatifs', category: 'Médecine Interne', icon: 'heart' },

  // Chirurgie
  { name: 'Chirurgie Générale', category: 'Chirurgie', icon: 'scissors' },
  { name: 'Chirurgie Orthopédique', category: 'Chirurgie', icon: 'bone' },
  { name: 'Neurochirurgie', category: 'Chirurgie', icon: 'brain' },
  { name: 'Urologie', category: 'Chirurgie', icon: 'activity' },
  { name: 'Ophtalmologie', category: 'Chirurgie', icon: 'eye' },
  { name: 'Oto-Rhino-Laryngologie (ORL)', category: 'Chirurgie', icon: 'ear' },
  { name: 'Stomatologie & Maxillo-faciale', category: 'Chirurgie', icon: 'smile' },
  { name: 'Chirurgie Plastique & Esthétique', category: 'Chirurgie', icon: 'user' },
  { name: 'Chirurgie Vasculaire', category: 'Chirurgie', icon: 'activity' },
  { name: 'Chirurgie Thoracique', category: 'Chirurgie', icon: 'wind' },

  // Urgences & Soins Critiques
  { name: 'Urgences Adultes', category: 'Urgences', icon: 'zap' },
  { name: 'Urgences Pédiatriques', category: 'Urgences', icon: 'zap' },
  { name: 'Réanimation Polyvalente', category: 'Urgences', icon: 'alert-circle' },
  { name: 'Unité de Soins Intensifs (USI)', category: 'Urgences', icon: 'activity' },
  { name: 'Unité de Soins Continus', category: 'Urgences', icon: 'clock' },
  { name: 'SAMU / SMUR', category: 'Urgences', icon: 'truck' },

  // Mère & Enfant
  { name: 'Gynécologie-Obstétrique', category: 'Médecine Interne', icon: 'baby' },
  { name: 'Maternité', category: 'Médecine Interne', icon: 'home' },
  { name: 'Pédiatrie Générale', category: 'Pédiatrie', icon: 'baby' },
  { name: 'Néonatalogie', category: 'Pédiatrie', icon: 'baby' },
  { name: 'Chirurgie Pédiatrique', category: 'Pédiatrie', icon: 'scissors' },

  // Diagnostic & médico-Technique
  { name: 'Radiologie & Imagerie Médicale', category: 'Diagnostic', icon: 'camera' },
  { name: 'Scanner & IRM', category: 'Diagnostic', icon: 'layers' },
  { name: 'Laboratoire d\'Analyses', category: 'Diagnostic', icon: 'test-tube' },
  { name: 'Anesthésiologie', category: 'Diagnostic', icon: 'pills' },
  { name: 'Pharmacie Hospitalière', category: 'Diagnostic', icon: 'pill' },
  { name: 'Médecine Nucléaire', category: 'Diagnostic', icon: 'zap' },
  { name: 'Anatomie et Cytologie Pathologiques', category: 'Diagnostic', icon: 'microscope' },
  { name: 'Radiothérapie', category: 'Diagnostic', icon: 'target' },

  // Réadaptation & Divers
  { name: 'Médecine Physique et Réadaptation', category: 'Médecine Interne', icon: 'accessibility' },
  { name: 'Kinésithérapie', category: 'Médecine Interne', icon: 'user' },
  { name: 'Diététique & Nutrition', category: 'Médecine Interne', icon: 'apple' },
  { name: 'Hygiène Hospitalière', category: 'Diagnostic', icon: 'shield-check' },
  { name: 'Psychiatrie Adultes', category: 'Médecine Interne', icon: 'smile' },
  { name: 'Pédopsychiatrie', category: 'Pédiatrie', icon: 'smile' },
];

export default function AddService() {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Médecine Interne');
  const [description, setDescription] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);

  const [hours, setHours] = useState<ServiceHours>({
    'Lundi': { active: true, start: '08:00 AM', end: '05:00 PM' },
    'Mardi': { active: true, start: '08:00 AM', end: '05:00 PM' },
    'Mercredi': { active: true, start: '08:00 AM', end: '05:00 PM' },
    'Jeudi': { active: true, start: '08:00 AM', end: '05:00 PM' },
    'Vendredi': { active: true, start: '08:00 AM', end: '05:00 PM' },
    'Samedi': { active: false, start: '08:00 AM', end: '05:00 PM' },
    'Dimanche': { active: false, start: '08:00 AM', end: '05:00 PM' }
  });

  useEffect(() => {
    if (name.length > 0) {
      const filtered = HOSPITAL_SERVICES.filter(service =>
        service.name.toLowerCase().includes(name.toLowerCase()) ||
        service.category.toLowerCase().includes(name.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      // Si vide mais focalisé, montrer les services majeurs
      setFilteredSuggestions(HOSPITAL_SERVICES.slice(0, 10));
    }
  }, [name]);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (nameRef.current && !nameRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectSuggestion = (service: any) => {
    setName(service.name);
    setCategory(service.category);
    setShowSuggestions(false);
  };

  const toggleDay = (day: string) => {
    setHours(prev => ({
      ...prev,
      [day]: { ...prev[day], active: !prev[day].active }
    }));
  };

  const updateHour = (day: string, field: 'start' | 'end', value: string) => {
    setHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const [deploying, setDeploying] = useState(false);

  const handleDeploy = async () => {
    if (!name.trim()) {
      alert("Veuillez entrer un nom pour le service.");
      return;
    }

    setDeploying(true);

    try {
      // Récupérer l'ID de l'hôpital connecté
      const configRaw = localStorage.getItem('sanctuary_hospital_config');
      const config = configRaw ? JSON.parse(configRaw) : null;
      const hopitalId = config?.id || 1;

      // Appel réel au backend (Lot 2 - port 8082)
      await serviceAPI.creer({
        nom: name,
        description: description || `Service de ${name}`,
        hopitalId: parseInt(hopitalId),
      });
    } catch (err) {
      console.error('Erreur création service backend:', err);
      // On continue même si le backend échoue pour sauvegarder localement
    }

    // Sauvegarde locale aussi (pour l'affichage immédiat)
    const newService = {
      id: Date.now().toString(),
      name,
      category,
      description,
      hours,
      practitioner: "À assigner",
      staffCount: 0,
      status: 'normal',
      iconType: 'activity'
    };

    const existing = localStorage.getItem('sanctuary_services');
    const services = existing ? JSON.parse(existing) : [];
    localStorage.setItem('sanctuary_services', JSON.stringify([newService, ...services]));

    // Create Notification
    const notifications = JSON.parse(localStorage.getItem('sanctuary_notifications') || '[]');
    const newNotification = {
      id: Date.now().toString(),
      type: 'service',
      title: 'Nouveau service médical',
      message: `L'unité ${name} (${category}) est maintenant opérationnelle dans l'établissement.`,
      time: new Date().toISOString(),
      read: false
    };
    localStorage.setItem('sanctuary_notifications', JSON.stringify([newNotification, ...notifications]));
    window.dispatchEvent(new Event('notifications_updated'));

    setDeploying(false);
    navigate('/admin/services');
  };

  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  return (
    <div className="max-w-[1000px] w-full mx-auto pb-12 pt-4">

      {/* Header Info */}
      <div className="mb-10 animate-fade-in-up">
        <h2 className="text-[32px] font-extrabold text-gray-900 leading-tight mb-3">
          Configurer le Service Médical
        </h2>
        <p className="text-[#5D6470] text-[15px] font-medium leading-relaxed max-w-2xl">
          Définissez l'identité clinique et la disponibilité opérationnelle pour le nouveau département départemental.
        </p>
      </div>

      <div className="space-y-6">

        {/* Service Identity Card */}
        <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] border border-[#E5E9F0]/80 animate-reveal-stagger card-active-glow hover-lift">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#EEF2F9] flex items-center justify-center text-[#0B56FA]">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="3" ry="3" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <line x1="8" y1="16" x2="16" y2="16" />
                  <line x1="8" y1="8" x2="12" y2="8" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-gray-900">Identité du Service</h3>
              <p className="text-[13px] font-medium text-gray-500 mt-1">
                Assurez-vous que la nomenclature suit les normes cliniques internationales.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative" ref={nameRef}>
              <label className="block text-[11px] font-bold text-[#8C93A1] tracking-widest uppercase mb-2">
                Nom du Service
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="ex. Unité de Cardiologie"
                  className="w-full bg-[#EAECEF] font-semibold text-gray-900 placeholder:text-gray-500 rounded-xl px-4 py-3 focus-glow"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                  <Search className="w-4 h-4" />
                </div>
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 animate-scale-in-soft">
                  <div className="p-2 max-h-[300px] overflow-y-auto">
                    <div className="px-3 py-1.5 text-[10px] font-bold text-[#8C93A1] uppercase tracking-widest flex items-center gap-2">
                      <Stethoscope className="w-3 h-3" /> Services Suggérés
                    </div>
                    {filteredSuggestions.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => selectSuggestion(item)}
                        className="w-full text-left px-4 py-3 hover:bg-[#F4F6FC] rounded-xl transition-all flex items-start gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#EEF4FF] flex items-center justify-center text-[#0B56FA] flex-shrink-0 mt-0.5 group-hover:bg-[#0B56FA] group-hover:text-white transition-colors">
                          <Plus className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[14px] font-bold text-gray-900 line-clamp-1">{item.name}</p>
                          <p className="text-[11px] text-[#8C93A1] font-medium tracking-tight uppercase">{item.category}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-all mt-1" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#8C93A1] tracking-widest uppercase mb-2">
                Catégorie du Département
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none w-full bg-[#EAECEF] font-semibold text-gray-900 rounded-xl px-4 py-3 focus-glow pr-12"
                >
                  <option>Médecine Interne</option>
                  <option>Chirurgie</option>
                  <option>Pédiatrie</option>
                  <option>Diagnostic</option>
                  <option>Urgences</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#8C93A1] tracking-widest uppercase mb-2">
              Description du Service
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Bref aperçu des capacités cliniques..."
              className="w-full bg-[#EAECEF] font-semibold text-gray-900 placeholder:text-gray-500 rounded-xl px-4 py-3 focus-glow resize-none"
            ></textarea>
          </div>
        </div>

        {/* Operational Hours Card */}
        <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)] border border-[#E5E9F0]/80 animate-reveal-stagger delay-100 card-active-glow hover-lift">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#EEF2F9] flex items-center justify-center text-[#5D6470]">
              <Clock className="w-6 h-6 outline-none" />
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-gray-900">Heures Opérationnelles</h3>
              <p className="text-[13px] font-medium text-gray-500 mt-1">
                Définissez des heures spécifiques pour chaque jour. Basculez l'interrupteur pour marquer comme fermé.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {days.map((day) => (
              <div key={day} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-gray-50/50 last:border-0">
                <div className="flex items-center gap-6 min-w-[150px]">
                  <span className="text-[14px] font-bold text-gray-900 w-24">{day}</span>
                  <div
                    onClick={() => toggleDay(day)}
                    className={`w-10 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors duration-200 ${hours[day].active ? 'bg-[#0B56FA]' : 'bg-[#E5E9F0]'}`}
                  >
                    <div className={`absolute top-1 bottom-1 w-4 h-4 bg-white rounded-full transition-all duration-200 shadow-sm ${hours[day].active ? 'right-1' : 'left-1'}`}></div>
                  </div>
                </div>

                <div className="flex items-center flex-1 max-w-[400px] gap-3">
                  {hours[day].active ? (
                    <>
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={hours[day].start}
                          onChange={(e) => updateHour(day, 'start', e.target.value)}
                          className="w-full bg-[#EAECEF] font-semibold text-gray-700 text-[13px] rounded-lg pl-4 pr-8 py-2.5 focus-glow"
                        />
                        <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                      </div>
                      <span className="text-[13px] font-medium text-gray-500">à</span>
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={hours[day].end}
                          onChange={(e) => updateHour(day, 'end', e.target.value)}
                          className="w-full bg-[#EAECEF] font-semibold text-gray-700 text-[13px] rounded-lg pl-4 pr-8 py-2.5 focus-glow"
                        />
                        <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                      </div>
                    </>
                  ) : (
                    <div className="w-full bg-[#F4F5F7] text-gray-400 font-medium italic text-[13px] rounded-lg px-4 py-2.5 text-center">
                      Fermé pour les opérations cliniques
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-6 mt-10 animate-fade-in-up delay-200">
        <button className="text-[14px] font-bold text-gray-600 hover:text-gray-900 transition-colors">
          Ignorer le Brouillon
        </button>
        <button
          onClick={handleDeploy}
          className="bg-[#0B56FA] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-500/20 transition-transform hover:scale-105 active:scale-95 text-[14px]"
        >
          Déployer le Service Médical
        </button>
      </div>

    </div>
  );
}

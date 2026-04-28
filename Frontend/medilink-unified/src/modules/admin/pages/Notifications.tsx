import { 
  Bell, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  UserPlus, 
  Package, 
  Search,
  ChevronRight,
  Clock,
  Settings2,
  X
} from 'lucide-react';
import { useState, useEffect } from 'react';

const STATIC_NOTIFICATIONS = [
  {
    id: 's1',
    type: 'system',
    title: 'Mise à jour du Système',
    message: 'La version v2.4.0 du dashboard a été déployée avec succès. Découvrez les nouvelles fonctions analytiques.',
    time: new Date(Date.now() - 7200000).toISOString(),
    read: true
  },
  {
    id: 's2',
    type: 'service',
    title: 'Service Opérationnel',
    message: 'La maintenance de l\'unité d\'Imagerie par Résonance Magnétique (IRM) est terminée.',
    time: new Date(Date.now() - 14400000).toISOString(),
    read: true
  }
];

export default function Notifications() {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<any | null>(null);

  useEffect(() => {
    const loadNotifications = () => {
      const saved = localStorage.getItem('sanctuary_notifications');
      if (saved) {
        setNotifications(JSON.parse(saved));
      } else {
        // Initialize with some static data if empty
        localStorage.setItem('sanctuary_notifications', JSON.stringify(STATIC_NOTIFICATIONS));
        setNotifications(STATIC_NOTIFICATIONS);
      }
    };

    loadNotifications();
    window.addEventListener('notifications_updated', loadNotifications);
    return () => window.removeEventListener('notifications_updated', loadNotifications);
  }, []);

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('sanctuary_notifications', JSON.stringify(updated));
    window.dispatchEvent(new Event('notifications_updated'));
  };

  const openDetail = (notification: any) => {
    setSelectedNotification(notification);
    if (!notification.read) {
      const updated = notifications.map(n => 
        n.id === notification.id ? { ...n, read: true } : n
      );
      setNotifications(updated);
      localStorage.setItem('sanctuary_notifications', JSON.stringify(updated));
      window.dispatchEvent(new Event('notifications_updated'));
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'staff': return UserPlus;
      case 'service': return CheckCircle2;
      case 'emergency': return AlertTriangle;
      case 'pharmacy': return Package;
      default: return Info;
    }
  };

  const getColorClasses = (type: string) => {
    switch (type) {
      case 'staff': return { color: 'text-purple-600', bg: 'bg-purple-50' };
      case 'service': return { color: 'text-emerald-600', bg: 'bg-emerald-50' };
      case 'emergency': return { color: 'text-red-600', bg: 'bg-red-50' };
      case 'pharmacy': return { color: 'text-amber-600', bg: 'bg-amber-50' };
      default: return { color: 'text-[#0B56FA]', bg: 'bg-blue-50' };
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "À l'instant";
    if (mins < 60) return `Il y a ${mins} min`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `Il y a ${hours} h`;
    return date.toLocaleDateString('fr-FR');
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter || (filter === 'unread' && !n.read));

  return (
    <div className="max-w-[1000px] w-full mx-auto pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <p className="text-[11px] font-extrabold tracking-widest text-[#8C93A1] uppercase mb-1.5 flex gap-2">
            Admin <span className="text-gray-300">/</span> <span className="text-[#0B56FA]">Notifications</span>
          </p>
          <h2 className="text-[38px] font-extrabold text-gray-900 leading-tight flex items-center gap-4">
             Centre d'Informations
             <div className="w-10 h-10 bg-[#0B56FA]/10 text-[#0B56FA] rounded-full flex items-center justify-center relative">
                <Bell className="w-5 h-5 fill-current" />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
             </div>
          </h2>
        </div>
        
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E5E9F0] text-[#5D6470] font-bold text-[13px] rounded-xl hover:border-[#0B56FA]/30 hover-lift transition-all shadow-sm">
              <Settings2 className="w-4 h-4" />
              Gérer les préférences
           </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
           {['all', 'unread', 'staff', 'system', 'pharmacy', 'service'].map((f) => (
             <button 
               key={f}
               onClick={() => setFilter(f)}
               className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all whitespace-nowrap ${
                 filter === f 
                 ? 'bg-[#0B56FA] text-white shadow-md shadow-blue-500/20' 
                 : 'bg-white text-[#5D6470] border border-[#E5E9F0] hover:border-[#0B56FA]/20'
               }`}
             >
               {f === 'all' && 'Toutes les notifications'}
               {f === 'unread' && 'Non lues'}
               {f === 'staff' && 'Personnel'}
               {f === 'system' && 'Système'}
               {f === 'pharmacy' && 'Logistique'}
               {f === 'service' && 'Services'}
             </button>
           ))}
        </div>
        
        {notifications.some(n => !n.read) && (
          <button 
            onClick={markAllAsRead}
            className="text-[13px] font-bold text-[#0B56FA] hover:underline whitespace-nowrap"
          >
            Tout marquer comme lu
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => {
            const IconComponent = getIcon(notification.type);
            const { color, bg } = getColorClasses(notification.type);
            
            return (
              <div 
                key={notification.id}
                className={`group relative flex items-start gap-5 p-6 bg-white rounded-[24px] border transition-all hover:shadow-xl hover:shadow-gray-200/40 hover:-translate-y-1 ${
                  !notification.read ? 'border-[#0B56FA]/20 bg-blue-50/10' : 'border-[#E5E9F0]/80'
                }`}
              >
                {!notification.read && (
                  <div className="absolute top-6 right-6 w-2.5 h-2.5 bg-[#0B56FA] rounded-full shadow-lg shadow-blue-500/40 animate-pulse"></div>
                )}
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${bg} ${color} shadow-inner`}>
                  <IconComponent className="w-7 h-7" />
                </div>
                
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-3 mb-1">
                     <h3 className="text-[17px] font-extrabold text-gray-900 group-hover:text-[#0B56FA] transition-colors">
                       {notification.title}
                     </h3>
                  </div>
                  <p className="text-[14.5px] font-medium text-[#5D6470] leading-relaxed mb-4 max-w-[800px]">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#8C93A1] uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5" />
                      {formatTime(notification.time)}
                    </span>
                    <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                    <button 
                      onClick={() => openDetail(notification)}
                      className="text-[11px] font-bold text-[#0B56FA] uppercase tracking-wider hover:underline"
                    >
                      Détails du rapport
                    </button>
                  </div>
                </div>

                <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                      <ChevronRight className="w-5 h-5" />
                   </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-[28px] p-20 border border-[#E5E9F0]/80 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <Search className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Aucun résultat trouvé</h3>
            <p className="text-[#5D6470] font-medium max-w-[300px] mx-auto">
              Il semble qu'aucune notification ne corresponde à votre filtre actuel.
            </p>
            <button 
              onClick={() => setFilter('all')}
              className="mt-8 px-8 py-3 bg-[#0B56FA] text-white font-bold rounded-full shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all"
            >
              Voir tout le flux
            </button>
          </div>
        )}
      </div>

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-md animate-in fade-in duration-300 transition-all"
            onClick={() => setSelectedNotification(null)}
          ></div>
          
          {/* Modal Card */}
          <div className="relative w-full max-w-[420px] bg-white rounded-[32px] shadow-[0_32px_80px_rgba(0,0,0,0.18)] overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-100">
             
             {/* Modal Header/Decorative */}
             <div className={`h-24 w-full ${getColorClasses(selectedNotification.type).bg} relative flex items-center justify-center`}>
                <div className={`w-16 h-16 rounded-[20px] bg-white shadow-xl flex items-center justify-center ${getColorClasses(selectedNotification.type).color} -mb-16 z-10 border border-white/50 backdrop-blur-sm`}>
                   {(() => {
                      const Icon = getIcon(selectedNotification.type);
                      return <Icon className="w-8 h-8" />;
                   })()}
                </div>
                <button 
                  onClick={() => setSelectedNotification(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center text-gray-700 transition-colors border border-black/5"
                >
                   <X className="w-4 h-4" />
                </button>
             </div>

             {/* Modal Content */}
             <div className="pt-14 pb-8 px-7">
                <div className="text-center mb-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-extrabold tracking-widest uppercase mb-3 ${getColorClasses(selectedNotification.type).bg} ${getColorClasses(selectedNotification.type).color}`}>
                    LOG : {selectedNotification.type}
                  </span>
                  <h3 className="text-[22px] font-extrabold text-gray-900 leading-tight">
                    {selectedNotification.title}
                  </h3>
                </div>
                
                {/* Meta Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-[#F8F9FA] rounded-xl p-3 border border-gray-100/50">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mb-0.5">ID Document</p>
                    <p className="text-[12px] font-extrabold text-gray-800">#SAN-{selectedNotification.id.slice(-4).toUpperCase()}</p>
                  </div>
                  <div className="bg-[#F8F9FA] rounded-xl p-3 border border-gray-100/50">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mb-0.5">Priorité</p>
                    <p className={`text-[12px] font-extrabold ${selectedNotification.type === 'emergency' ? 'text-red-600' : 'text-emerald-600'}`}>
                      {selectedNotification.type === 'emergency' ? 'Haute' : 'Normale'}
                    </p>
                  </div>
                  <div className="bg-[#F8F9FA] rounded-xl p-3 border border-gray-100/50">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mb-0.5">Origine</p>
                    <p className="text-[12px] font-extrabold text-gray-800">Portail Admin</p>
                  </div>
                  <div className="bg-[#F8F9FA] rounded-xl p-3 border border-gray-100/50">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mb-0.5">Statut</p>
                    <p className="text-[12px] font-extrabold text-[#0B56FA]">Vérifié</p>
                  </div>
                </div>

                <div className="bg-[#F8F9FA] rounded-2xl p-5 mb-8 border border-gray-100">
                   <p className="text-[14px] font-medium text-[#5D6470] leading-relaxed italic">
                      "{selectedNotification.message}"
                   </p>
                </div>

                <div className="flex flex-col gap-4">
                   <div className="flex items-center justify-center gap-2 text-gray-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">{formatTime(selectedNotification.time)}</span>
                   </div>
                   
                   <button 
                     onClick={() => setSelectedNotification(null)}
                     className="w-full bg-[#0B56FA] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/10 transition-all active:scale-95 text-[14px]"
                   >
                     Fermer le Rapport
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}

    </div>
  );
}

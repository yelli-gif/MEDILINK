import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CalendarX2, 
  Calendar, 
  Clock, 
  
  ShieldCheck, 
  History, 
  FileText,
  Plus,
  PlusCircle,
  Bell,
  User,
  Activity
} from 'lucide-react';

const Notifications: React.FC = () => {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [dynamicNotifs, setDynamicNotifs] = useState<any[]>([]);

  const userString = localStorage.getItem('medilink_user');
  const userProfile = userString ? JSON.parse(userString) : { name: 'Dupont', isNew: false };
  
  let isEmpty = false;
  try {
    const treatmentsStr = localStorage.getItem('medilink_treatments');
    if (treatmentsStr === '[]') isEmpty = true;
  } catch(e) {}

  useEffect(() => {
    const updateNotifs = () => {
      const notifsStr = localStorage.getItem('medilink_notifications');
      if (notifsStr) {
         try { setDynamicNotifs(JSON.parse(notifsStr)); } catch(e){}
      }
    };
    updateNotifs();
    const interval = setInterval(updateNotifs, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-24">
      {/* Navbar */}
      <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center border-b border-[#F0F2F5]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0055FF] flex items-center justify-center text-white font-bold leading-none">
            <Plus size={20} strokeWidth={3} />
          </div>
          <span className="text-xl font-bold text-[#14152A] tracking-tight">Medilink</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.location.hash = 'rdv'}
            className="hidden sm:flex items-center gap-2 bg-[#0055FF] hover:bg-[#0047D6] text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-colors shadow-[0_4px_14px_rgba(0,85,255,0.2)]"
          >
            Prendre RDV <PlusCircle size={16} />
          </button>
          <div className="relative">
            <button 
              type="button"
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="text-[#8B8D98] hover:text-[#14152A] transition-colors p-2 relative z-10"
            >
              <Bell size={22} />
            </button>
            {showNotifDropdown && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#F0F2F5] p-3 z-[100] animate-in fade-in zoom-in-95 transition-all">
                <a 
                  href="#notifications" 
                  onClick={() => setShowNotifDropdown(false)}
                  className="block text-center bg-[#F4F7FF] hover:bg-[#EBF1FF] text-[#0055FF] font-bold py-3 rounded-xl transition-colors text-sm"
                >
                  Voir mes notifs
                </a>
              </div>
            )}
          </div>
          <div 
            onClick={() => window.location.hash = 'patient-dashboard'}
            className="w-9 h-9 rounded-full bg-[#FFDED1] flex flex-col items-center justify-center text-[#E05F2D] cursor-pointer overflow-hidden border border-[#FFDED1] hover:shadow-md transition-shadow"
          >
            <User size={20} fill="#FFDED1" className="mt-1" />
          </div>
        </div>
      </nav>

      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-10">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <button 
            onClick={() => window.history.back()}
            className="w-10 h-10 bg-white shadow-sm border border-[#F0F2F5] rounded-full flex items-center justify-center text-[#5A5C6B] hover:bg-[#F4F7FF] transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-[32px] md:text-[40px] font-bold text-[#14152A] tracking-tight leading-none">
            Mes Notifications
          </h1>
        </div>
        <p className="text-[#5A5C6B] text-[15px] mb-12 pl-[56px]">
          Suivez vos rendez-vous et vos alertes de santé.
        </p>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          
          {/* Left Column: Notifications */}
          <div>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-[20px] font-bold text-[#14152A]">Récent</h2>
              <span className="text-[#8B8D98] text-[11px] font-bold uppercase tracking-wider">
                3 NOUVELLES NOTIFICATIONS
              </span>
            </div>

            <div className="space-y-4">
              
              {dynamicNotifs.map((notif: any, idx: number) => (
                <div key={notif.id || idx} className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-[#0055FF]/30 flex flex-col md:flex-row md:items-center relative animate-in fade-in slide-in-from-top-4">
                   <div className="flex-1 pr-6">
                      <div className="flex justify-between items-start mb-3">
                         <span className="text-[#0055FF] text-[11px] font-bold uppercase tracking-wider">
                           {notif.title}
                         </span>
                         <span className="text-[#5A5C6B] text-[13px]">{notif.timeAgo}</span>
                      </div>
                      <h3 className="text-[22px] font-bold text-[#14152A] mb-1">{notif.doctor}</h3>
                      <p className="text-[#5A5C6B] text-[15px] mb-5">{notif.speciality}</p>
                      
                      <div className="flex items-center gap-6">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#F4F7FF] rounded-[12px] flex items-center justify-center text-[#0055FF]">
                               <Calendar size={18} />
                            </div>
                            <div>
                               <span className="block text-[#8B8D98] text-[10px] font-bold uppercase tracking-wider mb-0.5">DATE</span>
                               <span className="text-[#14152A] font-bold text-[14px]">{notif.date}</span>
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#F4F7FF] rounded-[12px] flex items-center justify-center text-[#0055FF]">
                               <Clock size={18} />
                            </div>
                            <div>
                               <span className="block text-[#8B8D98] text-[10px] font-bold uppercase tracking-wider mb-0.5">HEURE</span>
                               <span className="text-[#14152A] font-bold text-[14px]">{notif.time}</span>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Separator Line */}
                   <div className="hidden md:block w-px h-24 border-l border-dashed border-[#E8ECF5] mx-4 relative">
                      <div className="absolute -top-1.5 -left-[5px] w-3 h-3 bg-[#F8FAFC] rounded-full border border-[#E8ECF5]"></div>
                      <div className="absolute -bottom-1.5 -left-[5px] w-3 h-3 bg-[#F8FAFC] rounded-full border border-[#E8ECF5]"></div>
                   </div>
                   
                   {/* Right side inside Notification */}
                   <div className="md:w-[150px] flex flex-col items-center justify-center pt-6 md:pt-0 mt-6 md:mt-0 border-t md:border-t-0 border-[#F0F2F5]">
                      <span className="text-[#8B8D98] text-[10px] font-bold uppercase tracking-wider mb-2">Lieu</span>
                      <span className="text-[#14152A] font-bold text-[13px] text-center mb-3">{notif.location}</span>
                      <span className="text-[#8B8D98] text-[10px] font-bold tracking-wider">Ref: ML-{Math.floor(Math.random()*800+100)}-XX</span>
                   </div>
                </div>
              ))}

              {isEmpty ? (
                <div className="bg-[#F4F7FF] rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-[#0055FF]/20 flex items-start flex-col sm:flex-row relative animate-in fade-in slide-in-from-top-4 mt-6">
                   <div className="w-12 h-12 bg-[#0055FF] rounded-[16px] flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(0,85,255,0.2)] mb-4 sm:mb-0 sm:mr-4">
                      <ShieldCheck size={24} className="text-white" />
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                         <h3 className="text-[18px] font-bold text-[#14152A]">Bienvenue sur Medilink !</h3>
                         <span className="text-[#0055FF] text-[12px] font-bold uppercase tracking-wider bg-[#E6EFFF] px-2.5 py-1 rounded-full">Nouveau</span>
                      </div>
                      <p className="text-[#5A5C6B] text-[15px] leading-relaxed mb-3 mt-2">
                         Bonjour <strong className="text-[#14152A]">{userProfile.name}</strong>, votre espace de santé numérique sécurisé est prêt. Vous n'avez pas encore de rendez-vous ou de traitements en cours.
                      </p>
                      <button 
                         onClick={() => window.location.hash = 'rdv'}
                         className="flex items-center gap-2 text-[#0055FF] text-[14px] font-bold hover:underline transition-all"
                      >
                         <Activity size={16} /> Prendre mon premier rendez-vous
                      </button>
                   </div>
                </div>
              ) : (
                <>
                  {/* Notif 1: Conflicting Booking */}
                  <div className="bg-[#FEF2F2] rounded-[24px] p-6 border border-[#FEE2E2]">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-[#FFDED1] rounded-[16px] flex items-center justify-center shrink-0">
                        <CalendarX2 size={24} className="text-[#DC2626]" />
                      </div>
                      <div className="flex-1">
                         <div className="flex justify-between items-start mb-1">
                            <h3 className="text-[16px] font-bold text-[#991B1B]">Conflicting Booking</h3>
                            <span className="text-[#991B1B] text-[13px] font-medium opacity-80">Il y a 5 min</span>
                         </div>
                         <p className="text-[#B91C1C] text-[14px] leading-relaxed mb-3 opacity-90">
                            Désolé, ce créneau vient d'être réservé par un autre utilisateur. Veuillez choisir un autre horaire.
                         </p>
                         <button className="text-[#991B1B] text-[14px] font-bold underline underline-offset-4 hover:opacity-80 transition-opacity">
                            Modifier le choix
                         </button>
                      </div>
                    </div>
                  </div>

                  {/* Notif 2: Rendez-vous 1 */}
                  <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-[#F0F2F5] flex flex-col md:flex-row md:items-center relative">
                     <div className="flex-1 pr-6">
                        <div className="flex justify-between items-start mb-3">
                           <span className="text-[#0055FF] text-[11px] font-bold uppercase tracking-wider">
                             RENDEZ-VOUS CONFIRMÉ
                           </span>
                           <span className="text-[#5A5C6B] text-[13px]">Aujourd'hui, 09:12</span>
                        </div>
                        <h3 className="text-[22px] font-bold text-[#14152A] mb-1">Dr. Claire Morel</h3>
                        <p className="text-[#5A5C6B] text-[15px] mb-5">Cardiologie</p>
                        
                        <div className="flex items-center gap-6">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#F4F7FF] rounded-[12px] flex items-center justify-center text-[#0055FF]">
                                 <Calendar size={18} />
                              </div>
                              <div>
                                 <span className="block text-[#8B8D98] text-[10px] font-bold uppercase tracking-wider mb-0.5">DATE</span>
                                 <span className="text-[#14152A] font-bold text-[14px]">14 Octobre 2023</span>
                              </div>
                           </div>
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#F4F7FF] rounded-[12px] flex items-center justify-center text-[#0055FF]">
                                 <Clock size={18} />
                              </div>
                              <div>
                                 <span className="block text-[#8B8D98] text-[10px] font-bold uppercase tracking-wider mb-0.5">HEURE</span>
                                 <span className="text-[#14152A] font-bold text-[14px]">10:30 AM</span>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Separator Line */}
                     <div className="hidden md:block w-px h-24 border-l border-dashed border-[#E8ECF5] mx-4 relative">
                        <div className="absolute -top-1.5 -left-[5px] w-3 h-3 bg-[#F8FAFC] rounded-full border border-[#E8ECF5]"></div>
                        <div className="absolute -bottom-1.5 -left-[5px] w-3 h-3 bg-[#F8FAFC] rounded-full border border-[#E8ECF5]"></div>
                     </div>
                     
                     {/* Right side inside Notification */}
                     <div className="md:w-[150px] flex flex-col items-center justify-center pt-6 md:pt-0 mt-6 md:mt-0 border-t md:border-t-0 border-[#F0F2F5]">
                        <span className="text-[#8B8D98] text-[10px] font-bold uppercase tracking-wider mb-2">Lieu</span>
                        <span className="text-[#14152A] font-bold text-[13px] text-center mb-3">Hôpital Américain de Paris</span>
                        <span className="text-[#8B8D98] text-[10px] font-bold tracking-wider">Ref: ML-882-QX</span>
                     </div>
                  </div>

                  {/* Notif 3: Rendez-vous 2 */}
                  <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-[#F0F2F5] flex flex-col md:flex-row md:items-center relative">
                     <div className="flex-1 pr-6">
                        <div className="flex justify-between items-start mb-3">
                           <span className="text-[#0055FF] text-[11px] font-bold uppercase tracking-wider">
                             RENDEZ-VOUS CONFIRMÉ
                           </span>
                           <span className="text-[#5A5C6B] text-[13px]">Hier, 16:45</span>
                        </div>
                        <h3 className="text-[22px] font-bold text-[#14152A] mb-1">Dr. Marc Lefebvre</h3>
                        <p className="text-[#5A5C6B] text-[15px] mb-5">Dermatologie</p>
                        
                        <div className="flex items-center gap-6">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#F4F7FF] rounded-[12px] flex items-center justify-center text-[#0055FF]">
                                 <Calendar size={18} />
                              </div>
                              <div>
                                 <span className="block text-[#8B8D98] text-[10px] font-bold uppercase tracking-wider mb-0.5">DATE</span>
                                 <span className="text-[#14152A] font-bold text-[14px]">18 Octobre 2023</span>
                              </div>
                           </div>
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-[#F4F7FF] rounded-[12px] flex items-center justify-center text-[#0055FF]">
                                 <Clock size={18} />
                              </div>
                              <div>
                                 <span className="block text-[#8B8D98] text-[10px] font-bold uppercase tracking-wider mb-0.5">HEURE</span>
                                 <span className="text-[#14152A] font-bold text-[14px]">15:00 PM</span>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Separator Line */}
                     <div className="hidden md:block w-px h-24 border-l border-dashed border-[#E8ECF5] mx-4 relative">
                        <div className="absolute -top-1.5 -left-[5px] w-3 h-3 bg-[#F8FAFC] rounded-full border border-[#E8ECF5]"></div>
                        <div className="absolute -bottom-1.5 -left-[5px] w-3 h-3 bg-[#F8FAFC] rounded-full border border-[#E8ECF5]"></div>
                     </div>
                     
                     {/* Right side inside Notification */}
                     <div className="md:w-[150px] flex flex-col items-center justify-center pt-6 md:pt-0 mt-6 md:mt-0 border-t md:border-t-0 border-[#F0F2F5]">
                        <span className="text-[#8B8D98] text-[10px] font-bold uppercase tracking-wider mb-2">Lieu</span>
                        <span className="text-[#14152A] font-bold text-[13px] text-center mb-3">Clinique de l'Alma</span>
                        <span className="text-[#8B8D98] text-[10px] font-bold tracking-wider">Ref: ML-901-ZZ</span>
                     </div>
                  </div>
                </>
              )}

            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="mt-8 lg:mt-12 flex flex-col gap-6">
             
             {/* Séparateur pour conserver l'espace top */}
             <div className="hidden lg:block mb-1"></div>

             {/* Securite Card */}
             <div className="bg-[#F4F7FF] rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-[#E6EFFF] flex items-start gap-4">
                <div className="w-10 h-10 bg-[#0055FF] rounded-full flex items-center justify-center shrink-0 shadow-[0_4px_14px_rgba(0,85,255,0.2)]">
                   <ShieldCheck size={20} className="text-white bg-clip-text" />
                </div>
                <div>
                   <h4 className="text-[14px] font-bold text-[#14152A] mb-1">Données Sécurisées</h4>
                   <p className="text-[#5A5C6B] text-[12px] leading-relaxed">
                     Vos informations de santé sont chiffrées de bout en bout.
                   </p>
                </div>
             </div>

             {/* Actions Rapides */}
             <div>
                <span className="block text-[#8B8D98] text-[11px] font-bold uppercase tracking-wider mb-4">
                   ACTIONS RAPIDES
                </span>
                <div className="flex flex-col gap-3">
                   <button 
                     onClick={() => window.location.hash = 'archives'}
                     className="w-full bg-white rounded-[16px] p-4 flex items-center gap-3 border border-[#F0F2F5] shadow-sm hover:border-[#0055FF] hover:bg-[#F4F7FF] transition-colors group text-left"
                   >
                      <History size={20} className="text-[#0055FF]" />
                      <span className="text-[#14152A] font-bold text-[14px] group-hover:text-[#0055FF] transition-colors">
                         Historique médical
                      </span>
                   </button>
                   <button 
                     onClick={() => window.location.hash = 'ordonnances'}
                     className="w-full bg-white rounded-[16px] p-4 flex items-center gap-3 border border-[#F0F2F5] shadow-sm hover:border-[#0055FF] hover:bg-[#F4F7FF] transition-colors group text-left"
                   >
                      <FileText size={20} className="text-[#0055FF]" />
                      <span className="text-[#14152A] font-bold text-[14px] group-hover:text-[#0055FF] transition-colors">
                         Mes ordonnances
                      </span>
                   </button>
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

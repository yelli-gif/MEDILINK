import React, { useState, useEffect } from 'react';
import { 
 
  Calendar, 
  Pill, 
  FileText, 
  Clock, 
  MapPin, 
 
  List, 
  Sun, 

  BriefcaseMedical, 
 
 
  HeartPulse,

  BarChart2,
  X, Navigation, AlertTriangle
} from 'lucide-react';
import FloatingNav from '../Composants/FloatingNav';
import TopNavBar from '../Composants/TopNavBar';

const PatientDashboard: React.FC = () => {
  const userString = localStorage.getItem('medilink_user');
  const userProfile = userString ? JSON.parse(userString) : { name: 'Dupont', isNew: false, weight: '72', height: '178', bloodType: 'O+', location: 'Paris' };
  const isNew = userProfile.isNew;

  const [showMapModal, setShowMapModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [mapLoading, setMapLoading] = useState(false);
  const [nextAppointment, setNextAppointment] = useState<any>(null);

  useEffect(() => {
    const cleared = localStorage.getItem('medilink_cleared_appointment');
    if (cleared) {
      setNextAppointment('CLEARED');
      // No return so we continue to load other states if needed
    } else {
      const apptString = localStorage.getItem('medilink_next_appointment');
      if (apptString) {
        try {
          setNextAppointment(JSON.parse(apptString));
        } catch (e) {}
      }
    }
  }, []);

  let treatmentsCount = 0;
  let ordCount = 0;
  try {
    const trtsString = localStorage.getItem('medilink_treatments');
    if (trtsString) {
      const trts = JSON.parse(trtsString);
      treatmentsCount = trts.length;
      trts.forEach((t: any) => {
         if (t.id === 'cardio') ordCount += 4;
         else if (t.id === 'reeducation') ordCount += 2;
         else if (t.id === 'paludisme') ordCount += 3;
         else ordCount += 2;
      });
    } else {
      const userStr = localStorage.getItem('medilink_user');
      const user = userStr ? JSON.parse(userStr) : { isNew: false };
      treatmentsCount = user.isNew ? 0 : 3;
      ordCount = user.isNew ? 0 : 8;
    }
  } catch(e) {}


  const handleOpenMap = () => {
    setShowMapModal(true);
    if (!userLocation && "geolocation" in navigator) {
      setMapLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setMapLoading(false);
        },
        () => {
          setMapLoading(false);
        }
      );
    }
  };
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans relative">
      
      {/* Navbar */}
      <TopNavBar />

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-12 pt-8 pb-10">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#14152A] tracking-tight mb-2">Bonjour {userProfile.name},</h1>
          <p className="text-[#5A5C6B] text-sm md:text-base font-medium capitalize">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Top Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          
          <div className="bg-gradient-to-br from-[#4A7DFF] to-[#3662DE] rounded-[24px] p-6 lg:p-8 flex items-center gap-5 shadow-[0_8px_24px_rgba(74,125,255,0.25)] relative overflow-hidden group hover:-translate-y-1 transition-transform cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm z-10 shrink-0">
              <Calendar size={24} className="text-white" />
            </div>
            <div className="z-10">
              <h3 className="text-white text-4xl font-bold leading-none mb-2">
                {isNew || nextAppointment === 'CLEARED' ? '0' : (nextAppointment ? '1' : '3')}
              </h3>
              <p className="text-white/90 text-sm font-medium">Rendez-vous</p>
            </div>
          </div>

          <div 
            onClick={() => window.location.hash = 'traitement'}
            className="bg-gradient-to-br from-[#28B880] to-[#1E9565] rounded-[24px] p-6 lg:p-8 flex items-center gap-5 shadow-[0_8px_24px_rgba(40,184,128,0.25)] relative overflow-hidden group hover:-translate-y-1 transition-transform cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm z-10 shrink-0">
              <Pill size={24} className="text-white" />
            </div>
            <div className="z-10">
              <h3 className="text-white text-4xl font-bold leading-none mb-2">{treatmentsCount}</h3>
              <p className="text-white/90 text-sm font-medium">Traitements</p>
            </div>
          </div>

          <div 
            onClick={() => window.location.hash = 'ordonnances'}
            className="bg-gradient-to-br from-[#FF6A5A] to-[#E64C3C] rounded-[24px] p-6 lg:p-8 flex items-center gap-5 shadow-[0_8px_24px_rgba(255,106,90,0.25)] relative overflow-hidden group hover:-translate-y-1 transition-transform cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm z-10 shrink-0">
              <FileText size={24} className="text-white" />
            </div>
            <div className="z-10">
              <h3 className="text-white text-4xl font-bold leading-none mb-2">{ordCount}</h3>
              <p className="text-white/90 text-sm font-medium">Ordonnances</p>
            </div>
          </div>

        </div>

        {/* Main Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-8 mb-10">
          
          {/* Prochain Rendez-vous */}
          <div className="bg-white rounded-[28px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-[#F0F2F5] flex flex-col h-full relative">
            
            <div className="flex justify-between items-start mb-8">
               <div className="bg-[#EBF1FF] text-[#0055FF] text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-widest inline-flex items-center mb-6 max-w-max">
                 PROCHAIN RENDEZ-VOUS
               </div>
               
               <div className="w-20 h-16 bg-[#F4F7FF] rounded-2xl flex items-center justify-center">
                 <HeartPulse size={36} className="text-[#B3C8FF]" strokeWidth={2.5} />
               </div>
            </div>

            {isNew || nextAppointment === 'CLEARED' ? (
              <div className="flex flex-col items-center justify-center text-center flex-grow opacity-60">
                <Calendar size={48} className="text-[#8B8D98] mb-4" />
                <h3 className="text-lg font-bold text-[#14152A] mb-2">Aucun rendez-vous prévu</h3>
                <p className="text-[#5A5C6B] text-[14px]">Commencez votre suivi médical dès aujourd'hui.</p>
              </div>
            ) : (
              <div className="flex items-start gap-5 mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150" 
                  alt="Dr. Sarah Meyer" 
                  className="w-24 h-24 rounded-full object-cover shadow-sm border-2 border-white"
                />
                <div className="pt-3">
                  <h2 className="text-3xl font-bold text-[#14152A] tracking-tight mb-2">
                    {nextAppointment?.doctor || 'Dr. Sarah Meyer'}
                  </h2>
                  <p className="text-[#0055FF] font-semibold text-[16px] mb-5">
                    {nextAppointment?.speciality || 'Cardiologue'}
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-[#5A5C6B] text-[15px] font-medium">
                      <Clock size={18} className="text-[#8B8D98] shrink-0" />
                      {nextAppointment?.date || 'Lundi 12 Juin'} à {nextAppointment?.time || '10:30'}
                    </div>
                    <div className="flex items-center gap-2 text-[#5A5C6B] text-[15px] font-medium">
                      <MapPin size={18} className="text-[#8B8D98] shrink-0" />
                      {nextAppointment?.location || 'Clinique du Parc, Paris'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className={`mt-auto grid ${isNew || nextAppointment === 'CLEARED' ? 'grid-cols-1' : 'grid-cols-2'} gap-4 pt-6`}>
              {isNew || nextAppointment === 'CLEARED' ? (
                 <button onClick={() => window.location.hash='rdv'} className="bg-[#0055FF] hover:bg-[#0047D6] text-white font-bold py-4 rounded-xl transition-colors shadow-[0_4px_14px_rgba(0,85,255,0.2)] text-[16px]">
                   Prendre un RDV
                 </button>
              ) : (
                <>
                  <button 
                    onClick={() => setShowEditModal(true)}
                    className="bg-white hover:bg-[#F8FAFC] text-[#14152A] font-bold py-4 rounded-xl border border-[#E8ECF5] transition-colors shadow-sm text-[16px]"
                  >
                    Modifier
                  </button>
                  <button 
                    onClick={handleOpenMap}
                    className="bg-[#0055FF] hover:bg-[#0047D6] text-white font-bold py-4 rounded-xl transition-colors shadow-[0_4px_14px_rgba(0,85,255,0.2)] text-[16px]"
                  >
                    Itinéraire
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Traitement en cours */}
          <div className="flex flex-col gap-4">
             <h3 className="text-[20px] font-bold text-[#14152A] px-2 pt-2">Traitement en cours</h3>
             <div className="bg-white rounded-[28px] p-6 lg:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-[#F0F2F5] h-full flex flex-col">
                                <div className="border border-[#F0F2F5] rounded-[24px] p-8 mb-5 flex-grow relative overflow-hidden bg-[#FAFAF9] flex flex-col justify-center">
                  
                  {treatmentsCount === 0 ? (
                    <div className="opacity-60 flex flex-col items-center justify-center text-center py-6">
                      <Pill size={48} className="text-[#8B8D98] mb-4" />
                      <h4 className="text-[18px] font-bold text-[#14152A] mb-2">Pas de traitement en cours</h4>
                      <p className="text-[14px] text-[#5A5C6B]">Votre médecin vous prescrira un traitement si nécessaire.</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-8">
                        <h4 className="text-[22px] font-bold text-[#14152A]">Traitement Paludisme</h4>
                        <span className="bg-[#E5F7ED] text-[#1E9565] text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                          En cours
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="bg-white rounded-[16px] p-5 border border-[#F0F2F5] shadow-sm">
                          <div className="flex items-center gap-2 mb-3 text-[#28B880]">
                            <BriefcaseMedical size={18} />
                            <span className="text-[11px] font-bold text-[#8B8D98] uppercase tracking-wider">MÉDICAMENTS</span>
                          </div>
                          <p className="text-[#14152A] font-bold text-[16px]">2 par jour</p>
                        </div>
                        <div className="bg-white rounded-[16px] p-5 border border-[#F0F2F5] shadow-sm">
                          <div className="flex items-center gap-2 mb-3 text-[#FF6B6B]">
                            <Calendar size={18} />
                            <span className="text-[11px] font-bold text-[#8B8D98] uppercase tracking-wider">DURÉE</span>
                          </div>
                          <p className="text-[#14152A] font-bold text-[16px]">29 jours restants</p>
                        </div>
                      </div>

                      <div className="w-full">
                        <div className="flex justify-between items-end mb-3">
                           <span className="text-[11px] font-bold text-[#8B8D98] uppercase tracking-wider">PROGRESSION GLOBALE</span>
                           <span className="text-[#0055FF] font-bold text-[14px]">15%</span>
                        </div>
                        <div className="w-full h-3 bg-[#E8ECF5] rounded-full overflow-hidden mb-3">
                           <div className="h-full bg-gradient-to-r from-[#4A7DFF] to-[#0055FF] rounded-full" style={{ width: '15%' }}></div>
                        </div>
                        <p className="text-center text-[12px] text-[#A0A4B8] font-medium">10 prises sur un total de 70</p>
                      </div>
                    </>
                  )}
                </div>

                {treatmentsCount > 0 && (
                  <button 
                    onClick={() => window.location.hash = 'ordonnances?id=paludisme'}
                    className="w-full bg-[#FAFAF9] hover:bg-[#F0F2F5] text-[#14152A] font-bold py-4 rounded-xl border border-[#E8ECF5] transition-colors flex items-center justify-center gap-2 text-[15px]"
                  >
                    <List size={20} className="text-[#8B8D98]" /> Voir les détails
                  </button>
                )}

             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 lg:gap-8 mb-4">
          
          {/* Left Column: Conseils Santé IA (Single Card) */}
          <div className="flex flex-col">
            <div className="flex justify-between items-end mb-6 px-2">
               <h3 className="text-3xl font-bold text-[#14152A] tracking-tight">Conseils Santé</h3>

            </div>
            <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-[#F0F2F5] group cursor-pointer hover:shadow-md transition-shadow flex-1">
              <div className="h-[280px] w-full overflow-hidden relative">
                 <img 
                   src="https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=800" 
                   alt="Hydratation" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                 />
              </div>
              <div className="p-6 md:p-8">
                 <div className="flex items-center gap-2 mb-4">
                   <Sun size={16} className="text-[#0055FF]" />
                   <span className="text-[#0055FF] text-[11px] font-bold uppercase tracking-wider">SAISONNIER</span>
                 </div>
                 <h4 className="text-[22px] md:text-[28px] font-bold text-[#14152A] mb-3 leading-tight">L'importance de l'hydratation en été</h4>
                 <p className="text-[#5A5C6B] text-[16px] leading-relaxed">
                   Boire au moins 2L d'eau par jour est crucial lors des fortes chaleurs pour maintenir vos fonctions rénales en bonne santé. Découvrez nos 5 astuces pratiques pour y penser plus souvent.
                 </p>
              </div>
            </div>
          </div>

          {/* Right Column: Profil Morphologique / Statistiques Santé */}
          <div className="flex flex-col">
            <div className="lg:flex justify-between items-end mb-6 px-2 hidden invisible">
               <h3 className="text-3xl font-bold text-[#14152A] tracking-tight">Espace</h3>
            </div>
            <div className="bg-[#F0F5F4] rounded-[24px] p-6 lg:p-8 shadow-sm border border-[#E1EFED] h-full flex flex-col">
               <div className="flex justify-between items-center mb-8">
                  <h3 className="text-[20px] font-bold text-[#365952]">Statistiques Santé</h3>
                  <BarChart2 size={24} className="text-[#8DB5AA]" />
               </div>
               
               <div className="mb-6">
                  <span className="block text-[#8DB5AA] text-[12px] font-bold uppercase tracking-wider mb-2">
                     POIDS
                  </span>
                  <div className="flex items-end justify-between border-b border-[#E1EFED] pb-3">
                     <div className="flex items-baseline gap-1">
                        <span className="text-[32px] font-bold text-[#365952] leading-none">{userProfile.weight}</span>
                        <span className="text-[#5C8379] text-[15px] font-medium">kg</span>
                     </div>
                     <span className="bg-[#D1E8E0] text-[#365952] text-[12px] font-bold px-3 py-1.5 rounded-md">
                        Normal
                     </span>
                  </div>
               </div>

               <div className="mb-6">
                  <span className="block text-[#8DB5AA] text-[12px] font-bold uppercase tracking-wider mb-2">
                     TAILLE
                  </span>
                  <div className="flex items-end justify-between border-b border-[#E1EFED] pb-3">
                     <div className="flex items-baseline gap-1">
                        <span className="text-[32px] font-bold text-[#365952] leading-none">{userProfile.height || '178'}</span>
                        <span className="text-[#5C8379] text-[15px] font-medium">cm</span>
                     </div>
                  </div>
               </div>

               <div>
                  <span className="block text-[#8DB5AA] text-[12px] font-bold uppercase tracking-wider mb-2">
                     GROUPE SANGUIN
                  </span>
                  <div className="flex items-end justify-between border-b border-[#E1EFED] pb-3">
                     <div className="flex items-baseline gap-1">
                        <span className="text-[32px] font-bold text-[#365952] leading-none">{userProfile.bloodType}</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </main>

      {/* Floating Bottom Nav */}
      <FloatingNav />

      {/* Modale Itinéraire */}
      {showMapModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#14152A]/40 backdrop-blur-sm" onClick={() => setShowMapModal(false)}></div>
          <div className="bg-white w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
            {/* Header Modale */}
            <div className="p-6 border-b border-[#F0F2F5] flex justify-between items-center">
               <h3 className="text-xl font-bold text-[#14152A]">Itinéraire</h3>
               <button onClick={() => setShowMapModal(false)} className="p-2 bg-[#F4F7FC] hover:bg-[#E8ECF5] rounded-full text-[#5A5C6B] transition-colors">
                 <X size={20} />
               </button>
            </div>
            
            {/* Vraie Carte Google Maps Intégrée */}
            <div className="h-[250px] w-full relative bg-[#E8EAED] flex items-center justify-center">
               {mapLoading ? (
                 <div className="text-[#0055FF] font-bold animate-pulse flex flex-col items-center">
                   <div className="w-8 h-8 border-4 border-[#0055FF] border-t-transparent rounded-full animate-spin mb-4"></div>
                   Localisation en cours...
                 </div>
               ) : (
                 <iframe 
                   src={userLocation 
                     ? `https://maps.google.com/maps?saddr=${userLocation.lat},${userLocation.lng}&daddr=Clinique+du+Parc,+155+Bld+Stalingrad,+69006+Lyon&output=embed`
                     : `https://maps.google.com/maps?q=Clinique+du+Parc,+155+Bld+Stalingrad,+69006+Lyon&output=embed`
                   }
                   width="100%" 
                   height="100%" 
                   style={{ border: 0 }} 
                   allowFullScreen={true} 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   title="Itinéraire Clinique du Parc"
                 ></iframe>
               )}
            </div>

            {/* Infos Trajet */}
            <div className="p-6">
               <a 
                 href={userLocation 
                   ? `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=Clinique+du+Parc,+155+Bld+Stalingrad,+69006+Lyon&travelmode=driving`
                   : `https://www.google.com/maps/dir/?api=1&destination=Clinique+du+Parc,+155+Bld+Stalingrad,+69006+Lyon&travelmode=driving`
                 }
                 target="_blank"
                 rel="noopener noreferrer"
                 onClick={() => setShowMapModal(false)}
                 className="w-full flex items-center justify-center gap-2 bg-[#0055FF] hover:bg-[#0047D6] text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-[#0055FF]/20"
               >
                 <Navigation size={20} />
                 Démarrer la navigation
               </a>
            </div>
          </div>
        </div>
      )}

      {/* Modale Modifier Rendez-vous */}
      {showEditModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#14152A]/40 backdrop-blur-sm" onClick={() => setShowEditModal(false)}></div>
          <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
            
            <div className="p-6 border-b border-[#F0F2F5] flex justify-between items-center">
               <h3 className="text-xl font-bold text-[#14152A]">Gérer mon rendez-vous</h3>
               <button onClick={() => setShowEditModal(false)} className="p-2 bg-[#F4F7FC] hover:bg-[#E8ECF5] rounded-full text-[#5A5C6B] transition-colors">
                 <X size={20} />
               </button>
            </div>

            <div className="p-6 md:p-8 flex flex-col items-center text-center pt-2">
               <div className="w-16 h-16 bg-[#FFF4F4] rounded-full flex items-center justify-center text-[#E64C3C] mb-5">
                  <AlertTriangle size={28} strokeWidth={2.5} />
               </div>
               <h4 className="text-xl font-bold text-[#14152A] mb-2">Annuler ce rendez-vous ?</h4>
               <p className="text-[#5A5C6B] text-[15px] mb-8 leading-relaxed">
                  Cette action est définitive et libérera immédiatement votre créneau avec le praticien.
               </p>

               <div className="w-full flex gap-3">
                  <button 
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 bg-white border border-[#E8ECF5] hover:bg-[#F8FAFC] text-[#5A5C6B] font-bold py-4 rounded-xl transition-colors"
                  >
                    Garder le RDV
                  </button>
                  <button 
                    onClick={() => {
                       localStorage.setItem('medilink_cleared_appointment', 'true');
                       localStorage.removeItem('medilink_next_appointment');
                       setNextAppointment('CLEARED');
                       setShowEditModal(false);
                    }}
                    className="flex-1 bg-[#E64C3C] hover:bg-[#D63031] text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-[#E64C3C]/20"
                  >
                    Confirmer l'annulation
                  </button>
               </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default PatientDashboard;

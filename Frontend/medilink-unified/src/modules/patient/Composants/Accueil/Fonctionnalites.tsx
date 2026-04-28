import React from 'react';

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0055FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const MedicalBagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0055FF" stroke="#0055FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 3h4a2 2 0 0 1 2 2v2h-8V5a2 2 0 0 1 2-2z" fill="none"/>
    <rect x="2" y="7" width="20" height="14" rx="2" fill="none" />
    <path d="M12 11v6M9 14h6" stroke="white" />
  </svg>
);

const FolderUserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0055FF" stroke="#0055FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" fill="none" />
    <circle cx="12" cy="11.5" r="1.5" fill="#0055FF" stroke="none" />
    <path d="M15 16c0-1.2-1.3-2-3-2s-3 .8-3 2" fill="none" stroke="#0055FF" />
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0055FF" stroke="#0055FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="11" width="14" height="10" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" />
    <path d="M12 15v2" stroke="white" />
  </svg>
);

const NetworkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0055FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2" fill="#0055FF" stroke="none" />
    <circle cx="12" cy="4" r="2" fill="#0055FF" stroke="none" />
    <circle cx="6" cy="16" r="2" fill="#0055FF" stroke="none"/>
    <circle cx="18" cy="16" r="2" fill="#0055FF" stroke="none" />
    <path d="M12 6v4M8.5 13.5l3-2M15.5 13.5l-3-2" />
  </svg>
);

const BackgroundCalendarIcon = () => (
  <svg width="180" height="180" viewBox="0 0 24 24" fill="#DFE2EE" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="20" height="16" rx="2" ry="2" fill="#DFE2EE" />
    <rect x="6" y="3" width="3" height="6" rx="1.5" fill="#DFE2EE" />
    <rect x="15" y="3" width="3" height="6" rx="1.5" fill="#DFE2EE" />
    <rect x="4" y="11" width="16" height="9" rx="1" fill="#F4F6FC" />
    <circle cx="17" cy="16" r="3" fill="#DFE2EE" />
  </svg>
);

const Fonctionnalites: React.FC = () => {
  return (
    <section id="fonctionnalites" className="w-full bg-[#FAFBFF] py-24 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-[1536px] mx-auto w-full">
        <div className="mb-12">
           <h2 className="text-[36px] md:text-[42px] font-bold text-[#14152A] mb-4 tracking-tight leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
             Une suite complète d'outils
           </h2>
           <p className="text-[#5A5C6B] text-[17px]">
             Tout ce dont vous avez besoin pour une gestion de santé moderne.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Prise de RDV */}
            <div className="md:col-span-2 relative overflow-hidden bg-[#F4F6FC] rounded-3xl p-8 md:p-10 flex flex-col items-start transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm z-10">
                 <CalendarIcon />
              </div>
              <h3 className="text-[22px] font-bold text-[#14152A] mb-3 z-10">Prise de RDV</h3>
              <p className="text-[#5A5C6B] text-[15px] leading-relaxed max-w-[80%] z-10">
                Réservez en un clic auprès de <br />
                vos praticiens préférés, 24h/24 et 7j/7.
              </p>
              
              <div className="absolute right-0 bottom-0 pointer-events-none -translate-x-6 translate-y-9">
                 <BackgroundCalendarIcon />
              </div>
            </div>

            {/* Card 2: Suivi de traitement */}
            <div className="md:col-span-1 bg-[#E6EAF4] rounded-3xl p-8 md:p-10 flex flex-col items-start transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm">
                 <MedicalBagIcon />
              </div>
              <h3 className="text-[22px] font-bold text-[#14152A] mb-3">Suivi de traitement</h3>
              <p className="text-[#5A5C6B] text-[15px] leading-relaxed">
                Ne manquez plus une prise grâce aux rappels intelligents et personnalisés.
              </p>
            </div>

            {/* Card 3: Dossier médical */}
            <div className="md:col-span-1 bg-[#E6E8ED] rounded-3xl p-8 md:p-10 flex flex-col items-start transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm">
                 <FolderUserIcon />
              </div>
              <h3 className="text-[22px] font-bold text-[#14152A] mb-3">Dossier médical</h3>
              <p className="text-[#5A5C6B] text-[15px] leading-relaxed">
                Votre historique complet, examens et ordonnances, toujours à portée de main.
              </p>
            </div>

            {/* Card 4: Sécurité */}
            <div className="md:col-span-1 bg-[#F3F6FD] rounded-3xl p-8 md:p-10 flex flex-col items-start transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm">
                 <LockIcon />
              </div>
              <h3 className="text-[22px] font-bold text-[#14152A] mb-3">Sécurité</h3>
              <p className="text-[#5A5C6B] text-[15px] leading-relaxed">
                Données cryptées de bout en bout et hébergées sur des serveurs certifiés HDS.
              </p>
            </div>

            {/* Card 5: Écosystème */}
            <div className="md:col-span-1 bg-[#DDEAE3] rounded-3xl p-8 md:p-10 flex flex-col items-start transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-6 shadow-sm">
                 <NetworkIcon />
              </div>
              <h3 className="text-[22px] font-bold text-[#14152A] mb-3">Écosystème</h3>
              <p className="text-[#5A5C6B] text-[15px] leading-relaxed">
                Interconnecté avec les pharmacies et laboratoires pour un parcours fluide.
              </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Fonctionnalites;

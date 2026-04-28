import React from 'react';
import { Stethoscope } from 'lucide-react';

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#0055FF" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="7" r="4.5" fill="#0055FF" />
    <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4Z" fill="#0055FF" />
  </svg>
);

const MedicineIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#0055FF" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="7" width="14" height="15" rx="3" fill="#0055FF" />
    <rect x="7" y="3" width="10" height="4" rx="1.5" fill="#0055FF" />
    <path d="M12 10V18M8 14H16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#0055FF" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="10" width="8" height="12" rx="1" fill="#0055FF" />
    <rect x="11" y="4" width="10" height="18" rx="1" fill="#0055FF" />
    <rect x="5.5" y="14" width="1.5" height="1.5" fill="white" />
    <rect x="8" y="14" width="1.5" height="1.5" fill="white" />
    <rect x="5.5" y="17" width="1.5" height="1.5" fill="white" />
    <rect x="8" y="17" width="1.5" height="1.5" fill="white" />
    <rect x="5.5" y="19" width="1.5" height="1.5" fill="white" />
    <rect x="8" y="19" width="1.5" height="1.5" fill="white" />
    
    <rect x="13.5" y="7" width="1.5" height="1.5" fill="white" />
    <rect x="16.5" y="7" width="1.5" height="1.5" fill="white" />
    <rect x="13.5" y="11" width="1.5" height="1.5" fill="white" />
    <rect x="16.5" y="11" width="1.5" height="1.5" fill="white" />
    <rect x="13.5" y="15" width="1.5" height="1.5" fill="white" />
    <rect x="16.5" y="15" width="1.5" height="1.5" fill="white" />
    <rect x="13.5" y="19" width="1.5" height="1.5" fill="white" />
    <rect x="16.5" y="19" width="1.5" height="1.5" fill="white" />
  </svg>
);

const Acteurs: React.FC = () => {
  const acteurs = [
    {
      titre: "Patients",
      description: "Gérez votre santé en toute simplicité.",
      icone: <UserIcon />
    },
    {
      titre: "Médecins",
      description: "Optimisez vos consultations et suivi.",
      icone: <Stethoscope size={26} color="#0055FF" strokeWidth={2.5} />
    },
    {
      titre: "Pharmaciens",
      description: "Suivi ordonnances et délivrance.",
      icone: <MedicineIcon />
    },
    {
      titre: "Établissements",
      description: "Gestion hospitalière centralisée.",
      icone: <BuildingIcon />
    }
  ];

  return (
    <section id="acteurs" className="w-full bg-[#F5F7FD] pt-24 pb-32 md:pb-40 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-[1536px] mx-auto w-full">
        <div className="mb-14">
          <h2 className="text-[36px] md:text-[46px] font-bold text-[#14152A] mb-5 tracking-tight leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            Pour chaque acteur de<br />santé
          </h2>
          <p className="text-[#5A5C6B] text-[17px] max-w-2xl">
            Une solution sur-mesure pour simplifier le quotidien de tous les professionnels et patients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 hover-group">
          {acteurs.map((acteur, index) => (
            <div key={index} className="bg-white rounded-[28px] p-8 md:p-10 flex flex-col items-start transition-transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
               <div className="mb-6 h-8 flex items-end">
                {acteur.icone}
              </div>
              <h3 className="text-[20px] font-bold text-[#14152A] mb-3">{acteur.titre}</h3>
              <p className="text-[#5A5C6B] text-[15px] leading-relaxed">{acteur.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Acteurs;

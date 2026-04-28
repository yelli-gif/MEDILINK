import React from 'react';
import { Star } from 'lucide-react';

const Temoignages: React.FC = () => {
  const avis = [
    {
      nom: "Marie L.",
      date: "Il y a 1 mois",
      texte: "Très pratique pour centraliser tous mes documents.",
      etoiles: 4,
      utiles: 8,
      avatar: "https://i.pravatar.cc/150?img=47"
    },
    {
      nom: "Dr. Sarah M.",
      date: "Il y a 1 semaine",
      texte: "Mes patients adorent la simplicité du suivi. C'est un gain de temps précieux.",
      etoiles: 5,
      utiles: 24,
      avatar: "https://i.pravatar.cc/150?img=32"
    },
    {
      nom: "Jean D.",
      date: "Il y a 2 jours",
      texte: "Une plateforme intuitive qui change la vie. Je recommande vivement.",
      etoiles: 5,
      utiles: 12,
      avatar: "https://i.pravatar.cc/150?img=11"
    }
  ];

  return (
    <section id="temoignages" className="w-full bg-[#FAFBFF] py-24 pb-32 px-4 sm:px-6 lg:px-8 xl:px-12 relative flex flex-col items-center">
      <div className="max-w-[1536px] mx-auto w-full">
         
         <div className="flex flex-col items-center mb-16">
            <h2 className="text-[36px] md:text-[42px] font-bold text-[#14152A] mb-5 tracking-tight leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
              Ce qu'ils en disent
            </h2>
            <div className="flex gap-2">
               {[...Array(5)].map((_, i) => (
                  <Star key={i} size={22} fill="#A64B16" stroke="#A64B16" />
               ))}
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {avis.map((temoignage, index) => (
               <div key={index} className={`bg-white p-8 md:p-10 rounded-[28px] shadow-[0_4px_30px_rgba(0,0,0,0.03)] flex flex-col items-start transition-transform hover:-translate-y-2 ${index === 1 ? 'md:-translate-y-4' : 'md:translate-y-4'}`}>
                  
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                     <img src={temoignage.avatar} alt={temoignage.nom} className="w-14 h-14 rounded-full object-cover" />
                     <div className="flex flex-col">
                        <h4 className="font-bold text-[#14152A] text-[17px] mb-0.5">{temoignage.nom}</h4>
                        <p className="text-[13px] text-[#757682] leading-none">{temoignage.date}</p>
                     </div>
                  </div>
                  
                  {/* Quote Text */}
                  <p className="text-[#5A5C6B] text-[16px] italic leading-relaxed mb-8 flex-grow">
                     "{temoignage.texte}"
                  </p>

                  {/* Footer */}
                  <div className="w-full flex items-center justify-between mt-auto">
                     <div className="flex gap-1.5">
                        {[...Array(5)].map((_, i) => (
                           <Star 
                             key={i} 
                             size={14} 
                             fill={i < temoignage.etoiles ? "#A64B16" : "#E2E8F0"} 
                             stroke="none" 
                           />
                        ))}
                     </div>
                     <span className="text-[13px] text-[#757682]">{temoignage.utiles} utiles</span>
                  </div>
                  
               </div>
            ))}
         </div>
         
      </div>
    </section>
  );
};

export default Temoignages;

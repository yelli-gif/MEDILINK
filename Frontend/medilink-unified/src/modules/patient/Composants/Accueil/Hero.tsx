import React from 'react';
import { ShieldCheck, ChevronDown, Grip } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="w-full flex flex-col lg:flex-row items-center justify-between pt-28 pb-16 lg:pt-48 lg:pb-32 px-5 md:px-10 lg:px-16 xl:px-24 bg-transparent mx-auto overflow-hidden">
      <div className="flex-1 space-y-8 max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-[#E6EDFF] text-[#0066FF] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <ShieldCheck size={16} strokeWidth={2.5} />
          <span>SÉCURISÉ & CERTIFIÉ</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl md:text-[80px] font-bold text-[#191B24] leading-[1.1] tracking-tight">
          Votre santé,<br />simplifiée
        </h1>
        <p className="text-[#586766] text-xl leading-relaxed max-w-xl">
          Gérez vos rendez-vous, suivez vos traitements et accédez à vos dossiers médicaux en toute sécurité sur une plateforme unique.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-2">
          <a href="/choix-inscription" className="inline-block text-center w-full sm:w-auto bg-[#0066FF] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold hover:-translate-y-0.5 transition-transform shadow-[0_10px_30px_rgba(0,102,255,0.2)]">
            Commencer gratuitement
          </a>
          <button className="text-[#0066FF] w-full sm:w-auto font-semibold px-8 py-3 sm:py-4 bg-transparent hover:bg-[#F0F4FF] rounded-full transition-colors hidden sm:block">
            En savoir plus
          </button>
        </div>
      </div>
      
      <div className="flex-1 mt-12 lg:mt-0 relative flex justify-center lg:justify-end lg:pr-24 xl:pr-40 cursor-default w-full">
        {/* Placeholder for the dashboard mockup image */}
        <div className="w-full max-w-[340px] sm:max-w-[520px] aspect-[52/56] sm:h-[560px] bg-gray-200/80 backdrop-blur-md rounded-[2rem] sm:rounded-[2.5rem] px-5 sm:px-10 pt-10 sm:pt-20 pb-14 sm:pb-28 border-[6px] sm:border-[8px] border-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] flex flex-col rotate-[3deg] hover:rotate-0 transition-transform duration-500">
          <div className="bg-white w-full h-full rounded-2xl flex flex-col py-6 sm:py-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between w-full mb-6 px-8 relative">
              <span className="text-2xl text-gray-800 tracking-tight">Medilink</span>
              <div className="border-t-[1.5px] border-gray-200 flex-1 mx-4 mt-4"></div>
              <Grip size={18} className="text-gray-400 mt-2" strokeWidth={2} />
            </div>
            
            {/* Rows */}
            <div className="flex flex-col flex-1 mt-2">
              <div className="text-[13px] text-gray-500 py-3 px-8 font-medium tracking-wider">Ordonnance #4092-A</div>
              
              <div className="bg-[#F8FAFC] flex items-center justify-between px-8 py-4">
                <span className="text-[13px] text-gray-600 font-medium tracking-wide truncate pr-4">Amoxicilline 500mg - 3x/jour</span>
                <ChevronDown size={16} className="text-gray-400 shrink-0" />
              </div>
              
              <div className="bg-[#F8FAFC] flex items-center justify-between px-8 py-4">
                <span className="text-[13px] text-gray-600 font-medium tracking-wide truncate pr-4">Doliprane 1000mg - En cas de douleur</span>
                <ChevronDown size={16} className="text-gray-400 shrink-0" />
              </div>
              
              <div className="text-[13px] text-gray-500 py-3 px-8 mt-2 font-medium tracking-wider">Patient : Mme. Sophie M.</div>
              <div className="text-[13px] text-gray-500 py-3 px-8 font-medium tracking-wider">Dr. Rédacteur : Dr. Marc T.</div>
              <div className="text-[13px] text-gray-400 py-3 px-8 font-medium tracking-wider">Statut : Valide (3 mois)</div>
            </div>
          </div>
        </div>
        {/* Abstract shapes behind */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#E6EDFF] rounded-full opacity-50 blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;

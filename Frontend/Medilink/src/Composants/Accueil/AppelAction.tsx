import React from 'react';

const AppelAction: React.FC = () => {
  return (
    <section id="appel-action" className="w-full bg-[#FAFBFF] pt-12 pb-24 px-4 sm:px-6 lg:px-8 xl:px-12 flex justify-center">
      <div className="max-w-[1536px] w-full bg-[#0066FF] rounded-[32px] md:rounded-[40px] p-12 md:p-24 text-center flex flex-col items-center shadow-[0_4px_30px_rgba(0,102,255,0.4)] relative overflow-hidden">
        {/* Subtle decorative gradient overlay matching the image's vibrant pop */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1D4ED8] to-[#0066FF] opacity-50 z-0"></div>
        
        <div className="z-10 flex flex-col items-center">
          <h2 className="text-[36px] md:text-[46px] font-bold text-white mb-6 tracking-tight leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
            Prêt à révolutionner votre santé ?
          </h2>
          <p className="text-blue-100 text-[18px] mb-12 max-w-2xl">
            Rejoignez des milliers d'utilisateurs dès aujourd'hui.
          </p>
          <a href="#choix-inscription" className="inline-block bg-white text-[#0066FF] px-10 py-5 rounded-full font-bold text-[16px] hover:scale-105 transition-transform shadow-lg">
            Commencer gratuitement
          </a>
        </div>
      </div>
    </section>
  );
};

export default AppelAction;

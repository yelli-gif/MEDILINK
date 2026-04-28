import React from 'react';
import { Share2, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#EEF1F8] pt-24 pb-12 px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col items-center">
      <div className="max-w-[1536px] w-full flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 mb-24">
        
        {/* Left Section */}
        <div className="max-w-[320px]">
          <span className="text-[#0055FF] font-bold text-[24px] tracking-tight mb-5 inline-block">Medilink</span>
          <p className="text-[#5A5C6B] text-[15px] leading-relaxed">
            Le sanctuaire numérique pour votre parcours de santé complet.
          </p>
        </div>
        
        {/* Right Section (Columns) */}
        <div className="flex gap-16 md:gap-24 flex-wrap lg:justify-end">
          {/* Column 1 */}
          <div>
            <h4 className="font-semibold text-[#8C8F9E] mb-6 text-[12px] uppercase tracking-widest">Plateforme</h4>
            <ul className="space-y-4 text-[15px] text-[#5A5C6B]">
              <li><a href="#" className="hover:text-[#0055FF] transition-colors">Fonctionnalités</a></li>
              <li><a href="#" className="hover:text-[#0055FF] transition-colors">Pour qui ?</a></li>
              <li><a href="#" className="hover:text-[#0055FF] transition-colors">Témoignages</a></li>
            </ul>
          </div>
          
          {/* Column 2 */}
          <div>
            <h4 className="font-semibold text-[#8C8F9E] mb-6 text-[12px] uppercase tracking-widest">Légal</h4>
            <ul className="space-y-4 text-[15px] text-[#5A5C6B]">
              <li><a href="#" className="hover:text-[#0055FF] transition-colors">Mentions légales</a></li>
              <li><a href="#" className="hover:text-[#0055FF] transition-colors">Confidentialité</a></li>
            </ul>
          </div>
          
          {/* Column 3 */}
          <div>
            <h4 className="font-semibold text-[#8C8F9E] mb-6 text-[12px] uppercase tracking-widest">Aide</h4>
            <ul className="space-y-4 text-[15px] text-[#5A5C6B]">
              <li><a href="#" className="hover:text-[#0055FF] transition-colors">Support 24/7</a></li>
              <li><a href="#" className="hover:text-[#0055FF] transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Social */}
      <div className="max-w-[1536px] w-full flex flex-col md:flex-row justify-between items-center text-[13px] text-[#8C8F9E]">
        <p className="mb-4 md:mb-0">© 2024 Medilink. Tous droits réservés.</p>
        <div className="flex items-center gap-6">
          <a href="#" aria-label="Partager" className="hover:text-[#5A5C6B] transition-colors">
            <Share2 size={18} />
          </a>
          <a href="#" aria-label="Langue" className="hover:text-[#5A5C6B] transition-colors">
            <Globe size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from 'react';

interface NavbarProps {
  // Détermine si on démarre transparent au sommet (vrai pour l'Accueil)
  transparentOnTop?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparentOnTop = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On affiche le fond blanc bleuté s'il a scrollé OU si la page n'est pas transparente au sommet
  const showGlassBackground = !transparentOnTop || isScrolled;

  return (
    <nav className={`w-full flex items-center justify-between px-5 md:px-10 py-4 md:py-5 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      showGlassBackground 
        ? 'bg-white/80 backdrop-blur-md border-b border-[#E1E6F0] shadow-sm' 
        : 'bg-transparent border-transparent'
    }`}>
      
      {/* PARTIE GAUCHE : Logo + Liens */}
      <div className="flex items-center gap-10">
        <span className="text-[#0066FF] font-bold text-2xl tracking-tight cursor-pointer">
          Medilink
        </span>
        
        <div className="hidden md:flex items-center gap-8 text-[#586766] text-sm font-medium font-sans mt-1">
          <a href="/#fonctionnalites" className="hover:text-[#0066FF] transition-colors">Fonctionnalités</a>
          <a href="/#pour-qui" className="hover:text-[#0066FF] transition-colors">Pour qui ?</a>
          <a href="/#temoignages" className="hover:text-[#0066FF] transition-colors">Témoignages</a>
        </div>
      </div>

      {/* PARTIE DROITE : Boutons */}
      <div className="flex items-center gap-3 md:gap-6">
        <a href="/connexion" className="text-[#0066FF] font-semibold text-xs md:text-sm hover:opacity-80 transition-opacity">
          Se connecter
        </a>
        <a href="/choix-inscription" className="inline-block bg-[#0066FF] text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-semibold hover:-translate-y-0.5 transition-transform shadow-md shadow-blue-500/20">
          <span className="md:hidden">S'inscrire</span>
          <span className="hidden md:inline">Commencer gratuitement</span>
        </a>
      </div>

    </nav>
  );
};

export default Navbar;

import React from 'react';
import Navbar from '../Composants/Accueil/Navbar';
import Hero from '../Composants/Accueil/Hero';
import Statistiques from '../Composants/Accueil/Statistiques';
import Fonctionnalites from '../Composants/Accueil/Fonctionnalites';
import Acteurs from '../Composants/Accueil/Acteurs';
import Temoignages from '../Composants/Accueil/Temoignages';
import AppelAction from '../Composants/Accueil/AppelAction';
import Footer from '../Composants/Accueil/Footer';

const Accueil: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFBFF] font-sans selection:bg-[#0066FF] selection:text-white">
      {/* On passe "transparent" par défaut au chargement */}
      <Navbar />
      
      <main>
        <Hero />
        <Statistiques />
        <Fonctionnalites />
        <Acteurs />
        <Temoignages />
        <AppelAction />
      </main>

      <Footer />
    </div>
  );
};

export default Accueil;

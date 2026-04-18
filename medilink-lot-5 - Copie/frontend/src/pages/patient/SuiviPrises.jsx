import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuiviPrises() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-surface min-h-screen pb-32 font-body relative overflow-x-hidden">
      {/* TopNavBar */}
      <header className="sticky top-0 z-50 glass-nav h-20 flex items-center px-6 md:px-12 border-none">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <span className="text-2xl font-extrabold tracking-tight text-primary font-headline cursor-pointer">Medilink</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="hidden md:flex signature-gradient text-on-primary px-8 py-3 rounded-full font-semibold text-sm transition-transform hover:scale-[1.02] cursor-pointer">
              Nouvelle prise
            </button>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant cursor-pointer">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div className="h-10 w-10 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden cursor-pointer">
                <img alt="User Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDthAVFZ9WaiIWF4eyGlT51xY-UEHNf3LfnZFw4nHBkTjY5PMCV1-eTc5cfrLU2sOsFWwcvBHAhw5OXZhu-ylJPrAcgJYB4qt6-YwktSrdEf7BMnAb-Q3rp5waCvh7Q6kQ2QyktvTye_S6RJDHGk_6xilJ_FvlHeCr7gl_Cut8SYJFlmdKK0uDmR-TRFh6H-wrL-wCjMtbXYpOaKV7Sjvmn2x5GWV3Po55xDQXWDnEGngUBDokio4jxdxjB5hs0mRmgi3lgD7SewUo"/>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-12 relative z-10">
        {/* Hero Section & Greeting */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-primary font-semibold tracking-wide uppercase text-xs mb-3 block">Tableau de bord</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-editorial-spacing leading-tight mb-4 font-headline">Bonjour Dupont</h1>
              <p className="text-on-surface-variant text-base md:text-lg max-w-md">Retrouvez ici le suivi détaillé de vos parcours de soins et l'évolution de vos traitements en cours.</p>
            </div>
            <div className="flex gap-3">
              <span className="px-4 py-2 rounded-full bg-secondary-fixed text-on-secondary-fixed text-sm font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]" style={{fontVariationSettings: "'FILL' 1"}}>verified_user</span>
                Dossier à jour
              </span>
            </div>
          </div>
        </section>

        {/* Treatments Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Featured Treatment */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-6 md:p-8 transition-shadow hover:shadow-[0_20px_40px_rgba(25,27,36,0.04)]">
            <div className="flex flex-col md:flex-row justify-between gap-8 h-full">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-3xl">favorite</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-headline">Traitement Cardiovasculaire</h3>
                    <p className="text-on-surface-variant text-sm">Dr. Fontaine • Clinique du Parc</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <span className="material-symbols-outlined text-primary">calendar_today</span>
                    12 Mars 2024 — 12 Juin 2024
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface-container-low p-4 rounded-xl">
                      <p className="text-xs text-on-surface-variant mb-1">Médicaments</p>
                      <p className="text-xl font-bold">4 <span className="text-sm font-normal text-on-surface-variant">/ jour</span></p>
                    </div>
                    <div className="bg-surface-container-low p-4 rounded-xl">
                      <p className="text-xs text-on-surface-variant mb-1">Jours restants</p>
                      <p className="text-xl font-bold">42 <span className="text-sm font-normal text-on-surface-variant">jours</span></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-surface-container-low rounded-xl p-6 md:p-8 min-w-[200px] md:min-w-[240px]">
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  {/* Circular Progress */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-outline-variant/20" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="8"></circle>
                    <circle className="text-primary" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset="132" strokeWidth="8"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl md:text-4xl font-extrabold font-headline">70%</span>
                    <span className="text-[9px] md:text-[10px] uppercase tracking-wider font-bold text-on-surface-variant text-center mt-1">Complété</span>
                  </div>
                </div>
                <button className="mt-6 text-primary font-bold text-sm flex items-center gap-2 cursor-pointer hover:underline">
                  Voir les détails <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Side Stats / Quick Actions */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8">
            <div className="bg-secondary-container rounded-xl p-6 text-on-secondary-container">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
                Résumé hebdomadaire
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Adhésion</span>
                  <span className="font-bold">98%</span>
                </div>
                <div className="w-full bg-on-secondary-container/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-on-secondary-container h-full w-[98%]"></div>
                </div>
                <p className="text-xs opacity-80 leading-relaxed">Excellent ! Vous avez pris tous vos traitements à l'heure cette semaine.</p>
              </div>
            </div>
            
            <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10">
              <h4 className="font-bold mb-4">Prochains rendez-vous</h4>
              <div className="flex gap-4 items-start">
                <div className="bg-white p-2 rounded-lg text-center min-w-[50px] shadow-sm shrink-0">
                  <span className="block text-xs font-bold text-primary uppercase">Mar</span>
                  <span className="block text-lg font-black">24</span>
                </div>
                <div>
                  <p className="text-sm font-bold truncate">Bilan Cardiologie</p>
                  <p className="text-xs text-on-surface-variant">14:30 • Dr. Fontaine</p>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Treatments Grid */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-2 md:mt-4">
            {/* Card 2 */}
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                    <span className="material-symbols-outlined">pill</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-lg truncate">Rééducation Posture</h4>
                    <p className="text-xs text-on-surface-variant truncate">Kinesithérapie • Dr. Martin</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-surface-container-high rounded-full text-[10px] font-bold uppercase tracking-wide">Actif</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-on-surface-variant mb-1">Date de fin</p>
                    <p className="text-sm font-semibold">15 Avril 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl md:text-2xl font-black text-editorial-spacing">12 <span className="text-[10px] md:text-xs font-medium text-on-surface-variant">séances</span></p>
                  </div>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full w-[25%]"></div>
                </div>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined">science</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-lg truncate">Traitement Diabète</h4>
                    <p className="text-xs text-on-surface-variant truncate">Endocrinologie • Dr. Lebrun</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-surface-container-high rounded-full text-[10px] font-bold uppercase tracking-wide">Long terme</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-on-surface-variant mb-1">Prochaine analyse</p>
                    <p className="text-sm font-semibold">Dans 5 jours</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl md:text-2xl font-black text-editorial-spacing">85 <span className="text-[10px] md:text-xs font-medium text-on-surface-variant">%</span></p>
                  </div>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full w-[85%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 md:h-20 glass-nav border-t border-outline-variant/10 px-4 md:px-6 z-50">
        <div className="max-w-md mx-auto h-full flex items-center justify-around">
          <div className="flex flex-col items-center gap-1 group cursor-pointer" onClick={() => navigate('/patient/suivi')}>
            <div className="relative flex flex-col items-center">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>medical_services</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Traitements</span>
              <div className="absolute -bottom-2 md:-bottom-3 w-1 h-1 bg-primary rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 group cursor-pointer" onClick={() => navigate('/pharmacie/ordonnances')}>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">description</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant group-hover:text-primary">Aller Pharmacie</span>
          </div>
        </div>
      </nav>

      {/* Visual Texture / Sanctuary Element */}
      <div className="fixed top-0 right-0 z-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 z-0 w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-secondary-fixed/30 rounded-full blur-[60px] md:blur-[80px] pointer-events-none"></div>
    </div>
  );
}

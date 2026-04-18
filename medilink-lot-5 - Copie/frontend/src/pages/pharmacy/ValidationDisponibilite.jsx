import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ValidationDisponibilite() {
  const navigate = useNavigate();
  const [med1, setMed1] = useState(true);
  const [med2, setMed2] = useState(true);
  const [med3, setMed3] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-on-background font-body">
      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 z-40 bg-slate-50 flex flex-col py-8 px-4 border-none font-manrope text-sm font-medium tracking-tight hidden md:flex">
        <div className="mb-10 px-2 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined" data-icon="medical_services">medical_services</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-blue-600 font-manrope">Sanctuary Rx</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Clinical Precision</p>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          <button onClick={() => navigate('/pharmacie/ordonnances')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 transition-colors duration-200 rounded-xl cursor-pointer">
            <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
            <span>Overview</span>
          </button>
          <div className="flex items-center gap-3 px-4 py-3 text-blue-600 font-bold bg-blue-50/50 rounded-xl">
            <span className="material-symbols-outlined" data-icon="description">description</span>
            <span>Prescriptions</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 transition-colors duration-200 rounded-xl cursor-pointer">
            <span className="material-symbols-outlined" data-icon="inventory_2">inventory_2</span>
            <span>Inventory</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 transition-colors duration-200 rounded-xl cursor-pointer" onClick={() => navigate('/patient/suivi')}>
            <span className="material-symbols-outlined">switch_account</span>
            <span className="text-blue-600">Aller vers Patient</span>
          </div>
        </nav>
        <div className="mt-auto p-4 bg-slate-100/50 rounded-2xl flex items-center gap-3">
          <img alt="Pharmacist Profile Image" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTVFrqH6yMlMsBmRibqd-zsPNoYNXeu500vWGfEEd4jKeOmyXHvneZof0QNE2-6Jef-x2ftCQ2Xy5Ol5uyiTEk5kmWxk7U3veSoSbh9yObEfzcKC7YawQvW-vQYG0uBTQJOqcShmmvq2J4aHhS3qRGjIyivgwhlrL-L9jDFavSvLa2jL4jeRsTeSmhE92N4wKmyUzeGVBZoo6-zyAYpAkZO7Qtrxlje7x4bOEqzofQC8qZzPmQdrIA86j1N1jULXkF4Ew1srfDR_E"/>
          <div className="overflow-hidden">
            <p className="text-xs font-bold truncate">Dr. Aris Thorne</p>
            <p className="text-[10px] text-slate-500 truncate">Senior Pharmacist</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col">
        {/* TopAppBar */}
        <header className="sticky top-0 right-0 md:left-64 h-16 z-30 flex justify-between items-center px-4 md:px-8 w-full bg-white/80 backdrop-blur-xl border-none">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" data-icon="search">search</span>
              <input className="w-full bg-slate-50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Rechercher une ordonnance..." type="text"/>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-blue-500 transition-colors" data-icon="notifications">notifications</span>
              <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-blue-500 transition-colors hidden sm:block" data-icon="help_outline">help_outline</span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold font-manrope text-slate-900 hidden sm:block">Clinical Workspace</span>
              <img alt="User Profile" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl-foBXMmH5oFn5KcYEkHS51SfaGMu1wra11Jmw09kxL3lvWfFZ6KBdXxx7QdB8VLGGwX9qYwP819MIQsbAW34gcrpZkTGtF-MhuUbf5o3-ZY9dmaBY-0Xe-NdAADOsyyyUosp-iVrApsJZpjgApbO5hI2aXLXB0V9Ptb2w5sfv10IF8Ung8nVDXLaJduOGf2cHaMNJwapIxn1qVGztK1JOAg2_AhLd9Aa9imzL6l2JMtIn9j5dRwXnMugqC_rVXHUwIoJfjePZQM"/>
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <div className="p-6 md:p-8 max-w-6xl mx-auto w-full">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
            <span>Tableau de bord</span>
            <span className="material-symbols-outlined text-[14px]" data-icon="chevron_right">chevron_right</span>
            <span className="hidden sm:inline">Ordonnances</span>
            <span className="material-symbols-outlined text-[14px] hidden sm:inline" data-icon="chevron_right">chevron_right</span>
            <span className="text-primary truncate">Détail Ordonnance Patient</span>
          </nav>

          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold font-headline tracking-tight text-on-surface mb-2">Détail Ordonnance</h2>
              <p className="text-slate-500 font-body">ID: #ORD-99283 • Reçue il y a 12 minutes</p>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 rounded-full text-sm font-semibold text-secondary items-center gap-2 bg-secondary-container hover:opacity-90 transition-all hidden sm:flex cursor-pointer">
                <span className="material-symbols-outlined text-[20px]" data-icon="print">print</span>
                Imprimer
              </button>
              <button className="flex-1 md:flex-none px-5 py-2.5 rounded-full text-sm font-semibold text-white flex items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary-container shadow-lg shadow-primary/10 hover:opacity-90 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-[20px]" data-icon="send">send</span>
                Envoyer réponse
              </button>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-12 gap-8">
            {/* Patient & Prescription Info */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
              <section className="bg-white rounded-xl p-6 shadow-sm border-none bg-surface-container-lowest">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-6">Informations Patient</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-secondary-container flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined text-3xl" data-icon="person">person</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-on-surface">Jean-Marc Dubois</h4>
                    <p className="text-sm text-slate-500">64 ans • Homme</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                    <span className="text-slate-500">N° Sécurité Sociale</span>
                    <span className="font-medium">1 58 03 75 120 044</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                    <span className="text-slate-500">Allergies</span>
                    <span className="font-bold text-error">Pénicilline</span>
                  </div>
                  <div className="flex justify-between text-sm py-2">
                    <span className="text-slate-500">Dernière visite</span>
                    <span className="font-medium">14 Oct. 2023</span>
                  </div>
                </div>
              </section>
              <section className="bg-surface-container-low rounded-xl p-6 border-none">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-6">Médecin Prescripteur</h3>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary" data-icon="stethoscope">stethoscope</span>
                  <div>
                    <p className="font-bold text-sm">Dr. Sophie Laurent</p>
                    <p className="text-xs text-slate-500">Cardiologue • RPPS: 10100234567</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Prescription Content */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              {/* Medication List */}
              <section className="bg-white rounded-xl overflow-hidden shadow-sm bg-surface-container-lowest">
                <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                  <h3 className="text-lg font-bold font-headline">Contenu de l'ordonnance</h3>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">3 Médicaments</span>
                </div>
                <div className="divide-y divide-slate-50">
                  {/* Med 1 */}
                  <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between group gap-4 relative">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                        <span className="material-symbols-outlined" data-icon="pill">pill</span>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">Ramipril 5mg</p>
                        <p className="text-sm text-slate-500 mb-2">Comprimé • 1 fois par jour (Matin)</p>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Durée: 3 mois</span>
                      </div>
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer select-none absolute top-6 right-6 sm:static">
                      <span className="text-sm font-medium text-slate-600 hidden sm:block">Disponible</span>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input checked={med1} onChange={() => setMed1(!med1)} className="sr-only peer" type="checkbox"/>
                        <div className={`w-11 h-6 rounded-full peer transition-all ${med1 ? 'bg-primary' : 'bg-slate-200'} after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${med1 ? 'after:translate-x-full after:border-white' : ''}`}></div>
                      </div>
                    </label>
                  </div>
                  {/* Med 2 */}
                  <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between group gap-4 relative">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                        <span className="material-symbols-outlined" data-icon="vaccines">vaccines</span>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">Atorvastatine 20mg</p>
                        <p className="text-sm text-slate-500 mb-2">Gélule • 1 fois par jour (Soir)</p>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Durée: 1 mois</span>
                      </div>
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer select-none absolute top-6 right-6 sm:static">
                      <span className="text-sm font-medium text-slate-600 hidden sm:block">Disponible</span>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input checked={med2} onChange={() => setMed2(!med2)} className="sr-only peer" type="checkbox"/>
                        <div className={`w-11 h-6 rounded-full peer transition-all ${med2 ? 'bg-primary' : 'bg-slate-200'} after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${med2 ? 'after:translate-x-full after:border-white' : ''}`}></div>
                      </div>
                    </label>
                  </div>
                  {/* Med 3 */}
                  <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between group gap-4 relative">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                        <span className="material-symbols-outlined" data-icon="medication">medication</span>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">Kardegic 75mg</p>
                        <p className="text-sm text-slate-500 mb-2">Sachet • 1 fois par jour (Midi)</p>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Durée: Renouvelable</span>
                      </div>
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer select-none absolute top-6 right-6 sm:static">
                      <span className="text-sm font-medium text-slate-600 hidden sm:block">Disponible</span>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input checked={med3} onChange={() => setMed3(!med3)} className="sr-only peer" type="checkbox"/>
                        <div className={`w-11 h-6 rounded-full peer transition-all ${med3 ? 'bg-primary' : 'bg-slate-200'} after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${med3 ? 'after:translate-x-full after:border-white' : ''}`}></div>
                      </div>
                    </label>
                  </div>
                </div>
              </section>

              {/* Notes Section */}
              <section className="bg-white rounded-xl p-6 md:p-8 shadow-sm bg-surface-container-lowest">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-primary" data-icon="edit_note">edit_note</span>
                  <h3 className="text-lg font-bold font-headline">Notes et conseils</h3>
                </div>
                <textarea className="w-full bg-surface-container-highest border-none rounded-xl p-4 text-sm font-body placeholder:text-slate-400 focus:ring-2 focus:ring-primary/40 focus:outline-none transition-all resize-none" placeholder="Saisissez ici les instructions spécifiques pour le patient..." rows="4"></textarea>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="material-symbols-outlined text-[16px]" data-icon="info">info</span>
                    <span className="hidden sm:inline">Ces notes seront visibles sur l'application mobile.</span>
                  </div>
                  <button className="text-primary font-bold text-sm hover:underline flex items-center gap-1 cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]" data-icon="history">history</span>
                    Modèle
                  </button>
                </div>
              </section>

              {/* Action Banner */}
              <div className="bg-primary/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="flex items-center gap-4 z-10 w-full md:w-auto">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm shrink-0">
                    <span className="material-symbols-outlined" data-icon="task_alt">task_alt</span>
                  </div>
                  <div>
                    <p className="font-bold">Prêt pour finalisation</p>
                    <p className="text-xs sm:text-sm text-slate-600">Vérifiez les disponibilités avant l'envoi.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto z-10">
                  <button onClick={() => navigate('/pharmacie/ordonnances')} className="w-full md:w-auto px-8 py-3 rounded-full text-sm font-extrabold text-white bg-gradient-to-br from-primary to-primary-container shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all cursor-pointer">
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

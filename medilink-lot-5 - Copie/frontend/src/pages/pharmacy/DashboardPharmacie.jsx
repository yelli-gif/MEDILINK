import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPharmacie() {
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-surface overflow-hidden h-screen flex relative">
      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 z-40 hidden md:flex flex-col py-8 px-4 bg-slate-50 border-none justify-between">
        <div>
          <div className="mb-10 px-2 cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-xl font-bold tracking-tight text-blue-600 font-manrope">Sanctuary Rx</h1>
            <p className="text-xs text-slate-500 font-medium">Clinical Precision</p>
          </div>
          <nav className="flex flex-col space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 text-blue-600 font-bold bg-blue-50/50 rounded-xl transition-all scale-98 active:opacity-80 cursor-pointer">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-manrope text-sm tracking-tight">Overview</span>
            </div>
            <div onClick={() => navigate('/pharmacie/ordonnances')} className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200 rounded-xl cursor-pointer">
              <span className="material-symbols-outlined">description</span>
              <span className="font-manrope text-sm tracking-tight">Prescriptions</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200 rounded-xl cursor-pointer">
              <span className="material-symbols-outlined">inventory_2</span>
              <span className="font-manrope text-sm tracking-tight">Inventory</span>
            </div>
            <div onClick={() => navigate('/patient/suivi')} className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200 rounded-xl cursor-pointer">
               <span className="material-symbols-outlined">group</span>
               <span className="font-manrope text-sm tracking-tight text-blue-600">Aller vers patient</span>
            </div>
          </nav>
        </div>
        <div className="px-2 flex items-center gap-3 pb-4">
          <img alt="Pharmacist Profile" className="w-10 h-10 rounded-full bg-slate-200 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeQOZNWsTf-6E9sCIn-nihM4azUkSoTdlH71mUOXdQnBdC5qXukWzq8Zxf1_4pmzrWCrgyrgh9vXd1bwM97FE9YSz5uRBIZ5aaigewqRoRgpAN-x_zvC9OMy-fLW77QxDRRCvhDMzb8c_q1bCHmQobYx6xuFzQ3NGXDLrY1ZFjy2xYtoq5pnjVLPCIKOgMnCsYYRS7J7uWuelCqpdTbgldRV-mm8zWI3Bsb7o7kyP5YAOHUtEWQJXJssHOM3GfVCgdezkRDDwG52w"/>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">Dr. Julian Vance</p>
            <p className="text-xs text-slate-500 truncate">Lead Pharmacist</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col h-screen relative w-full">
        {/* TopAppBar */}
        <header className="fixed top-0 right-0 left-0 md:left-64 h-16 z-30 flex justify-between items-center px-4 md:px-8 w-full bg-white/80 backdrop-blur-xl border-none">
          <div className="flex items-center gap-4 md:gap-6 flex-1">
            <h2 className="text-sm md:text-lg font-extrabold text-slate-900 font-manrope">Tableau de Bord Pharmacie</h2>
            <div className="relative w-full max-w-sm hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
              <input className="w-full bg-surface-container-highest border-none rounded-md py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/40 transition-all placeholder:text-slate-400 outline-none" placeholder="Search prescriptions, patients..." type="text"/>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors cursor-pointer active:opacity-70">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 text-slate-400 hover:text-blue-500 transition-colors cursor-pointer active:opacity-70 hidden sm:block">
                <span className="material-symbols-outlined">help_outline</span>
              </button>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700 hidden sm:block">Clinical Workspace</span>
              <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white text-xs font-bold shrink-0">JV</div>
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <div className="flex-1 mt-16 p-4 md:p-8 overflow-hidden flex flex-col gap-8 bg-surface">
          {/* Summary Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
            {/* Orders Today */}
            <div onClick={() => navigate('/pharmacie/ordonnances')} className="bg-surface-container-lowest p-6 rounded-xl flex flex-col justify-between h-32 group hover:bg-primary transition-all duration-300 cursor-pointer shadow-sm">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-primary group-hover:text-white transition-colors">local_shipping</span>
                <span className="text-xs font-bold text-primary bg-primary-fixed px-2 py-1 rounded-full group-hover:bg-white/20 group-hover:text-white transition-all">+12%</span>
              </div>
              <div>
                <p className="text-3xl font-headline font-extrabold group-hover:text-white transition-colors">48</p>
                <p className="text-sm font-medium text-slate-500 group-hover:text-white/80 transition-colors">Orders Today</p>
              </div>
            </div>
            {/* Pending Verification */}
            <div onClick={() => navigate('/pharmacie/ordonnances')} className="bg-surface-container-lowest p-6 rounded-xl flex flex-col justify-between h-32 border-none shadow-sm cursor-pointer hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-tertiary">verified_user</span>
                <span className="text-xs font-bold text-tertiary bg-tertiary-fixed px-2 py-1 rounded-full">Urgent</span>
              </div>
              <div>
                <p className="text-3xl font-headline font-extrabold">14</p>
                <p className="text-sm font-medium text-slate-500">Pending Verification</p>
              </div>
            </div>
            {/* Ready for Pickup */}
            <div className="bg-surface-container-lowest p-6 rounded-xl flex flex-col justify-between h-32 border-none shadow-sm hidden md:flex">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-secondary">shopping_bag</span>
              </div>
              <div>
                <p className="text-3xl font-headline font-extrabold">26</p>
                <p className="text-sm font-medium text-slate-500">Ready for Pickup</p>
              </div>
            </div>
          </section>

          {/* Main Interactive Area */}
          <section className="flex-1 flex flex-col min-h-0 bg-surface-container-low rounded-xl p-4 md:p-6 mb-20 md:mb-0">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-6 gap-4">
              <div>
                <h3 className="text-xl font-headline font-bold text-on-surface">Received Prescriptions</h3>
                <p className="text-sm text-slate-500">Real-time digital feed from Medilink Network</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white text-sm font-semibold rounded-full text-slate-600 hover:bg-slate-50 transition-colors">Filter</button>
                <button className="px-4 py-2 bg-primary text-sm font-semibold rounded-full text-white hover:opacity-90 transition-opacity flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">add</span>
                  <span className="hidden sm:inline">Manual Entry</span>
                </button>
              </div>
            </div>

            {/* Prescription Cards List */}
            <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar space-y-3">
              {/* Card 1 */}
              <div onClick={() => navigate('/pharmacie/validation')} className="bg-surface-container-lowest p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between hover:translate-x-1 transition-transform cursor-pointer gap-4 shadow-sm border border-outline-variant/10">
                <div className="flex items-center gap-4 sm:gap-5 w-full sm:w-1/3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-on-surface truncate">Jean-Pierre Dubois</h4>
                    <p className="text-xs text-slate-500">ID: #RX-90210</p>
                  </div>
                </div>
                <div className="w-full sm:w-1/4 flex justify-between sm:block">
                  <p className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Prescribing Doctor</p>
                  <p className="text-xs sm:text-sm font-semibold text-on-surface-variant truncate">Dr. Sarah Lemoine</p>
                </div>
                <div className="w-full sm:w-1/6 flex justify-between sm:block">
                  <p className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Date Received</p>
                  <p className="text-xs sm:text-sm font-medium">Today, 10:45 AM</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
                  <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-amber-50 text-amber-700">Pending</span>
                  <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg sm:text-2xl">more_vert</span>
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div onClick={() => navigate('/pharmacie/validation')} className="bg-surface-container-lowest p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between hover:translate-x-1 transition-transform cursor-pointer gap-4 shadow-sm border border-outline-variant/10">
                <div className="flex items-center gap-4 sm:gap-5 w-full sm:w-1/3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-on-surface truncate">Marie-Claire Fontaine</h4>
                    <p className="text-xs text-slate-500">ID: #RX-88432</p>
                  </div>
                </div>
                <div className="w-full sm:w-1/4 flex justify-between sm:block">
                  <p className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Prescribing Doctor</p>
                  <p className="text-xs sm:text-sm font-semibold text-on-surface-variant truncate">Dr. Marc Belin</p>
                </div>
                <div className="w-full sm:w-1/6 flex justify-between sm:block">
                  <p className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Date Received</p>
                  <p className="text-xs sm:text-sm font-medium">Today, 09:12 AM</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
                  <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-secondary-container text-on-secondary-container">Partial</span>
                  <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg sm:text-2xl">more_vert</span>
                  </button>
                </div>
              </div>

              {/* Card 3 */}
              <div onClick={() => navigate('/pharmacie/validation')} className="bg-surface-container-lowest p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between hover:translate-x-1 transition-transform cursor-pointer gap-4 shadow-sm border border-outline-variant/10">
                <div className="flex items-center gap-4 sm:gap-5 w-full sm:w-1/3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-on-surface truncate">Lucas Bernard</h4>
                    <p className="text-xs text-slate-500">ID: #RX-77291</p>
                  </div>
                </div>
                <div className="w-full sm:w-1/4 flex justify-between sm:block">
                  <p className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Prescribing Doctor</p>
                  <p className="text-xs sm:text-sm font-semibold text-on-surface-variant truncate">Dr. Elena Rossi</p>
                </div>
                <div className="w-full sm:w-1/6 flex justify-between sm:block">
                  <p className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">Date Received</p>
                  <p className="text-xs sm:text-sm font-medium">Yesterday, 4:30 PM</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
                  <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-green-50 text-green-700">Ready</span>
                  <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg sm:text-2xl">more_vert</span>
                  </button>
                </div>
              </div>

            </div>
          </section>
        </div>

        {/* Floating Action Component (Vital Status Glassmorphism) - Hidden on Mobile to clear space */}
        <div className="absolute bottom-10 right-10 w-80 p-6 bg-white/60 backdrop-blur-2xl rounded-2xl border-none shadow-xl flex-col gap-4 hidden lg:flex">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-secondary animate-pulse"></div>
            <h5 className="text-sm font-bold text-on-surface">Medilink Live Sync</h5>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Verification Engine</span>
              <span className="text-secondary font-bold">OPTIMAL</span>
            </div>
            <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
              <div className="bg-secondary w-[92%] h-full"></div>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Encryption active. All clinical data is processed through secure HIPAA-compliant channels.
            </p>
          </div>
        </div>

        {/* Mobile Bottom Nav Bar to navigate around pharmacist area if they lack the sidebar */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-t border-outline-variant/10 px-4 z-50 flex justify-around items-center">
             <div onClick={() => navigate('/pharmacie/dashboard')} className="flex flex-col items-center gap-1 cursor-pointer text-blue-600">
               <span className="material-symbols-outlined">dashboard</span>
               <span className="text-[10px] font-bold">Overview</span>
             </div>
             <div onClick={() => navigate('/pharmacie/ordonnances')} className="flex flex-col items-center gap-1 cursor-pointer text-slate-400 hover:text-blue-500">
               <span className="material-symbols-outlined">description</span>
               <span className="text-[10px] font-bold">Demandes</span>
             </div>
             <div onClick={() => navigate('/patient/suivi')} className="flex flex-col items-center gap-1 cursor-pointer text-slate-400 hover:text-blue-500">
               <span className="material-symbols-outlined">group</span>
               <span className="text-[10px] font-bold">Patient</span>
             </div>
        </nav>

      </main>
    </div>
  );
}

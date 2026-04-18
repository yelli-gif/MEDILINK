import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrdonnancesList() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface text-on-background min-h-screen flex w-full">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-surface-container-low min-h-screen flex flex-col p-6 sticky top-0 h-screen overflow-y-auto shrink-0 md:flex hidden">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBS6n9oPCak6a6_cHSDJ1WfCA1wunB_6xjey7WDlpXIt3UvQf5rCLk_4cI_bDyt2wHnBAmm6TVoZri5WXijw8VaScAXROgTFfp_1jRXT20DZy_UAMAHGV6ZExOsg_kxP8Cfs728Emz7aqEGutf4JkeIp-JqXQJhtm0TczW62caBA_NidY9Y851fB3aCP9Z1tBVvCoAWvUwn7dK0-DzDXRO4CdbglttSNuw2zkvrMNrOT-jgH4Vy4EmX96d7QHCU1P5a53ypJHH8si4")'}}></div>
          <div className="flex flex-col">
            <h1 className="text-on-surface text-base font-bold leading-normal font-headline">Hospital Portal</h1>
            <p className="text-on-surface-variant text-xs font-normal leading-normal">Clinical Clarity System</p>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer">
            <div className="text-on-surface">
              <span className="material-symbols-outlined">mobile_layout</span>
            </div>
            <p className="text-on-surface text-sm font-medium">Dashboard</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-container-highest cursor-pointer">
            <div className="text-primary">
              <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>trophy</span>
            </div>
            <p className="text-on-surface text-sm font-semibold">Requests</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer">
            <div className="text-on-surface">
              <span className="material-symbols-outlined">group</span>
            </div>
            <p className="text-on-surface text-sm font-medium">Patients</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer" onClick={() => navigate('/patient/suivi')}>
            <div className="text-on-surface">
              <span className="material-symbols-outlined">switch_account</span>
            </div>
            <p className="text-on-surface text-sm font-medium text-blue-600">Aller vers vue Patient</p>
          </div>
        </nav>
        <div className="mt-auto pt-6 border-t border-outline-variant/15">
          <div className="flex items-center gap-3 p-2 bg-surface-container-lowest rounded-xl shadow-sm">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-10" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA0I3wsMBCxsU6mwlakve412Wrx7SRU2pJy_0vKcs_fbgAdZv_e2MEHExJzvlbnVQDW4NYFeFLRwaB9QAtU4RmVZaxOsTjq0WoX1TxDTzp5XmcaEQNwTpXmK8w05zqdM-QWyRs8RlTk0R6RY4yr1SRVqV6zu4a009fO55uRyusj3a_oj5xkwBLvkOIctBbETC2E2lLWCcdDOVG7sVSl7OcjuV4zoTUJ0tUGNUt1VPjzMU8c1KA8ImxefZdTqbhK6tsg6zk0Agzv5jY")'}}></div>
            <div className="flex flex-col">
              <p className="text-on-surface text-xs font-bold">Dr. Sarah Wilson</p>
              <p className="text-on-surface-variant text-[10px]">Front Desk Supervisor</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-surface">
        {/* Top Navigation Bar */}
        <header className="glass-header sticky top-0 z-10 flex items-center justify-between px-6 md:px-10 py-4 border-b border-outline-variant/15">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="text-primary size-6">
                <span className="material-symbols-outlined text-3xl">medical_services</span>
              </div>
              <h2 className="text-on-surface text-xl font-black tracking-tight font-headline hidden md:block">Front Desk Dashboard</h2>
            </div>
            <div className="relative w-64 md:w-72 hidden sm:block">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-on-surface-variant">
                <span className="material-symbols-outlined text-xl">search</span>
              </div>
              <input className="w-full bg-surface-container-highest border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface-variant outline-none" placeholder="Search patients or requests..." type="text"/>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="bg-secondary-fixed text-on-secondary-fixed px-4 py-1.5 rounded-full hidden sm:flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">event</span>
              <span className="text-sm font-bold">October 24, 2023</span>
            </div>
            <button className="relative text-on-surface">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute -top-1 -right-1 size-2 bg-error rounded-full"></span>
            </button>
          </div>
        </header>

        <div className="px-6 md:px-10 py-8 flex flex-col gap-8">
          {/* Page Title & Hero Stats */}
          <section className="flex flex-col gap-6">
            <div>
              <h1 className="text-on-background text-3xl md:text-4xl font-black tracking-tight font-headline mb-2">New Requests</h1>
              <p className="text-on-surface-variant text-sm md:text-base">Validate incoming medical service requests and generate patient tickets.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface-container-lowest p-6 rounded-xl border-none flex flex-col gap-2">
                <span className="text-on-surface-variant text-sm font-medium font-label uppercase tracking-wider">Total Pending</span>
                <div className="flex items-end gap-3">
                  <span className="text-on-surface text-4xl font-black font-headline">24</span>
                  <span className="text-primary font-bold text-sm mb-1.5">+5% today</span>
                </div>
              </div>
              <div class="bg-surface-container-lowest p-6 rounded-xl border-none flex flex-col gap-2">
                <span className="text-on-surface-variant text-sm font-medium font-label uppercase tracking-wider">Urgent Cases</span>
                <div className="flex items-end gap-3">
                  <span className="text-error text-4xl font-black font-headline">08</span>
                  <span className="text-on-surface-variant text-sm mb-1.5">Action required</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl border-none flex flex-col gap-2">
                <span className="text-on-surface-variant text-sm font-medium font-label uppercase tracking-wider">Standard Flow</span>
                <div className="flex items-end gap-3">
                  <span className="text-secondary text-4xl font-black font-headline">16</span>
                  <span className="text-on-surface-variant text-sm mb-1.5">Average wait: 12m</span>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Request List */}
            <section className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-on-surface text-xl font-bold font-headline">Pending Validation</h3>
                <div className="flex gap-2">
                  <button className="bg-surface-container-highest px-3 py-1.5 rounded-lg text-xs font-bold text-on-surface-variant">Priority</button>
                  <button className="bg-surface-container-highest px-3 py-1.5 rounded-lg text-xs font-bold text-on-surface-variant">Time</button>
                </div>
              </div>

              {/* Card 1 (Urgent) */}
              <div className="bg-surface-container-lowest p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-4 flex-1">
                  <div className="bg-error-container text-error size-12 rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>emergency</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-on-surface text-base font-bold truncate">James McAvoy</h4>
                      <span className="px-2 py-0.5 bg-error text-on-error text-[10px] font-black uppercase rounded-full tracking-widest">Urgent</span>
                    </div>
                    <p className="text-on-surface-variant text-sm mt-0.5">Cardiology • <span className="font-medium">10:42 AM</span></p>
                    <p className="text-on-surface-variant text-xs mt-1 truncate italic">Chest pain, shortness of breath, previous surgery history...</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:ml-auto">
                  <button onClick={() => navigate('/pharmacie/validation')} className="bg-signature-gradient text-on-primary px-5 py-2 rounded-full text-sm font-bold tracking-tight shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-transform w-full sm:w-auto">
                    Valider la demande
                  </button>
                  <button className="text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors hidden sm:block">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-surface-container-lowest p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-4 flex-1">
                  <div className="bg-secondary-fixed text-secondary size-12 rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl">person</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-on-surface text-base font-bold truncate">Elena Rodriguez</h4>
                      <span className="px-2 py-0.5 bg-secondary-fixed-dim text-on-secondary-fixed text-[10px] font-black uppercase rounded-full tracking-widest">Standard</span>
                    </div>
                    <p className="text-on-surface-variant text-sm mt-0.5">Dermatology • <span className="font-medium">10:55 AM</span></p>
                    <p className="text-on-surface-variant text-xs mt-1 truncate italic">Severe rash on lower arm, allergic reaction suspected...</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:ml-auto">
                  <button onClick={() => navigate('/pharmacie/validation')} className="bg-signature-gradient text-on-primary px-5 py-2 rounded-full text-sm font-bold tracking-tight shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-transform w-full sm:w-auto">
                    Valider la demande
                  </button>
                  <button className="text-on-surface-variant hover:bg-surface-container-high p-2 rounded-full transition-colors hidden sm:block">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              </div>

            </section>

            {/* Right Sidebar: Flow & Ticket */}
            <aside className="lg:col-span-4 flex flex-col gap-8 hidden lg:flex">
              {/* Validation Flow Section */}
              <div className="bg-primary p-6 rounded-2xl text-on-primary relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-lg font-black font-headline mb-4">Validation Process</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                      <div className="size-8 rounded-full bg-on-primary/20 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                      <p className="text-sm">Verify patient symptoms and clinical department urgency.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="size-8 rounded-full bg-on-primary/20 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                      <p className="text-sm">Click 'Validate' to generate the unique visit QR code.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="size-8 rounded-full bg-on-primary/20 flex items-center justify-center font-bold text-xs shrink-0">3</div>
                      <p className="text-sm">Direct the patient to the floor assigned on the digital ticket.</p>
                    </div>
                  </div>
                </div>
                {/* Abstract Flow Visual */}
                <div className="absolute -right-10 -bottom-10 opacity-20">
                  <span className="material-symbols-outlined text-[180px]">qr_code_2</span>
                </div>
              </div>
              {/* Last Generated Ticket Preview */}
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/15 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-on-surface text-sm font-bold uppercase tracking-widest font-label">Latest Ticket</h3>
                  <span className="text-primary font-bold text-xs">Generated 2m ago</span>
                </div>
                <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/10 flex flex-col items-center text-center">
                  <div className="p-4 bg-surface rounded-lg mb-4">
                    <span className="material-symbols-outlined text-6xl text-on-surface">qr_code_2</span>
                  </div>
                  <h4 className="text-on-surface text-lg font-bold font-headline">Sarah Jenkins</h4>
                  <p className="text-on-surface-variant text-sm font-medium">Ticket #772-B • Cardiology</p>
                  <div className="w-full h-px bg-outline-variant/15 my-4"></div>
                  <div className="grid grid-cols-2 gap-4 w-full text-left">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-on-surface-variant mb-1">Floor</p>
                      <p className="text-sm font-bold text-on-surface">Level 3, East</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-on-surface-variant mb-1">Queue Pos.</p>
                      <p className="text-sm font-bold text-on-surface">#04</p>
                    </div>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 text-primary font-bold text-sm py-2 hover:bg-primary/5 rounded-lg transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-lg">print</span>
                  Re-print Ticket
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

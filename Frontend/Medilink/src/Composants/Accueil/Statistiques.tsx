import React from 'react';

const SmileyIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#14152A" />
    <circle cx="9" cy="10.5" r="1.2" fill="white" />
    <circle cx="15" cy="10.5" r="1.2" fill="white" />
    <path
      d="M8.5 14.5 Q12 17.5 15.5 14.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const GroupIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="#14152A" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="7" r="2.8" />
    <path d="M7 19c0-2.76 2.24-5 5-5s5 2.24 5 5" />
    <circle cx="5.5" cy="8.5" r="2.2" />
    <path d="M1.5 19c0-2.2 1.8-4 4-4" />
    <circle cx="18.5" cy="8.5" r="2.2" />
    <path d="M22.5 19c0-2.2-1.8-4-4-4" />
  </svg>
);

const HospitalIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" fill="#14152A" />
    <path d="M12 9v6m-3-3h6" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Statistiques: React.FC = () => {
  return (
    <section
      className="w-full py-8 px-5 lg:px-24 flex flex-col sm:flex-row gap-4 justify-center bg-[#EEF0F8]"
    >
      {/* Satisfaction */}
      <div
        className="flex items-center justify-between flex-1 rounded-2xl px-5 sm:px-8 py-7 bg-white shadow-sm border border-[#E8ECF5] w-full max-w-[600px]"
      >
        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-1"
            style={{ color: '#9395A5' }}
          >
            Satisfaction
          </p>
          <h3 className="text-4xl sm:text-5xl font-bold" style={{ color: '#14152A' }}>
            98%
          </h3>
        </div>
        <div
          className="flex items-center justify-center rounded-full"
          style={{ width: 50, height: 50, backgroundColor: '#D4EDE8', flexShrink: 0 }}
        >
          <SmileyIcon />
        </div>
      </div>

      {/* Utilisateurs */}
      <div
        className="flex items-center justify-between flex-1 rounded-2xl px-5 sm:px-8 py-7 bg-white shadow-sm border border-[#E8ECF5] w-full max-w-[600px]"
      >
        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-1"
            style={{ color: '#9395A5' }}
          >
            Utilisateurs
          </p>
          <h3 className="text-4xl sm:text-5xl font-bold" style={{ color: '#14152A' }}>
            50,000+
          </h3>
        </div>
        <div
          className="flex items-center justify-center rounded-full"
          style={{ width: 50, height: 50, backgroundColor: '#D4D6EE', flexShrink: 0 }}
        >
          <GroupIcon />
        </div>
      </div>

      {/* Établissements */}
      <div
        className="flex items-center justify-between flex-1 rounded-2xl px-5 sm:px-8 py-7 bg-white shadow-sm border border-[#E8ECF5] w-full max-w-[600px]"
      >
        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-1"
            style={{ color: '#9395A5' }}
          >
            Établissements
          </p>
          <h3 className="text-4xl sm:text-5xl font-bold" style={{ color: '#14152A' }}>
            200+
          </h3>
        </div>
        <div
          className="flex items-center justify-center rounded-full"
          style={{ width: 50, height: 50, backgroundColor: '#FFE5D9', flexShrink: 0 }}
        >
          <HospitalIcon />
        </div>
      </div>
    </section>
  );
};

export default Statistiques;
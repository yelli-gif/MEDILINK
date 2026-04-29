import { useNavigate } from 'react-router-dom';
import './NouvellesDemandes.css'; // Reusing common shell styles

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="hi-app-shell">
      <aside className="hi-sidebar">
        {/* Sidebar content simplified for settings */}
        <div className="hi-sidebar__brand">
          <div className="hi-brand-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div className="hi-brand-text">
            <span className="hi-brand-name">Medilink</span>
            <span className="hi-brand-sub">PARAMÈTRES</span>
          </div>
        </div>
        <nav className="hi-sidebar__nav">
          <button className="hi-nav-item" onClick={() => navigate('/reception/dashboard')}>Retour au Tableau de Bord</button>
        </nav>
      </aside>

      <main className="hi-main">
        <header className="hi-topbar">
          <div className="hi-topbar-title">Configuration Système</div>
          <div className="hi-topbar__actions">
            <div className="hi-user-avatar">JD</div>
          </div>
        </header>

        <div className="hi-page-body">
          <div className="hi-page-header">
            <h2 className="hi-page-title">Paramètres</h2>
            <p className="hi-page-subtitle">Gérez vos préférences de réception et les configurations du terminal.</p>
          </div>

          <div className="hi-stats-grid">
            <div className="hi-stat-card">
              <span className="hi-stat-label">TERMINAL ID</span>
              <div className="hi-stat-content">
                <span className="hi-stat-value">RX-440</span>
              </div>
            </div>
            <div className="hi-stat-card">
              <span className="hi-stat-label">SESSION</span>
              <div className="hi-stat-content">
                <span className="hi-stat-value">Active</span>
              </div>
            </div>
          </div>

          <div className="hi-card" style={{ padding: '32px' }}>
            <h3 style={{ marginBottom: '24px' }}>Préférences d'Affichage</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Mode Sombre Automatique</span>
                <input type="checkbox" checked readOnly />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Notifications Sonores (Urgences)</span>
                <input type="checkbox" checked readOnly />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Impression automatique des tickets</span>
                <input type="checkbox" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;


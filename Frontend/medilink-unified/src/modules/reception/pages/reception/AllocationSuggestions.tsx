import { useNavigate } from 'react-router-dom';
import './NouvellesDemandes.css';

const AllocationSuggestions = () => {
  const navigate = useNavigate();

  return (
    <div className="hi-app-shell">
      <aside className="hi-sidebar">
        <div className="hi-sidebar__brand">
          <div className="hi-brand-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div className="hi-brand-text">
            <span className="hi-brand-name">Medilink</span>
            <span className="hi-brand-sub">ANALYSE IA</span>
          </div>
        </div>
        <nav className="hi-sidebar__nav">
          <button className="hi-nav-item" onClick={() => navigate('/reception/waiting-queues')}>Retour aux Files</button>
        </nav>
      </aside>

      <main className="hi-main">
        <header className="hi-topbar">
          <div className="hi-topbar-title">Optimisation des Effectifs</div>
          <div className="hi-topbar__actions">
            <div className="hi-user-avatar">AI</div>
          </div>
        </header>

        <div className="hi-page-body">
          <div className="hi-page-header">
            <h2 className="hi-page-title">Suggestions d'Allocation</h2>
            <p className="hi-page-subtitle">Algorithme d'optimisation prédictive basé sur le flux actuel de patients.</p>
          </div>

          <div className="hi-card" style={{ padding: '32px', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <h3 style={{ color: '#1e40af' }}>Recommandation Prioritaire</h3>
            <p style={{ marginTop: '12px', color: '#1e40af', fontSize: '15px' }}>
              <strong>Transférer 2 infirmiers</strong> de "Consultation Standard" vers "Urgences Niveau 1".
            </p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button className="hi-btn-submit" onClick={() => alert('Suggestion appliquée !')}>Appliquer la suggestion</button>
              <button className="hi-btn-close" style={{ width: 'auto' }}>Ignorer</button>
            </div>
          </div>

          <div style={{ marginTop: '32px' }}>
            <h4>Données d'Analyse</h4>
            <div className="hi-stats-grid" style={{ marginTop: '16px' }}>
              <div className="hi-stat-card">
                <span className="hi-stat-label">TEMPS D'ATTENTE CIBLE</span>
                <span className="hi-stat-value">12 min</span>
              </div>
              <div className="hi-stat-card">
                <span className="hi-stat-label">ÉCONOMIE ESTIMÉE</span>
                <span className="hi-stat-value">22%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllocationSuggestions;


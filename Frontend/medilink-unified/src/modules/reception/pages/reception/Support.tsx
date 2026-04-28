import { useNavigate } from 'react-router-dom';
import './NouvellesDemandes.css';

const Support = () => {
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
            <span className="hi-brand-sub">ASSISTANCE</span>
          </div>
        </div>
        <nav className="hi-sidebar__nav">
          <button className="hi-nav-item" onClick={() => navigate('/dashboard')}>Retour au Tableau de Bord</button>
        </nav>
      </aside>

      <main className="hi-main">
        <header className="hi-topbar">
          <div className="hi-topbar-title">Support Technique</div>
          <div className="hi-topbar__actions">
            <div className="hi-user-avatar">JD</div>
          </div>
        </header>

        <div className="hi-page-body">
          <div className="hi-page-header">
            <h2 className="hi-page-title">Assistance & Support</h2>
            <p className="hi-page-subtitle">Besoin d'aide ? Contactez notre équipe technique ou consultez la base de connaissance.</p>
          </div>

          <div className="hi-content-layout" style={{ gridTemplateColumns: '1fr' }}>
            <div className="hi-card" style={{ padding: '32px' }}>
              <h3>Ouvrir un Ticket de Support</h3>
              <form className="hi-form" style={{ marginTop: '24px' }}>
                <div className="hi-form-group">
                  <label>Sujet du problème</label>
                  <input type="text" placeholder="Ex: Problème d'impression des tickets" />
                </div>
                <div className="hi-form-group">
                  <label>Description détaillée</label>
                  <textarea style={{ background: '#f1f5f9', border: 'none', borderRadius: '10px', padding: '12px', minHeight: '120px' }} placeholder="Décrivez le souci rencontré..."></textarea>
                </div>
                <button type="button" className="hi-btn-submit" onClick={() => alert('Demande envoyée au support !')}>
                  Envoyer la demande
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;

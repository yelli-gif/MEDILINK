import { useNavigate } from 'react-router-dom';
import './NouvellesDemandes.css';

const HelpPage = () => {
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
            <span className="hi-brand-sub">CENTRE D'AIDE</span>
          </div>
        </div>
        <nav className="hi-sidebar__nav">
          <button className="hi-nav-item" onClick={() => navigate('/reception/dashboard')}>Retour au Tableau de Bord</button>
        </nav>
      </aside>

      <main className="hi-main">
        <header className="hi-topbar">
          <div className="hi-topbar-title">Documentation & Guide</div>
          <div className="hi-topbar__actions">
            <div className="hi-user-avatar">JD</div>
          </div>
        </header>

        <div className="hi-page-body">
          <div className="hi-page-header">
            <h2 className="hi-page-title">Besoin d'aide ?</h2>
            <p className="hi-page-subtitle">Découvrez comment utiliser au mieux le poste de réception Medilink.</p>
          </div>

          <div className="hi-stats-grid">
            <div className="hi-stat-card">
              <span className="hi-stat-label">GUIDE DE DÉMARRAGE</span>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '10px' }}>Apprenez les bases de la gestion des patients en 5 minutes.</p>
              <button style={{ marginTop: 'auto', background: '#f1f5f9', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Lire le guide</button>
            </div>
            <div className="hi-stat-card">
              <span className="hi-stat-label">RACCOURCIS CLAVIER</span>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '10px' }}>Optimisez votre vitesse de travail avec les raccourcis système.</p>
              <button style={{ marginTop: 'auto', background: '#f1f5f9', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Voir la liste</button>
            </div>
          </div>

          <div className="hi-card" style={{ padding: '32px', marginTop: '24px' }}>
            <h3>FAQ - Questions Fréquentes</h3>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h4 style={{ color: '#2563eb', marginBottom: '4px' }}>Comment réimprimer un ticket ?</h4>
                <p style={{ fontSize: '14px', color: '#64748b' }}>Allez dans la section "Nouvelles Demandes" et utilisez le bouton "Ré-imprimer" dans le module de droite.</p>
              </div>
              <div>
                <h4 style={{ color: '#2563eb', marginBottom: '4px' }}>Que faire en cas d'urgence médicale ?</h4>
                <p style={{ fontSize: '14px', color: '#64748b' }}>Utilisez le gros bouton bleu "Ajouter sur place" présent en bas de la barre latérale sur toutes les pages.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpPage;


import { useNavigate } from 'react-router-dom';
import './NouvellesDemandes.css';

const ReorganizeQueue = () => {
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
            <span className="hi-brand-sub">ÉDITION FILE</span>
          </div>
        </div>
        <nav className="hi-sidebar__nav">
          <button className="hi-nav-item" onClick={() => navigate('/waiting-queues')}>Retour aux Files</button>
        </nav>
      </aside>

      <main className="hi-main">
        <header className="hi-topbar">
          <div className="hi-topbar-title">Gestion des Priorités</div>
          <div className="hi-topbar__actions">
            <div className="hi-user-avatar">JD</div>
          </div>
        </header>

        <div className="hi-page-body">
          <div className="hi-page-header">
            <h2 className="hi-page-title">Réorganisation de la File</h2>
            <p className="hi-page-subtitle">Glissez et déposez les patients pour ajuster l'ordre de passage selon les critères cliniques.</p>
          </div>

          <div className="hi-card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ background: '#f8fafc', padding: '12px 24px', borderBottom: '1px solid #e2e8f0', fontSize: '12px', fontWeight: '700', color: '#94a3b8' }}>
              ORDRE ACTUEL (GLISSER POUR CHANGER)
            </div>
            <div style={{ padding: '12px' }}>
              <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '8px', cursor: 'grab', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#cbd5e1' }}>☰</span>
                <strong>#01 - Jean Dupont</strong>
                <span style={{ marginLeft: 'auto', fontSize: '11px', background: '#fee2e2', color: '#991b1b', padding: '2px 8px', borderRadius: '4px' }}>URGENT</span>
              </div>
              <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '8px', cursor: 'grab', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#cbd5e1' }}>☰</span>
                <strong>#02 - Marie Curie</strong>
                <span style={{ marginLeft: 'auto', fontSize: '11px', background: '#f1f5f9', color: '#64748b', padding: '2px 8px', borderRadius: '4px' }}>STANDARD</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
            <button className="hi-btn-submit" onClick={() => navigate('/waiting-queues')}>Enregistrer les changements</button>
            <button className="hi-btn-close" style={{ width: 'auto' }} onClick={() => navigate('/waiting-queues')}>Annuler</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReorganizeQueue;

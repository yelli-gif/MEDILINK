import { useNavigate } from 'react-router-dom';
import './NouvellesDemandes.css';

const NotificationsPage = () => {
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: 'Urgence signalée', body: 'Un nouveau patient en état critique vient d\'être enregistré en Cardiologie.', time: 'Il y a 2 min', urgent: true },
    { id: 2, title: 'File saturée', body: 'La file d\'attente en Radiologie dépasse le seuil recommandé (35 personnes).', time: 'Il y a 15 min', urgent: false },
    { id: 3, title: 'Maintenance système', body: 'Une mise à jour du terminal de réception est prévue à 20h00.', time: 'Il y a 1h', urgent: false },
  ];

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
            <span className="hi-brand-sub">NOTIFICATIONS</span>
          </div>
        </div>
        <nav className="hi-sidebar__nav">
          <button className="hi-nav-item" onClick={() => navigate('/dashboard')}>Retour au Tableau de Bord</button>
        </nav>
      </aside>

      <main className="hi-main">
        <header className="hi-topbar">
          <div className="hi-topbar-title">Historique des Alertes</div>
          <div className="hi-topbar__actions">
            <div className="hi-user-avatar">JD</div>
          </div>
        </header>

        <div className="hi-page-body">
          <div className="hi-page-header">
            <h2 className="hi-page-title">Notifications</h2>
            <p className="hi-page-subtitle">Restez informé des alertes cliniques et des statuts des files d'attente en temps réel.</p>
          </div>

          <div className="hi-req-list">
            {notifications.map(n => (
              <div key={n.id} className="hi-req-card" style={{ borderLeft: n.urgent ? '4px solid #ef4444' : '4px solid #e2e8f0' }}>
                <div className="hi-req-card__body">
                  <div className="hi-req-card__top">
                    <span className="hi-req-name">{n.title}</span>
                    {n.urgent && <span className="hi-badge-urgent">URGENT</span>}
                  </div>
                  <div className="hi-req-meta">{n.time}</div>
                  <div className="hi-req-notes">{n.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;

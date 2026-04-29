import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Historique.css'

// ── Icônes (inline SVG helpers) ────────────────────────────────────────────────

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)
const IconDashboard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
)
const IconPlus = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
  </svg>
)
const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
)
const IconTicket = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3l-4 4-4-4" />
  </svg>
)
const IconHistory = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="12 8 12 12 14 14" /><path d="M3.05 11a9 9 0 1 0 .5-4" /><polyline points="3 3 3 7 7 7" />
  </svg>
)
const IconSettings = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)
const IconSupport = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="4.93" y1="4.93" x2="9.17" y2="9.17" /><line x1="14.83" y1="14.83" x2="19.07" y2="19.07" /><line x1="14.83" y1="9.17" x2="19.07" y2="4.93" /><line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
  </svg>
)
const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)
const IconHelp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)
const IconArrowLeft = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
)
const IconArrowRight = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
)
const IconDownload = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
)

// ── Données ───────────────────────────────────────────────────────────────────

const navItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: <IconDashboard /> },
  { id: 'new-requests', label: 'Nouvelles demandes', icon: <IconPlus /> },
  { id: 'waiting-queues', label: 'Files d\'attente', icon: <IconClock /> },
  { id: 'ticket-verification', label: 'Vérif. tickets', icon: <IconTicket /> },
  { id: 'history', label: 'Historique', icon: <IconHistory /> },
]

const timelineData = [
  {
    start: '14:30',
    end: '14:42',
    title: 'Urgences - Code Bleu',
    details: 'Patient ID: #88291 • Dr. Aris S.',
    status: 'Traité',
    statusType: 'success',
    icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    )
  },
  {
    start: '15:10',
    end: '15:25',
    title: 'Consultation Générale',
    details: 'Patient ID: #90212 • Station 4',
    status: 'Traité',
    statusType: 'success',
    icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.07 4h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 18.07 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
            <circle cx="12" cy="13" r="3" />
        </svg>
    )
  },
  {
    start: '15:45',
    end: '16:15',
    title: 'Radiologie & Imagerie',
    details: 'Patient ID: #11928 • Salle B',
    status: 'Retardé',
    statusType: 'warning',
    icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" />
            <line x1="12" y1="7" x2="12" y2="8" />
            <line x1="12" y1="16" x2="12" y2="17" />
            <line x1="7" y1="12" x2="8" y2="12" />
            <line x1="16" y1="12" x2="17" y2="12" />
        </svg>
    )
  },
  {
    start: '16:20',
    end: '16:30',
    title: 'Prélèvement Sanguin',
    details: 'Patient ID: #22109 • Labo 1',
    status: 'Traité',
    statusType: 'success',
    icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20" />
            <path d="M5 12h14" />
        </svg>
    )
  }
]

// ── Composant Principal ───────────────────────────────────────────────────────

export default function Historique() {
  const [activeNav, setActiveNav] = useState('history')
  const navigate = useNavigate()

  const handleNav = (id: string) => {
    setActiveNav(id)
    if (id === 'dashboard') navigate('/reception/dashboard')
    if (id === 'new-requests') navigate('/reception/requests')
    if (id === 'waiting-queues') navigate('/reception/waiting-queues')
    if (id === 'ticket-verification') navigate('/reception/ticket-verification')
    if (id === 'history') navigate('/reception/history')
  }

  return (
    <div className="app-shell">
      {/* ── Barre Latérale ── */}
      <aside className="sidebar">
        <div className="sidebar__brand">
          <div className="brand-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-name">Medilink</span>
            <span className="brand-sub">POSTE DE RÉCEPTION</span>
          </div>
        </div>

        <nav className="sidebar__nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeNav === item.id ? 'nav-item--active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              <span className="nav-item__icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar__emergency">
          <button className="btn-emergency" onClick={() => navigate('/reception/emergency-intake')}>
            Ajouter sur place
          </button>
        </div>

        <div className="sidebar__footer">
          <div className="sidebar__footer-box">
            <button className="footer-link" onClick={() => navigate('/reception/settings')}>
              <IconSettings /> <span>Paramètres</span>
            </button>
            <button className="footer-link" onClick={() => navigate('/reception/support')}>
              <IconSupport /> <span>Assistance</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Contenu Principal ── */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar__date">
            <span className="calendar-icon">📅</span> 24 Octobre 2023
          </div>

          <div className="topbar__search">
            <IconSearch />
            <input
              type="text"
              placeholder="Rechercher un flux..."
            />
          </div>

          <div className="topbar__actions">
            <button className="icon-btn" aria-label="Notifications" onClick={() => navigate('/reception/notifications')}><IconBell /></button>
            <button className="icon-btn" aria-label="Aide" onClick={() => navigate('/reception/help')}><IconHelp /></button>
            <div className="topbar__divider" />
            <div className="topbar__user">
              <div className="topbar__user-info">
                <span className="user-name">Jean Dupont</span>
                <span className="user-role">Réceptionniste</span>
              </div>
              <div className="user-avatar">JD</div>
            </div>
          </div>
        </header>

        {/* Corps de la page */}
        <div className="hist-body">
          <div className="hist-header">
            <h1 className="hist-title">Historique des Flux</h1>
            <p className="hist-subtitle">
              Consultez les archives des files d'attente pour analyser les performances cliniques et le temps de réponse des stations.
            </p>
          </div>

          <div className="hist-grid">
            {/* Colonne Gauche */}
            <div className="hist-left">
              {/* Sélecteur de date */}
              <div className="date-selector">
                <div className="date-selector__header">
                  <span className="date-selector__title">Sélecteur de date</span>
                  <div className="date-selector__arrows">
                    <button className="arrow-btn"><IconArrowLeft /></button>
                    <button className="arrow-btn"><IconArrowRight /></button>
                  </div>
                </div>
                <div className="calendar-grid">
                    <div className="calendar-day-label">LU</div>
                    <div className="calendar-day-label">MA</div>
                    <div className="calendar-day-label">ME</div>
                    <div className="calendar-day-label">JE</div>
                    <div className="calendar-day-label">VE</div>
                    <div className="calendar-day-label">SA</div>
                    <div className="calendar-day-label">DI</div>
                    
                    <div className="calendar-day calendar-day--muted">19</div>
                    <div className="calendar-day calendar-day--muted">20</div>
                    <div className="calendar-day calendar-day--muted">21</div>
                    <div className="calendar-day">22</div>
                    <div className="calendar-day">23</div>
                    <div className="calendar-day calendar-day--active">24</div>
                    <div className="calendar-day">25</div>
                    
                    <div className="calendar-day">26</div>
                    <div className="calendar-day">27</div>
                    <div className="calendar-day">28</div>
                    <div className="calendar-day">29</div>
                    <div className="calendar-day">30</div>
                    <div className="calendar-day">31</div>
                    <div className="calendar-day calendar-day--muted">1</div>
                </div>
              </div>

              {/* Résumé Card */}
              <div className="summary-card">
                <div className="summary-card__header">Résumé du 24 Octobre</div>
                <div className="summary-card__value">142 Patients</div>
                <div className="summary-card__footer">
                  <div className="summary-stat">
                    <span className="summary-stat__label">Temps moyen</span>
                    <span className="summary-stat__value">12 min</span>
                  </div>
                  <div className="summary-stat">
                    <span className="summary-stat__label">Satisfaction</span>
                    <span className="summary-stat__value">4.8/5</span>
                  </div>
                </div>
                {/* Graphique décoratif */}
                <div className="summary-card__graph">
                    <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                        <path d="M0 40 Q 25 35, 50 20 T 100 10 L 100 40 L 0 40 Z" fill="rgba(255,255,255,0.15)" />
                        <path d="M0 40 Q 25 35, 50 20 T 100 10" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                    </svg>
                </div>
              </div>
            </div>

            {/* Colonne Droite */}
            <div className="hist-right">
              <div className="flux-header">
                <div className="flux-title-block">
                  <h2 className="flux-title">Flux détaillé</h2>
                  <p className="flux-subtitle">Chronologie des admissions et passages</p>
                </div>
                <button className="export-btn">
                  <IconDownload /> Exporter PDF
                </button>
              </div>

              <div className="timeline">
                {timelineData.map((item, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-time">
                      <div className="time-start">{item.start}</div>
                      <div className="time-line" />
                      <div className="time-end">{item.end}</div>
                    </div>
                    
                    <div className="timeline-content-wrapper">
                        <div className="timeline-icon-box">
                            {item.icon}
                        </div>
                        <div className="timeline-content">
                            <div className="timeline-main">
                                <div className="timeline-text">
                                    <h3 className="timeline-item-title">{item.title}</h3>
                                    <p className="timeline-item-details">{item.details}</p>
                                </div>
                                <span className={`timeline-status timeline-status--${item.statusType}`}>
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="pagination">
                <button className="pag-arrow"><IconArrowLeft /></button>
                <button className="pag-btn pag-btn--active">1</button>
                <button className="pag-btn">2</button>
                <button className="pag-btn">3</button>
                <button className="pag-arrow"><IconArrowRight /></button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './FilesAttente.css'

// ── Icons ──────────────────────────────────────────────────────────────────────
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
const IconQueue = () => (
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
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" />
    <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" /><line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
    <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" /><line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
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
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)
const IconAlert = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

// ── Data ───────────────────────────────────────────────────────────────────────

const navItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: <IconDashboard /> },
  { id: 'new-requests', label: 'Nouvelles demandes', icon: <IconPlus /> },
  { id: 'waiting-queues', label: 'Files d\'attente', icon: <IconQueue /> },
  { id: 'ticket-verification', label: 'Vérif. tickets', icon: <IconTicket /> },
  { id: 'history', label: 'Historique', icon: <IconHistory /> },
]

type Status = 'normal' | 'busy' | 'quiet' | 'high-load'

type Department = {
  id: string
  name: string
  location: string
  count: number
  status: Status
  iconColor: string
  iconBg: string
  icon: React.ReactNode
  highlighted?: boolean
}

const statusLabel: Record<Status, string> = {
  normal: 'NORMAL',
  busy: 'CHARGÉ',
  quiet: 'CALME',
  'high-load': 'SURCHARGÉ',
}

const departments: Department[] = [
  {
    id: '1', name: 'Cardiologie', location: 'Étage 2, Aile Nord',
    count: 24, status: 'normal', iconBg: '#eff6ff', iconColor: '#2563eb',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    id: '2', name: 'Dermatologie', location: 'Étage 1, Aile Est',
    count: 41, status: 'busy', iconBg: '#fff7ed', iconColor: '#ea580c',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: '3', name: 'Neurologie', location: 'Étage 3, Zone Grise',
    count: 12, status: 'normal', iconBg: '#f5f3ff', iconColor: '#7c3aed',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    id: '4', name: 'Pédiatrie', location: 'Étage 0, Aile Ouest',
    count: 8, status: 'quiet', iconBg: '#f0fdf4', iconColor: '#16a34a',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" /><path d="M6 20v-2a6 6 0 0 1 12 0v2" />
      </svg>
    ),
  },
  {
    id: '5', name: 'Ophtalmologie', location: 'Étage 1, Aile Sud',
    count: 19, status: 'normal', iconBg: '#fdf2f8', iconColor: '#db2777',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#db2777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: '6', name: 'Radiologie', location: 'Sous-sol, Zone Imagerie',
    count: 38, status: 'high-load', iconBg: '#eff6ff', iconColor: '#2563eb',
    highlighted: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="12" r="3" />
        <line x1="3" y1="12" x2="9" y2="12" /><line x1="15" y1="12" x2="21" y2="12" />
      </svg>
    ),
  },
]

const trafficTimes = [
  { time: '09:00', level: 'Critique', pct: 85, color: '#2563eb' },
  { time: '11:00', level: 'Modéré', pct: 50, color: '#60a5fa' },
  { time: '13:00', level: 'Optimal', pct: 20, color: '#cbd5e1' },
]

// ── Component ──────────────────────────────────────────────────────────────────

export default function WaitingQueues() {
  const [activeNav, setActiveNav] = useState('waiting-queues')
  const navigate = useNavigate()

  const handleNav = (id: string) => {
    setActiveNav(id)
    if (id === 'dashboard') navigate('/dashboard')
    if (id === 'new-requests') navigate('/requests')
    if (id === 'waiting-queues') navigate('/waiting-queues')
    if (id === 'ticket-verification') navigate('/ticket-verification')
  }

  return (
    <div className="app-shell">
      {/* ── Sidebar ── */}
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
          <button className="btn-emergency">✱ Emergency Intake</button>
        </div>

        <div className="sidebar__footer">
          <button className="footer-link"><IconSettings /> Paramètres</button>
          <button className="footer-link"><IconSupport /> Assistance</button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar__station">
            <span className="station-id">Station A-12</span>
            <span className="topbar__sep">·</span>
            <span className="topbar__date">24 octobre 2023</span>
          </div>
          <div className="topbar__actions">
            <button className="icon-btn" aria-label="Notifications">
              <IconBell />
              <span className="notif-dot" />
            </button>
            <button className="icon-btn" aria-label="Aide"><IconHelp /></button>
            <div className="topbar__divider" />
            <div className="topbar__user">
              <div className="topbar__user-info">
                <span className="user-name">Dr. Aris Thorne</span>
                <span className="user-role">Superviseur</span>
              </div>
              <div className="user-avatar">AT</div>
            </div>
          </div>
        </header>

        {/* Page body */}
        <div className="page-body">

          {/* Hero + mini stats */}
          <div className="wq-hero">
            <div className="wq-hero__text">
              <h1 className="page-title">Files d'attente</h1>
              <p className="page-subtitle">
                Vue en direct de la circulation des patients dans les services.<br />
                Priorisation du flux et clarté clinique.
              </p>
            </div>
            <div className="wq-hero__stats">
              <div className="wq-hero-stat">
                <span className="wq-hero-stat__label">TOTAL PATIENTS</span>
                <span className="wq-hero-stat__value">142</span>
              </div>
              <div className="wq-hero-stat wq-hero-stat--muted">
                <span className="wq-hero-stat__label">ATTENTE MOY.</span>
                <span className="wq-hero-stat__value">18 min</span>
              </div>
            </div>
          </div>

          {/* Department grid */}
          <div className="dept-grid">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className={`dept-card ${dept.highlighted ? 'dept-card--highlighted' : ''}`}
                onClick={() => navigate(`/waiting-queues/${dept.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="dept-card__top">
                  <div className="dept-card__icon" style={{ background: dept.iconBg }}>
                    {dept.icon}
                  </div>
                  <span className={`dept-status dept-status--${dept.status}`}>
                    {statusLabel[dept.status]}
                  </span>
                </div>
                <div className="dept-card__name">{dept.name}</div>
                <div className="dept-card__location">{dept.location}</div>
                <div className="dept-card__bottom">
                  <div>
                    <span className="dept-card__count">{String(dept.count).padStart(2, '0')}</span>
                    <span className="dept-card__unit"> personnes</span>
                  </div>
                  <button
                    className={`dept-card__btn ${dept.highlighted ? 'dept-card__btn--primary' : ''}`}
                    onClick={(e) => { e.stopPropagation(); navigate(`/waiting-queues/${dept.id}`) }}
                  >
                    {dept.highlighted ? 'Détails' : <IconArrow />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Peak traffic */}
          <div className="traffic-section">
            <div className="traffic-section__header">
              <h2 className="traffic-title">Heures de pointe</h2>
              <span className="live-badge">ANALYSE EN DIRECT</span>
            </div>
            <div className="traffic-bars">
              {trafficTimes.map((t) => (
                <div key={t.time} className="traffic-row">
                  <span className="traffic-time">{t.time}</span>
                  <div className="traffic-bar-track">
                    <div
                      className="traffic-bar-fill"
                      style={{ width: `${t.pct}%`, background: t.color }}
                    />
                  </div>
                  <span className="traffic-level">{t.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Staffing alert */}
          <div className="staffing-section">
            <h2 className="staffing-title">Alerte Personnel</h2>
            <div className="staffing-card">
              <div className="staffing-card__icon"><IconAlert /></div>
              <div className="staffing-card__body">
                <p className="staffing-card__text">
                  <strong>Radiologie & Dermatologie</strong> dépassent la capacité de base.
                </p>
                <p className="staffing-card__sub">
                  Envisagez de réaffecter des infirmiers volants à l'Aile Est pour gérer l'augmentation de <span className="highlight-pct">22%</span> des arrivées.
                </p>
                <button className="staffing-card__link">VOIR LES SUGGESTIONS D'ALLOCATION →</button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

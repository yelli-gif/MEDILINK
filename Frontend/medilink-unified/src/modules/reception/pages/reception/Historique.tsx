import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Historique.css'

// ── Icônes ───────────────────────────────────────────────────────────────────

const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

const navItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: <IconDashboard /> },
  { id: 'new-requests', label: 'Nouvelles demandes', icon: <IconPlus /> },
  { id: 'waiting-queues', label: 'Files d\'attente', icon: <IconQueue /> },
  { id: 'ticket-verification', label: 'Vérif. tickets', icon: <IconTicket /> },
  { id: 'history', label: 'Historique', icon: <IconHistory /> },
]

// ── Types ────────────────────────────────────────────────────────────────────

type HistoryItem = {
  id: string
  time: string
  patientName: string
  patientId: string
  serviceName: string
  staffName: string
  status: 'completed' | 'delayed' | 'cancelled'
  icon: React.ReactNode
}

// ── Composant Principal ───────────────────────────────────────────────────────

export default function History() {
  const [activeNav, setActiveNav] = useState('history')
  const [search, setSearch] = useState('')
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [userProfile, setUserProfile] = useState<any>(null)
  
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('medilink_user')
    if (storedUser) {
      setUserProfile(JSON.parse(storedUser))
    }
  }, [])

  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
    return new Date(dateStr).toLocaleDateString('fr-FR', options)
  }

  const handleNav = (id: string) => {
    if (id === 'dashboard') navigate('/reception/dashboard')
    if (id === 'new-requests') navigate('/reception/requests')
    if (id === 'waiting-queues') navigate('/reception/waiting-queues')
    if (id === 'ticket-verification') navigate('/reception/ticket-verification')
    if (id === 'history') navigate('/reception/history')
  }

  const getStatusLabel = (status: HistoryItem['status']) => {
    switch (status) {
      case 'completed': return 'TRAITÉ'
      case 'delayed': return 'RETARDÉ'
      case 'cancelled': return 'ANNULÉ'
      default: return 'INCONNU'
    }
  }

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
            <span className="hi-brand-sub">POSTE DE RÉCEPTION</span>
          </div>
        </div>

        <nav className="hi-sidebar__nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`hi-nav-item ${activeNav === item.id ? 'hi-nav-item--active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              <span className="hi-nav-item__icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hi-sidebar__emergency">
          <button className="hi-btn-emergency" onClick={() => navigate('/reception/emergency-intake')}>
            Ajouter sur place
          </button>
        </div>

        <div className="hi-sidebar__footer">
          <div className="hi-sidebar__footer-box">
            <button className="hi-footer-link" onClick={() => navigate('/reception/settings')}>
              <IconSettings /> <span>Paramètres</span>
            </button>
            <button className="hi-footer-link" onClick={() => navigate('/reception/support')}>
              <IconSupport /> <span>Assistance</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="hi-main-content">
        <header className="hi-topbar">
          <div className="hi-topbar__date" style={{ position: 'relative', cursor: 'pointer' }}>
            <span onClick={() => (document.getElementById('hist-date-picker') as HTMLInputElement)?.showPicker()}>
              {formatDate(selectedDate)}
            </span>
            <input 
              id="hist-date-picker"
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ 
                position: 'absolute', 
                opacity: 0, 
                pointerEvents: 'none',
                width: 0,
                height: 0
              }} 
            />
          </div>

          <div className="hi-topbar__search">
            <IconSearch />
            <input
              type="text"
              placeholder="Rechercher un flux..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="hi-topbar__actions">
            <button className="hi-icon-btn" onClick={() => navigate('/reception/notifications')}><IconBell /></button>
            <button className="hi-icon-btn" onClick={() => navigate('/reception/help')}><IconHelp /></button>
            <div className="hi-topbar__divider" />
            <div className="hi-topbar__user" onClick={() => navigate('/connexion')} style={{ cursor: 'pointer' }}>
              <div className="hi-topbar__user-info">
                <span className="hi-user-name">{userProfile?.name || 'Chargement...'}</span>
                <span className="hi-user-role">Réceptionniste</span>
              </div>
              <div className="hi-user-avatar">{userProfile?.name?.substring(0,2).toUpperCase() || '...'}</div>
            </div>
          </div>
        </header>

        <div className="hi-page-body">
          <div className="hi-page-header">
            <h1 className="hi-page-title">Historique des Flux</h1>
            <p className="hi-page-subtitle">
              Consultez les archives des files d'attente pour analyser les performances cliniques et le temps de réponse des stations.
            </p>
          </div>

          <div className="hi-history-layout">
            <div className="hi-date-sidebar">
               <div className="hi-calendar-mini">
                  <div className="hi-calendar-header">
                    <span className="hi-month">Avril 2026</span>
                  </div>
                  {/* Calendar placeholder grid */}
                  <div className="hi-calendar-grid">
                    {/* Visual markers for selected date */}
                  </div>
               </div>

               <div className="hi-summary-card">
                  <span className="hi-summary-label">Résumé du {formatDate(selectedDate)}</span>
                  <div className="hi-summary-value">{history.length} Patients</div>
                  <div className="hi-summary-stats">
                    <div className="hi-sub-stat">Temps moyen: <span>-- min</span></div>
                    <div className="hi-sub-stat">Satisfaction: <span>--/5</span></div>
                  </div>
               </div>
            </div>

            <div className="hi-history-main">
              <div className="hi-history-header">
                <h2 className="hi-section-title">Flux détaillé</h2>
                <button className="hi-btn-export">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Exporter PDF
                </button>
              </div>

              {history.length === 0 ? (
                <div className="hi-empty-state-history">
                   <div className="hi-empty-icon">
                      <IconHistory />
                   </div>
                   <p>Aucun flux enregistré pour cette date.</p>
                </div>
              ) : (
                <div className="hi-timeline">
                  {history.map(item => (
                    <div key={item.id} className="hi-timeline-item">
                      <div className="hi-timeline-time">{item.time}</div>
                      <div className="hi-timeline-content">
                        <div className="hi-timeline-icon">{item.icon}</div>
                        <div className="hi-timeline-info">
                          <div className="hi-timeline-title">{item.serviceName}</div>
                          <div className="hi-timeline-meta">Patient ID: #{item.patientId} • {item.staffName}</div>
                        </div>
                        <div className={`hi-timeline-status hi-status--${item.status}`}>
                          {getStatusLabel(item.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="hi-pagination">
                <button className="hi-page-btn" disabled>&lt;</button>
                <button className="hi-page-btn hi-page-btn--active">1</button>
                <button className="hi-page-btn" disabled>&gt;</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

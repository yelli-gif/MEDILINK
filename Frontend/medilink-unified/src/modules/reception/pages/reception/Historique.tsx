import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { rendezVousAPI } from '../../../../services/api'
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
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
const IconChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)
const IconChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

// ── Types ────────────────────────────────────────────────────────────────────

type Entry = {
  id: string
  time: string
  patient: string
  doctor: string
  service: string
  status: 'success' | 'warning'
}

const navItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: <IconDashboard /> },
  { id: 'new-requests', label: 'Nouvelles demandes', icon: <IconPlus /> },
  { id: 'waiting-queues', label: "Files d'attente", icon: <IconQueue /> },
  { id: 'ticket-verification', label: 'Vérif. tickets', icon: <IconTicket /> },
  { id: 'history', label: 'Historique', icon: <IconHistory /> },
]

export default function History() {
  const [activeNav] = useState('history')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [historyData, setHistoryData] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<any>(null)
  
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('medilink_user')
    if (storedUser) setUserProfile(JSON.parse(storedUser))
  }, [])

  useEffect(() => {
    if (userProfile) {
      const hId = userProfile.hopitalId || userProfile.personnelId || userProfile.id;
      if (hId) fetchHistory(parseInt(hId.toString()))
    }
  }, [userProfile, selectedDate])

  const fetchHistory = async (hopitalId: number) => {
    try {
      setLoading(true)
      const data = await rendezVousAPI.parHopital(hopitalId)
      const dateStr = selectedDate.toISOString().split('T')[0]
      
      const mapped: Entry[] = data
        .filter((rdv: any) => rdv.date === dateStr && (rdv.statut === 'TERMINE' || rdv.statut === 'TRAITE' || rdv.statut === 'ACCEPTE'))
        .map((rdv: any) => ({
          id: rdv.id.toString(),
          time: rdv.heure ? rdv.heure.substring(0, 5) : '--:--',
          patient: rdv.patient ? `${rdv.patient.prenom} ${rdv.patient.nom}` : 'Patient Inconnu',
          doctor: rdv.medecinName || 'Station 4',
          service: rdv.service?.nom || 'Général',
          status: rdv.statut === 'TERMINE' ? 'success' : 'warning'
        }))
      setHistoryData(mapped)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleNav = (id: string) => {
    if (id === 'dashboard') navigate('/reception/dashboard')
    if (id === 'new-requests') navigate('/reception/requests')
    if (id === 'waiting-queues') navigate('/reception/waiting-queues')
    if (id === 'ticket-verification') navigate('/reception/ticket-verification')
    if (id === 'history') navigate('/reception/history')
  }

  const changeMonth = (offset: number) => {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + offset, 1)
    setSelectedDate(newDate)
  }

  // Génération des jours du mois pour le calendrier
  const renderCalendarDays = () => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    
    const days = []
    // Jours vides au début
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day calendar-day--muted"></div>)
    }
    // Jours du mois
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === selectedDate.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
      const isSelected = d === selectedDate.getDate()
      days.push(
        <div 
          key={d} 
          className={`calendar-day ${isSelected ? 'calendar-day--active' : ''} ${isToday ? 'calendar-day--today' : ''}`}
          onClick={() => setSelectedDate(new Date(year, month, d))}
        >
          {d}
        </div>
      )
    }
    return days
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
          <button className="hi-btn-emergency" onClick={() => navigate('/reception/requests')}>
            Ajouter sur place
          </button>
        </div>

        <div className="hi-sidebar__footer">
          <div className="hi-footer-box">
            <button className="hi-footer-link" onClick={() => navigate('/reception/settings')}>
              <IconSettings /> <span>Paramètres</span>
            </button>
            <button className="hi-footer-link" onClick={() => navigate('/reception/support')}>
              <IconSupport /> <span>Assistance</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="hi-main">
        <header className="hi-topbar">
          <div className="hi-date-badge">
             {selectedDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>

          <div className="hi-topbar__search">
            <IconSearch />
            <input type="text" placeholder="Rechercher dans l'historique..." />
          </div>

          <div className="hi-topbar__actions">
            <button className="hi-notif-btn"><IconBell /></button>
            <button className="hi-notif-btn"><IconHelp /></button>
            <div style={{ width: '1px', height: '24px', background: '#e2e8f0', margin: '0 8px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'right' }}>
                <div className="hi-user-name">{userProfile?.name || 'Chargement...'}</div>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>Réceptionniste</div>
              </div>
              <div className="hi-user-circle">
                {userProfile?.name?.substring(0,2).toUpperCase() || 'JD'}
              </div>
            </div>
          </div>
        </header>

        <div className="hi-page-body">
          <div className="hi-page-header">
            <h1 className="hi-page-title">Historique des flux</h1>
            <p className="hi-page-subtitle">Consultez l'activité passée et les statistiques de fréquentation.</p>
          </div>

          <div className="hist-grid">
            <div className="hist-left">
              <div className="date-selector">
                <div className="date-selector__header">
                  <span className="date-selector__title">
                    {selectedDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }).toUpperCase()}
                  </span>
                  <div className="date-selector__arrows">
                    <button className="arrow-btn" onClick={() => changeMonth(-1)}><IconChevronLeft /></button>
                    <button className="arrow-btn" onClick={() => changeMonth(1)}><IconChevronRight /></button>
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
                  {renderCalendarDays()}
                </div>
              </div>

              <div className="summary-card">
                <div className="summary-card__header">FLUX DU JOUR</div>
                <div className="summary-card__value">{historyData.length}</div>
                <div className="summary-card__footer">
                  <div className="summary-stat">
                    <span className="summary-stat__label">ATTENTE MOY.</span>
                    <span className="summary-stat__value">12 min</span>
                  </div>
                  <div className="summary-stat">
                    <span className="summary-stat__label">SATISFACTION</span>
                    <span className="summary-stat__value">98%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hist-right">
              <div className="flux-header">
                <h2 className="flux-title">Timeline d'activité</h2>
                <button className="export-btn">Exporter PDF</button>
              </div>
              
              <div className="timeline">
                {loading ? (
                  <div className="loading-state">Chargement...</div>
                ) : historyData.length === 0 ? (
                  <div className="loading-state">Aucune activité enregistrée pour cette date.</div>
                ) : (
                  historyData.map((entry) => (
                    <div key={entry.id} className="timeline-item">
                      <div className="timeline-time">
                        <span className="time-start">{entry.time}</span>
                        <div className="time-line"></div>
                      </div>
                      <div className="timeline-content-wrapper">
                        <div className="timeline-icon-box">
                          <IconHistory />
                        </div>
                        <div className="timeline-content">
                          <div className="timeline-main">
                            <h3 className="timeline-item-title">{entry.patient}</h3>
                            <span className={`timeline-status timeline-status--${entry.status}`}>
                              {entry.status === 'success' ? 'TERMINÉ' : 'ADMIS'}
                            </span>
                          </div>
                          <p className="timeline-item-details">{entry.doctor} • {entry.service}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

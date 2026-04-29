import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { serviceAPI } from '../../../../services/api'
import './FilesAttente.css'

const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

// ── Icônes ───────────────────────────────────────────────────────────────────
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

// ── Données ───────────────────────────────────────────────────────────────────

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

const trafficTimes = [
  { time: '09:00', level: 'Critique', pct: 85, color: '#2563eb' },
  { time: '11:00', level: 'Modéré', pct: 50, color: '#60a5fa' },
  { time: '13:00', level: 'Optimal', pct: 20, color: '#cbd5e1' },
]

// ── Composant Principal ───────────────────────────────────────────────────────

export default function WaitingQueues() {
  const [activeNav, setActiveNav] = useState('waiting-queues')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [departmentsList, setDepartmentsList] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<any>(null)
  
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('medilink_user')
    console.log('[DEBUG] FilesAttente - User from localStorage:', storedUser)
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      setUserProfile(parsed)
      
      const rawId = parsed.hopitalId || parsed.medecinId || parsed.personnelId || parsed.id;
      const hId = rawId ? parseInt(rawId.toString()) : null;
      console.log('[DEBUG] FilesAttente - Robust Detected HopitalId:', hId)

      if (hId && !isNaN(hId)) {
        fetchServices(hId)
      } else {
        console.warn('[DEBUG] FilesAttente - No valid HopitalId found. User profile:', parsed)
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [])

  const fetchServices = async (hopitalId: number) => {
    try {
      console.log('[DEBUG] FilesAttente - Fetching services for HopitalId:', hopitalId)
      const data = await serviceAPI.listerTous(hopitalId)
      console.log('[DEBUG] FilesAttente - Services received:', data)
      const mapped: Department[] = data.map((s: any, idx: number) => ({
        id: s.id.toString(),
        name: s.nom,
        location: s.description || `Aile ${idx % 2 === 0 ? 'Nord' : 'Sud'}, Niveau ${Math.floor(idx/2) + 1}`,
        count: 0, // Sera dynamisé avec l'API de file d'attente plus tard
        status: idx % 3 === 0 ? 'busy' : idx % 4 === 0 ? 'quiet' : 'normal',
        iconBg: idx % 2 === 0 ? '#eff6ff' : '#f5f3ff',
        iconColor: idx % 2 === 0 ? '#2563eb' : '#7c3aed',
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={idx % 2 === 0 ? '#2563eb' : '#7c3aed'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        ),
      }))
      setDepartmentsList(mapped)
    } catch (err) {
      console.error('Erreur fetch services:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
    return new Date(dateStr).toLocaleDateString('fr-FR', options)
  }

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
          <div className="topbar__date" style={{ position: 'relative', cursor: 'pointer' }}>
            <span onClick={() => (document.getElementById('wq-date-picker') as HTMLInputElement)?.showPicker()}>
              {formatDate(selectedDate)}
            </span>
            <input 
              id="wq-date-picker"
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

          <div className="topbar__search">
            <IconSearch />
            <input
              type="text"
              placeholder="Rechercher un patient ou un service..."
            />
          </div>

          <div className="topbar__actions">
            <button className="icon-btn" aria-label="Notifications" onClick={() => navigate('/reception/notifications')}>
              <IconBell />
              <span className="notif-dot" />
            </button>
            <button className="icon-btn" aria-label="Aide" onClick={() => navigate('/reception/help')}><IconHelp /></button>
            <div className="topbar__divider" />
            <div className="topbar__user">
              <div className="topbar__user-info">
                <span className="user-name">{userProfile?.name || 'Utilisateur'}</span>
                <span className="user-role">{userProfile?.role === 'ACCUEIL' ? 'Réceptionniste' : userProfile?.role || 'Personnel'}</span>
              </div>
              <div className="user-avatar">{userProfile?.name?.substring(0, 2).toUpperCase() || 'U'}</div>
            </div>
          </div>
        </header>

        {/* Corps de la page */}
        <div className="page-body">

          {/* Hero + mini stats */}
          <div className="wq-hero">
            <div className="wq-hero__text">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                <h1 className="page-title" style={{ margin: 0 }}>Files d'attente</h1>
                <button 
                  className="wq-add-btn-circle" 
                  onClick={() => navigate('/reception/requests')}
                  title="Ajouter une nouvelle demande"
                >
                  <IconPlus />
                </button>
              </div>
              <p className="page-subtitle">
                Vue en direct de la circulation des patients dans les services de votre établissement.<br />
                Priorisation du flux et clarté clinique.
              </p>
            </div>
            <div className="wq-hero__stats">
              <div className="wq-hero-stat">
                <span className="wq-hero-stat__label">TOTAL PATIENTS</span>
                <span className="wq-hero-stat__value">{departmentsList.reduce((acc, curr) => acc + curr.count, 0)}</span>
              </div>
              <div className="wq-hero-stat wq-hero-stat--muted">
                <span className="wq-hero-stat__label">ATTENTE MOY.</span>
                <span className="wq-hero-stat__value">-- min</span>
              </div>
            </div>
          </div>

          {/* Grille des départements */}
          <div className="dept-grid">
            {loading ? (
              <div className="bg-white rounded-3xl p-20 text-center w-full col-span-3">
                Chargement des services...
              </div>
            ) : departmentsList.length === 0 ? (
              <div className="bg-white rounded-3xl p-20 text-center w-full col-span-3">
                Aucun service trouvé pour cet établissement.
              </div>
            ) : (
              departmentsList.map((dept) => (
                <div
                  key={dept.id}
                  className={`dept-card ${dept.highlighted ? 'dept-card--highlighted' : ''}`}
                  onClick={() => navigate(`/reception/waiting-queues/${dept.id}`)}
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
                      onClick={(e) => { e.stopPropagation(); navigate(`/reception/waiting-queues/${dept.id}`) }}
                    >
                      {dept.highlighted ? 'Détails' : <IconArrow />}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Heures de pointe */}
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

          {/* Alerte Personnel */}
          <div className="staffing-section">
            <h2 className="staffing-title">Alerte Personnel</h2>
            <div className="staffing-card">
              <div className="staffing-card__icon"><IconAlert /></div>
              <div className="staffing-card__body">
                <p className="staffing-card__text">
                  <strong>Flux de patients</strong> - Analyse en temps réel de votre établissement.
                </p>
                <p className="staffing-card__sub">
                  Le système surveille automatiquement les dépassements de capacité pour vous alerter.
                </p>
                <button className="staffing-card__link" onClick={() => navigate('/reception/allocation-suggestions')}>VOIR LES SUGGESTIONS D'ALLOCATION →</button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}


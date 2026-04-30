import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { serviceAPI, rendezVousAPI } from '../../../../services/api'
import './FilesAttente.css'

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
const IconAlert = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)

// ── Types ────────────────────────────────────────────────────────────────────

type Department = {
  id: string
  name: string
  location: string
  count: number
  status: 'normal' | 'busy' | 'quiet' | 'high-load'
  iconBg: string
  iconColor: string
}

const navItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: <IconDashboard /> },
  { id: 'new-requests', label: 'Nouvelles demandes', icon: <IconPlus /> },
  { id: 'waiting-queues', label: "Files d'attente", icon: <IconQueue /> },
  { id: 'ticket-verification', label: 'Vérif. tickets', icon: <IconTicket /> },
  { id: 'history', label: 'Historique', icon: <IconHistory /> },
]

export default function WaitingQueues() {
  const [activeNav] = useState('waiting-queues')
  const [departmentsList, setDepartmentsList] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('medilink_user')
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      setUserProfile(parsed)
      const hId = parsed.hopitalId || parsed.personnelId || parsed.id
      if (hId) fetchServices(parseInt(hId.toString()))
    }
  }, [])

  const fetchServices = async (hopitalId: number) => {
    try {
      const services = await serviceAPI.listerTous(hopitalId)
      const allRdv = await rendezVousAPI.parHopital(hopitalId)
      const today = new Date().toISOString().split('T')[0]

      const mapped: Department[] = services.map((s: any, idx: number) => {
        const count = allRdv.filter((r: any) => 
          r.service?.id === Number(s.id) && 
          r.date === today &&
          (r.statut === 'EN_ATTENTE' || r.statut === 'ARRIVE')
        ).length

        return {
          id: s.id.toString(),
          name: s.nom,
          location: s.description || `Aile ${idx % 2 === 0 ? 'Nord' : 'Sud'}`,
          count: count,
          status: count > 10 ? 'high-load' : count > 5 ? 'busy' : count > 0 ? 'normal' : 'quiet',
          iconBg: idx % 2 === 0 ? '#eff6ff' : '#f5f3ff',
          iconColor: idx % 2 === 0 ? '#2563eb' : '#7c3aed',
        }
      })
      setDepartmentsList(mapped)
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
             {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>

          <div className="hi-topbar__search">
            <IconSearch />
            <input type="text" placeholder="Rechercher un flux..." />
          </div>

          <div className="hi-topbar__actions">
            <button className="hi-notif-btn"><IconBell /></button>
            <button className="hi-notif-btn"><IconHelp /></button>
            <div style={{ width: '1px', height: '24px', background: '#e2e8f0', margin: '0 8px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'right' }}>
                <div className="hi-user-name">{userProfile?.name || 'Utilisateur'}</div>
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
            <h1 className="hi-page-title">Files d'attente</h1>
            <p className="hi-page-subtitle">Vue en direct de la circulation des patients dans les services.</p>
          </div>

          <div className="dept-grid">
            {loading ? (
              <div className="loading-state">Chargement des services...</div>
            ) : departmentsList.length === 0 ? (
              <div className="loading-state">Aucun service trouvé.</div>
            ) : (
              departmentsList.map((dept) => (
                <div key={dept.id} className="dept-card" onClick={() => navigate(`/reception/waiting-queues/${dept.id}`)}>
                  <div className="dept-card__top">
                    <div className="dept-card__icon" style={{ background: dept.iconBg }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={dept.iconColor} strokeWidth="2">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </div>
                    <span className={`dept-status dept-status--${dept.status}`}>{dept.status.toUpperCase()}</span>
                  </div>
                  <div className="dept-card__name">{dept.name}</div>
                  <div className="dept-card__location">{dept.location}</div>
                  <div className="dept-card__bottom">
                    <div>
                      <span className="dept-card__count">{dept.count}</span>
                      <span className="dept-card__unit"> personnes</span>
                    </div>
                    <button className="dept-card__btn"><IconArrow /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

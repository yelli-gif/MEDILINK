import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { rendezVousAPI, accueilAPI } from '../../../../services/api'
import './NouvellesDemandes.css'

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

type Request = {
  id: string
  patientName: string
  urgency: 'urgent' | 'normal'
  serviceId: number
  serviceName: string
  time: string
  description: string
  rendezVousId: number
}

// ── Composants internes ──────────────────────────────────────────────────────

function StatCard({ label, value, sub, subColor, badge }: { label: string; value: string; sub?: string; subColor?: string; badge?: string }) {
  return (
    <div className="hi-stat-card">
      <div className="hi-stat-card__label">
        {label}
        {badge && <span className="hi-stat-card__badge">{badge}</span>}
      </div>
      <div className="hi-stat-card__value">{value}</div>
      {sub && <div className="hi-stat-card__sub" style={{ color: subColor }}>{sub}</div>}
    </div>
  )
}

// ── Composant Principal ───────────────────────────────────────────────────────

export default function NewRequests() {
  const [activeNav, setActiveNav] = useState('new-requests')
  const [search, setSearch] = useState('')
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [isValidating, setIsValidating] = useState<string | null>(null)
  const [lastTicket, setLastTicket] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('medilink_user')
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      setUserProfile(parsed)
      
      const hId = parsed.hopitalId || parsed.medecinId || parsed.personnelId || parsed.id;
      if (hId) {
        fetchAppointments(parseInt(hId.toString()))
      } else {
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [])

  const fetchAppointments = async (hopitalId: number) => {
    try {
      setLoading(true)
      const data = await rendezVousAPI.parHopital(hopitalId)
      
      // On filtre pour ne garder que les RDV du jour
      const today = new Date().toISOString().split('T')[0]
      const mapped: Request[] = data
        .filter((rdv: any) => rdv.date === today)
        .map((rdv: any) => ({
          id: rdv.id.toString(),
          patientName: rdv.patient ? `${rdv.patient.prenom} ${rdv.patient.nom}` : 'Patient Inconnu',
          urgency: rdv.description?.toLowerCase().includes('urgent') ? 'urgent' : 'normal',
          serviceId: rdv.service?.id || 0,
          serviceName: rdv.service?.nom || 'Service Inconnu',
          time: rdv.heure.substring(0, 5),
          description: rdv.description || 'Consultation planifiée',
          rendezVousId: rdv.id
        }))
      setRequests(mapped)
    } catch (err) {
      console.error('Erreur fetch RDV:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleValidate = async (request: Request) => {
    setIsValidating(request.id)
    try {
      // Appel API pour marquer l'arrivée et générer le ticket
      const ticket = await accueilAPI.arriveePatient(request.rendezVousId, request.serviceId)
      setLastTicket({
        ...ticket,
        patientName: request.patientName,
        serviceName: request.serviceName,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      })
      
      // Retirer de la liste
      setRequests(prev => prev.filter(r => r.id !== request.id))
    } catch (err) {
      console.error('Erreur validation:', err)
      alert('Erreur lors de la validation du patient.')
    } finally {
      setIsValidating(null)
    }
  }

  const filtered = requests.filter(r => 
    r.patientName.toLowerCase().includes(search.toLowerCase()) ||
    r.serviceName.toLowerCase().includes(search.toLowerCase())
  )

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
            <span onClick={() => (document.getElementById('nd-date-picker') as HTMLInputElement)?.showPicker()}>
              {formatDate(selectedDate)}
            </span>
            <input 
              id="nd-date-picker"
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
              placeholder="Rechercher un dossier patient..."
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
            <h1 className="hi-page-title">Nouvelles Demandes</h1>
            <p className="hi-page-subtitle">
              Validez les demandes de services médicaux entrantes et générez les tickets patients.
            </p>
          </div>

          <div className="hi-stats-grid">
            <StatCard 
              label="TOTAL EN ATTENTE" 
              value={String(requests.length).padStart(2, '0')} 
              sub="Rendez-vous du jour" 
              subColor="#3b82f6" 
            />
            <StatCard 
              label="CAS URGENTS" 
              value={String(requests.filter(r => r.urgency === 'urgent').length).padStart(2, '0')} 
              badge={requests.filter(r => r.urgency === 'urgent').length > 0 ? "Action requise" : "Aucun"} 
            />
            <StatCard 
              label="FLUX STANDARD" 
              value={String(requests.filter(r => r.urgency === 'normal').length).padStart(2, '0')} 
              sub="En attente de validation" 
            />
          </div>

          <div className="hi-content-layout">
            <div className="hi-requests-list">
              <div className="hi-list-header">
                <h2 className="hi-section-title">En attente de validation</h2>
                <div className="hi-list-filters">
                   <button className="hi-filter-pill hi-filter-pill--active">Priorité</button>
                   <button className="hi-filter-pill">Heure</button>
                </div>
              </div>
              
              {loading ? (
                <div className="hi-empty-state">
                  <p>Chargement des demandes...</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="hi-empty-state">
                  <p>Aucune nouvelle demande pour le moment.</p>
                </div>
              ) : (
                filtered.map(req => (
                   <div key={req.id} className="hi-request-card">
                    <div className="hi-request-card__avatar">
                      <span>{req.patientName.substring(0, 1)}</span>
                      {req.urgency === 'urgent' && <div className="hi-urgency-indicator" />}
                    </div>
                    <div className="hi-request-card__info">
                      <div className="hi-request-header">
                        <span className="hi-request-name">{req.patientName}</span>
                        {req.urgency === 'urgent' && <span className="hi-tag-urgent">URGENT</span>}
                      </div>
                      <div className="hi-request-meta">
                        {req.serviceName} • {req.time}
                      </div>
                      <div className="hi-request-desc">{req.description}</div>
                    </div>
                    <button 
                      className="hi-btn-validate" 
                      onClick={() => handleValidate(req)}
                      disabled={isValidating === req.id}
                    >
                      {isValidating === req.id ? 'Génération...' : 'Valider la demande'}
                    </button>
                    <button className="hi-btn-options">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="hi-side-panels">
              <div className="hi-ticket-gen">
                <h3 className="hi-panel-title">Génération de ticket</h3>
                <div className="hi-step">
                  <div className="hi-step-num">1</div>
                  <p>Vérifier les symptômes et l'urgence clinique du service.</p>
                </div>
                <div className="hi-step">
                  <div className="hi-step-num">2</div>
                  <p>Cliquez sur « Valider » pour générer le ticket de visite.</p>
                </div>
              </div>

              <div className="hi-last-ticket">
                <div className="hi-last-ticket__header">
                  <span className="hi-panel-title">DERNIER TICKET</span>
                  {lastTicket && <span className="hi-tag-generated">Généré à {lastTicket.time}</span>}
                </div>
                
                {lastTicket ? (
                  <div className="hi-ticket-preview">
                    <div className="hi-qr-box">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#14152A" strokeWidth="1.5">
                        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                        <rect x="7" y="7" width="1" height="1" /><rect x="16" y="7" width="1" height="1" />
                        <rect x="7" y="16" width="1" height="1" /><rect x="16" y="16" width="1" height="1" />
                      </svg>
                    </div>
                    <div className="hi-ticket-patient">{lastTicket.patientName}</div>
                    <div className="hi-ticket-meta">Ticket #{lastTicket.numero || '772-B'} • {lastTicket.serviceName}</div>
                  </div>
                ) : (
                  <div className="hi-ticket-placeholder">
                    <p>Les tickets générés apparaîtront ici.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

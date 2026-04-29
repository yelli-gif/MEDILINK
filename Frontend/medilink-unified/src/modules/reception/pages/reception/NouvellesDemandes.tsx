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

function StatCard({ label, value, badge, badgeType, isRed, sub }: { label: string; value: string; badge?: string; badgeType?: 'blue' | 'light'; isRed?: boolean; sub?: string }) {
  return (
    <div className="hi-stat-card">
      <span className="hi-stat-label">{label}</span>
      <div className="hi-stat-content">
        <span className={`hi-stat-value ${isRed ? 'hi-stat-value--red' : ''}`}>{value}</span>
        {badge && (
          <span className={`hi-stat-badge ${badgeType === 'blue' ? 'hi-stat-badge--blue' : 'hi-stat-badge--light'}`}>
            {badge}
          </span>
        )}
      </div>
      {sub && <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>{sub}</div>}
    </div>
  )
}

// ── Composant Principal ───────────────────────────────────────────────────────

export default function NewRequests() {
  const [activeNav] = useState('new-requests')
  const [search, setSearch] = useState('')
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [isValidating, setIsValidating] = useState<string | null>(null)
  const [lastTicket, setLastTicket] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [selectedDate] = useState(new Date().toISOString().split('T')[0])
  
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('medilink_user')
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      setUserProfile(parsed)
      
      const hId = parsed.hopitalId || parsed.personnelId || parsed.id;
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
      
      const today = new Date().toISOString().split('T')[0]
      const mapped: Request[] = data
        .filter((rdv: any) => rdv.date === today)
        .map((rdv: any) => ({
          id: rdv.id.toString(),
          patientName: rdv.patient ? `${rdv.patient.prenom} ${rdv.patient.nom}` : 'Patient Inconnu',
          urgency: rdv.description?.toLowerCase().includes('urgent') || rdv.priorite === 'HAUTE' ? 'urgent' : 'normal',
          serviceId: rdv.service?.id || 0,
          serviceName: rdv.service?.nom || 'Service Inconnu',
          time: rdv.heure ? rdv.heure.substring(0, 5) : '--:--',
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
      const ticket = await accueilAPI.arriveePatient(request.rendezVousId, request.serviceId)
      const newTicket = {
        ...ticket,
        patientName: request.patientName,
        serviceName: request.serviceName,
        time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      };
      setLastTicket(newTicket)
      setShowModal(true)
      
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

  const formatDateLong = (dateStr: string) => {
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
             {formatDateLong(selectedDate)}
          </div>

          <div className="hi-topbar__search">
            <IconSearch />
            <input
              type="text"
              placeholder="Rechercher un patient ou une demande..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="hi-topbar__actions">
            <button className="hi-notif-btn">
              <IconBell />
              <span className="hi-notif-dot" />
            </button>
            <button className="hi-notif-btn"><IconHelp /></button>
            <div className="hi-topbar__divider" style={{ width: '1px', height: '24px', background: '#e2e8f0', margin: '0 8px' }} />
            <div className="hi-topbar__user" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="hi-topbar__user-info" style={{ textAlign: 'right' }}>
                <div className="hi-user-name">{userProfile?.name || 'Utilisateur'}</div>
                <div className="hi-user-role" style={{ fontSize: '10px', color: '#94a3b8' }}>Réceptionniste</div>
              </div>
              <div className="hi-user-circle">
                {userProfile?.name?.substring(0,2).toUpperCase() || 'JD'}
              </div>
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
              badge="+5% aujourd'hui"
              badgeType="blue"
            />
            <StatCard 
              label="CAS URGENTS" 
              value={String(requests.filter(r => r.urgency === 'urgent').length).padStart(2, '0')} 
              isRed={true}
              badge="Action requise"
              badgeType="light"
            />
            <StatCard 
              label="FLUX STANDARD" 
              value={String(requests.filter(r => r.urgency === 'normal').length).padStart(2, '0')} 
              badge="Attente moy. : 12 min"
              badgeType="light"
            />
          </div>

          <div className="hi-content-layout">
            <div className="hi-requests-list">
              <div className="hi-list-header">
                <h2 className="hi-list-title">En attente de validation</h2>
                <div className="hi-sort-tabs">
                   <button className="hi-sort-tab hi-sort-tab--active">Priorité</button>
                   <button className="hi-sort-tab">Heure</button>
                </div>
              </div>
              
              <div className="hi-req-list">
                {loading ? (
                  <div className="hi-empty-state" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                    Chargement des demandes...
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="hi-empty-state" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                    Aucune nouvelle demande pour le moment.
                  </div>
                ) : (
                  filtered.map(req => (
                    <div key={req.id} className="hi-req-card">
                      <div className="hi-req-card__indicator">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                      </div>
                      <div className="hi-req-card__body">
                        <div className="hi-req-card__top">
                          <span className="hi-req-name">{req.patientName}</span>
                          {req.urgency === 'urgent' && <span className="hi-badge-urgent">URGENT</span>}
                        </div>
                        <div className="hi-req-meta">
                          {req.serviceName} • {req.time}
                        </div>
                        <div className="hi-req-notes">{req.description}</div>
                      </div>
                      <div className="hi-req-card__actions">
                        <button 
                          className="hi-btn-validate" 
                          onClick={() => handleValidate(req)}
                          disabled={isValidating === req.id}
                        >
                          {isValidating === req.id ? 'Génération...' : 'Valider la demande'}
                        </button>
                        <button className="hi-btn-more">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="hi-side-panels">
              <div className="hi-process-box">
                <h3 className="hi-process-title">Génération de ticket</h3>
                <div className="hi-process-steps">
                  <div className="hi-process-step">
                    <div className="hi-step-number">1</div>
                    <p>Vérifier les symptômes et l'urgence clinique du service.</p>
                  </div>
                  <div className="hi-process-step">
                    <div className="hi-step-number">2</div>
                    <p>Cliquez sur « Valider » pour générer le ticket de visite.</p>
                  </div>
                </div>
              </div>

              <div className="hi-ticket-module">
                <div className="hi-ticket-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <span className="hi-ticket-label">DERNIER TICKET</span>
                  {lastTicket && <span className="hi-ticket-time">Généré à {lastTicket.time}</span>}
                </div>
                
                <div className="hi-ticket-card">
                  <div className="hi-ticket-qr">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="1.5">
                      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                      <rect x="7" y="7" width="1" height="1" /><rect x="16" y="7" width="1" height="1" />
                      <rect x="7" y="16" width="1" height="1" /><rect x="16" y="16" width="1" height="1" />
                    </svg>
                  </div>
                  <div className="hi-ticket-name">{lastTicket ? lastTicket.patientName : '---'}</div>
                  <div className="hi-ticket-meta">
                    {lastTicket ? `Ticket #${lastTicket.numeroFile || '772-B'} • ${lastTicket.serviceName}` : 'Attente de validation'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showModal && lastTicket && (
        <div className="hi-modal-overlay">
          <div className="hi-modal-content">
            <button className="hi-modal-close-icon" onClick={() => setShowModal(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div className="hi-modal-header">
              <div className="hi-success-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2 className="hi-modal-title">Ticket Généré !</h2>
              <p className="hi-modal-subtitle">Le patient a été ajouté à la file d'attente avec succès.</p>
            </div>
            
            <div className="hi-ticket-preview">
              <div className="hi-ticket-card hi-ticket-card--preview">
                <div className="hi-ticket-qr">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="1.5">
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                  </svg>
                </div>
                <div className="hi-ticket-name">{lastTicket.patientName}</div>
                <div className="hi-ticket-meta">Ticket #{lastTicket.numeroFile || '772-B'} • {lastTicket.serviceName}</div>
              </div>
            </div>

            <div className="hi-modal-actions">
              <button className="hi-btn-print-full" onClick={() => window.print()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                Imprimer le ticket
              </button>
              <button className="hi-btn-close" onClick={() => setShowModal(false)}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

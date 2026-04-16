import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NouvellesDemandes.css'

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

const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
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
const IconMore = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
  </svg>
)
const IconPrint = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
)
const IconX = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
// -- Unused icons removed --

// ── Types ─────────────────────────────────────────────────────────────────────

type Priority = 'urgent' | 'standard'
type Request = {
  id: string
  name: string
  service: string
  time: string
  notes: string
  priority: Priority
  avatar?: string
}

// ── Données ───────────────────────────────────────────────────────────────────

const navItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: <IconDashboard /> },
  { id: 'new-requests', label: 'Nouvelles demandes', icon: <IconPlus /> },
  { id: 'waiting-queues', label: 'Files d\'attente', icon: <IconClock /> },
  { id: 'ticket-verification', label: 'Vérif. tickets', icon: <IconTicket /> },
  { id: 'history', label: 'Historique', icon: <IconHistory /> },
]

const requests: Request[] = [
  {
    id: '1', name: 'James McAvoy', service: 'Cardiologie', time: '10:42',
    notes: 'Douleur thoracique, essoufflement, antécédents chirurgicaux...', priority: 'urgent',
  },
  {
    id: '2', name: 'Elena Rodriguez', service: 'Dermatologie', time: '10:55',
    notes: 'Éruption cutanée sévère, allergie suspectée aux médicaments...', priority: 'standard',
    avatar: 'https://i.pravatar.cc/36?img=5',
  },
  {
    id: '3', name: 'Marcus Thorne', service: 'Médecine Générale', time: '11:02',
    notes: 'Renouvellement d\'ordonnance et contrôle de tension...', priority: 'standard',
  },
]

const latestTicket = {
  name: 'Sarah Jenkins',
  ticket: '#772-B',
  service: 'Cardiologie',
  floor: 'Niveau 3, Est',
  queue: '#04',
  generatedAgo: 'il y a 2 min',
}

// ── Rendu Ticket (Code QR) ────────────────────────────────────────────────────

const TicketVisualSVG = () => (
  <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="84" height="84" rx="8" fill="white" />
    <path d="M12 12H30V30H12V12ZM16 16V26H26V16H16Z" fill="#1e293b" />
    <rect x="19" y="19" width="4" height="4" fill="#1e293b" />
    <path d="M54 12H72V30H54V12ZM58 16V26H68V16H58Z" fill="#1e293b" />
    <rect x="61" y="19" width="4" height="4" fill="#1e293b" />
    <path d="M12 54H30V72H12V54ZM16 58V68H26V58H16Z" fill="#1e293b" />
    <rect x="19" y="61" width="4" height="4" fill="#1e293b" />
    <rect x="38" y="12" width="8" height="8" fill="#1e293b" />
    <rect x="38" y="26" width="4" height="4" fill="#1e293b" />
    <rect x="46" y="19" width="4" height="4" fill="#1e293b" />
    <rect x="38" y="38" width="8" height="8" fill="#1e293b" />
    <rect x="54" y="38" width="4" height="4" fill="#1e293b" />
    <rect x="64" y="38" width="8" height="4" fill="#1e293b" />
    <rect x="12" y="38" width="8" height="4" fill="#1e293b" />
    <rect x="25" y="38" width="4" height="4" fill="#1e293b" />
    <rect x="46" y="54" width="4" height="18" fill="#1e293b" />
    <rect x="54" y="54" width="18" height="4" fill="#1e293b" />
    <rect x="54" y="64" width="8" height="8" fill="#1e293b" />
    <rect x="68" y="68" width="4" height="4" fill="#1e293b" />
  </svg>
)

// ── Composant Principal ───────────────────────────────────────────────────────

export default function NewRequests() {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'priority' | 'time'>('priority')
  const [showModal, setShowModal] = useState(false)
  const [validatedReq, setValidatedReq] = useState<Request | null>(null)
  const [isValidating, setIsValidating] = useState<string | null>(null)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [ticketTime, setTicketTime] = useState('il y a 2 min')
  const [selectedDate, setSelectedDate] = useState('2023-10-24')
  
  const navigate = useNavigate()

  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
    return new Date(dateStr).toLocaleDateString('fr-FR', options)
  }

  const handleNav = (id: string) => {
    if (id === 'dashboard') navigate('/dashboard')
    if (id === 'new-requests') navigate('/requests')
    if (id === 'waiting-queues') navigate('/waiting-queues')
    if (id === 'ticket-verification') navigate('/ticket-verification')
    if (id === 'history') navigate('/history')
  }

  const handleValidate = (req: Request) => {
    setIsValidating(req.id)
    // Simulation d'un délai de validation
    setTimeout(() => {
      setIsValidating(null)
      setValidatedReq(req)
      setTicketTime('À l\'instant')
      setShowModal(true)
    }, 800)
  }

  const sorted = [...requests].sort((a, b) => {
    if (sortBy === 'priority') return a.priority === 'urgent' ? -1 : 1
    return a.time.localeCompare(b.time)
  })

  return (
    <div className="hi-app-shell">
      {/* ── Barre latérale ── */}
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
              className={`hi-nav-item ${item.id === 'new-requests' ? 'hi-nav-item--active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              <span className="hi-nav-item__icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hi-sidebar__emergency">
          <button className="hi-btn-emergency" onClick={() => navigate('/emergency-intake')}>
            Ajouter sur place
          </button>
        </div>

        <div className="hi-sidebar__footer">
          <div className="hi-footer-box">
            <button className="hi-footer-link" onClick={() => navigate('/settings')}>
              <IconSettings /> <span>Paramètres</span>
            </button>
            <button className="hi-footer-link" onClick={() => navigate('/support')}>
              <IconSupport /> <span>Assistance</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Contenu Principal ── */}
      <main className="hi-main">
        {/* Topbar */}
        <header className="hi-topbar">
          <div className="hi-topbar-date" style={{ position: 'relative', cursor: 'pointer' }}>
            <span onClick={() => (document.getElementById('requests-date-picker') as HTMLInputElement)?.showPicker()}>
              {formatDate(selectedDate)}
            </span>
            <input 
              id="requests-date-picker"
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
              placeholder="Rechercher un patient ou une demande..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="hi-topbar__actions">
            <button className="hi-icon-btn" onClick={() => navigate('/notifications')}><IconBell /></button>
            <button className="hi-icon-btn" onClick={() => navigate('/help')}><IconHelp /></button>
            <div className="hi-topbar__divider" />
            <div className="hi-user-info">
              <span className="hi-user-name">Jean Dupont</span>
              <span className="hi-user-role">Réceptionniste</span>
            </div>
            <div className="hi-user-avatar">JD</div>
          </div>
        </header>

        {/* Corps de la page */}
        <div className="hi-page-body">
          <div className="hi-page-header">
            <h2 className="hi-page-title">Nouvelles Demandes</h2>
            <p className="hi-page-subtitle">
              Validez les demandes de services médicaux entrantes et générez les tickets patients.
            </p>
          </div>

          {/* Cartes Stats */}
          <div className="hi-stats-grid">
            <div className="hi-stat-card">
              <span className="hi-stat-label">TOTAL EN ATTENTE</span>
              <div className="hi-stat-content">
                <span className="hi-stat-value">24</span>
                <span className="hi-stat-badge hi-stat-badge--blue">+5% aujourd'hui</span>
              </div>
            </div>
            <div className="hi-stat-card">
              <span className="hi-stat-label">CAS URGENTS</span>
              <div className="hi-stat-content">
                <span className="hi-stat-value hi-stat-value--red">08</span>
                <span className="hi-stat-badge hi-stat-badge--light">Action requise</span>
              </div>
            </div>
            <div className="hi-stat-card">
              <span className="hi-stat-label">FLUX STANDARD</span>
              <div className="hi-stat-content">
                <span className="hi-stat-value">16</span>
                <span className="hi-stat-badge hi-stat-badge--light">Attente moy. : 12 min</span>
              </div>
            </div>
          </div>

          <div className="hi-content-layout">
            {/* Gauche : Liste des patients */}
            <div className="hi-list-section">
              <div className="hi-list-header">
                <div>
                  <h3 className="hi-list-title">En attente de validation</h3>
                </div>
                <div className="hi-sort-tabs">
                  <button
                    className={`hi-sort-tab ${sortBy === 'priority' ? 'hi-sort-tab--active' : ''}`}
                    onClick={() => setSortBy('priority')}
                  >
                    Priorité
                  </button>
                  <button
                    className={`hi-sort-tab ${sortBy === 'time' ? 'hi-sort-tab--active' : ''}`}
                    onClick={() => setSortBy('time')}
                  >
                    Heure
                  </button>
                </div>
              </div>

              <div className="hi-req-list">
                {sorted.map(req => (
                  <div key={req.id} className="hi-req-card">
                    <div className="hi-req-card__indicator">
                      <div className="hi-indicator-square">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                          <line x1="7.05" y1="7.05" x2="16.95" y2="16.95" /><line x1="16.95" y1="7.05" x2="7.05" y2="16.95" />
                        </svg>
                      </div>
                    </div>
                    <div className="hi-req-card__body">
                      <div className="hi-req-card__top">
                        <span className="hi-req-name">{req.name}</span>
                        {req.priority === 'urgent' && <span className="hi-badge-urgent">URGENT</span>}
                      </div>
                      <div className="hi-req-meta">
                        {req.service} • {req.time}
                      </div>
                      <div className="hi-req-notes">{req.notes}</div>
                    </div>
                    <div className="hi-req-card__actions">
                      <button 
                        className={`hi-btn-validate ${isValidating === req.id ? 'hi-btn-validate--loading' : ''}`}
                        onClick={() => handleValidate(req)}
                        disabled={isValidating !== null}
                      >
                        {isValidating === req.id ? 'Validation...' : 'Valider la demande'}
                      </button>
                      <div className="hi-more-wrapper" style={{ position: 'relative' }}>
                        <button className="hi-btn-more" onClick={() => setActiveMenu(activeMenu === req.id ? null : req.id)}>
                          <IconMore />
                        </button>
                        {activeMenu === req.id && (
                          <div className="hi-dropdown-menu">
                            <button className="hi-dropdown-item">Modifier</button>
                            <button className="hi-dropdown-item">Mettre en attente</button>
                            <button className="hi-dropdown-item hi-dropdown-item--danger">Annuler</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Droite : Processus + Ticket */}
            <div className="hi-right-section">
              {/* Boîte Processus de validation */}
              <div className="hi-process-box">
                <h3 className="hi-process-title">Génération de ticket</h3>
                <div className="hi-process-steps">
                  <div className="hi-process-step">
                    <span className="hi-step-number">1</span>
                    <p>Vérifier les symptômes et l'urgence clinique du service.</p>
                  </div>
                  <div className="hi-process-step">
                    <span className="hi-step-number">2</span>
                    <p>Cliquez sur « Valider » pour générer le ticket de visite.</p>
                  </div>
                </div>
              </div>

              {/* Dernier Ticket */}
              <div className="hi-ticket-module">
                <div className="hi-ticket-header">
                  <span className="hi-ticket-label">DERNIER TICKET</span>
                  <span className="hi-ticket-time">Généré {ticketTime}</span>
                </div>

                <div className="hi-ticket-card">
                  <div className="hi-ticket-qr">
                    <TicketVisualSVG />
                  </div>
                  <h4 className="hi-ticket-name">{latestTicket.name}</h4>
                  <div className="hi-ticket-meta">
                    Ticket {latestTicket.ticket} • {latestTicket.service}
                  </div>

                  <div className="hi-ticket-details">
                    <div className="hi-ticket-detail">
                      <span className="hi-detail-label">ÉTAGE</span>
                      <span className="hi-detail-value">Niveau 3, Est</span>
                    </div>
                    <div className="hi-ticket-detail">
                      <span className="hi-detail-label">FILE N°</span>
                      <span className="hi-detail-value">#04</span>
                    </div>
                  </div>

                  <button className="hi-btn-reprint" onClick={() => window.print()}>
                    <IconPrint /> <span>Ré-imprimer le ticket</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Modale de Ticket Généré ── */}
      {showModal && validatedReq && (
        <div className="hi-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="hi-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="hi-modal-close-icon" onClick={() => setShowModal(false)}>
              <IconX />
            </button>
            <div className="hi-modal-header">
              <div className="hi-success-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="hi-modal-title">Ticket Généré avec Succès</h3>
              <p className="hi-modal-subtitle">Le patient a été ajouté à la file d'attente.</p>
            </div>
            
            <div className="hi-ticket-preview">
              <div className="hi-ticket-card hi-ticket-card--preview">
                <div className="hi-ticket-qr">
                  <TicketVisualSVG />
                </div>
                <h4 className="hi-ticket-name">{validatedReq.name}</h4>
                <div className="hi-ticket-meta">
                  Ticket #{Math.floor(Math.random() * 900) + 100}-B • {validatedReq.service}
                </div>
                <div className="hi-ticket-details">
                  <div className="hi-ticket-detail">
                    <span className="hi-detail-label">ÉTAGE</span>
                    <span className="hi-detail-value">Niveau 2</span>
                  </div>
                  <div className="hi-ticket-detail">
                    <span className="hi-detail-label">CODE</span>
                    <span className="hi-detail-value">#{Math.floor(Math.random() * 50) + 1}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hi-modal-actions">
              <button className="hi-btn-print-full" onClick={() => window.print()}>
                <IconPrint /> Imprimer le Ticket
              </button>
              <button className="hi-btn-close" onClick={() => setShowModal(false)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './NouvellesDemandes.css'

// ── Icons ─────────────────────────────────────────────────────────────────────

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

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)
const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)
const IconMore = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" />
  </svg>
)
const IconPrint = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
)
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
)

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

// ── Data ──────────────────────────────────────────────────────────────────────

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
    notes: 'Éruption cutanée sévère sur le bras, allergie suspectée...', priority: 'standard',
    avatar: 'https://i.pravatar.cc/36?img=5',
  },
  {
    id: '3', name: 'Marcus Thorne', service: 'Médecine Générale', time: '11:02',
    notes: 'Renouvellement ordonnance et contrôle de la tension artérielle...', priority: 'standard',
  },
  {
    id: '4', name: 'Lucie Fontaine', service: 'Neurologie', time: '11:18',
    notes: 'Migraines récurrentes, bilan neurologique requis...', priority: 'urgent',
  },
  {
    id: '5', name: 'Amara Diallo', service: 'Pédiatrie', time: '11:35',
    notes: 'Fièvre persistante chez enfant de 6 ans, suivi post-infection...', priority: 'standard',
    avatar: 'https://i.pravatar.cc/36?img=9',
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

// ── QR Code (simple SVG placeholder) ─────────────────────────────────────────

const QRCodeSVG = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="80" height="80" fill="white" />
    {/* Top-left finder */}
    <rect x="4" y="4" width="24" height="24" rx="2" fill="#0f172a" />
    <rect x="8" y="8" width="16" height="16" fill="white" />
    <rect x="12" y="12" width="8" height="8" fill="#0f172a" />
    {/* Top-right finder */}
    <rect x="52" y="4" width="24" height="24" rx="2" fill="#0f172a" />
    <rect x="56" y="8" width="16" height="16" fill="white" />
    <rect x="60" y="12" width="8" height="8" fill="#0f172a" />
    {/* Bottom-left finder */}
    <rect x="4" y="52" width="24" height="24" rx="2" fill="#0f172a" />
    <rect x="8" y="56" width="16" height="16" fill="white" />
    <rect x="12" y="60" width="8" height="8" fill="#0f172a" />
    {/* Data modules */}
    <rect x="36" y="4" width="4" height="4" fill="#0f172a" />
    <rect x="44" y="4" width="4" height="4" fill="#0f172a" />
    <rect x="36" y="12" width="8" height="4" fill="#0f172a" />
    <rect x="36" y="20" width="4" height="4" fill="#0f172a" />
    <rect x="44" y="20" width="4" height="4" fill="#0f172a" />
    <rect x="36" y="36" width="4" height="4" fill="#0f172a" />
    <rect x="44" y="36" width="8" height="4" fill="#0f172a" />
    <rect x="56" y="36" width="4" height="4" fill="#0f172a" />
    <rect x="64" y="36" width="8" height="4" fill="#0f172a" />
    <rect x="4" y="36" width="8" height="4" fill="#0f172a" />
    <rect x="16" y="36" width="4" height="4" fill="#0f172a" />
    <rect x="24" y="36" width="4" height="4" fill="#0f172a" />
    <rect x="4" y="44" width="4" height="4" fill="#0f172a" />
    <rect x="12" y="44" width="8" height="4" fill="#0f172a" />
    <rect x="24" y="44" width="4" height="4" fill="#0f172a" />
    <rect x="36" y="44" width="4" height="12" fill="#0f172a" />
    <rect x="44" y="44" width="4" height="4" fill="#0f172a" />
    <rect x="52" y="44" width="8" height="4" fill="#0f172a" />
    <rect x="64" y="44" width="8" height="4" fill="#0f172a" />
    <rect x="4" y="52" width="0" height="0" fill="#0f172a" />
    <rect x="44" y="52" width="4" height="4" fill="#0f172a" />
    <rect x="52" y="52" width="4" height="8" fill="#0f172a" />
    <rect x="60" y="52" width="8" height="4" fill="#0f172a" />
    <rect x="44" y="60" width="8" height="4" fill="#0f172a" />
    <rect x="60" y="60" width="4" height="4" fill="#0f172a" />
    <rect x="68" y="60" width="4" height="4" fill="#0f172a" />
    <rect x="44" y="68" width="4" height="4" fill="#0f172a" />
    <rect x="52" y="68" width="8" height="4" fill="#0f172a" />
    <rect x="64" y="68" width="8" height="4" fill="#0f172a" />
  </svg>
)

// ── Main Component ─────────────────────────────────────────────────────────────

export default function NewRequests() {
  const [activeNav, setActiveNav] = useState('new-requests')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'priority' | 'time'>('priority')
  const navigate = useNavigate()

  const handleNav = (id: string) => {
    setActiveNav(id)
    if (id === 'dashboard') navigate('/dashboard')
    if (id === 'new-requests') navigate('/requests')
    if (id === 'waiting-queues') navigate('/waiting-queues')
    if (id === 'ticket-verification') navigate('/ticket-verification')
  }

  const filtered = requests.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.service.toLowerCase().includes(search.toLowerCase()),
  )

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'priority') {
      return a.priority === 'urgent' ? -1 : 1
    }
    return a.time.localeCompare(b.time)
  })

  const urgentCount = requests.filter((r) => r.priority === 'urgent').length
  const standardCount = requests.filter((r) => r.priority === 'standard').length

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
          <button className="btn-emergency">Admission Urgente</button>
        </div>

        <div className="sidebar__user-card">
          <div className="user-card__avatar">SW</div>
          <div className="user-card__info">
            <span className="user-card__name">Dr. Sarah Wilson</span>
            <span className="user-card__role">Superviseur accueil</span>
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar__left">
            <div className="topbar__brand-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div>
              <div className="topbar__title">Station d'accueil</div>
              <div className="topbar__subtitle">Tableau de bord</div>
            </div>
          </div>
          <div className="topbar__search">
            <IconSearch />
            <input
              type="text"
              placeholder="Rechercher patients ou demandes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="topbar__actions">
            <button className="icon-btn" aria-label="Notifications">
              <IconBell />
              <span className="notif-dot" />
            </button>
            <div className="topbar__divider" />
            <div className="topbar__user">
              <div className="topbar__user-info">
                <span className="user-name">Dr. Sarah Wilson</span>
                <span className="user-role">Superviseur accueil</span>
              </div>
              <div className="user-avatar user-avatar--teal">SW</div>
            </div>
          </div>
        </header>

        {/* Page body */}
        <div className="page-body">
          {/* Title */}
          <div className="page-title-block">
            <h1 className="page-title">Nouvelles Demandes</h1>
            <p className="page-subtitle">
              Validez les demandes de service médical entrantes et générez les tickets patients.
            </p>
          </div>

          {/* Stat mini-cards */}
          <div className="req-stats">
            <div className="req-stat-card">
              <div className="req-stat__label">TOTAL EN ATTENTE</div>
              <div className="req-stat__bottom">
                <span className="req-stat__value">{requests.length}</span>
                <span className="req-stat__badge req-stat__badge--green">+5% aujourd'hui</span>
              </div>
            </div>
            <div className="req-stat-card req-stat-card--urgent">
              <div className="req-stat__label">CAS URGENTS</div>
              <div className="req-stat__bottom">
                <span className="req-stat__value req-stat__value--urgent">{String(urgentCount).padStart(2, '0')}</span>
                <span className="req-stat__note">Action requise</span>
              </div>
            </div>
            <div className="req-stat-card">
              <div className="req-stat__label">FLUX STANDARD</div>
              <div className="req-stat__bottom">
                <span className="req-stat__value">{standardCount}</span>
                <span className="req-stat__note">Attente moy. : 12 min</span>
              </div>
            </div>
          </div>

          {/* Two-column layout */}
          <div className="req-layout">
            {/* Left: request list */}
            <div className="req-list-section">
              <div className="req-list-header">
                <h2 className="req-list-title">En attente de validation</h2>
                <div className="sort-tabs">
                  <button
                    className={`sort-tab ${sortBy === 'priority' ? 'sort-tab--active' : ''}`}
                    onClick={() => setSortBy('priority')}
                  >
                    Priorité
                  </button>
                  <button
                    className={`sort-tab ${sortBy === 'time' ? 'sort-tab--active' : ''}`}
                    onClick={() => setSortBy('time')}
                  >
                    Heure
                  </button>
                </div>
              </div>

              <div className="req-list">
                {sorted.map((req) => (
                  <div key={req.id} className="req-card">
                    <div className="req-card__avatar">
                      {req.avatar
                        ? <img src={req.avatar} alt={req.name} />
                        : <IconUser />}
                    </div>
                    <div className="req-card__body">
                      <div className="req-card__top">
                        <span className="req-card__name">{req.name}</span>
                        <span className={`req-priority req-priority--${req.priority}`}>
                          {req.priority === 'urgent' ? 'URGENT' : 'STANDARD'}
                        </span>
                      </div>
                      <div className="req-card__meta">
                        {req.service} · {req.time}
                      </div>
                      <div className="req-card__notes">{req.notes}</div>
                    </div>
                    <div className="req-card__actions">
                      <button className="btn-validate">Valider la demande</button>
                      <button className="btn-more" aria-label="Plus d'options"><IconMore /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: process + ticket */}
            <div className="req-sidebar-right">
              {/* Validation process */}
              <div className="process-card">
                <h3 className="process-card__title">Processus de validation</h3>
                <ol className="process-steps">
                  <li>
                    <span className="step-num">1</span>
                    <span>Vérifier les symptômes du patient et l'urgence clinique du service.</span>
                  </li>
                  <li>
                    <span className="step-num">2</span>
                    <span>Cliquez sur « Valider » pour générer le QR code de visite unique.</span>
                  </li>
                  <li>
                    <span className="step-num">3</span>
                    <span>Dirigez le patient vers l'étage indiqué sur le ticket numérique.</span>
                  </li>
                </ol>
              </div>

              {/* Latest ticket */}
              <div className="ticket-section">
                <div className="ticket-section__header">
                  <span className="ticket-section__label">DERNIER TICKET</span>
                  <span className="ticket-section__time">Généré {latestTicket.generatedAgo}</span>
                </div>
                <div className="ticket-card">
                  <div className="ticket-card__qr">
                    <QRCodeSVG />
                  </div>
                  <div className="ticket-card__name">{latestTicket.name}</div>
                  <div className="ticket-card__meta">
                    Ticket {latestTicket.ticket} · {latestTicket.service}
                  </div>
                  <div className="ticket-card__details">
                    <div className="ticket-detail">
                      <span className="ticket-detail__label">ÉTAGE</span>
                      <span className="ticket-detail__value">{latestTicket.floor}</span>
                    </div>
                    <div className="ticket-detail">
                      <span className="ticket-detail__label">FILE N°</span>
                      <span className="ticket-detail__value">{latestTicket.queue}</span>
                    </div>
                  </div>
                  <button className="btn-reprint">
                    <IconPrint /> Ré-imprimer le ticket
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

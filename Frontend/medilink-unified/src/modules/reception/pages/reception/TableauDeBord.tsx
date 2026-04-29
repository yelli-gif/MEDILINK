import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './TableauDeBord.css'
import { accueilAPI, rendezVousAPI } from '../../../../services/api'

// ── Icônes (inline SVG helpers) ────────────────────────────────────────────────

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
const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)
const IconFilter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
)
const IconRefresh = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
)

// ── Types de données ──────────────────────────────────────────────────────────

type NavItem = { id: string; label: string; icon: React.ReactNode }
type Patient = {
  id: string
  initials: string
  name: string
  patientId: string
  time: string
  doctor: string
  service: string
  status: 'confirmed' | 'in-progress' | 'completed'
  avatar?: string
}

// ── Données statiques ─────────────────────────────────────────────────────────

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Tableau de bord', icon: <IconDashboard /> },
  { id: 'new-requests', label: 'Nouvelles demandes', icon: <IconPlus /> },
  { id: 'waiting-queues', label: 'Files d\'attente', icon: <IconClock /> },
  { id: 'ticket-verification', label: 'Vérif. tickets', icon: <IconTicket /> },
  { id: 'history', label: 'Historique', icon: <IconHistory /> },
]

const patients: Patient[] = []

const statusLabel: Record<Patient['status'], string> = {
  confirmed: 'Confirmé',
  'in-progress': 'En cours',
  completed: 'Terminé',
}

// ── Sous-composants ───────────────────────────────────────────────────────────

function StatCard({
  icon, iconBg, value, label, badge,
}: {
  icon: React.ReactNode; iconBg: string; value: string | number; label: string; badge?: string
}) {
  return (
    <div className="stat-card">
      <div className="stat-card__top">
        <div className="stat-card__icon" style={{ background: iconBg }}>
          {icon}
        </div>
        {badge && <span className="stat-card__badge">{badge}</span>}
      </div>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__label">{label}</div>
    </div>
  )
}

function PatientRow({ patient }: { patient: Patient }) {
  return (
    <tr className="patient-row">
      <td className="patient-row__info">
        <div className="patient-avatar">
          {patient.avatar
            ? <img src={patient.avatar} alt={patient.name} />
            : <span>{patient.initials}</span>}
        </div>
        <div>
          <div className="patient-name">{patient.name}</div>
          <div className="patient-id">ID: {patient.patientId}</div>
        </div>
      </td>
      <td className="patient-row__time">{patient.time}</td>
      <td className="patient-row__doctor">
        <div className="doctor-name">{patient.doctor}</div>
        <div className="doctor-service">{patient.service}</div>
      </td>
      <td className="patient-row__status">
        <span className={`status-badge status-badge--${patient.status}`}>
          {statusLabel[patient.status]}
        </span>
      </td>
    </tr>
  )
}

// ── Composant Principal ───────────────────────────────────────────────────────

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [search, setSearch] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState('il y a 2 min')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [filterStatus, setFilterStatus] = useState<'all' | 'on-site'>('all')
  const [patientsList, setPatientsList] = useState<Patient[]>(patients)
  const navigate = useNavigate()

  const [userProfile, setUserProfile] = useState({
    name: 'Jean Dupont',
    role: 'Réceptionniste'
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('medilink_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserProfile({
          name: parsed.name || 'Jean Dupont',
          role: parsed.role || 'Réceptionniste'
        });
      } catch (err) {}
    }
  }, []);

  const formatDate = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
    return new Date(dateStr).toLocaleDateString('fr-FR', options)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulation d'un délai réseau
    setTimeout(() => {
      setIsRefreshing(false)
      setLastUpdated('À l\'instant')
    }, 1200)
  }

  const handleNav = (id: string) => {
    setActiveNav(id)
    if (id === 'dashboard') navigate('/reception/dashboard')
    if (id === 'new-requests') navigate('/reception/requests')
    if (id === 'waiting-queues') navigate('/reception/waiting-queues')
    if (id === 'ticket-verification') navigate('/reception/ticket-verification')
    if (id === 'history') navigate('/reception/history')
  }

  const filtered = patientsList.filter(
    (p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.doctor.toLowerCase().includes(search.toLowerCase()) ||
        p.service.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filterStatus === 'all' || p.status === 'confirmed' || p.status === 'in-progress';
      return matchesSearch && matchesFilter;
    }
  )

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
            <span onClick={() => (document.getElementById('dashboard-date-picker') as HTMLInputElement)?.showPicker()}>
              {formatDate(selectedDate)}
            </span>
            <input
              id="dashboard-date-picker"
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
              placeholder="Rechercher un patient, médecin ou service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="topbar__actions">
            <button className="icon-btn" aria-label="Notifications" onClick={() => navigate('/reception/notifications')}><IconBell /></button>
            <button className="icon-btn" aria-label="Aide" onClick={() => navigate('/reception/help')}><IconHelp /></button>
            <div className="topbar__divider" />
            <div className="topbar__user" onClick={() => navigate('/connexion')} style={{ cursor: 'pointer' }}>
              <div className="topbar__user-info">
                <span className="user-name">{userProfile.name}</span>
                <span className="user-role">{userProfile.role}</span>
              </div>
              <div className="user-avatar">{userProfile.name.substring(0, 2).toUpperCase()}</div>
            </div>
          </div>
        </header>

        {/* Corps de la page */}
        <div className="page-body">
          {/* Titre de la page */}
          <div className="page-title-block">
            <h1 className="page-title">Bonjour {userProfile.name}</h1>
            <p className="page-subtitle">
              Bienvenue sur votre station d'accueil. Nous sommes le {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}.
            </p>
          </div>

          {/* Cartes Stats */}
          <div className="stats-grid">
            <StatCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              }
              iconBg="#eff6ff"
              value={patientsList.length}
              label="TOTAL DEMANDES"
            />
            <StatCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              }
              iconBg="#f0f9ff"
              value={patientsList.filter(p => p.status === 'confirmed').length}
              label="EN ATTENTE"
            />
            <StatCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
              iconBg="#f0fdf4"
              value={patientsList.filter(p => p.status === 'in-progress').length}
              label="SUR PLACE"
            />
            <StatCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 15z" />
                </svg>
              }
              iconBg="#faf5ff"
              value={patientsList.filter(p => p.status === 'completed').length}
              label="TERMINÉS"
            />
          </div>

          {/* Tableau des rendez-vous */}
          <section className="appointments-section">
            <div className="appointments-header">
              <div>
                <h2 className="appointments-title">Rendez-vous validés</h2>
                <p className="appointments-subtitle">Flux de patients pour la journée du {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</p>
              </div>
              <div className="appointments-controls">
                <button
                  className={`icon-btn icon-btn--border ${filterStatus === 'on-site' ? 'icon-btn--active' : ''}`}
                  aria-label="Filtrer"
                  onClick={() => setFilterStatus(prev => prev === 'all' ? 'on-site' : 'all')}
                  title={filterStatus === 'all' ? "Filtrer: Tous" : "Filtrer: Sur place"}
                >
                  <IconFilter />
                </button>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="appointments-table">
                <thead>
                  <tr>
                    <th>PATIENT</th>
                    <th>HEURE</th>
                    <th>MÉDECIN / SERVICE</th>
                    <th>STATUT</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <PatientRow key={p.id} patient={p} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Barre de footer */}
            <div className="table-footer">
              <div className="table-footer__stats">
                <div className="stat-item"><span className="dot dot--blue" /> EN ROUTE : <strong>18</strong></div>
                <div className="stat-item"><span className="dot dot--green" /> SUR PLACE : <strong>32</strong></div>
                <div className="stat-item"><span className="dot dot--purple" /> EN CONSULTATION : <strong>09</strong></div>
              </div>
              <div className="table-footer__update">
                <span className="update-time">Dernière mise à jour : {lastUpdated}</span>
                <button
                  className={`btn-refresh ${isRefreshing ? 'btn-refresh--loading' : ''}`}
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  <IconRefresh /> {isRefreshing ? 'Mise à jour...' : 'Actualiser'}
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}


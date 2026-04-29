import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './TableauDeBord.css'
import { rendezVousAPI } from '../../../../services/api'

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
const IconRefresh = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
)

// ── Types ────────────────────────────────────────────────────────────────────

type Patient = {
  id: string
  name: string
  patientId: string
  time: string
  doctor: string
  service: string
  status: 'confirmed' | 'in-progress' | 'completed'
}

const navItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: <IconDashboard /> },
  { id: 'new-requests', label: 'Nouvelles demandes', icon: <IconPlus /> },
  { id: 'waiting-queues', label: "Files d'attente", icon: <IconClock /> },
  { id: 'ticket-verification', label: 'Vérif. tickets', icon: <IconTicket /> },
  { id: 'history', label: 'Historique', icon: <IconHistory /> },
]

// ── Composants internes ──────────────────────────────────────────────────────

function StatCard({ icon, iconBg, value, label }: { icon: React.ReactNode; iconBg: string; value: string | number; label: string }) {
  return (
    <div className="stat-card">
      <div className="stat-card__top">
        <div className="stat-card__icon" style={{ background: iconBg }}>
          {icon}
        </div>
      </div>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__label">{label}</div>
    </div>
  )
}

function PatientRow({ patient }: { patient: Patient }) {
  const statusLabel = {
    confirmed: 'En attente',
    'in-progress': 'Sur place',
    completed: 'Terminé',
  }
  return (
    <tr className="patient-row">
      <td className="patient-row__info">
        <div className="patient-avatar">
          {patient.name.substring(0, 2).toUpperCase()}
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
  const [activeNav] = useState('dashboard')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [patientsList, setPatientsList] = useState<Patient[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [userProfile, setUserProfile] = useState<any>(null)
  
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('medilink_user')
    if (storedUser) {
      setUserProfile(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    if (userProfile) {
      const hId = userProfile.hopitalId || userProfile.personnelId || userProfile.id;
      if (hId) {
        fetchTodayData(parseInt(hId.toString()))
      }
    }
  }, [userProfile, selectedDate])

  const fetchTodayData = async (hopitalId: number) => {
    try {
      setLoading(true)
      const data = await rendezVousAPI.parHopital(hopitalId)
      
      const mapped: Patient[] = data
        .filter((rdv: any) => rdv.date === selectedDate)
        .map((rdv: any) => ({
          id: rdv.id.toString(),
          name: rdv.patient ? `${rdv.patient.prenom} ${rdv.patient.nom}` : 'Patient Inconnu',
          patientId: rdv.patient?.id?.toString() || '---',
          time: rdv.heure ? rdv.heure.substring(0, 5) : '--:--',
          doctor: rdv.medecinName || 'Station 4',
          service: rdv.service?.nom || 'Service Inconnu',
          status: rdv.statut === 'ARRIVE' ? 'confirmed' : 
                  rdv.statut === 'EN_ATTENTE' ? 'in-progress' : 
                  rdv.statut === 'TERMINE' || rdv.statut === 'TRAITE' ? 'completed' : 'confirmed'
        }))
      setPatientsList(mapped)
    } catch (err) {
      console.error('Erreur fetch dashboard:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDateLong = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    return new Date(dateStr).toLocaleDateString('fr-FR', options)
  }

  const handleNav = (id: string) => {
    if (id === 'dashboard') navigate('/reception/dashboard')
    if (id === 'new-requests') navigate('/reception/requests')
    if (id === 'waiting-queues') navigate('/reception/waiting-queues')
    if (id === 'ticket-verification') navigate('/reception/ticket-verification')
    if (id === 'history') navigate('/reception/history')
  }

  const filtered = patientsList.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.service.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="app-shell">
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
          <button className="btn-emergency" onClick={() => navigate('/reception/requests')}>
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

      <main className="main-content">
        <header className="topbar">
          <div className="topbar__date" onClick={() => (document.getElementById('dash-date-picker') as HTMLInputElement)?.showPicker()} style={{ cursor: 'pointer' }}>
             {new Date(selectedDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
             <input id="dash-date-picker" type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
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
            <button className="icon-btn"><IconBell /></button>
            <button className="icon-btn"><IconHelp /></button>
            <div className="topbar__divider" />
            <div className="topbar__user">
              <div className="topbar__user-info">
                <span className="user-name">{userProfile?.name || 'Chargement...'}</span>
                <span className="user-role">Réceptionniste</span>
              </div>
              <div className="user-avatar">{userProfile?.name?.substring(0,2).toUpperCase() || 'JD'}</div>
            </div>
          </div>
        </header>

        <div className="page-body">
          <div className="page-title-block">
            <h1 className="page-title">Bonjour {userProfile?.name?.split(' ')[0] || 'Utilisateur'}</h1>
            <p className="page-subtitle">
              Bienvenue sur votre station d'accueil. Nous sommes le {formatDateLong(selectedDate)}.
            </p>
          </div>

          <div className="stats-grid">
            <StatCard
              icon={<IconDashboard />}
              iconBg="#eff6ff"
              value={patientsList.length}
              label="TOTAL DEMANDES"
            />
            <StatCard
              icon={<IconClock />}
              iconBg="#fef3c7"
              value={patientsList.filter(p => p.status === 'confirmed').length}
              label="EN ATTENTE"
            />
            <StatCard
              icon={<IconPlus />}
              iconBg="#dcfce7"
              value={patientsList.filter(p => p.status === 'in-progress').length}
              label="SUR PLACE"
            />
            <StatCard
              icon={<IconHistory />}
              iconBg="#f3e8ff"
              value={patientsList.filter(p => p.status === 'completed').length}
              label="TERMINÉS"
            />
          </div>

          <section className="appointments-section">
            <div className="appointments-header">
              <div>
                <h2 className="appointments-title">Rendez-vous de la journée</h2>
                <p className="appointments-subtitle">Flux de patients pour le {new Date(selectedDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</p>
              </div>
              <button className="btn-refresh" onClick={() => fetchTodayData(parseInt(userProfile.hopitalId))}>
                <IconRefresh /> Actualiser
              </button>
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
                  {loading ? (
                    <tr><td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Chargement...</td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Aucun rendez-vous pour cette date.</td></tr>
                  ) : (
                    filtered.map((p) => (
                      <PatientRow key={p.id} patient={p} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

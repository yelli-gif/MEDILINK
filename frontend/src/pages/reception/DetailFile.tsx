import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './DetailFile.css'

const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const IconSupport = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" />
    <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" /><line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
    <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" /><line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
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
// -- Unused IconSearch removed --
const IconChevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)
const IconRemoveUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </svg>
)
const IconAddUser = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" /><line x1="17" y1="11" x2="23" y2="11" />
  </svg>
)
const IconFilter = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
)
const IconPrint = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
)
const IconInfo = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)
const IconCheckTask = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2 2V5a2 2 0 0 1 2-2h11" />
  </svg>
)
const IconShuffle = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" />
  </svg>
)
const IconBarChart = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
  </svg>
)

// ── Types ──────────────────────────────────────────────────────────────────────
type Priority = 'urgent' | 'regulier'

type Patient = {
  id: string
  name: string
  priority: Priority
  arrival: string
  reason: string
  avatar?: string
}

type ServiceData = {
  name: string
  avgWait: string
  patients: Patient[]
}

// ── Données Mock ─────────────────────────────────────────────────────────────
const serviceDatabase: Record<string, ServiceData> = {
  '1': {
    name: 'Cardiologie', avgWait: '24 min',
    patients: [
      { id: 'p1', name: 'Geneviève Martin', priority: 'urgent', arrival: '08:45', reason: 'Contrôle post-opératoire', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
      { id: 'p2', name: 'Marc-Antoine Lefebvre', priority: 'regulier', arrival: '09:12', reason: "ECG d'effort", avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
      { id: 'p3', name: 'Sofia Rodriguez', priority: 'regulier', arrival: '09:30', reason: 'Suivi tension artérielle', avatar: 'https://randomuser.me/api/portraits/women/45.jpg' },
      { id: 'p4', name: 'Jean-Pierre Dubois', priority: 'regulier', arrival: '09:45', reason: 'Première consultation', avatar: 'https://randomuser.me/api/portraits/men/54.jpg' },
    ],
  },
  '2': {
    name: 'Dermatologie', avgWait: '32 min',
    patients: [
      { id: 'p1', name: 'Amina Benali', priority: 'urgent', arrival: '09:00', reason: 'Réaction allergique sévère', avatar: 'https://randomuser.me/api/portraits/women/29.jpg' },
      { id: 'p2', name: 'Thomas Girard', priority: 'regulier', arrival: '09:20', reason: 'Contrôle eczéma', avatar: 'https://randomuser.me/api/portraits/men/18.jpg' },
      { id: 'p3', name: 'Claire Moreau', priority: 'regulier', arrival: '09:40', reason: 'Suivi psoriasis', avatar: 'https://randomuser.me/api/portraits/women/53.jpg' },
      { id: 'p4', name: 'Bastien Roux', priority: 'regulier', arrival: '10:00', reason: 'Analyse lésion cutanée', avatar: 'https://randomuser.me/api/portraits/men/41.jpg' },
    ],
  },
  '3': {
    name: 'Neurologie', avgWait: '18 min',
    patients: [
      { id: 'p1', name: 'Hélène Dupont', priority: 'urgent', arrival: '09:15', reason: 'Migraine invalidante', avatar: 'https://randomuser.me/api/portraits/women/62.jpg' },
      { id: 'p2', name: 'Olivier Blanc', priority: 'regulier', arrival: '09:35', reason: 'Suivi épilepsie', avatar: 'https://randomuser.me/api/portraits/men/25.jpg' },
      { id: 'p3', name: 'Yasmine Aouf', priority: 'regulier', arrival: '09:55', reason: 'Bilan neurologique', avatar: 'https://randomuser.me/api/portraits/women/37.jpg' },
    ],
  },
  '4': {
    name: 'Pédiatrie', avgWait: '12 min',
    patients: [
      { id: 'p1', name: 'Lucas Petit', priority: 'regulier', arrival: '09:00', reason: 'Vaccination', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
      { id: 'p2', name: 'Emma Fontaine', priority: 'urgent', arrival: '09:10', reason: 'Fièvre persistante', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
      { id: 'p3', name: 'Noah Bernard', priority: 'regulier', arrival: '09:25', reason: 'Contrôle pédiatrique', avatar: 'https://randomuser.me/api/portraits/men/7.jpg' },
      { id: 'p4', name: 'Léa Carpentier', priority: 'regulier', arrival: '09:40', reason: 'Suivi post-grippe', avatar: 'https://randomuser.me/api/portraits/women/21.jpg' },
    ],
  },
  '5': {
    name: 'Ophtalmologie', avgWait: '20 min',
    patients: [
      { id: 'p1', name: 'Martine Leroy', priority: 'regulier', arrival: '09:05', reason: 'Bilan visuel annuel', avatar: 'https://randomuser.me/api/portraits/women/72.jpg' },
      { id: 'p2', name: 'Patrick Simon', priority: 'urgent', arrival: '09:30', reason: "Corps étranger dans l'œil", avatar: 'https://randomuser.me/api/portraits/men/47.jpg' },
      { id: 'p3', name: 'Julie Marchand', priority: 'regulier', arrival: '09:50', reason: 'Renouvellement lunettes', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
    ],
  },
  '6': {
    name: 'Radiologie', avgWait: '38 min',
    patients: [
      { id: 'p1', name: 'François Durand', priority: 'urgent', arrival: '08:50', reason: 'Scanner thoracique urgent', avatar: 'https://randomuser.me/api/portraits/men/60.jpg' },
      { id: 'p2', name: 'Isabelle Morel', priority: 'regulier', arrival: '09:10', reason: 'Radiographie pulmonaire', avatar: 'https://randomuser.me/api/portraits/women/57.jpg' },
      { id: 'p3', name: 'René Garnier', priority: 'regulier', arrival: '09:25', reason: 'IRM lombaire', avatar: 'https://randomuser.me/api/portraits/men/76.jpg' },
      { id: 'p4', name: 'Nadia Hamdi', priority: 'regulier', arrival: '09:40', reason: 'Échographie abdominale', avatar: 'https://randomuser.me/api/portraits/women/19.jpg' },
      { id: 'p5', name: 'Yves Leroux', priority: 'urgent', arrival: '10:00', reason: 'Fracture suspectée genou', avatar: 'https://randomuser.me/api/portraits/men/83.jpg' },
    ],
  },
}

const navItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: <IconDashboard /> },
  { id: 'new-requests', label: 'Nouvelles demandes', icon: <IconPlus /> },
  { id: 'waiting-queues', label: 'Files d\'attente', icon: <IconQueue /> },
  { id: 'ticket-verification', label: 'Vérif. tickets', icon: <IconTicket /> },
  { id: 'history', label: 'Historique', icon: <IconHistory /> },
]

// ── Composant Principal ───────────────────────────────────────────────────────
export default function DetailFile() {
  const { serviceId } = useParams<{ serviceId: string }>()
  const navigate = useNavigate()
  
  // Look up service — fallback to '1' (Cardiologie)
  const serviceKey = serviceId && serviceDatabase[serviceId] ? serviceId : '1'
  const service = serviceDatabase[serviceKey]

  const [patients, setPatients] = useState<Patient[]>(service.patients)

  const removePatient = (id: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== id))
  }

  const handleNav = (id: string) => {
    if (id === 'dashboard') navigate('/dashboard')
    if (id === 'new-requests') navigate('/requests')
    if (id === 'waiting-queues') navigate('/waiting-queues')
    if (id === 'ticket-verification') navigate('/ticket-verification')
    if (id === 'history') navigate('/history')
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
              className={`nav-item ${item.id === 'waiting-queues' ? 'nav-item--active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              <span className="nav-item__icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar__emergency">
          <button className="btn-emergency" onClick={() => navigate('/emergency-intake')}>
            Admission Urgente
          </button>
        </div>

        <div className="sidebar__footer">
          <div className="sidebar__footer-box">
            <button className="footer-link" onClick={() => navigate('/settings')}>
              <IconSettings /> <span>Paramètres</span>
            </button>
            <button className="footer-link" onClick={() => navigate('/support')}>
              <IconSupport /> <span>Assistance</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Contenu Principal ── */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="topbar__date">24 octobre 2023</div>

          <div className="topbar__search">
            <IconSearch />
            <input
              type="text"
              placeholder="Rechercher un patient ou un service..."
            />
          </div>

          <div className="topbar__actions">
            <button className="icon-btn" aria-label="Notifications" onClick={() => navigate('/notifications')}>
              <IconBell /><span className="notif-dot" />
            </button>
            <button className="icon-btn" aria-label="Aide" onClick={() => navigate('/help')}><IconHelp /></button>
            <div className="topbar__divider" />
            <div className="topbar__user">
              <div className="topbar__user-info">
                <span className="user-name">Jean Dupont</span>
                <span className="user-role">Réceptionniste</span>
              </div>
              <div className="user-avatar">JD</div>
            </div>
          </div>
        </header>

        {/* Corps de la page */}
        <div className="page-body">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <button className="breadcrumb__link" onClick={() => navigate('/waiting-queues')}>
              Files d'attente
            </button>
            <IconChevron />
            <span className="breadcrumb__current">{service.name}</span>
          </nav>

          {/* Hero */}
          <div className="df-hero">
            <div className="df-hero__left">
              <h1 className="df-title">{service.name}<span className="df-title__dot">.</span></h1>
              <p className="df-subtitle">
                Gestion en temps réel de la file d'attente du service.<br />
                Les patients admis en consultation sont retirés automatiquement de la liste.
              </p>
            </div>
            <div className="df-hero__stats">
              <div className="df-stat">
                <div className="df-stat__icon-wrap">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <div className="df-stat__value">{patients.length}</div>
                  <div className="df-stat__label">EN ATTENTE</div>
                </div>
              </div>
              <div className="df-stat">
                <div className="df-stat__icon-wrap">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <div className="df-stat__value">{service.avgWait}</div>
                  <div className="df-stat__label">TEMPS MOYEN</div>
                </div>
              </div>
            </div>
          </div>

          {/* Liste de la file */}
          <div className="queue-section">
            <div className="queue-section__header">
              <div className="queue-title-group">
                <span className="queue-dot" />
                <h2 className="queue-title">Ordre de passage</h2>
              </div>
              <div className="queue-actions">
                <button className="btn-outline"><IconFilter /> Filtrer</button>
                <button className="btn-outline"><IconPrint /> Imprimer</button>
              </div>
            </div>

            {patients.length === 0 ? (
              <div className="queue-empty">Aucun patient en attente pour ce service.</div>
            ) : (
              <div className="queue-list">
                {patients.map((patient, index) => (
                  <div key={patient.id} className="patient-card">
                    <span className="patient-card__num">{String(index + 1).padStart(2, '0')}</span>
                    
                    <div className="patient-card__avatar">
                      {patient.avatar
                        ? <img src={patient.avatar} alt={patient.name} />
                        : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      }
                    </div>

                    <div className="patient-card__info-col">
                      <div className="patient-card__name">{patient.name}</div>
                      <div className="patient-card__meta">
                        <span className={`priority-badge priority-badge--${patient.priority}`}>
                          {patient.priority === 'urgent' ? 'URGENT' : 'RÉGULIER'}
                        </span>
                        <span className="patient-card__arrival">Arrivée à {patient.arrival}</span>
                      </div>
                    </div>

                    <div className="patient-card__reason-col">
                      <span className="reason-label">MOTIF</span>
                      <span className="reason-text">{patient.reason}</span>
                    </div>

                    <button
                      className="btn-remove-icon"
                      aria-label="Retirer de la file"
                      onClick={() => removePatient(patient.id)}
                    >
                      <IconRemoveUser />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Information mise à jour */}
            <div className="queue-notice">
              <IconInfo />
              <span>Mise à jour automatique : les patients en consultation disparaissent de cette liste.</span>
            </div>
          </div>

          {/* Cartes d'action */}
          <div className="action-cards">
            <div className="action-card">
              <div className="action-card__icon"><IconCheckTask /></div>
              <h3 className="action-card__title">Ajouter manuellement</h3>
              <p className="action-card__desc">Inscrire un patient arrivé sans rendez-vous préalable.</p>
              <button className="action-card__link" onClick={() => navigate('/emergency-intake')}>Ouvrir le formulaire</button>
            </div>
            <div className="action-card">
              <div className="action-card__icon"><IconShuffle /></div>
              <h3 className="action-card__title">Réorganiser la file</h3>
              <p className="action-card__desc">Ajuster les priorités selon l'urgence clinique actuelle.</p>
              <button className="action-card__link" onClick={() => navigate('/reorganize')}>Mode édition</button>
            </div>
            <div className="action-card">
              <div className="action-card__icon"><IconBarChart /></div>
              <h3 className="action-card__title">Rapport du jour</h3>
              <p className="action-card__desc">Consulter les statistiques de passage et d'attente.</p>
              <button className="action-card__link" onClick={() => navigate('/history')}>Voir les statistiques</button>
            </div>
          </div>
        </div>

        {/* FAB */}
        <button className="fab" aria-label="Ajouter un patient">
          <IconAddUser />
        </button>
      </main>
    </div>
  )
}

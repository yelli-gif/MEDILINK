import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './EmergencyIntake.css'

import './EmergencyIntake.css'

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
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" />
    <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" /><line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
    <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" /><line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
  </svg>
)
// -- Unused IconCalendar removed --
const IconBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)
const IconHelp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)
const IconUserPlus = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="17" y1="11" x2="23" y2="11" />
  </svg>
)
const IconCheckCircle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)
const IconChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)
const IconChart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20V14" />
  </svg>
)
const IconShield = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
  </svg>
)

// ── Données ───────────────────────────────────────────────────────────────────

const navItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: <IconDashboard /> },
  { id: 'new-requests', label: 'Nouvelles demandes', icon: <IconPlus /> },
  { id: 'waiting-queues', label: "Files d'attente", icon: <IconClock /> },
  { id: 'ticket-verification', label: 'Vérif. tickets', icon: <IconTicket /> },
  { id: 'history', label: 'Historique', icon: <IconHistory /> },
]

const services = [
  { id: 'urgences', name: 'Urgences Générales', wait: '12 min d\'attente', color: '#10b981' },
  { id: 'radiologie', name: 'Radiologie', wait: '25 min d\'attente', color: '#f97316' },
  { id: 'cardiologie', name: 'Cardiologie', wait: '5 min d\'attente', color: '#6366f1' },
]

const recentPatients = [
  { id: 101, name: 'Marc Lefebvre', dept: 'Urgences', time: '14:22' },
  { id: 102, name: 'Sophie Martin', dept: 'Consultation', time: '14:15' },
]

// ── Composant Principal ───────────────────────────────────────────────────────

export default function EmergencyIntake() {
  const [activeNav, setActiveNav] = useState('')
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    service: ''
  })

  const handleNav = (id: string) => {
    setActiveNav(id)
    if (id === 'dashboard') navigate('/dashboard')
    if (id === 'new-requests') navigate('/requests')
    if (id === 'waiting-queues') navigate('/waiting-queues')
    if (id === 'ticket-verification') navigate('/ticket-verification')
    if (id === 'history') navigate('/history')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Enregistrement patient urgence :', formData)
    alert(`Admission Urgente : ${formData.prenom} ${formData.nom} ajouté à la file !`)
    setFormData({ nom: '', prenom: '', service: '' })
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
          <button className="btn-emergency btn-emergency--active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l9 10-9 10-9-10 9-10z" /><path d="M12 8v8" /><path d="M8 12h8" />
            </svg>
            Admission Urgente
          </button>
        </div>

        <div className="sidebar__footer">
          <div className="sidebar__footer-box">
            <button className="footer-link">
              <IconSettings /> <span>Paramètres</span>
            </button>
            <button className="footer-link">
              <IconSupport /> <span>Assistance</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Contenu Principal ── */}
      <main className="hi-main">
        {/* Topbar */}
        <header className="hi-topbar">
          <div className="hi-topbar__date">24 octobre 2023</div>

          <div className="hi-topbar__search">
            <IconSearch />
            <input
              type="text"
              placeholder="Rechercher un patient ou un service..."
            />
          </div>

          <div className="hi-topbar__actions">
            <button className="vt-icon-btn"><IconBell /></button>
            <button className="vt-icon-btn"><IconHelp /></button>
            <div className="topbar__divider" />
            <div className="hi-user-info">
              <span className="user-name">Jean Dupont</span>
              <span className="user-role">Réceptionniste</span>
            </div>
            <div className="hi-user-avatar">JD</div>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <div className="hi-page-body">
          
          <div className="hi-header">
            <h1 className="hi-title">Admission <span className="hi-title-hl">Urgente</span></h1>
            <p className="hi-subtitle">
              Enregistrement manuel pour les patients sans application mobile.
            </p>
          </div>

          <div className="hi-layout">
            
            <section className="hi-left-col">
              {/* Patient Registration Card */}
              <div className="hi-card hi-registration">
                <div className="hi-card-header">
                  <div className="hi-icon-box hi-icon-box--blue">
                    <IconUserPlus />
                  </div>
                  <h2 className="hi-card-title">Enregistrement Patient</h2>
                </div>
                
                <form className="hi-form" onSubmit={handleSubmit}>
                  <div className="hi-form-row">
                    <div className="hi-form-group">
                      <label>Nom</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Dupont" 
                        value={formData.nom}
                        onChange={e => setFormData({...formData, nom: e.target.value})}
                        required
                      />
                    </div>
                    <div className="hi-form-group">
                      <label>Prénom</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Jean" 
                        value={formData.prenom}
                        onChange={e => setFormData({...formData, prenom: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="hi-form-group">
                    <label>Service souhaité</label>
                    <div className="hi-select-wrap">
                      <select 
                        value={formData.service} 
                        onChange={e => setFormData({...formData, service: e.target.value})}
                        required
                      >
                        <option value="" disabled>Sélectionnez un département</option>
                        <option value="urgences">Urgences Générales</option>
                        <option value="radiologie">Radiologie</option>
                        <option value="cardiologie">Cardiologie</option>
                      </select>
                      <IconChevronDown />
                    </div>
                  </div>
                  
                  <button type="submit" className="hi-btn-submit">
                    <IconCheckCircle /> Ajouter à la file
                  </button>
                </form>
              </div>

              {/* Rappel de protocole */}
              <div className="hi-card hi-protocol">
                <h3 className="hi-protocol-title">Rappel de Protocole</h3>
                <p className="hi-protocol-text">
                  Vérifiez toujours l'index de gravité des urgences (ESI) avant l'admission manuelle des patients présentant des symptômes critiques.
                </p>
                <div className="hi-protocol-badge">
                  <IconShield /> <span>NORME DE PRÉCISION CLINIQUE</span>
                </div>
              </div>
            </section>

            <section className="hi-right-col">
              {/* Live Queue Status Card */}
              <div className="hi-card hi-queue-status">
                <div className="hi-card-header">
                  <div className="hi-icon-box hi-icon-box--blue-light">
                    <IconChart />
                  </div>
                  <h2 className="hi-card-title">Statut des files en direct</h2>
                </div>
                
                <div className="hi-queue-list">
                  {services.map(s => (
                    <div key={s.id} className="hi-queue-item">
                      <div className="hi-queue-item__left">
                        <span className="hi-dot" style={{ background: s.color }} />
                        <span className="hi-queue-name">{s.name}</span>
                      </div>
                      <span className="hi-queue-wait">{s.wait}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recently Registered Section */}
              <div className="hi-history">
                <div className="hi-history-header">
                  <h3 className="hi-history-title">Récemment enregistrés</h3>
                  <button className="hi-history-link">Voir tout l'historique</button>
                </div>
                
                <div className="hi-table-container">
                  <table className="hi-table">
                    <thead>
                      <tr>
                        <th>PATIENT</th>
                        <th>DÉPARTEMENT</th>
                        <th>HEURE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPatients.map(p => (
                        <tr key={p.id}>
                          <td className="hi-td-patient">{p.name}</td>
                          <td>
                            <span className={`hi-dept-badge hi-dept-badge--${p.dept.toLowerCase()}`}>
                              {p.dept}
                            </span>
                          </td>
                          <td className="hi-td-time">{p.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

          </div>

        </div>
      </main>
    </div>
  )
}

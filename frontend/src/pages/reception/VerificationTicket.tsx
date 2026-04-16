import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './VerificationTicket.css'

import './VerificationTicket.css'

const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

// ── Icônes ─────────────────────────────────────────────────────────────────────

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
const IconFingerprint = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 12c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5" />
    <path d="M12 8c-4.97 0-9 4.03-9 9 0 4.97 4.03 9 9 9s9-4.03 9-9c0-4.97-4.03-9-9-9" />
    <path d="M12 4c-7.18 0-13 5.82-13 13h2C1 10.93 6.07 6 12 6s11 4.93 11 11h2c0-7.18-5.82-13-13-13" />
    <path d="M12 0C4.93 0-1 5.93-1 13h2C1 7.04 5.54 2 12 2s11 5.04 11 11h2C25 5.93 19.07 0 12 0" />
  </svg>
)
const IconShieldCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
  </svg>
)
const IconShieldLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><rect x="9" y="10" width="6" height="6" rx="1" /><path d="M10 10V8a2 2 0 0 1 4 0v2" />
  </svg>
)
const IconX = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
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

// Base de données Mock avec de vrais patients cherchables
const mockTickets = [
  {
    code: 'TKT-8821-ABCD',
    ref: '#88219-A',
    priority: 'ST-02',
    nameParts: ['Elena', 'Rodriguez-', 'Santos'],
    dob: 'Date de naissance : 12 juillet 1988 (35a)',
    doctor: 'Dr. Julian Vance',
    service: 'Service de Cardiologie',
    procedure: 'ECHO-99-C',
    time: 'Prévu pour 14:30',
    avatar: 'https://i.pravatar.cc/120?img=47'
  },
  {
    code: 'TKT-1092-XYZP',
    ref: '#10920-B',
    priority: 'UR-01',
    nameParts: ['Marc', 'Antoine', 'Lefebvre'],
    dob: 'Date de naissance : 05 mai 1975 (48a)',
    doctor: 'Dr. Sarah Connor',
    service: 'Service des Urgences',
    procedure: 'SCAN-R',
    time: 'Immédiat',
    avatar: 'https://i.pravatar.cc/120?img=11'
  },
  {
    code: 'TKT-5544-LMNO',
    ref: '#55441-C',
    priority: 'ST-14',
    nameParts: ['Sofia', '', 'Laurent'],
    dob: 'Date de naissance : 22 août 1992 (31a)',
    doctor: 'Dr. Emilie Roux',
    service: 'Service Ophtalmologie',
    procedure: 'OCT-44',
    time: 'Prévu pour 10:15',
    avatar: 'https://i.pravatar.cc/120?img=5'
  }
]

export default function VerificationTicket() {
  const [activeNav, setActiveNav] = useState('ticket-verification')
  const navigate = useNavigate()

  // Par défaut, on remplit un code pour que ce soit facile à tester visuellement
  const [ticketCode, setTicketCode] = useState('TKT-8821-ABCD')
  const [searchedTicket, setSearchedTicket] = useState<typeof mockTickets[0] | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  const handleNav = (id: string) => {
    setActiveNav(id)
    if (id === 'dashboard') navigate('/dashboard')
    if (id === 'new-requests') navigate('/requests')
    if (id === 'waiting-queues') navigate('/waiting-queues')
    if (id === 'ticket-verification') navigate('/ticket-verification')
    if (id === 'history') navigate('/history')
  }

  const handleVerify = () => {
    if (!ticketCode.trim()) {
      setErrorMsg('Veuillez entrer un code de ticket.')
      setSearchedTicket(null)
      return
    }

    setIsVerifying(true)
    setErrorMsg('')
    setSearchedTicket(null)

    setTimeout(() => {
      const found = mockTickets.find(t => t.code === ticketCode.trim())
      setIsVerifying(false)
      if (found) {
        setSearchedTicket(found)
      } else {
        setErrorMsg('Aucun ticket trouvé avec ce code d\'identification.')
      }
    }, 1200)
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
          <button className="btn-emergency" onClick={() => navigate('/emergency-intake')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              <line x1="7.05" y1="7.05" x2="16.95" y2="16.95" /><line x1="16.95" y1="7.05" x2="7.05" y2="16.95" />
            </svg>
            Ajouter sur place
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
      <main className="vt-main">
        {/* Topbar */}
        <header className="vt-topbar">
          <div className="vt-topbar__date">24 octobre 2023</div>

          <div className="vt-topbar__search">
            <IconSearch />
            <input
              type="text"
              placeholder="Rechercher un patient ou un ticket..."
            />
          </div>

          <div className="vt-topbar__actions">
            <button className="vt-icon-btn" onClick={() => navigate('/notifications')}><IconBell /></button>
            <button className="vt-icon-btn" onClick={() => navigate('/help')}><IconHelp /></button>
            <div className="topbar__divider" />
            <div className="hi-user-info">
              <span className="user-name">Jean Dupont</span>
              <span className="user-role">Réceptionniste</span>
            </div>
            <div className="hi-user-avatar">JD</div>
          </div>
        </header>

        {/* Corps de la page */}
        <div className="vt-page-body">

          <div className="vt-header">
            <h1 className="vt-title">Vérification <span className="vt-title-hl">Ticket</span></h1>
            <p className="vt-subtitle">
              Entrez le code d'identification unique pour valider l'authenticité du ticket<br />et accéder aux dossiers partagés.
            </p>
          </div>

          <div className="vt-box">
            <label className="vt-label">PROTOCOLE DE SÉCURITÉ</label>
            <div className="vt-input-wrap">
              <span className="vt-input-icon"><IconFingerprint /></span>
              <input
                className="vt-input"
                type="text"
                placeholder="Exemple: TKT-8821-ABCD"
                value={ticketCode}
                onChange={(e) => setTicketCode(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleVerify() }}
              />
            </div>

            <button 
              className={`vt-btn ${isVerifying ? 'vt-btn--loading' : ''}`} 
              onClick={handleVerify}
              disabled={isVerifying}
            >
              {isVerifying ? 'Analyse en cours...' : (
                <><IconShieldCheck /> Vérifier l'authenticité</>
              )}
            </button>

            {/* Guide pour la démo */}
            <div style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', marginTop: '-4px' }}>
              Codes de test disponibles : TKT-8821-ABCD, TKT-1092-XYZP, TKT-5544-LMNO
            </div>
          </div>

          {errorMsg && (
            <div className="vt-alert" style={{ background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' }}>
              {errorMsg}
            </div>
          )}

          {!errorMsg && !searchedTicket && !isVerifying && (
            <div className="vt-alert">
              <div className="vt-alert-icon"><IconShieldLock /></div>
              <div className="vt-alert-text">
                Chiffrement de bout en bout des données cliniques.<br />
                Toutes les requêtes sont auditées pour conformité.
              </div>
            </div>
          )}

          {isVerifying && (
            <div className="vt-scanning-visual">
              <div className="vt-scan-line" />
              <p>Analyse de sécurité...</p>
            </div>
          )}

          {searchedTicket && (
            <div className="vt-card animate-slide-up" style={{ position: 'relative' }}>
              <button 
                onClick={() => { setSearchedTicket(null); setTicketCode(''); }}
                style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '-12px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid #e2e8f0',
                  background: '#fff',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  zIndex: 10
                }}
              >
                <IconX />
              </button>
              <div className="vt-card-header">
                <div className="vt-card-left">
                  <span className="vt-badge" style={{
                    background: searchedTicket.priority.startsWith('UR') ? '#fee2e2' : '#dcfce7',
                    color: searchedTicket.priority.startsWith('UR') ? '#991b1b' : '#065f46'
                  }}>
                    {searchedTicket.priority.startsWith('UR') ? 'TICKET URGENT' : 'TICKET VALIDE'}
                  </span>
                  <span className="vt-ref">Réf: {searchedTicket.ref}</span>
                </div>
                <div className="vt-card-right">
                  <span className="vt-queue-label">PRIORITÉ<br />FILE</span>
                  <span className="vt-queue-val" style={{
                    color: searchedTicket.priority.startsWith('UR') ? '#dc2626' : '#b45309'
                  }}>
                    {searchedTicket.priority.split('-')[0]}-<br />{searchedTicket.priority.split('-')[1]}
                  </span>
                </div>
              </div>

              <div className="vt-patient">
                <div className="vt-patient-avatar">
                  <img src={searchedTicket.avatar} alt={searchedTicket.nameParts.join(' ')} />
                </div>
                <div className="vt-patient-info">
                  <h2 className="vt-patient-name">
                    {searchedTicket.nameParts[0]}<br />
                    {searchedTicket.nameParts[1]}<br />
                    {searchedTicket.nameParts[2]}
                  </h2>
                  <p className="vt-patient-dob">{searchedTicket.dob}</p>
                </div>
              </div>

              <div className="vt-details">
                <div className="vt-detail-item">
                  <div className="vt-detail-label">MÉDECIN TRAITANT</div>
                  <div className="vt-detail-value">{searchedTicket.doctor}</div>
                  <div className="vt-detail-sub">{searchedTicket.service}</div>
                </div>
                <div className="vt-detail-item">
                  <div className="vt-detail-label">CODE PROCÉDURE</div>
                  <div className="vt-detail-value">{searchedTicket.procedure}</div>
                  <div className="vt-detail-sub">{searchedTicket.time}</div>
                </div>
              </div>

              <div className="vt-banner">
                <div className="vt-banner__icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 3l-4 4-4-4" />
                  </svg>
                </div>
                <div className="vt-banner__text">
                  <strong>Admission diagnostique prête</strong>
                  <p>Le patient a terminé le dépistage pré-clinique.</p>
                </div>
                <div className="vt-banner__arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </div>

              <div className="vt-card-footer">
                <button className="vt-btn-secondary">Imprimer le résumé</button>
                <button className="vt-btn-primary">Enregistrer l'arrivée</button>
              </div>
            </div>
          )}

        </div>

      </main>
    </div>
  )
}

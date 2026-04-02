import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/reception/TableauDeBord'
import NewRequests from './pages/reception/NouvellesDemandes'
import WaitingQueues from './pages/reception/FilesAttente'
import DetailFile from './pages/reception/DetailFile'
import VerificationTicket from './pages/reception/VerificationTicket'
import EmergencyIntake from './pages/reception/EmergencyIntake'

import Historique from './pages/reception/Historique'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/requests" element={<NewRequests />} />
        <Route path="/waiting-queues" element={<WaitingQueues />} />
        <Route path="/waiting-queues/:serviceId" element={<DetailFile />} />
        <Route path="/ticket-verification" element={<VerificationTicket />} />
        <Route path="/emergency-intake" element={<EmergencyIntake />} />
        <Route path="/history" element={<Historique />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

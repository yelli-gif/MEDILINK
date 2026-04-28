import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/reception/TableauDeBord'
import NewRequests from './pages/reception/NouvellesDemandes'
import WaitingQueues from './pages/reception/FilesAttente'
import DetailFile from './pages/reception/DetailFile'
import VerificationTicket from './pages/reception/VerificationTicket'
import EmergencyIntake from './pages/reception/EmergencyIntake'
import Historique from './pages/reception/Historique'
import Settings from './pages/reception/Settings'
import Support from './pages/reception/Support'
import NotificationsPage from './pages/reception/Notifications'
import HelpPage from './pages/reception/Help'
import AllocationSuggestions from './pages/reception/AllocationSuggestions'
import ReorganizeQueue from './pages/reception/ReorganizeQueue'

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
        <Route path="/settings" element={<Settings />} />
        <Route path="/support" element={<Support />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/allocation-suggestions" element={<AllocationSuggestions />} />
        <Route path="/reorganize" element={<ReorganizeQueue />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

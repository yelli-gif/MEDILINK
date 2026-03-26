import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/reception/TableauDeBord'
import NewRequests from './pages/reception/NouvellesDemandes'
import WaitingQueues from './pages/reception/FilesAttente'
import DetailFile from './pages/reception/DetailFile'
import VerificationTicket from './pages/reception/VerificationTicket'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App

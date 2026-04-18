import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { PrescriptionProvider } from "./context/PrescriptionContext";
import Connexion from "./pages/pharmacy/Connexion";
import CreationPharmacie from "./pages/pharmacy/CreationPharmacie";
import DashboardPharmacie from "./pages/pharmacy/DashboardPharmacie";
import HistoriquePharmacie from "./pages/pharmacy/HistoriquePharmacie";
import ValidationDisponibilite from "./pages/pharmacy/ValidationDisponibilite";

function App(): React.JSX.Element {
  return (
    <PrescriptionProvider>
      <Router>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<DashboardPharmacie />} />
          <Route path="/login" element={<Connexion />} />
          
          {/* Espace Pharmacien */}
          <Route path="/pharmacie/creation" element={<CreationPharmacie />} />
          <Route path="/pharmacie/dashboard" element={<DashboardPharmacie />} />
          <Route path="/pharmacie/historique" element={<HistoriquePharmacie />} />
          <Route path="/pharmacie/validation/:id" element={<ValidationDisponibilite />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </PrescriptionProvider>
  );
}

export default App;

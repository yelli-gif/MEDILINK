import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Connexion from "./pages/pharmacy/Connexion";
import CreationPharmacie from "./pages/pharmacy/CreationPharmacie";
import DashboardPharmacie from "./pages/pharmacy/DashboardPharmacie";
import OrdonnancesList from "./pages/pharmacy/OrdonnancesList";
import ValidationDisponibilite from "./pages/pharmacy/ValidationDisponibilite";
import CalendrierTraitement from "./pages/pharmacy/CalendrierTraitement";
import SuiviPrises from "./pages/patient/SuiviPrises";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Connexion />} />
        
        {/* Espace Patient */}
        <Route path="/patient/suivi" element={<SuiviPrises />} />
        <Route path="/patient/calendrier" element={<CalendrierTraitement />} />

        {/* Espace Pharmacien */}
        <Route path="/pharmacie/creation" element={<CreationPharmacie />} />
        <Route path="/pharmacie/dashboard" element={<DashboardPharmacie />} />
        <Route path="/pharmacie/ordonnances" element={<OrdonnancesList />} />
        <Route path="/pharmacie/validation" element={<ValidationDisponibilite />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

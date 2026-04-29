import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Patient Module (Base)
import Accueil from './modules/patient/Pages/Accueil';
import Connexion from './modules/patient/Pages/Connexion';
import Inscription from './modules/patient/Pages/Inscription';
import PatientDashboard from './modules/patient/Pages/PatientDashboard';
import Rdv from './modules/patient/Pages/Rdv';
import Notifications from './modules/patient/Pages/Notifications';
import Ordonnances from './modules/patient/Pages/Ordonnances';
import Traitement from './modules/patient/Pages/Traitement';
import Archives from './modules/patient/Pages/Archives';
import Profile from './modules/patient/Pages/Profile';

// Admin Module
import HospitalCreation from './modules/admin/pages/HospitalCreation';
import ServicesDashboard from './modules/admin/pages/ServicesDashboard';
import HospitalProfile from './modules/admin/pages/HospitalProfile';
import AddService from './modules/admin/pages/AddService';
import AddStaff from './modules/admin/pages/AddStaff';
import StaffDirectory from './modules/admin/pages/StaffDirectory';
import PharmacyCreation from './modules/admin/pages/PharmacyCreation';
import AdminNotifications from './modules/admin/pages/Notifications';
import PatientAdmission from './modules/admin/pages/PatientAdmission';
import AllServices from './modules/admin/pages/AllServices';
import SettingsDashboard from './modules/admin/pages/SettingsDashboard';
import HelpCenterDashboard from './modules/admin/pages/HelpCenterDashboard';
import { Layout as AdminLayout } from './modules/admin/components/Layout';

// Reception Module
import ReceptionDashboard from './modules/reception/pages/reception/TableauDeBord';
import NewRequests from './modules/reception/pages/reception/NouvellesDemandes';
import WaitingQueues from './modules/reception/pages/reception/FilesAttente';
import DetailFile from './modules/reception/pages/reception/DetailFile';
import VerificationTicket from './modules/reception/pages/reception/VerificationTicket';
import EmergencyIntake from './modules/reception/pages/reception/EmergencyIntake';
import ReceptionHistorique from './modules/reception/pages/reception/Historique';
import ReceptionSettings from './modules/reception/pages/reception/Settings';
import ReceptionSupport from './modules/reception/pages/reception/Support';
import ReceptionNotifications from './modules/reception/pages/reception/Notifications';
import ReceptionHelp from './modules/reception/pages/reception/Help';
import AllocationSuggestions from './modules/reception/pages/reception/AllocationSuggestions';
import ReorganizeQueue from './modules/reception/pages/reception/ReorganizeQueue';

// Pharmacie Module
import { PrescriptionProvider } from "./modules/pharmacie/context/PrescriptionContext";
import PharmaConnexion from "./modules/pharmacie/pages/pharmacy/Connexion";
import CreationPharmacie from "./modules/pharmacie/pages/pharmacy/CreationPharmacie";
import DashboardPharmacie from "./modules/pharmacie/pages/pharmacy/DashboardPharmacie";
import HistoriquePharmacie from "./modules/pharmacie/pages/pharmacy/HistoriquePharmacie";
import ValidationDisponibilite from "./modules/pharmacie/pages/pharmacy/ValidationDisponibilite";

// Medecin Module
import MedecinDashboard from './modules/medecin/pages/MedecinDashboard';
import PatientsList from './modules/medecin/pages/PatientsList';
import PrescriptionForm from './modules/medecin/pages/PrescriptionForm';


function App() {
  // Logic from Patient Module App.tsx
  useEffect(() => {
    const interval = setInterval(() => {
      const pendingStr = localStorage.getItem('medilink_pending_notifications');
      if (pendingStr) {
        try {
          let pending = JSON.parse(pendingStr);
          const now = Date.now();
          const toMove = pending.filter((p: any) => p.triggerAt <= now);
          if (toMove.length > 0) {
            const remaining = pending.filter((p: any) => p.triggerAt > now);
            localStorage.setItem('medilink_pending_notifications', JSON.stringify(remaining));
            
            const existingStr = localStorage.getItem('medilink_notifications');
            let existing = existingStr ? JSON.parse(existingStr) : [];
            existing = [...toMove.map((p: any) => p.notification), ...existing];
            localStorage.setItem('medilink_notifications', JSON.stringify(existing));
          }
        } catch(e) {}
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Logic from Admin Module App.tsx
  useEffect(() => {
    const loadTheme = () => {
      const prefs = JSON.parse(localStorage.getItem('sanctuary_preferences') || '{}');
      if (prefs.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    loadTheme();
    window.addEventListener('sanctuary_settings_updated', loadTheme);
    return () => window.removeEventListener('sanctuary_settings_updated', loadTheme);
  }, []);

  return (
    <PrescriptionProvider>
      <BrowserRouter>
        <Routes>
          {/* Patient Routes (Base) */}
          <Route path="/" element={<Accueil />} />
          <Route path="/connexion" element={<Connexion mode="login" />} />
          <Route path="/choix-inscription" element={<Connexion mode="register" />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/rdv" element={<Rdv />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/ordonnances" element={<Ordonnances />} />
          <Route path="/traitement" element={<Traitement />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin Routes */}
          <Route path="/admin/setup" element={<HospitalCreation />} />
          <Route path="/admin/pharmacy/setup" element={<PharmacyCreation />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={
              localStorage.getItem('sanctuary_hospital_config') 
                ? <Navigate to="/admin/profile" replace /> 
                : <Navigate to="/admin/setup" replace />
            } />
            <Route path="profile" element={<HospitalProfile />} />
            <Route path="services" element={<ServicesDashboard />} />
            <Route path="services/add" element={<AddService />} />
            <Route path="services/all" element={<AllServices />} />
            <Route path="staff" element={<StaffDirectory />} />
            <Route path="staff/add" element={<AddStaff />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="admissions" element={<PatientAdmission />} />
            <Route path="settings" element={<SettingsDashboard />} />
            <Route path="help" element={<HelpCenterDashboard />} />
          </Route>

          {/* Reception Routes */}
          <Route path="/reception" element={<Navigate to="/reception/dashboard" replace />} />
          <Route path="/reception/dashboard" element={<ReceptionDashboard />} />
          <Route path="/reception/requests" element={<NewRequests />} />
          <Route path="/reception/waiting-queues" element={<WaitingQueues />} />
          <Route path="/reception/waiting-queues/:serviceId" element={<DetailFile />} />
          <Route path="/reception/ticket-verification" element={<VerificationTicket />} />
          <Route path="/reception/emergency-intake" element={<EmergencyIntake />} />
          <Route path="/reception/history" element={<ReceptionHistorique />} />
          <Route path="/reception/settings" element={<ReceptionSettings />} />
          <Route path="/reception/support" element={<ReceptionSupport />} />
          <Route path="/reception/notifications" element={<ReceptionNotifications />} />
          <Route path="/reception/help" element={<ReceptionHelp />} />
          <Route path="/reception/allocation-suggestions" element={<AllocationSuggestions />} />
          <Route path="/reception/reorganize" element={<ReorganizeQueue />} />

          {/* Pharmacie Routes */}
          <Route path="/pharmacie/login" element={<PharmaConnexion />} />
          <Route path="/pharmacie/creation" element={<CreationPharmacie />} />
          <Route path="/pharmacie/dashboard" element={<DashboardPharmacie />} />
          <Route path="/pharmacie/historique" element={<HistoriquePharmacie />} />
          <Route path="/pharmacie/validation/:id" element={<ValidationDisponibilite />} />
          <Route path="/pharmacie" element={<Navigate to="/pharmacie/dashboard" replace />} />
          
          {/* Medecin Routes */}
          <Route path="/medecin/dashboard" element={<MedecinDashboard />} />
          <Route path="/medecin/patients" element={<PatientsList />} />
          <Route path="/medecin/ordonnances" element={<PrescriptionForm />} />
          <Route path="/medecin" element={<Navigate to="/medecin/dashboard" replace />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </PrescriptionProvider>
  );
}

export default App;

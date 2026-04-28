import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HospitalCreation from './pages/HospitalCreation';
import ServicesDashboard from './pages/ServicesDashboard';
import HospitalProfile from './pages/HospitalProfile';
import AddService from './pages/AddService';
import AddStaff from './pages/AddStaff';
import StaffDirectory from './pages/StaffDirectory';
import PharmacyCreation from './pages/PharmacyCreation';
import Notifications from './pages/Notifications';
import PatientAdmission from './pages/PatientAdmission';
import AllServices from './pages/AllServices';
import SettingsDashboard from './pages/SettingsDashboard';
import HelpCenterDashboard from './pages/HelpCenterDashboard';
import { Layout } from './components/Layout';
import { useEffect } from 'react';

function App() {
  
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
    <BrowserRouter>
      <Routes>
        <Route path="/setup" element={<HospitalCreation />} />
        <Route path="/pharmacy/setup" element={<PharmacyCreation />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/setup" replace />} />
          <Route path="profile" element={<HospitalProfile />} />
          <Route path="services" element={<ServicesDashboard />} />
          <Route path="services/add" element={<AddService />} />
          <Route path="services/all" element={<AllServices />} />
          <Route path="staff" element={<StaffDirectory />} />
          <Route path="staff/add" element={<AddStaff />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="admissions" element={<PatientAdmission />} />
          <Route path="settings" element={<SettingsDashboard />} />
          <Route path="help" element={<HelpCenterDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

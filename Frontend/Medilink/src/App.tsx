import { useState, useEffect } from 'react';
import Accueil from './Pages/Accueil'
import Connexion from './Pages/Connexion'
import Inscription from './Pages/Inscription'
import PatientDashboard from './Pages/PatientDashboard'
import Rdv from './Pages/Rdv'
import Notifications from './Pages/Notifications'
import Ordonnances from './Pages/Ordonnances'
import Traitement from './Pages/Traitement'
import Archives from './Pages/Archives'
import Profile from './Pages/Profile'

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash);

  useEffect(() => {
    const onLocationChange = () => setCurrentPath(window.location.hash);
    window.addEventListener('hashchange', onLocationChange);
    return () => window.removeEventListener('hashchange', onLocationChange);
  }, []);

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

  const basePath = currentPath.split('?')[0];

  if (basePath === '#connexion') {
    return <Connexion mode="login" />;
  }
  if (basePath === '#choix-inscription') {
    return <Connexion mode="register" />;
  }
  if (basePath === '#inscription') {
    return <Inscription />;
  }
  if (basePath === '#patient-dashboard') {
    return <PatientDashboard />;
  }
  if (basePath === '#rdv') {
    return <Rdv />;
  }
  if (basePath === '#notifications') {
    return <Notifications />;
  }
  if (basePath === '#ordonnances') {
    return <Ordonnances />;
  }
  if (basePath === '#traitement') {
    return <Traitement />;
  }
  if (basePath === '#archives') {
    return <Archives />;
  }
  if (basePath === '#profile') {
    return <Profile />;
  }

  return <Accueil />;
}

export default App

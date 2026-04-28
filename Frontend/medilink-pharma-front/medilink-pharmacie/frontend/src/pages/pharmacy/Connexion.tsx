import React from 'react';
import { Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Connexion(): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="size-full min-h-screen bg-clinical-bg flex flex-col font-sans items-center justify-center p-6">
      <div className="bg-clinical-surface rounded-3xl shadow-clinical border border-clinical-border p-8 w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold text-clinical-text-dark mb-2">Medilink</h1>
        <p className="text-clinical-text-muted mb-8">Testez les interfaces du Lot 5</p>

        <div className="space-y-4">
          <button 
            onClick={() => navigate('/pharmacie/creation')}
            className="w-full bg-clinical-surface hover:bg-clinical-surface-hover border border-clinical-border text-clinical-text-dark font-bold py-3 px-6 rounded-2xl flex items-center justify-between shadow-sm transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 p-2 rounded-xl">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-left text-sm">
                Créer sa <span className="text-purple-600">Pharmacie</span>
              </span>
            </div>
          </button>

          <button 
            onClick={() => navigate('/pharmacie/dashboard')}
            className="w-full bg-clinical-surface hover:bg-clinical-surface-hover border border-clinical-border text-clinical-text-dark font-bold py-3 px-6 rounded-2xl flex items-center justify-between shadow-sm transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="bg-orange-50 p-2 rounded-xl">
                <Activity className="w-5 h-5 text-orange-500" />
              </div>
              <span className="text-left text-sm">
                Dashboard <span className="text-orange-500">Pharmacien</span>
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

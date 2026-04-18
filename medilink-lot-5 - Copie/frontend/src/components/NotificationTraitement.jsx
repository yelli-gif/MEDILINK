import React, { useState } from 'react';
import { Clock, X, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotificationTraitement({ message, link, priseId }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-bounce-short w-80 md:w-96 max-w-[calc(100vw-32px)]">
      <div className="bg-clinical-surface rounded-2xl shadow-clinical overflow-hidden border border-clinical-border">
        <div className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-bold text-clinical-text-dark">Rappel de médicament</h3>
                <button onClick={() => setVisible(false)} className="text-gray-400 hover:text-clinical-text-dark transition -mt-1 -mr-2 p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-clinical-text-muted mb-2">{message}</p>
              
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-clinical-border">
                <p className="text-xs text-clinical-text-muted font-medium">{new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}</p>
                {link && (
                  <Link to={link} className="text-clinical-primary text-sm font-bold inline-flex items-center gap-1 hover:text-clinical-primary-dark transition">
                    <CheckCircle className="w-4 h-4" /> J'ai pris
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

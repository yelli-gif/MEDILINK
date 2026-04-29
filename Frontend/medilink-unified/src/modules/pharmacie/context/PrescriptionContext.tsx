import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { HistoryRecord } from '../types';
import { MOCK_PRESCRIPTIONS } from '../data/mockPrescriptions';

interface PrescriptionContextType {
  prescriptions: HistoryRecord[];
  updatePrescriptionStatus: (id: string, status: HistoryRecord['status']) => void;
  getPrescriptionById: (id: string) => HistoryRecord | undefined;
}

const PrescriptionContext = createContext<PrescriptionContextType | undefined>(undefined);

export function PrescriptionProvider({ children }: { children: ReactNode }) {
  const [prescriptions, setPrescriptions] = useState<HistoryRecord[]>([]);

  const updatePrescriptionStatus = (id: string, status: HistoryRecord['status']) => {
    setPrescriptions(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const getPrescriptionById = (id: string) => {
    return prescriptions.find(p => p.id === id);
  };

  return (
    <PrescriptionContext.Provider value={{ prescriptions, updatePrescriptionStatus, getPrescriptionById }}>
      {children}
    </PrescriptionContext.Provider>
  );
}

export function usePrescriptions() {
  const context = useContext(PrescriptionContext);
  if (context === undefined) {
    throw new Error('usePrescriptions must be used within a PrescriptionProvider');
  }
  return context;
}

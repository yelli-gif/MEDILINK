export interface Prescription {
  id: string;
  patient: string;
  doctor: string;
  date: string;
  time: string;
  status: 'En Attente' | 'Partiel' | 'Prêt' | 'Validé' | 'Refusé';
  color?: string;
  notes?: string;
  specialty?: string;
  adherence?: number;
}

export interface HistoryRecord extends Prescription {
  medication: string;
  medicationList: {
    name: string;
    dosage: string;
    instructions: string;
  }[];
  doctorSignature?: string;
  diagnosis?: string;
}

export interface User {
  name: string;
  role: string;
  avatar?: string;
}

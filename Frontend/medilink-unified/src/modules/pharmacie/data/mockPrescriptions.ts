import type { HistoryRecord } from '../types';

export const MOCK_PRESCRIPTIONS: HistoryRecord[] = [
  { 
    id: 'RX-90210', 
    patient: 'Jean-Pierre Dubois', 
    date: '16 Avr. 2026', 
    time: '10:42', 
    medication: 'Ramipril 5mg', 
    doctor: 'Dr. Sarah Lemoine', 
    status: 'Validé', 
    specialty: 'Cardiologie',
    diagnosis: 'Hypertension artérielle stade 1, stable sous traitement.',
    color: 'bg-emerald-50 text-emerald-700',
    medicationList: [
      { name: 'Ramipril', dosage: '5mg', instructions: '1 comprimé par jour, le matin à jeun.' },
      { name: 'Bisoprolol', dosage: '2.5mg', instructions: '1/2 comprimé par jour si FC > 80.' }
    ]
  },
  { 
    id: 'RX-88432', 
    patient: 'Marie-Claire Fontaine', 
    date: '16 Avr. 2026', 
    time: '09:12', 
    medication: 'Loratadine 10mg', 
    doctor: 'Dr. Marc Belin', 
    status: 'En Attente', 
    specialty: 'Dermatologie',
    diagnosis: 'Rhinite allergique saisonnière sévère avec complications cutanées.',
    color: 'bg-amber-50 text-amber-700',
    medicationList: [
      { name: 'Loratadine', dosage: '10mg', instructions: '1 comprimé au coucher pendant 1 mois.' },
      { name: 'Fluticasone', dosage: '50µg', instructions: '2 pulvérisations dans chaque narine le matin.' }
    ]
  },
  { 
    id: 'RX-77291', 
    patient: 'Lucas Bernard', 
    date: '15 Avr. 2026', 
    time: '16:30', 
    medication: 'Paracétamol 1g', 
    doctor: 'Dr. Elena Rossi', 
    status: 'Validé', 
    specialty: 'Généraliste',
    diagnosis: 'Syndrome grippal avec fièvre isolée et courbatures.',
    color: 'bg-emerald-50 text-emerald-700',
    medicationList: [
      { name: 'Paracétamol', dosage: '1g', instructions: '1 comprimé toutes les 6h en cas de douleurs.' }
    ]
  },
  { 
    id: 'RX-66321', 
    patient: 'Sophie Martin', 
    date: '14 Avr. 2026', 
    time: '11:20', 
    medication: 'Amoxicilline 500mg', 
    doctor: 'Dr. Jean Dupont', 
    status: 'Refusé', 
    specialty: 'Infection',
    diagnosis: 'Angine suspectée, test TDR négatif. Pas d\'antibiotique requis.',
    color: 'bg-rose-50 text-rose-700',
    medicationList: [
      { name: 'Amoxicilline', dosage: '500mg', instructions: '1 gélule matin, midi et soir pendant 6 jours.' }
    ]
  },
  { 
    id: 'RX-55421', 
    patient: 'Antoine Michaud', 
    date: '18 Avr. 2026', 
    time: '08:15', 
    medication: 'Ibuprofène 400mg', 
    doctor: 'Dr. Sylvie Roches', 
    status: 'En Attente', 
    specialty: 'Traumatologie',
    diagnosis: 'Entorse cheville droite stade 2.',
    color: 'bg-amber-50 text-amber-700',
    medicationList: [
      { name: 'Ibuprofène', dosage: '400mg', instructions: '1 comprimé au cours du repas, max 3/jour.' },
      { name: 'Pommade Diclofénac', dosage: '1%', instructions: 'Application locale 2 fois par jour.' }
    ]
  },
  { 
    id: 'RX-44390', 
    patient: 'Emma Laurent', 
    date: '18 Avr. 2026', 
    time: '14:22', 
    medication: 'Salbutamol 100µg', 
    doctor: 'Dr. Philippe Cohen', 
    status: 'En Attente', 
    specialty: 'Pneumologie',
    diagnosis: 'Asthme à l\'effort, suivi trimestriel.',
    color: 'bg-amber-50 text-amber-700',
    medicationList: [
      { name: 'Salbutamol', dosage: '100µg', instructions: '1 à 2 bouffées avant l\'effort.' },
      { name: 'Béclométasone', dosage: '250µg', instructions: '2 bouffées matin et soir.' }
    ]
  },
  { 
    id: 'RX-33291', 
    patient: 'Karim Haddad', 
    date: '17 Avr. 2026', 
    time: '11:05', 
    medication: 'Metformine 850mg', 
    doctor: 'Dr. Léa Petit', 
    status: 'Validé', 
    specialty: 'Endocrinologie',
    diagnosis: 'Diabète type 2.',
    color: 'bg-emerald-50 text-emerald-700',
    medicationList: [
      { name: 'Metformine', dosage: '850mg', instructions: '1 comprimé à la fin du petit-déjeuner et du dîner.' }
    ]
  },
  { 
    id: 'RX-22100', 
    patient: 'Juliette Moreau', 
    date: '18 Avr. 2026', 
    time: '15:45', 
    medication: 'Pantoprazole 40mg', 
    doctor: 'Dr. Alain Vasseur', 
    status: 'En Attente', 
    specialty: 'Gastroentérologie',
    diagnosis: 'Reflux gastro-œsophagien chronique.',
    color: 'bg-amber-50 text-amber-700',
    medicationList: [
      { name: 'Pantoprazole', dosage: '40mg', instructions: '1 comprimé le matin à jeun pendant 28 jours.' },
      { name: 'Gaviscon', dosage: '10ml', instructions: '1 sachet après les repas si brûlures.' }
    ]
  },
  { 
    id: 'RX-11009', 
    patient: 'Robert Lambert', 
    date: '14 Avr. 2026', 
    time: '18:10', 
    medication: 'Diazépam 10mg', 
    doctor: 'Dr. Hélène Fortin', 
    status: 'Refusé', 
    specialty: 'Psychiatrie',
    diagnosis: 'Anxiété. Incompatibilité ou refus de délivrance par le pharmacien.',
    color: 'bg-rose-50 text-rose-700',
    medicationList: [
      { name: 'Diazépam', dosage: '10mg', instructions: '1/2 comprimé le soir au coucher en cas de crise.' }
    ]
  }
];

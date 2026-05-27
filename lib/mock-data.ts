export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  patients: number;
  bio: string;
  hours: string;
  languages: string[];
  availableToday: boolean;
  experience: number;
}

export interface Service {
  id: string;
  category: string;
  name: string;
  description: string;
  cost: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface MedicalRecord {
  id: string;
  type: string;
  date: string;
  provider: string;
  notes: string;
}

export interface Prescription {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribed: string;
  refillsLeft: number;
}

export interface VitalSign {
  label: string;
  value: string;
  unit: string;
  status: 'normal' | 'elevated' | 'low';
  lastChecked: string;
}

// Doctors Data
export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    specialty: 'General Practice',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&scale=80',
    rating: 4.9,
    patients: 1240,
    bio: 'Board-certified physician with 12+ years of experience in comprehensive healthcare management and preventive medicine.',
    hours: '8:00 AM - 6:00 PM',
    languages: ['English', 'Spanish'],
    availableToday: true,
    experience: 12,
  },
  {
    id: '2',
    name: 'Dr. James Chen',
    specialty: 'Cardiology',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James&scale=80',
    rating: 4.8,
    patients: 980,
    bio: 'Renowned cardiologist specializing in preventive care and advanced cardiac diagnostics with fellowship training.',
    hours: '9:00 AM - 5:30 PM',
    languages: ['English', 'Mandarin'],
    availableToday: false,
    experience: 15,
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrics',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily&scale=80',
    rating: 4.95,
    patients: 750,
    bio: 'Compassionate pediatrician dedicated to child health and development with expertise in vaccinations and growth monitoring.',
    hours: '8:30 AM - 5:00 PM',
    languages: ['English', 'Spanish', 'French'],
    availableToday: true,
    experience: 10,
  },
  {
    id: '4',
    name: 'Dr. Michael Foster',
    specialty: 'Dentistry',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael&scale=80',
    rating: 4.7,
    patients: 890,
    bio: 'Experienced dental specialist offering both cosmetic and restorative dentistry with latest technology.',
    hours: '7:30 AM - 4:30 PM',
    languages: ['English', 'German'],
    availableToday: true,
    experience: 14,
  },
  {
    id: '5',
    name: 'Dr. Lisa Anderson',
    specialty: 'General Practice',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa&scale=80',
    rating: 4.85,
    patients: 1100,
    bio: 'Holistic healthcare provider focusing on patient education and long-term wellness strategies.',
    hours: '8:00 AM - 6:00 PM',
    languages: ['English', 'Italian'],
    availableToday: true,
    experience: 11,
  },
  {
    id: '6',
    name: 'Dr. David Wu',
    specialty: 'Cardiology',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David&scale=80',
    rating: 4.9,
    patients: 1050,
    bio: 'Leading cardiac specialist with advanced training in interventional cardiology and heart failure management.',
    hours: '9:00 AM - 5:30 PM',
    languages: ['English', 'Mandarin', 'Japanese'],
    availableToday: false,
    experience: 16,
  },
];

// Services Data
export const services: Service[] = [
  {
    id: '1',
    category: 'General Care',
    name: 'Comprehensive Check-up',
    description: 'Complete physical examination including blood work, vital signs assessment, and health consultation.',
    cost: '$150',
    icon: 'Heart',
  },
  {
    id: '2',
    category: 'General Care',
    name: 'Annual Physical Exam',
    description: 'Thorough annual health assessment with preventive screenings recommended for your age group.',
    cost: '$200',
    icon: 'Activity',
  },
  {
    id: '3',
    category: 'General Care',
    name: 'Vaccination Service',
    description: 'Complete immunization services including flu shots, COVID-19, and routine childhood vaccines.',
    cost: '$75-150',
    icon: 'Syringe',
  },
  {
    id: '4',
    category: 'Dentistry',
    name: 'Dental Cleaning',
    description: 'Professional cleaning, plaque removal, and oral health assessment by certified hygienist.',
    cost: '$120',
    icon: 'Tooth',
  },
  {
    id: '5',
    category: 'Dentistry',
    name: 'Root Canal Treatment',
    description: 'Advanced endodontic treatment to save and restore infected or damaged teeth.',
    cost: '$800-1200',
    icon: 'AlertCircle',
  },
  {
    id: '6',
    category: 'Dentistry',
    name: 'Teeth Whitening',
    description: 'Professional cosmetic whitening treatment for a brighter, more confident smile.',
    cost: '$300',
    icon: 'Sparkles',
  },
  {
    id: '7',
    category: 'Pediatrics',
    name: 'Child Development Check',
    description: 'Comprehensive developmental screening and milestone assessment for children ages 0-5.',
    cost: '$180',
    icon: 'Baby',
  },
  {
    id: '8',
    category: 'Pediatrics',
    name: 'Allergy Testing',
    description: 'Comprehensive allergy panel testing to identify environmental and food allergies.',
    cost: '$250',
    icon: 'AlertTriangle',
  },
  {
    id: '9',
    category: 'Pediatrics',
    name: 'Growth Monitoring',
    description: 'Regular monitoring of growth and development with nutritional guidance.',
    cost: '$100',
    icon: 'TrendingUp',
  },
  {
    id: '10',
    category: 'Cardiology',
    name: 'ECG/EKG Test',
    description: 'Electrocardiogram to assess heart rhythm and electrical activity.',
    cost: '$300',
    icon: 'Heart',
  },
  {
    id: '11',
    category: 'Cardiology',
    name: 'Echocardiogram',
    description: 'Advanced ultrasound imaging of the heart to evaluate structure and function.',
    cost: '$600',
    icon: 'Activity',
  },
  {
    id: '12',
    category: 'Cardiology',
    name: 'Stress Test',
    description: 'Cardiac stress testing under controlled conditions to assess heart health.',
    cost: '$500',
    icon: 'Zap',
  },
];

// Testimonials Data
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Margaret Thompson',
    role: 'Patient for 5 years',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Margaret&scale=80',
    content: 'The care I received at MediCare has been exceptional. Dr. Mitchell truly listens and takes time to explain everything thoroughly. I feel heard and valued as a patient.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Robert Martinez',
    role: 'Patient for 3 years',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert&scale=80',
    content: 'Outstanding facilities and professional staff. My cardiac health is in excellent hands with Dr. Chen. The booking system is incredibly convenient and responsive.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Victoria Zhang',
    role: 'Parent, 2 children',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Victoria&scale=80',
    content: 'Dr. Rodriguez is wonderful with my children. She explains everything in a way they understand and makes appointments stress-free. Highly recommended for pediatric care.',
    rating: 5,
  },
  {
    id: '4',
    name: 'James Peterson',
    role: 'Patient for 2 years',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James&scale=80',
    content: 'The entire MediCare team demonstrates genuine care and professionalism. From booking to treatment, everything runs smoothly. Best medical experience I\'ve had.',
    rating: 4.5,
  },
];

// Medical Records Data
export const medicalRecords: MedicalRecord[] = [
  {
    id: '1',
    type: 'General Checkup',
    date: '2024-05-15',
    provider: 'Dr. Sarah Mitchell',
    notes: 'Annual physical examination completed. All vitals normal. Recommended continued exercise routine and healthy diet. Follow-up in 12 months.',
  },
  {
    id: '2',
    type: 'Lab Results',
    date: '2024-05-12',
    provider: 'Lab Services',
    notes: 'Blood work completed. Cholesterol levels normal. Glucose levels within healthy range. No concerning findings.',
  },
  {
    id: '3',
    type: 'Vaccination',
    date: '2024-04-22',
    provider: 'Nurse Patricia Johnson',
    notes: 'Influenza vaccine administered. No adverse reactions. Valid for 2024-2025 season.',
  },
  {
    id: '4',
    type: 'Dental Cleaning',
    date: '2024-03-10',
    provider: 'Dr. Michael Foster',
    notes: 'Professional cleaning completed. Slight plaque buildup on lower teeth. Recommend increased flossing frequency.',
  },
];

// Prescriptions Data
export const prescriptions: Prescription[] = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10 mg',
    frequency: 'Once daily',
    prescribed: '2024-01-15',
    refillsLeft: 2,
  },
  {
    id: '2',
    name: 'Atorvastatin',
    dosage: '20 mg',
    frequency: 'Once daily',
    prescribed: '2024-01-15',
    refillsLeft: 3,
  },
  {
    id: '3',
    name: 'Metformin',
    dosage: '500 mg',
    frequency: 'Twice daily',
    prescribed: '2024-02-01',
    refillsLeft: 1,
  },
];

// Vital Signs Data
export const vitalSigns: VitalSign[] = [
  {
    label: 'Blood Pressure',
    value: '120/80',
    unit: 'mmHg',
    status: 'normal',
    lastChecked: '2024-05-15',
  },
  {
    label: 'Heart Rate',
    value: '72',
    unit: 'bpm',
    status: 'normal',
    lastChecked: '2024-05-15',
  },
  {
    label: 'Temperature',
    value: '98.6',
    unit: '°F',
    status: 'normal',
    lastChecked: '2024-05-15',
  },
  {
    label: 'Blood Glucose',
    value: '95',
    unit: 'mg/dL',
    status: 'normal',
    lastChecked: '2024-05-10',
  },
  {
    label: 'Cholesterol',
    value: '185',
    unit: 'mg/dL',
    status: 'normal',
    lastChecked: '2024-05-12',
  },
  {
    label: 'BMI',
    value: '23.5',
    unit: 'kg/m²',
    status: 'normal',
    lastChecked: '2024-05-15',
  },
];

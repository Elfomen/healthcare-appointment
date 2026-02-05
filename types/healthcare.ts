export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  reviewCount: number;
  experience: number;
  languages: string[];
  availableToday: boolean;
  nextAvailable: string;
  consultationFee: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  duration: number;
  price: number;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  period: "morning" | "afternoon" | "evening";
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctor: Doctor;
  service: Service;
  date: Date;
  timeSlot: TimeSlot;
  status: "upcoming" | "completed" | "cancelled";
  notes?: string;
  confirmationCode: string;
}

export interface PatientFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalHistory?: string;
  currentMedications?: string;
  allergies?: string;
  reasonForVisit: string;
}

export type BookingStep =
  | "service"
  | "doctor"
  | "schedule"
  | "details"
  | "confirm";

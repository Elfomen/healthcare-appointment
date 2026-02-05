import type {
  Doctor,
  Service,
  TimeSlot,
  Appointment,
} from "@/types/healthcare";

export const services: Service[] = [
  {
    id: "1",
    name: "General Consultation",
    description: "Comprehensive health check-up and consultation",
    icon: "stethoscope",
    duration: 30,
    price: 75,
  },
  {
    id: "2",
    name: "Dental Care",
    description: "Routine dental examination and cleaning",
    icon: "tooth",
    duration: 45,
    price: 120,
  },
  {
    id: "3",
    name: "Eye Examination",
    description: "Complete vision and eye health assessment",
    icon: "eye",
    duration: 30,
    price: 90,
  },
  {
    id: "4",
    name: "Cardiology",
    description: "Heart health evaluation and ECG",
    icon: "heart",
    duration: 60,
    price: 150,
  },
  {
    id: "5",
    name: "Pediatrics",
    description: "Child health check-up and vaccinations",
    icon: "baby",
    duration: 30,
    price: 80,
  },
  {
    id: "6",
    name: "Dermatology",
    description: "Skin health consultation and treatment",
    icon: "skin",
    duration: 30,
    price: 100,
  },
];

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Mitchell",
    specialty: "General Physician",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 234,
    experience: 15,
    languages: ["English", "Spanish"],
    availableToday: true,
    nextAvailable: "Today, 2:00 PM",
    consultationFee: 75,
  },
  {
    id: "2",
    name: "Dr. James Wilson",
    specialty: "Cardiologist",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 189,
    experience: 20,
    languages: ["English"],
    availableToday: false,
    nextAvailable: "Tomorrow, 10:00 AM",
    consultationFee: 150,
  },
  {
    id: "3",
    name: "Dr. Emily Chen",
    specialty: "Pediatrician",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 312,
    experience: 12,
    languages: ["English", "Mandarin"],
    availableToday: true,
    nextAvailable: "Today, 4:30 PM",
    consultationFee: 80,
  },
  {
    id: "4",
    name: "Dr. Michael Brown",
    specialty: "Dermatologist",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face",
    rating: 4.7,
    reviewCount: 156,
    experience: 10,
    languages: ["English", "French"],
    availableToday: true,
    nextAvailable: "Today, 3:00 PM",
    consultationFee: 100,
  },
  {
    id: "5",
    name: "Dr. Lisa Anderson",
    specialty: "Ophthalmologist",
    image:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=300&h=300&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 201,
    experience: 18,
    languages: ["English"],
    availableToday: false,
    nextAvailable: "Wed, 9:00 AM",
    consultationFee: 90,
  },
  {
    id: "6",
    name: "Dr. Robert Kim",
    specialty: "Dentist",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 278,
    experience: 14,
    languages: ["English", "Korean"],
    availableToday: true,
    nextAvailable: "Today, 11:00 AM",
    consultationFee: 120,
  },
];

export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const morningTimes = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
  ];
  const afternoonTimes = [
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];
  const eveningTimes = ["17:00", "17:30", "18:00", "18:30"];

  morningTimes.forEach((time, index) => {
    slots.push({
      id: `morning-${index}`,
      time,
      available: Math.random() > 0.3,
      period: "morning",
    });
  });

  afternoonTimes.forEach((time, index) => {
    slots.push({
      id: `afternoon-${index}`,
      time,
      available: Math.random() > 0.3,
      period: "afternoon",
    });
  });

  eveningTimes.forEach((time, index) => {
    slots.push({
      id: `evening-${index}`,
      time,
      available: Math.random() > 0.5,
      period: "evening",
    });
  });

  return slots;
};

export const sampleAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "John Doe",
    patientEmail: "john@example.com",
    patientPhone: "(555) 123-4567",
    doctor: doctors[0],
    service: services[0],
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    timeSlot: { id: "1", time: "10:00", available: false, period: "morning" },
    status: "upcoming",
    confirmationCode: "MC-2024-001234",
  },
  {
    id: "2",
    patientName: "John Doe",
    patientEmail: "john@example.com",
    patientPhone: "(555) 123-4567",
    doctor: doctors[2],
    service: services[4],
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    timeSlot: { id: "2", time: "14:30", available: false, period: "afternoon" },
    status: "upcoming",
    confirmationCode: "MC-2024-001235",
  },
  {
    id: "3",
    patientName: "John Doe",
    patientEmail: "john@example.com",
    patientPhone: "(555) 123-4567",
    doctor: doctors[1],
    service: services[3],
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    timeSlot: { id: "3", time: "09:00", available: false, period: "morning" },
    status: "completed",
    confirmationCode: "MC-2024-001200",
  },
];

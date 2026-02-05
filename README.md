# **🩺 MediBook Frontend - Patient Appointment System**

A modern, patient-focused medical appointment booking system frontend. Built with Next.js 15, TypeScript, and Tailwind CSS 4 for seamless healthcare scheduling.

## **✨ Live Demo**

🔗 **Demo URL:** [https://healthcare-appointment.fomenayann.com](https://healthcare-appointment.fomenayann.com)

## **🎯 Features**

### **📅 Appointment Management**

- **Book Appointments**: Find doctors, select time slots, book instantly
- **View Schedule**: Calendar view of upcoming appointments
- **Reschedule**: Change appointment times easily
- **Cancel Appointments**: Cancel with one click
- **Reminders**: Email/SMS notifications (simulated)

### **👤 Patient Features**

- **Profile Management**: Update personal information
- **Medical History**: View past appointments & records
- **Favorite Doctors**: Save preferred healthcare providers
- **Notifications**: Real-time updates on appointment status

### **🩺 Doctor Directory**

- **Search & Filter**: Find doctors by specialty, location, availability
- **Doctor Profiles**: View qualifications, reviews, availability
- **Ratings & Reviews**: See patient feedback
- **Availability Calendar**: Real-time slot availability

## **🚀 Quick Start**

### **Prerequisites**

- Node.js 18.17 or later
- Git

### **Installation**

```bash
# Clone the repository
git clone https://github.com/Elfomen/healthcare-appointment.git
cd healthcare-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## **🛠️ Tech Stack**

### **Core Technologies**

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS 4** - Utility-first CSS framework

## **🎨 UI Components Preview**

### **Key Components**

- **`<AppointmentCalendar />`** - Interactive booking calendar
- **`<DoctorCard />`** - Doctor profile cards
- **`<TimeSlotPicker />`** - Time slot selection

### **Design System**

- **Colors**: Healthcare blues (#3B82F6), calming greens (#10B981), clean whites
- **Typography**: Inter font family
- **Spacing**: 4px base unit system
- **Icons**: Lucide React icon set
- **Responsive**: Mobile-first, fully responsive

## **📱 Pages Overview**

### **1. Homepage (`/`)**

- Hero section with appointment CTA
- Featured doctors
- How it works guide
- Patient testimonials

### **2. Doctor Directory (`/doctors`)**

- Search and filter doctors
- Grid/List view toggle
- Sort by specialty, rating, availability
- Doctor profile cards

### **3. Book Appointment (`/appointments/book`)**

- Step 1: Select doctor
- Step 2: Choose date & time
- Step 3: Add details & confirm
- Real-time availability checking

### **4. My Appointments (`/appointments`)**

- Upcoming appointments
- Past appointments
- Cancellation/rescheduling options
- Calendar view

## **🔧 Development**

### **Available Scripts**

```bash
# Development
npm run dev           # Start development server
npm run build         # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # ESLint
npm run format       # Prettier formatting
npm run type-check   # TypeScript type checking

```

### **Mock Data & API Simulation**

The app uses mock data for demonstration. To customize:

```typescript
// lib/api/mock-data.ts
export const mockDoctors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    rating: 4.9,
    availableSlots: ["9:00 AM", "10:00 AM", "2:00 PM"],
    // ... more properties
  },
  // ... more doctors
];
```

## **🎯 Getting Started as Developer**

### **1. Clone and Install**

```bash
git clone https://github.com/Elfomen/healthcare-appointment.git
cd medibook-frontend
npm install
```

### **3. Run Development Server**

```bash
npm run dev
```

### **4. Build for Production**

```bash
npm run build
npm start
```

## **🚀 Deployment**

### **Deploy to Vercel (Recommended)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/medibook-frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### **Deploy to Netlify**

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/medibook-frontend)

### **Build Output**

```bash
npm run build
# Outputs to: /.next
```

## **🎨 Customization Guide**

### **Change Colors**

```css
/* styles/globals.css */
@theme {
  --color-primary: #2563eb; /* Change primary blue */
  --color-secondary: #059669; /* Change secondary green */
}
```

### **Add New Page**

1. Create folder in `app/` (e.g., `app/telemedicine/`)
2. Add `page.tsx` for the page content
3. Add `layout.tsx` if needed
4. The route will be available at `/telemedicine`

### **Add New Component**

```typescript
// components/doctors/NewComponent.tsx
interface NewComponentProps {
  title: string;
}

export function NewComponent({ title }: NewComponentProps) {
  return <div>{title}</div>;
}
```

## **🤝 Contributing**

Contributions are welcome! Here's how to help:

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**

- Follow TypeScript strict mode
- Use Tailwind CSS utility classes
- Write responsive components
- Add JSDoc comments for complex functions
- Include appropriate loading/error states

## **🙋‍♂️ Support**

- **Email**: fomenayann@gmail.com
- **LinkedIn**: [Connect with me](www.linkedin.com/in/fomena-yannick-3524aa209)

## **🙏 Acknowledgments**

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
- All the amazing open-source contributors

---

## **📈 Project Status**

**Current Version**: 1.0.0  
**Last Updated**: Febuary 2026  
**Active Development**: Yes  
**Production Ready**: Yes

---

<div align="center">

### **Built with modern web technologies for better healthcare access**

⭐ **Star this repo if you find it useful!**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/medibook-frontend?style=social)](https://github.com/yourusername/medibook-frontend)

**Happy coding! 👨‍💻**

</div>

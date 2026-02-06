"use client";

import React from "react";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import {
  Stethoscope,
  UserCheck,
  CalendarDays,
  ClipboardList,
  CheckCircle,
  ArrowLeft,
  X,
} from "lucide-react";
import { services, doctors } from "@/data/mockData";

import type {
  Doctor,
  Service,
  TimeSlot,
  PatientFormData,
  BookingStep,
  Appointment,
} from "@/types/healthcare";
import { DoctorCard } from "@/components/DoctorCard";
import { AppointmentCalendar } from "@/components/AppointmentCalendar";
import { TimeSlots } from "@/components/TimeSlot";
import { PatientForm } from "@/components/PatientForm";
import { BookingSummary } from "@/components/BookingSummary";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { useRouter, useSearchParams } from "next/navigation";
import { appRoutes } from "@/lib/routes";

const steps: { key: BookingStep; label: string; icon: React.ElementType }[] = [
  { key: "service", label: "Service", icon: Stethoscope },
  { key: "doctor", label: "Doctor", icon: UserCheck },
  { key: "schedule", label: "Schedule", icon: CalendarDays },
  { key: "details", label: "Details", icon: ClipboardList },
  { key: "confirm", label: "Confirm", icon: CheckCircle },
];

function BookingWizard() {
  const searchParams = useSearchParams();
  const initialServiceId = searchParams.get("serviceId");

  const [currentStep, setCurrentStep] = useState<BookingStep>(
    initialServiceId ? "doctor" : "service",
  );

  const router = useRouter();
  const [selectedService, setSelectedService] = useState<Service | null>(
    initialServiceId
      ? services.find((s) => s.id === initialServiceId) || null
      : null,
  );
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [patientData, setPatientData] = useState<PatientFormData | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] =
    useState<Appointment | null>(null);

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const onClose = () => {
    router.replace(appRoutes.services);
  };

  const onComplete = (appointment: Appointment) => {
    console.log({ appointment });
  };

  const goToStep = useCallback((step: BookingStep) => {
    setCurrentStep(step);
  }, []);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setCurrentStep("doctor");
  };

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleDoctorContinue = () => {
    if (selectedDoctor) {
      setCurrentStep("schedule");
    }
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleScheduleContinue = () => {
    if (selectedDate && selectedSlot) {
      setCurrentStep("details");
    }
  };

  const handlePatientSubmit = (data: PatientFormData) => {
    setPatientData(data);
    setCurrentStep("confirm");
  };

  const handleConfirmBooking = () => {
    if (
      !selectedDoctor ||
      !selectedService ||
      !selectedDate ||
      !selectedSlot ||
      !patientData
    ) {
      return;
    }

    const appointment: Appointment = {
      id: `appt-${Date.now()}`,
      patientName: `${patientData.firstName} ${patientData.lastName}`,
      patientEmail: patientData.email,
      patientPhone: patientData.phone,
      doctor: selectedDoctor,
      service: selectedService,
      date: selectedDate,
      timeSlot: selectedSlot,
      status: "upcoming",
      notes: patientData.reasonForVisit,
      confirmationCode: `MC-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    };

    setConfirmedAppointment(appointment);
    setShowConfirmation(true);
    onComplete(appointment);
  };

  const handleEditStep = (stepIndex: number) => {
    goToStep(steps[stepIndex].key);
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      goToStep(steps[prevIndex].key);
    }
  };

  const iconMap: Record<string, React.ElementType> = {
    stethoscope: Stethoscope,
    heart: CheckCircle,
    eye: CheckCircle,
    baby: CheckCircle,
    tooth: CheckCircle,
    skin: CheckCircle,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {currentStepIndex > 0 && (
                <Button variant="ghost" size="icon" onClick={handleBack}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Book Appointment
                </h1>
                <p className="text-sm text-muted-foreground">
                  Step {currentStepIndex + 1} of {steps.length}:{" "}
                  {steps[currentStepIndex].label}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Progress */}
          <div className="space-y-3">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between">
              {steps.map((step, index) => {
                const isCompleted = index < currentStepIndex;
                const isCurrent = index === currentStepIndex;
                return (
                  <div
                    key={step.key}
                    className={`flex items-center gap-1 text-xs ${
                      isCompleted || isCurrent
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    <step.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{step.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Service Selection */}
        {currentStep === "service" && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground">
                Select a Service
              </h2>
              <p className="text-muted-foreground mt-2">
                Choose the type of healthcare service you need
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => {
                const IconComponent = iconMap[service.icon] || Stethoscope;
                const isSelected = selectedService?.id === service.id;
                return (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      isSelected
                        ? "ring-2 ring-primary border-primary"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => handleServiceSelect(service)}
                  >
                    <CardContent className="p-5">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">
                        {service.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                        <span className="text-sm text-muted-foreground">
                          {service.duration} min
                        </span>
                        <span className="font-semibold text-foreground">
                          ${service.price}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Doctor Selection */}
        {currentStep === "doctor" && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground">
                Choose Your Doctor
              </h2>
              <p className="text-muted-foreground mt-2">
                Select a healthcare provider for your{" "}
                {selectedService?.name.toLowerCase()}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {doctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  selected={selectedDoctor?.id === doctor.id}
                  onSelect={handleDoctorSelect}
                  onContinue={handleDoctorContinue}
                />
              ))}
            </div>
            {selectedDoctor && (
              <div className="flex justify-end">
                <Button
                  onClick={handleDoctorContinue}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Continue with Dr. {selectedDoctor.name.split(" ")[1]}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Schedule Selection */}
        {currentStep === "schedule" && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground">
                Select Date & Time
              </h2>
              <p className="text-muted-foreground mt-2">
                Choose your preferred appointment slot with{" "}
                {selectedDoctor?.name}
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <AppointmentCalendar
                selectedDate={selectedDate}
                onSelectDate={handleDateSelect}
              />
              <TimeSlots
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                onSelectSlot={handleSlotSelect}
              />
            </div>
            {selectedDate && selectedSlot && (
              <div className="flex justify-end">
                <Button
                  onClick={handleScheduleContinue}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Continue to Details
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Patient Details */}
        {currentStep === "details" && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground">
                Patient Information
              </h2>
              <p className="text-muted-foreground mt-2">
                Please provide your details to complete the booking
              </p>
            </div>
            <PatientForm onSubmit={handlePatientSubmit} onBack={handleBack} />
          </div>
        )}

        {/* Confirmation */}
        {currentStep === "confirm" &&
          selectedDoctor &&
          selectedService &&
          selectedDate &&
          selectedSlot &&
          patientData && (
            <BookingSummary
              doctor={selectedDoctor}
              service={selectedService}
              date={selectedDate}
              timeSlot={selectedSlot}
              patientData={patientData}
              onConfirm={handleConfirmBooking}
              onBack={handleBack}
              onEditStep={handleEditStep}
            />
          )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          onClose();
        }}
        appointment={confirmedAppointment}
        onGoHome={() => {
          setShowConfirmation(false);
          onClose();
        }}
        onViewDashboard={() => {
          setShowConfirmation(false);
          onClose();
        }}
      />
    </div>
  );
}

export default BookingWizard;

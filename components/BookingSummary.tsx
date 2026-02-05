"use client";

import React from "react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  CheckCircle,
  Edit,
} from "lucide-react";
import type {
  Doctor,
  Service,
  TimeSlot,
  PatientFormData,
} from "@/types/healthcare";

interface BookingSummaryProps {
  doctor: Doctor;
  service: Service;
  date: Date;
  timeSlot: TimeSlot;
  patientData: PatientFormData;
  onConfirm: () => void;
  onBack: () => void;
  onEditStep: (step: number) => void;
}

const SummarySection = ({
  title,
  icon: Icon,
  editStep,
  children,
  onEditStep,
}: {
  title: string;
  icon: React.ElementType;
  editStep: number;
  children: React.ReactNode;
  onEditStep: (step: number) => void;
}) => (
  <Card>
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEditStep(editStep)}
          className="text-muted-foreground hover:text-primary -mr-2"
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </Button>
      </div>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export function BookingSummary({
  doctor,
  service,
  date,
  timeSlot,
  patientData,
  onConfirm,
  onBack,
  onEditStep,
}: BookingSummaryProps) {
  const formatDate = (d: Date) => {
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-secondary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Review Your Booking
        </h2>
        <p className="text-muted-foreground mt-2">
          Please review all details before confirming your appointment
        </p>
      </div>

      {/* Appointment Details */}
      <SummarySection
        onEditStep={onEditStep}
        title="Appointment Details"
        icon={Calendar}
        editStep={2}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium text-foreground">{formatDate(date)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-medium text-foreground">{timeSlot.time}</p>
            </div>
          </div>
        </div>
      </SummarySection>

      {/* Doctor & Service */}
      <SummarySection
        onEditStep={onEditStep}
        title="Doctor & Service"
        icon={Stethoscope}
        editStep={0}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={doctor.image || "/placeholder.svg"}
              alt={doctor.name}
              className="w-14 h-14 rounded-xl object-cover"
              crossOrigin="anonymous"
            />
            <div>
              <p className="font-medium text-foreground">{doctor.name}</p>
              <p className="text-sm text-muted-foreground">
                {doctor.specialty}
              </p>
            </div>
          </div>
          <div className="pt-3 border-t border-border">
            <p className="text-sm text-muted-foreground">Service</p>
            <p className="font-medium text-foreground">{service.name}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Duration: {service.duration} minutes
            </p>
          </div>
        </div>
      </SummarySection>

      {/* Patient Information */}
      <SummarySection
        onEditStep={onEditStep}
        title="Patient Information"
        icon={User}
        editStep={3}
      >
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium text-foreground">
                {patientData.firstName} {patientData.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date of Birth</p>
              <p className="font-medium text-foreground">
                {patientData.dateOfBirth}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">{patientData.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">{patientData.phone}</span>
          </div>
          {patientData.address && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{patientData.address}</span>
            </div>
          )}
        </div>
      </SummarySection>

      {/* Payment Summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Payment Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Consultation Fee</span>
              <span className="text-foreground">${doctor.consultationFee}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Service Fee</span>
              <span className="text-foreground">${service.price}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Platform Fee</span>
              <span className="text-foreground">$0</span>
            </div>
            <div className="pt-2 mt-2 border-t border-primary/20 flex justify-between font-semibold">
              <span className="text-foreground">Total</span>
              <span className="text-primary text-lg">
                ${doctor.consultationFee + service.price}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms */}
      <p className="text-xs text-muted-foreground text-center px-4">
        By confirming this appointment, you agree to our{" "}
        <a href="#" className="text-primary hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-primary hover:underline">
          Cancellation Policy
        </a>
        . A confirmation email will be sent to your registered email address.
      </p>

      {/* Actions */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={onConfirm}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import {
  CheckCircle,
  Calendar,
  Clock,
  User,
  Download,
  Printer,
  Home,
} from "lucide-react";
import type { Appointment } from "@/types/healthcare";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
  onGoHome: () => void;
  onViewDashboard: () => void;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  appointment,
  onGoHome,
  onViewDashboard,
}: ConfirmationModalProps) {
  if (!appointment) return null;

  const formatDate = (d: Date) => {
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="sr-only">Appointment Confirmed</DialogTitle>
        </DialogHeader>

        <div className="text-center py-4">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle className="w-10 h-10 text-secondary" />
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">
            Appointment Confirmed!
          </h2>
          <p className="text-muted-foreground">
            Your appointment has been successfully booked
          </p>

          {/* Confirmation Code */}
          <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
            <p className="text-xs text-muted-foreground mb-1">
              Confirmation Code
            </p>
            <p className="text-2xl font-mono font-bold text-primary tracking-wider">
              {appointment.confirmationCode}
            </p>
          </div>

          {/* QR Code Placeholder */}
          <div className="mt-6 flex justify-center">
            <div className="w-32 h-32 bg-foreground p-2 rounded-xl">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="0" y="0" width="100" height="100" fill="white" />
                {/* Simplified QR pattern */}
                <rect x="10" y="10" width="25" height="25" fill="black" />
                <rect x="65" y="10" width="25" height="25" fill="black" />
                <rect x="10" y="65" width="25" height="25" fill="black" />
                <rect x="15" y="15" width="15" height="15" fill="white" />
                <rect x="70" y="15" width="15" height="15" fill="white" />
                <rect x="15" y="70" width="15" height="15" fill="white" />
                <rect x="20" y="20" width="5" height="5" fill="black" />
                <rect x="75" y="20" width="5" height="5" fill="black" />
                <rect x="20" y="75" width="5" height="5" fill="black" />
                <rect x="40" y="10" width="5" height="5" fill="black" />
                <rect x="50" y="10" width="5" height="5" fill="black" />
                <rect x="40" y="20" width="10" height="5" fill="black" />
                <rect x="10" y="40" width="5" height="10" fill="black" />
                <rect x="20" y="45" width="5" height="5" fill="black" />
                <rect x="40" y="40" width="20" height="20" fill="black" />
                <rect x="45" y="45" width="10" height="10" fill="white" />
                <rect x="48" y="48" width="4" height="4" fill="black" />
                <rect x="65" y="40" width="5" height="5" fill="black" />
                <rect x="75" y="45" width="10" height="5" fill="black" />
                <rect x="85" y="40" width="5" height="15" fill="black" />
                <rect x="40" y="65" width="5" height="10" fill="black" />
                <rect x="50" y="70" width="10" height="5" fill="black" />
                <rect x="65" y="65" width="10" height="10" fill="black" />
                <rect x="80" y="70" width="10" height="20" fill="black" />
                <rect x="40" y="85" width="15" height="5" fill="black" />
                <rect x="60" y="85" width="5" height="5" fill="black" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Scan to add to your calendar
          </p>

          {/* Appointment Details */}
          <div className="mt-6 text-left space-y-3 p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Doctor</p>
                <p className="font-medium text-foreground">
                  {appointment.doctor.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="font-medium text-foreground">
                  {formatDate(appointment.date)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Time</p>
                <p className="font-medium text-foreground">
                  {appointment.timeSlot.time}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex justify-center gap-3 mt-6">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
            >
              <Printer className="w-4 h-4" />
              Print
            </Button>
          </div>

          {/* Main Actions */}
          <div className="flex flex-col gap-3 mt-8">
            <Button
              onClick={onViewDashboard}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              View My Appointments
            </Button>
            <Button variant="ghost" onClick={onGoHome} className="gap-2">
              <Home className="w-4 h-4" />
              Return to Home
            </Button>
          </div>

          {/* Email Notice */}
          <p className="text-xs text-muted-foreground mt-6">
            A confirmation email has been sent to{" "}
            <span className="text-foreground">{appointment.patientEmail}</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

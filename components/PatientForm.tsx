"use client";

import React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/TextArea";
import {
  AlertCircle,
  User,
  Phone,
  Mail,
  MapPin,
  Shield,
  FileText,
} from "lucide-react";
import type { PatientFormData } from "@/types/healthcare";

interface PatientFormProps {
  onSubmit: (data: PatientFormData) => void;
  onBack: () => void;
}

type FormErrors = Partial<Record<keyof PatientFormData, string>>;

const InputField = ({
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  icon: Icon,
  formData,
  errors,
  handleChange,
}: {
  name: keyof PatientFormData;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ElementType;
  formData: PatientFormData;
  errors: Partial<Record<keyof PatientFormData, string>>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
      Element
    >,
  ) => void;
}) => (
  <div className="space-y-2">
    <Label htmlFor={name} className="text-sm font-medium text-foreground">
      {label}
      {required && <span className="text-destructive ml-1">*</span>}
    </Label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      )}
      <Input
        id={name}
        name={name}
        type={type}
        value={formData[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${Icon ? "pl-10" : ""} ${
          errors[name] ? "border-destructive focus:ring-destructive" : ""
        }`}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
    </div>
    {errors[name] && (
      <p
        id={`${name}-error`}
        className="text-sm text-destructive flex items-center gap-1"
        role="alert"
      >
        <AlertCircle className="w-3 h-3" />
        {errors[name]}
      </p>
    )}
  </div>
);

export function PatientForm({ onSubmit, onBack }: PatientFormProps) {
  const [formData, setFormData] = useState<PatientFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    insuranceProvider: "",
    insuranceNumber: "",
    emergencyContact: "",
    emergencyPhone: "",
    medicalHistory: "",
    currentMedications: "",
    allergies: "",
    reasonForVisit: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }
    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }
    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = "Emergency contact is required";
    }
    if (!formData.emergencyPhone.trim()) {
      newErrors.emergencyPhone = "Emergency phone is required";
    }
    if (!formData.reasonForVisit.trim()) {
      newErrors.reasonForVisit = "Please describe your reason for visit";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof PatientFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          <InputField
            errors={errors}
            formData={formData}
            handleChange={handleChange}
            name="firstName"
            label="First Name"
            placeholder="John"
            required
            icon={User}
          />
          <InputField
            errors={errors}
            formData={formData}
            handleChange={handleChange}
            name="lastName"
            label="Last Name"
            placeholder="Doe"
            required
          />
          <InputField
            errors={errors}
            formData={formData}
            handleChange={handleChange}
            name="email"
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            required
            icon={Mail}
          />
          <InputField
            errors={errors}
            formData={formData}
            handleChange={handleChange}
            name="phone"
            label="Phone Number"
            type="tel"
            placeholder="(237) 678 940 123"
            required
            icon={Phone}
          />
          <InputField
            errors={errors}
            formData={formData}
            handleChange={handleChange}
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            required
          />
          <div className="space-y-2">
            <Label
              htmlFor="gender"
              className="text-sm font-medium text-foreground"
            >
              Gender<span className="text-destructive ml-1">*</span>
            </Label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full h-10 px-3 rounded-md border bg-background text-foreground ${
                errors.gender ? "border-destructive" : "border-input"
              } focus:outline-none focus:ring-2 focus:ring-primary`}
              aria-invalid={!!errors.gender}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            {errors.gender && (
              <p
                className="text-sm text-destructive flex items-center gap-1"
                role="alert"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.gender}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <InputField
              errors={errors}
              formData={formData}
              handleChange={handleChange}
              name="address"
              label="Address"
              placeholder="Quarter, City, Region"
              icon={MapPin}
            />
          </div>
        </CardContent>
      </Card>

      {/* Insurance Information */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Insurance Information
            <span className="text-sm font-normal text-muted-foreground">
              (Optional)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          <InputField
            errors={errors}
            formData={formData}
            handleChange={handleChange}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="Blue Cross Blue Shield"
          />
          <InputField
            errors={errors}
            formData={formData}
            handleChange={handleChange}
            name="insuranceNumber"
            label="Insurance Number"
            placeholder="ABC123456789"
          />
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            Emergency Contact
          </CardTitle>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-4">
          <InputField
            errors={errors}
            formData={formData}
            handleChange={handleChange}
            name="emergencyContact"
            label="Contact Name"
            placeholder="Jane Doe"
            required
            icon={User}
          />
          <InputField
            errors={errors}
            formData={formData}
            handleChange={handleChange}
            name="emergencyPhone"
            label="Contact Phone"
            type="tel"
            placeholder="(237) 678-901 234"
            required
            icon={Phone}
          />
        </CardContent>
      </Card>

      {/* Medical Information */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Medical Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="reasonForVisit"
              className="text-sm font-medium text-foreground"
            >
              Reason for Visit<span className="text-destructive ml-1">*</span>
            </Label>
            <Textarea
              id="reasonForVisit"
              name="reasonForVisit"
              value={formData.reasonForVisit}
              onChange={handleChange}
              placeholder="Please describe your symptoms or reason for this appointment..."
              rows={3}
              className={errors.reasonForVisit ? "border-destructive" : ""}
              aria-invalid={!!errors.reasonForVisit}
            />
            {errors.reasonForVisit && (
              <p
                className="text-sm text-destructive flex items-center gap-1"
                role="alert"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.reasonForVisit}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="medicalHistory"
              className="text-sm font-medium text-foreground"
            >
              Medical History
            </Label>
            <Textarea
              id="medicalHistory"
              name="medicalHistory"
              value={formData.medicalHistory || ""}
              onChange={handleChange}
              placeholder="Previous surgeries, chronic conditions, etc."
              rows={2}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="currentMedications"
                className="text-sm font-medium text-foreground"
              >
                Current Medications
              </Label>
              <Textarea
                id="currentMedications"
                name="currentMedications"
                value={formData.currentMedications || ""}
                onChange={handleChange}
                placeholder="List any medications you are currently taking"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="allergies"
                className="text-sm font-medium text-foreground"
              >
                Allergies
              </Label>
              <Textarea
                id="allergies"
                name="allergies"
                value={formData.allergies || ""}
                onChange={handleChange}
                placeholder="List any known allergies"
                rows={2}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Continue to Review
        </Button>
      </div>
    </form>
  );
}

"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Star, Clock, Globe, CheckCircle } from "lucide-react";
import type { Doctor } from "@/types/healthcare";

interface DoctorCardProps {
  doctor: Doctor;
  selected?: boolean;
  onSelect: (doctor: Doctor) => void;
}

export function DoctorCard({ doctor, selected, onSelect }: DoctorCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
        selected
          ? "ring-2 ring-primary border-primary"
          : "border-border hover:border-primary/50"
      }`}
      onClick={() => onSelect(doctor)}
    >
      <CardContent className="p-5">
        <div className="flex gap-4">
          {/* Doctor Image */}
          <div className="relative flex-shrink-0">
            <img
              src={doctor.image || "/placeholder.svg"}
              alt={doctor.name}
              className="w-20 h-20 rounded-xl object-cover"
              crossOrigin="anonymous"
            />
            {doctor.availableToday && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary rounded-full flex items-center justify-center border-2 border-card">
                <CheckCircle className="w-4 h-4 text-secondary-foreground" />
              </div>
            )}
          </div>

          {/* Doctor Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground truncate">
                  {doctor.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {doctor.specialty}
                </p>
              </div>
              {selected && (
                <Badge className="bg-primary text-primary-foreground flex-shrink-0">
                  Selected
                </Badge>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-foreground">
                  {doctor.rating}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({doctor.reviewCount} reviews)
              </span>
            </div>

            {/* Details */}
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{doctor.experience} yrs exp</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                <span>{doctor.languages.join(", ")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Availability & Price */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Next available</p>
            <p
              className={`text-sm font-medium ${
                doctor.availableToday ? "text-secondary" : "text-foreground"
              }`}
            >
              {doctor.nextAvailable}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Consultation</p>
            <p className="text-lg font-bold text-foreground">
              ${doctor.consultationFee}
            </p>
          </div>
        </div>

        {selected && (
          <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
            Continue with {doctor.name.split(" ")[1]}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

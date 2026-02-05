"use client";

import { useMemo } from "react";
import { Badge } from "@/components/ui/Badge";
import { Sun, Sunset, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimeSlot } from "@/types/healthcare";
import { generateTimeSlots } from "@/data/mockData";

interface TimeSlotsProps {
  selectedDate: Date | null;
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
}

export function TimeSlots({
  selectedDate,
  selectedSlot,
  onSelectSlot,
}: TimeSlotsProps) {
  const slots = useMemo(() => {
    if (!selectedDate) return [];
    return generateTimeSlots(selectedDate);
  }, [selectedDate]);

  const groupedSlots = useMemo(() => {
    return {
      morning: slots.filter((s) => s.period === "morning"),
      afternoon: slots.filter((s) => s.period === "afternoon"),
      evening: slots.filter((s) => s.period === "evening"),
    };
  }, [slots]);

  if (!selectedDate) {
    return (
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Please select a date to view available time slots
          </p>
        </div>
      </div>
    );
  }

  const periodConfig = [
    {
      key: "morning" as const,
      label: "Morning",
      icon: Sun,
      slots: groupedSlots.morning,
    },
    {
      key: "afternoon" as const,
      label: "Afternoon",
      icon: Sunset,
      slots: groupedSlots.afternoon,
    },
    {
      key: "evening" as const,
      label: "Evening",
      icon: Moon,
      slots: groupedSlots.evening,
    },
  ];

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Available Times
        </h3>
        <Badge variant="outline" className="text-xs">
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </Badge>
      </div>

      <div className="space-y-6">
        {periodConfig.map(({ key, label, icon: Icon, slots: periodSlots }) => {
          const availableCount = periodSlots.filter((s) => s.available).length;

          return (
            <div key={key}>
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {label}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({availableCount} available)
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {periodSlots.map((slot) => {
                  const isSelected = selectedSlot?.id === slot.id;

                  return (
                    <button
                      key={slot.id}
                      onClick={() => slot.available && onSelectSlot(slot)}
                      disabled={!slot.available}
                      className={cn(
                        "px-3 py-2 rounded-lg text-sm font-medium transition-all",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        !slot.available &&
                          "bg-muted text-muted-foreground/40 cursor-not-allowed line-through",
                        slot.available &&
                          !isSelected &&
                          "bg-muted hover:bg-primary/10 text-foreground",
                        isSelected &&
                          "bg-primary text-primary-foreground hover:bg-primary/90",
                      )}
                      aria-label={`${slot.time} ${slot.available ? "available" : "unavailable"}`}
                      aria-selected={isSelected}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-muted" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-muted opacity-40" />
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
}

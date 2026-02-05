"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppointmentCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export function AppointmentCalendar({
  selectedDate,
  onSelectDate,
}: AppointmentCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { days, monthLabel, weekDays } = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();

    const daysInMonth = lastDay.getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const daysArray: Array<{
      date: Date | null;
      isToday: boolean;
      isPast: boolean;
      isWeekend: boolean;
    }> = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      daysArray.push({
        date: null,
        isToday: false,
        isPast: false,
        isWeekend: false,
      });
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      daysArray.push({
        date,
        isToday: date.getTime() === today.getTime(),
        isPast: date < today,
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
      });
    }

    const monthLabel = currentMonth.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return { days: daysArray, monthLabel, weekDays };
  }, [currentMonth]);

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const isSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isPreviousMonthDisabled = () => {
    const today = new Date();
    return (
      currentMonth.getFullYear() === today.getFullYear() &&
      currentMonth.getMonth() === today.getMonth()
    );
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{monthLabel}</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPreviousMonth}
            disabled={isPreviousMonthDisabled()}
            className="h-8 w-8 bg-transparent"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNextMonth}
            className="h-8 w-8 bg-transparent"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="h-10 flex items-center justify-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (!day.date) {
            return <div key={`empty-${index}`} className="h-10" />;
          }

          const disabled = day.isPast;
          const selected = isSelected(day.date);

          return (
            <button
              key={day.date.toISOString()}
              onClick={() => !disabled && onSelectDate(day.date!)}
              disabled={disabled}
              className={cn(
                "h-10 w-full rounded-lg text-sm font-medium transition-all",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                disabled && "text-muted-foreground/40 cursor-not-allowed",
                !disabled && !selected && "hover:bg-primary/10 text-foreground",
                day.isToday &&
                  !selected &&
                  "bg-secondary/20 text-secondary font-bold",
                selected &&
                  "bg-primary text-primary-foreground hover:bg-primary/90",
                day.isWeekend &&
                  !selected &&
                  !disabled &&
                  "text-muted-foreground",
              )}
              aria-label={day.date.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
              aria-selected={selected}
            >
              {day.date.getDate()}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-secondary/20" />
          <span>Today</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary" />
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Header } from "@/components/healthcare/Header";
import { useState } from "react";

export type ViewState =
  | "home"
  | "booking"
  | "dashboard"
  | "services"
  | "doctors"
  | "appointments";

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>("home");
  return (
    <div className="min-h-screen bg-background">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  );
}

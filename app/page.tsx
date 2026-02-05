"use client";

import { HeroSection } from "@/components/HeroSection";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type ViewState =
  | "home"
  | "booking"
  | "dashboard"
  | "services"
  | "doctors"
  | "appointments";

export default function Home() {
  return (
    <div>
      <main>
        <HeroSection />
        {/* <ServicesSection onSelectService={handleSelectService} />  */}
      </main>
    </div>
  );
}

import React from "react";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/Header";

import "./globals.css";
import BottomPage from "@/components/BottomPage";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "MediCare | Healthcare Appointment Booking",
  description:
    "Book appointments with top healthcare providers. Easy scheduling, real-time availability, and seamless patient experience.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased`}
      >
        <Header />
        {children}
        <BottomPage />
        <Footer />
      </body>
    </html>
  );
}

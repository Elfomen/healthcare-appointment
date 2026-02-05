"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Heart, Menu, X, Phone, User } from "lucide-react";
import { ViewState } from "@/app/page";
import Link from "next/link";

interface HeaderProps {
  currentView: ViewState;
  setCurrentView: Dispatch<SetStateAction<ViewState>>;
}

export function Header({ currentView, setCurrentView }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">MediCare</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-red-300 ${
                currentView === "home"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              href="/services"
              onClick={() => setCurrentView("services")}
              className={`text-sm font-medium text-muted-foreground transition-colors hover:text-primary ${
                currentView === "services"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Services
            </Link>
            <Link
              href="/doctors"
              onClick={() => setCurrentView("doctors")}
              className={`text-sm font-medium text-muted-foreground transition-colors hover:text-primary ${
                currentView === "doctors"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Doctors
            </Link>
            <Link
              href={"/appointments"}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                currentView === "dashboard"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              My Appointments
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:1-800-MEDICARE"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>1-800-MEDICARE</span>
            </a>
            <Button
              // href={"/appointments/booking"}
              onClick={() => {}}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Book Appointment
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <a
                href="#"
                className="text-sm font-medium text-foreground hover:text-primary px-2 py-2"
              >
                Home
              </a>
              <a
                href="#services"
                className="text-sm font-medium text-muted-foreground hover:text-primary px-2 py-2"
              >
                Services
              </a>
              <a
                href="#doctors"
                className="text-sm font-medium text-muted-foreground hover:text-primary px-2 py-2"
              >
                Doctors
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-medium text-muted-foreground hover:text-primary px-2 py-2 text-left flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                My Appointments
              </button>
              <div className="pt-4 border-t border-border">
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Book Appointment
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

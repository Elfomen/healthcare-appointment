"use client";

import React from "react";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Stethoscope,
  Heart,
  Eye,
  Baby,
  Smile,
  Activity,
  ArrowRight,
} from "lucide-react";
import { services } from "@/data/mockData";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/lib/routes";

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  stethoscope: Stethoscope,
  heart: Heart,
  eye: Eye,
  baby: Baby,
  tooth: Smile,
  skin: Activity,
};

function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const router = useRouter();
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Comprehensive Healthcare Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            From routine check-ups to specialized care, we offer a wide range of
            medical services to meet all your healthcare needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || Stethoscope;
            return (
              <Card
                key={service.id}
                className="group cursor-pointer border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                onClick={() =>
                  router.push(
                    `${appRoutes.bookAppointment}?serviceId=${service.id}`,
                  )
                }
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-muted-foreground">From </span>
                      <span className="text-foreground font-semibold">
                        ${service.price}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary hover:bg-primary/10 -mr-2"
                    >
                      Book Now
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;

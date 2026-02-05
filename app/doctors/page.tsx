"use client";

import { appRoutes } from "@/lib/routes";
import { useRouter } from "next/navigation";

const DoctorsPage = () => {
  const router = useRouter();
  return (
    <section id="doctors" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Our Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Meet Our Expert Doctors
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our team of experienced healthcare professionals is dedicated to
            providing you with the best medical care.
          </p>
        </div>

        {/* Doctor Preview Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Dr. Sarah Mitchell",
              specialty: "General Physician",
              image:
                "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
              experience: "15 years",
              rating: "4.9",
            },
            {
              name: "Dr. James Wilson",
              specialty: "Cardiologist",
              image:
                "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
              experience: "20 years",
              rating: "4.8",
            },
            {
              name: "Dr. Emily Chen",
              specialty: "Pediatrician",
              image:
                "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop&crop=face",
              experience: "12 years",
              rating: "4.9",
            },
          ].map((doctor, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-xl object-cover"
                  crossOrigin="anonymous"
                />
                <div>
                  <h3 className="font-semibold text-foreground">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {doctor.specialty}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {doctor.experience} exp
                </span>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium text-foreground">
                    {doctor.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => router.push(appRoutes.bookAppointment)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Book an Appointment
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DoctorsPage;

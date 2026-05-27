'use client';

import { useState } from 'react';
import { services } from '@/lib/mock-data';
import { ChevronDown } from 'lucide-react';
import { ServiceBookingModal } from './service-booking-modal';

const categoryIcons: { [key: string]: any } = {
  Heart: () => <div className="h-5 w-5 text-primary" />,
  Activity: () => <div className="h-5 w-5 text-primary" />,
  Syringe: () => <div className="h-5 w-5 text-primary" />,
  Tooth: () => <div className="h-5 w-5 text-primary" />,
  AlertCircle: () => <div className="h-5 w-5 text-primary" />,
  Sparkles: () => <div className="h-5 w-5 text-primary" />,
  Baby: () => <div className="h-5 w-5 text-primary" />,
  AlertTriangle: () => <div className="h-5 w-5 text-primary" />,
  TrendingUp: () => <div className="h-5 w-5 text-primary" />,
  Zap: () => <div className="h-5 w-5 text-primary" />,
};

interface ServiceCategory {
  name: string;
  services: typeof services;
}

export function ServicesView() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['General Care']);
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBooking = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedService(null);
  };

  // Group services by category
  const groupedServices: ServiceCategory[] = [
    { name: 'General Care', services: services.filter((s) => s.category === 'General Care') },
    { name: 'Dentistry', services: services.filter((s) => s.category === 'Dentistry') },
    { name: 'Pediatrics', services: services.filter((s) => s.category === 'Pediatrics') },
    { name: 'Cardiology', services: services.filter((s) => s.category === 'Cardiology') },
  ];

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="space-y-8 py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-5xl">
      {/* Header */}
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground font-[family-name:var(--font-plus-jakarta-sans)]">
          Our Services
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Comprehensive healthcare services designed to meet all your medical needs
        </p>
      </div>

      {/* Service Categories Accordion */}
      <div className="space-y-4">
        {groupedServices.map((category) => (
          <div
            key={category.name}
            className="rounded-xl border border-border overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.name)}
              className="w-full flex items-center justify-between p-6 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <div className="h-5 w-5 bg-primary rounded" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-foreground font-[family-name:var(--font-plus-jakarta-sans)]">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.services.length} services available
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform ${
                  expandedCategories.includes(category.name) ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Category Services */}
            {expandedCategories.includes(category.name) && (
              <div className="border-t border-border divide-y divide-border">
                {category.services.map((service, index) => (
                  <div
                    key={service.id}
                    className="p-6 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="h-5 w-5 bg-accent rounded-sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold text-foreground mb-2">
                          {service.name}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {service.description}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-semibold text-sm w-fit">
                            {service.cost}
                          </span>
                          <button
                            onClick={() => handleBooking(service)}
                            className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                          >
                            Book Now →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Information Box */}
      <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
        <h3 className="font-semibold text-foreground mb-2">Need Help Choosing?</h3>
        <p className="text-sm text-muted-foreground">
          Our healthcare specialists are ready to guide you in selecting the most appropriate service for your needs. 
          Contact us today for a free consultation or schedule your appointment directly.
        </p>
      </div>

      {/* Booking Modal */}
      <ServiceBookingModal
        isOpen={isBookingOpen}
        service={selectedService}
        onClose={handleCloseBooking}
      />
    </div>
  );
}

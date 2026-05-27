'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Shield, Lock, CheckCircle2 } from 'lucide-react';
import { testimonials } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';

interface HomeViewProps {
  onAppointmentClick: () => void;
}

export function HomeView({ onAppointmentClick }: HomeViewProps) {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[testimonialIndex];

  return (
    <div className="space-y-16 py-12">
      {/* Hero Section */}
      <section className="mx-auto max-w-5xl space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-[family-name:var(--font-plus-jakarta-sans)] leading-tight">
            Your Health, Our <span className="text-primary">Priority</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Experience premium healthcare with trusted physicians, modern facilities, and compassionate care. We&apos;re here to support your wellness journey every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              onClick={onAppointmentClick}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8"
            >
              Schedule Immediate Consultation
            </Button>
            {/* <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/5"
            >
              Learn More
            </Button> */}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12">
          <div className="flex flex-col items-center gap-3 rounded-xl bg-secondary/50 p-6 text-center">
            <Lock className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">HIPAA Compliant</h3>
              <p className="text-sm text-muted-foreground">Your data security is guaranteed</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl bg-secondary/50 p-6 text-center">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">SSL Encrypted</h3>
              <p className="text-sm text-muted-foreground">256-bit encryption for all transactions</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl bg-secondary/50 p-6 text-center">
            <CheckCircle2 className="h-8 w-8 text-accent" />
            <div>
              <h3 className="font-semibold text-foreground">Board Certified</h3>
              <p className="text-sm text-muted-foreground">All physicians fully certified and licensed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-[family-name:var(--font-plus-jakarta-sans)] mb-2">
              Trusted by Our Patients
            </h2>
            <p className="text-muted-foreground">Hear what our patients have to say about their experience</p>
          </div>

          {/* Testimonial Card with Slider */}
          <div className="relative">
            <div className="rounded-xl border border-border bg-card p-8 sm:p-12 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{currentTestimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{currentTestimonial.role}</p>
                  <div className="flex gap-1 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-4 w-4 ${
                          i < currentTestimonial.rating ? 'bg-primary' : 'bg-muted'
                        }`}
                        style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-lg text-foreground leading-relaxed italic">
                "{currentTestimonial.content}"
              </p>

              {/* Navigation Buttons */}
              <div className="flex gap-2 justify-center mt-8">
                <button
                  onClick={prevTestimonial}
                  className="rounded-full border border-border bg-secondary p-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="rounded-full border border-border bg-secondary p-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Indicator Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setTestimonialIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === testimonialIndex
                        ? 'bg-primary w-8'
                        : 'bg-muted w-2 hover:bg-muted-foreground'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { number: '5,000+', label: 'Happy Patients' },
            { number: '25+', label: 'Expert Doctors' },
            { number: '15+', label: 'Years Average Experience' },
            { number: '99.8%', label: 'Patient Satisfaction' },
          ].map((stat, index) => (
            <div
              key={index}
              className="rounded-xl bg-secondary/50 border border-border p-6 text-center hover:border-primary transition-colors"
            >
              <p className="text-3xl sm:text-4xl font-bold text-primary font-[family-name:var(--font-plus-jakarta-sans)]">
                {stat.number}
              </p>
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { doctors, services } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

interface AppointmentViewProps {
  onComplete?: () => void;
}

type Step = 'specialty' | 'service' | 'doctor' | 'date' | 'confirmation';

export function AppointmentView({ onComplete }: AppointmentViewProps) {
  const [step, setStep] = useState<Step>('specialty');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);

  // Get unique specialties
  const specialties = Array.from(new Set(doctors.map((d) => d.specialty)));

  // Filter services by specialty
  const filteredServices = selectedSpecialty
    ? services.filter((s) => {
        if (selectedSpecialty === 'General Practice')
          return s.category === 'General Care';
        if (selectedSpecialty === 'Dentistry') return s.category === 'Dentistry';
        if (selectedSpecialty === 'Pediatrics') return s.category === 'Pediatrics';
        if (selectedSpecialty === 'Cardiology') return s.category === 'Cardiology';
        return false;
      })
    : [];

  // Filter doctors by specialty
  const filteredDoctors = selectedSpecialty
    ? doctors.filter((d) => d.specialty === selectedSpecialty)
    : [];

  // Time slots
  const timeSlots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
    '04:30 PM',
  ];

  // Generate available dates (next 14 days)
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  const handleNext = () => {
    if (step === 'specialty') {
      setStep('service');
    } else if (step === 'service') {
      setStep('doctor');
    } else if (step === 'doctor') {
      setStep('date');
    } else if (step === 'date') {
      setStep('confirmation');
    }
  };

  const handleBack = () => {
    if (step === 'service') setStep('specialty');
    else if (step === 'doctor') setStep('service');
    else if (step === 'date') setStep('doctor');
    else if (step === 'confirmation') setStep('date');
  };

  const handleConfirm = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      // Reset form
      setStep('specialty');
      setSelectedSpecialty('');
      setSelectedService('');
      setSelectedDoctor('');
      setSelectedDate('');
      setSelectedTime('');
      onComplete?.();
    }, 3000);
  };

  const getSelectedDoctorName = () => {
    return doctors.find((d) => d.id === selectedDoctor)?.name;
  };

  const getSelectedServiceName = () => {
    return services.find((s) => s.id === selectedService)?.name;
  };

  if (showSuccess) {
    return (
      <div className="flex items-center justify-center min-h-[600px] py-12">
        <div className="text-center space-y-6 max-w-md">
          <div className="mx-auto w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-accent" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground font-[family-name:var(--font-plus-jakarta-sans)] mb-2">
              Appointment Confirmed!
            </h2>
            <p className="text-muted-foreground">
              Your appointment has been successfully scheduled. A confirmation email has been sent to your inbox.
            </p>
          </div>
          <div className="bg-secondary/50 rounded-xl p-6 text-left space-y-3 border border-border">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">Provider</p>
              <p className="font-semibold text-foreground">{getSelectedDoctorName()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">Service</p>
              <p className="font-semibold text-foreground">{getSelectedServiceName()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">Date & Time</p>
              <p className="font-semibold text-foreground">
                {new Date(selectedDate).toLocaleDateString()} at {selectedTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-4xl">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground font-[family-name:var(--font-plus-jakarta-sans)]">
          Schedule Your Appointment
        </h1>
        <p className="text-lg text-muted-foreground">
          Follow the steps below to book your consultation
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between gap-2 sm:gap-4">
        {(['specialty', 'service', 'doctor', 'date', 'confirmation'] as const).map(
          (s, index) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full transition-colors ${
                step === s || (step === 'confirmation' && s !== 'confirmation')
                  ? step === 'confirmation' && s !== 'confirmation'
                    ? 'bg-accent'
                    : step === s
                    ? 'bg-primary'
                    : 'bg-primary'
                  : 'bg-muted'
              }`}
            />
          )
        )}
      </div>

      {/* Content */}
      <div className="rounded-xl border border-border bg-card p-8 min-h-96">
        {/* Specialty Selection */}
        {step === 'specialty' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-plus-jakarta-sans)]">
              Select a Specialty
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedSpecialty === specialty
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <p className="font-semibold text-foreground">{specialty}</p>
                  <p className="text-sm text-muted-foreground">
                    {doctors.filter((d) => d.specialty === specialty).length} doctors available
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Service Selection */}
        {step === 'service' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-plus-jakarta-sans)]">
              Select a Service
            </h2>
            <div className="space-y-3">
              {filteredServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedService === service.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{service.name}</p>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                    <p className="font-bold text-primary whitespace-nowrap ml-4">{service.cost}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Doctor Selection */}
        {step === 'doctor' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-plus-jakarta-sans)]">
              Select a Doctor
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDoctors.map((doctor) => (
                <button
                  key={doctor.id}
                  onClick={() => setSelectedDoctor(doctor.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedDoctor === doctor.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex gap-4">
                    <img
                      src={doctor.avatar}
                      alt={doctor.name}
                      className="h-12 w-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground">{doctor.name}</p>
                      <p className="text-sm text-muted-foreground">{doctor.experience} yrs exp.</p>
                      <p className="text-xs text-primary mt-1">⭐ {doctor.rating}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Date & Time Selection */}
        {step === 'date' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-plus-jakarta-sans)]">
              Select Date & Time
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Date</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {availableDates.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(date.toISOString().split('T')[0])}
                      className={`p-3 rounded-lg border-2 transition-all text-center ${
                        selectedDate === date.toISOString().split('T')[0]
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <p className="font-semibold text-sm text-foreground">
                        {date.toLocaleDateString('en-US', { day: 'numeric' })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Time</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 rounded-lg border-2 transition-all text-center text-sm font-medium ${
                        selectedTime === time
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary/50 text-foreground'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation */}
        {step === 'confirmation' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-plus-jakarta-sans)]">
              Confirm Your Appointment
            </h2>
            <div className="space-y-4">
              <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
                  Specialty
                </p>
                <p className="font-semibold text-foreground">{selectedSpecialty}</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
                  Service
                </p>
                <p className="font-semibold text-foreground">{getSelectedServiceName()}</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
                  Provider
                </p>
                <p className="font-semibold text-foreground">{getSelectedDoctorName()}</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
                  Date & Time
                </p>
                <p className="font-semibold text-foreground">
                  {new Date(selectedDate).toLocaleDateString()} at {selectedTime}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-between">
        <Button
          onClick={handleBack}
          variant="outline"
          className="border-border"
          disabled={step === 'specialty'}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {step !== 'confirmation' ? (
          <Button
            onClick={handleNext}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={
              (step === 'specialty' && !selectedSpecialty) ||
              (step === 'service' && !selectedService) ||
              (step === 'doctor' && !selectedDoctor) ||
              (step === 'date' && (!selectedDate || !selectedTime))
            }
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleConfirm}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Confirm Booking
          </Button>
        )}
      </div>
    </div>
  );
}

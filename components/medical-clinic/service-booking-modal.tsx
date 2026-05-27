'use client';

import { useState } from 'react';
import { X, Check, Calendar, User, Mail, Phone } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  service: {
    id: string;
    name: string;
    description: string;
    cost: string;
    category: string;
  } | null;
  onClose: () => void;
}

interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  notes: string;
}

export function ServiceBookingModal({ isOpen, service, onClose }: BookingModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      notes: '',
    });
    onClose();
  };

  if (!isOpen || !service) return null;

  // Get available time slots
  const timeSlots = [
    '08:00 AM',
    '08:30 AM',
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
    '04:30 PM',
  ];

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-plus-jakarta-sans)]">
            {isSubmitted ? 'Booking Confirmed' : 'Schedule Your Appointment'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            // Success Screen
            <div className="text-center space-y-6">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="h-20 w-20 rounded-full bg-accent/20 flex items-center justify-center">
                  <Check className="h-10 w-10 text-accent" />
                </div>
              </div>

              {/* Success Message */}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">Booking Confirmed!</h3>
                <p className="text-muted-foreground">
                  Your appointment has been successfully scheduled.
                </p>
              </div>

              {/* Booking Details */}
              <div className="bg-secondary/50 rounded-xl p-6 space-y-4 text-left">
                <div className="border-b border-border pb-4">
                  <p className="text-sm text-muted-foreground mb-1">Service</p>
                  <p className="font-semibold text-foreground">{service.name}</p>
                </div>

                <div className="border-b border-border pb-4">
                  <p className="text-sm text-muted-foreground mb-1">Patient Name</p>
                  <p className="font-semibold text-foreground">{formData.fullName}</p>
                </div>

                <div className="border-b border-border pb-4">
                  <p className="text-sm text-muted-foreground mb-1">Appointment Date & Time</p>
                  <p className="font-semibold text-foreground">
                    {new Date(formData.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}{' '}
                    at {formData.time}
                  </p>
                </div>

                <div className="border-b border-border pb-4">
                  <p className="text-sm text-muted-foreground mb-1">Cost</p>
                  <p className="font-semibold text-foreground">{service.cost}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Confirmation Email</p>
                  <p className="font-semibold text-foreground">{formData.email}</p>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-left">
                <p className="text-sm font-semibold text-primary mb-2">Next Steps:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ A confirmation email has been sent to {formData.email}</li>
                  <li>✓ Please arrive 10 minutes early to complete check-in</li>
                  <li>✓ Bring your insurance card and photo ID</li>
                  <li>✓ You can call us at (555) 123-4567 if you need to reschedule</li>
                </ul>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            // Booking Form
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Summary */}
              <div className="bg-secondary/50 rounded-xl p-4 border border-border">
                <h3 className="font-semibold text-foreground mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                <div className="inline-block px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                  {service.cost}
                </div>
              </div>

              {/* Patient Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Patient Information</h3>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Appointment Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Select Your Appointment</h3>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={today}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Time Slot *
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Choose a time...</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any additional information for your appointment..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {/* Agreement */}
              <div className="bg-secondary/50 rounded-xl p-4 text-sm text-muted-foreground">
                <p className="mb-2">
                  By booking an appointment, you agree to our terms of service and privacy policy. We will confirm your appointment via email and phone.
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-6 py-3 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!formData.fullName || !formData.email || !formData.phone || !formData.date || !formData.time}
                  className="flex-1 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

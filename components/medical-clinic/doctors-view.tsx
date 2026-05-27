'use client';

import { useState, useMemo } from 'react';
import { doctors } from '@/lib/mock-data';
import { Star, Clock, Globe, Users, CheckCircle2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DoctorsViewProps {
  onBookClick: (doctorId: string) => void;
}

export function DoctorsView({ onBookClick }: DoctorsViewProps) {
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('');
  const [availableTodayFilter, setAvailableTodayFilter] = useState(false);

  // Get unique specialties
  const specialties = Array.from(new Set(doctors.map((d) => d.specialty)));

  // Filter doctors
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSpecialty = !specialtyFilter || doctor.specialty === specialtyFilter;
      const matchesAvailability = !availableTodayFilter || doctor.availableToday;
      return matchesSpecialty && matchesAvailability;
    });
  }, [specialtyFilter, availableTodayFilter]);

  return (
    <div className="space-y-8 py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground font-[family-name:var(--font-plus-jakarta-sans)]">
          Find a Doctor
        </h1>
        <p className="text-lg text-muted-foreground">
          Meet our team of experienced physicians dedicated to your health
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 rounded-lg bg-secondary/50 p-6 border border-border">
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-2">Specialty</label>
          <select
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Specialties</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={availableTodayFilter}
              onChange={(e) => setAvailableTodayFilter(e.target.checked)}
              className="h-4 w-4 rounded border-border"
            />
            <span className="text-sm font-medium text-foreground">Available Today</span>
          </label>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all hover:border-primary/50"
          >
            {/* Header with Avatar */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 pb-0">
              <div className="flex items-start justify-between mb-4">
                <img
                  src={doctor.avatar}
                  alt={doctor.name}
                  className="h-16 w-16 rounded-xl border-4 border-card object-cover"
                />
                {doctor.availableToday && (
                  <div className="flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1">
                    <CheckCircle2 className="h-3 w-3 text-accent" />
                    <span className="text-xs font-semibold text-accent">Available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4 p-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground font-[family-name:var(--font-plus-jakarta-sans)]">
                  {doctor.name}
                </h3>
                <p className="text-sm text-primary font-medium mt-1">{doctor.specialty}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(doctor.rating)
                          ? 'fill-primary text-primary'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">{doctor.rating}</span>
                <span className="text-xs text-muted-foreground">({doctor.patients} patients)</span>
              </div>

              {/* Bio */}
              <p className="text-sm text-muted-foreground leading-relaxed">{doctor.bio}</p>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2 rounded-lg bg-secondary/50 p-3">
                  <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Hours</p>
                    <p className="text-xs font-semibold text-foreground truncate">
                      {doctor.hours}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 rounded-lg bg-secondary/50 p-3">
                  <Users className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">Experience</p>
                    <p className="text-xs font-semibold text-foreground">
                      {doctor.experience} years
                    </p>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="flex items-start gap-2">
                <Globe className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((lang) => (
                    <span
                      key={lang}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <Button
                onClick={() => onBookClick(doctor.id)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium mt-4"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book Appointment
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No doctors match your search criteria. Please try different filters.
          </p>
        </div>
      )}
    </div>
  );
}

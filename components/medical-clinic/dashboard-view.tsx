'use client';

import { useState } from 'react';
import { medicalRecords, prescriptions, vitalSigns } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Pill,
  Heart,
  MoreVertical,
  Download,
  Printer,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export function DashboardView() {
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);
  const [refillRequests, setRefillRequests] = useState<{ [key: string]: boolean }>({});

  const handleRefillRequest = (prescriptionId: string) => {
    setRefillRequests((prev) => ({
      ...prev,
      [prescriptionId]: true,
    }));
    // Reset after 2 seconds to show message
    setTimeout(() => {
      setRefillRequests((prev) => ({
        ...prev,
        [prescriptionId]: false,
      }));
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-accent';
      case 'elevated':
        return 'text-orange-500';
      case 'low':
        return 'text-orange-500';
      default:
        return 'text-foreground';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-accent/10';
      case 'elevated':
        return 'bg-orange-100/20';
      case 'low':
        return 'bg-orange-100/20';
      default:
        return 'bg-secondary/50';
    }
  };

  return (
    <div className="space-y-8 py-12 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground font-[family-name:var(--font-plus-jakarta-sans)]">
          Health Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage your medical records, prescriptions, and track your vital signs
        </p>
      </div>

      {/* Vital Signs Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-plus-jakarta-sans)]">
            Vital Signs
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vitalSigns.map((vital) => (
            <div
              key={vital.label}
              className={`rounded-xl border border-border p-6 ${getStatusBg(vital.status)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{vital.label}</p>
                  <p className={`text-3xl font-bold mt-1 ${getStatusColor(vital.status)}`}>
                    {vital.value}
                    <span className="text-sm text-muted-foreground ml-1 font-normal">
                      {vital.unit}
                    </span>
                  </p>
                </div>
                {vital.status === 'normal' ? (
                  <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-orange-500 flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Last checked: {new Date(vital.lastChecked).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Medical Records Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-plus-jakarta-sans)]">
            Medical Records
          </h2>
        </div>
        <div className="space-y-3">
          {medicalRecords.map((record) => (
            <div key={record.id} className="rounded-xl border border-border bg-card overflow-hidden">
              <button
                onClick={() =>
                  setExpandedRecord(expandedRecord === record.id ? null : record.id)
                }
                className="w-full flex items-center justify-between p-6 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-start gap-4 text-left flex-1 min-w-0">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground">{record.type}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(record.date).toLocaleDateString()} • {record.provider}
                    </p>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <button className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-secondary transition-colors">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </button>

              {/* Expanded Content */}
              {expandedRecord === record.id && (
                <div className="border-t border-border bg-secondary/20 p-6 space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                      Notes
                    </p>
                    <p className="text-foreground leading-relaxed">{record.notes}</p>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 border-border"
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 border-border"
                    >
                      <Printer className="h-4 w-4" />
                      Print
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Prescriptions Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Pill className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-plus-jakarta-sans)]">
            Active Prescriptions
          </h2>
        </div>
        <div className="space-y-3">
          {prescriptions.map((prescription) => (
            <div
              key={prescription.id}
              className="rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {prescription.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {prescription.dosage} • {prescription.frequency}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    prescription.refillsLeft > 0
                      ? 'bg-accent/10 text-accent'
                      : 'bg-orange-100/20 text-orange-600'
                  }`}
                >
                  {prescription.refillsLeft} refills left
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Prescribed</p>
                  <p className="text-sm font-semibold text-foreground">
                    {new Date(prescription.prescribed).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <p className="text-sm font-semibold text-accent">Active</p>
                </div>
              </div>

              <Button
                onClick={() => handleRefillRequest(prescription.id)}
                disabled={prescription.refillsLeft === 0 || refillRequests[prescription.id]}
                className={`w-full ${
                  refillRequests[prescription.id]
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                }`}
              >
                {refillRequests[prescription.id] ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Refill Request Sent
                  </>
                ) : (
                  <>
                    <Pill className="h-4 w-4 mr-2" />
                    Request Refill
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="rounded-xl border border-border bg-secondary/50 p-6">
        <h3 className="font-semibold text-foreground mb-4 font-[family-name:var(--font-plus-jakarta-sans)]">
          Need Something?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Button variant="outline" className="border-border justify-start">
            📋 Request Medical Records
          </Button>
          <Button variant="outline" className="border-border justify-start">
            📞 Contact Support
          </Button>
          <Button variant="outline" className="border-border justify-start">
            📅 Schedule Follow-up
          </Button>
        </div>
      </section>
    </div>
  );
}

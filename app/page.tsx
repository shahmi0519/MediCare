'use client';

import { useState } from 'react';
import { Navigation } from '@/components/medical-clinic/navigation';
import { HomeView } from '@/components/medical-clinic/home-view';
import { ServicesView } from '@/components/medical-clinic/services-view';
import { DoctorsView } from '@/components/medical-clinic/doctors-view';
import { AppointmentView } from '@/components/medical-clinic/appointment-view';
import { DashboardView } from '@/components/medical-clinic/dashboard-view';

type TabId = 'home' | 'services' | 'doctors' | 'appointment' | 'dashboard';

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabId>('home');

  const handleAppointmentClick = () => {
    setActiveTab('appointment');
  };

  const handleBookClick = (doctorId: string) => {
    setActiveTab('appointment');
  };

  const handleAppointmentComplete = () => {
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as TabId)} />

      <main className="transition-opacity duration-300">
        {activeTab === 'home' && <HomeView onAppointmentClick={handleAppointmentClick} />}
        {activeTab === 'services' && <ServicesView />}
        {activeTab === 'doctors' && <DoctorsView onBookClick={handleBookClick} />}
        {activeTab === 'appointment' && <AppointmentView onComplete={handleAppointmentComplete} />}
        {/* {activeTab === 'dashboard' && <DashboardView />} */}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">MediCare</h3>
              <p className="text-sm text-muted-foreground">
                Premium healthcare services for your well-being.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => setActiveTab('home')} className="hover:text-primary">Home</button></li>
                <li><button onClick={() => setActiveTab('services')} className="hover:text-primary">Services</button></li>
                <li><button onClick={() => setActiveTab('doctors')} className="hover:text-primary">Doctors</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>📞 (555) 123-4567</li>
                <li>📧 info@medicare.com</li>
                <li>📍 123 Health St, City</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-center text-sm text-muted-foreground">
              © 2024 MediCare. All rights reserved. HIPAA Compliant • SSL Secured
            </p>
            <p className="text-center text-sm text-muted-foreground">
              Developed By: Ahamed Shahmi
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

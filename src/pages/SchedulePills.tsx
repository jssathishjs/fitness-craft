
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PillScheduler } from '@/components/pills/PillScheduler';

const SchedulePills = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <section className="pt-6">
          <h1 className="text-4xl font-semibold tracking-tight mb-2 animate-fade-in">Medication Schedule</h1>
          <p className="text-muted-foreground mb-8 max-w-3xl animate-fade-in stagger-delay-1">
            Set up reminders and schedules for your medications to ensure you never miss a dose.
          </p>
        </section>

        <section>
          <PillScheduler />
        </section>
      </div>
    </Layout>
  );
};

export default SchedulePills;

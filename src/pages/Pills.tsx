
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { PillTracker } from '@/components/pills/PillTracker';

const Pills = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <section className="pt-6">
          <h1 className="text-4xl font-semibold tracking-tight mb-2 animate-fade-in">Pills Tracker</h1>
          <p className="text-muted-foreground mb-8 max-w-3xl animate-fade-in stagger-delay-1">
            Keep track of your medications, dosages, and refill dates all in one place.
          </p>
        </section>

        <section>
          <PillTracker />
        </section>
      </div>
    </Layout>
  );
};

export default Pills;

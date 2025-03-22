
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { ActivityChart } from '@/components/dashboard/ActivityChart';

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <section className="pt-6">
          <h1 className="text-4xl font-semibold tracking-tight mb-2 animate-fade-in">Dashboard</h1>
          <p className="text-muted-foreground mb-8 max-w-3xl animate-fade-in stagger-delay-1">
            Track your fitness journey, monitor progress, and stay motivated to achieve your health goals.
          </p>
        </section>

        <section>
          <ActivityChart />
        </section>
      </div>
    </Layout>
  );
};

export default Index;

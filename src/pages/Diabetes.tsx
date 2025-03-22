
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { DiabetesTracker } from '@/components/diabetes/DiabetesTracker';

const Diabetes = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <section className="pt-6">
          <h1 className="text-4xl font-semibold tracking-tight mb-2 animate-fade-in">Diabetes Management</h1>
          <p className="text-muted-foreground mb-8 max-w-3xl animate-fade-in stagger-delay-1">
            Track your glucose levels, insulin doses, and carbohydrate intake to effectively manage your diabetes.
          </p>
        </section>

        <section>
          <DiabetesTracker />
        </section>
      </div>
    </Layout>
  );
};

export default Diabetes;

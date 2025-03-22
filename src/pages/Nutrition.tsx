
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { NutritionTracker } from '@/components/nutrition/NutritionTracker';

const Nutrition = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <section className="pt-6">
          <h1 className="text-4xl font-semibold tracking-tight mb-2 animate-fade-in">Nutrition Tracker</h1>
          <p className="text-muted-foreground mb-8 max-w-3xl animate-fade-in stagger-delay-1">
            Monitor your nutrition intake, track your calories, and maintain a balanced diet to reach your health goals.
          </p>
        </section>

        <section>
          <NutritionTracker />
        </section>
      </div>
    </Layout>
  );
};

export default Nutrition;

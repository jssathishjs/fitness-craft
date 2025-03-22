
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { WorkoutTracker } from '@/components/workouts/WorkoutTracker';
import { ExerciseList } from '@/components/workouts/ExerciseList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Workouts = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <section className="pt-6">
          <h1 className="text-4xl font-semibold tracking-tight mb-2 animate-fade-in">Your Workouts</h1>
          <p className="text-muted-foreground mb-8 max-w-3xl animate-fade-in stagger-delay-1">
            Track your fitness sessions, schedule new workouts, and monitor your progress over time.
          </p>
        </section>

        <section>
          <Tabs defaultValue="tracker" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="tracker">Workout Tracker</TabsTrigger>
              <TabsTrigger value="exercises">Exercise Library</TabsTrigger>
            </TabsList>

            <TabsContent value="tracker" className="m-0">
              <WorkoutTracker />
            </TabsContent>

            <TabsContent value="exercises" className="m-0">
              <ExerciseList />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </Layout>
  );
};

export default Workouts;

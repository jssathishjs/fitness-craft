
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { MetricsPanel } from '@/components/dashboard/MetricsPanel';
import { ActivityChart } from '@/components/dashboard/ActivityChart';
import { WorkoutTracker } from '@/components/workouts/WorkoutTracker';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { 
  Dumbbell, 
  Apple, 
  Calendar, 
  Trophy, 
  TrendingUp, 
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <section className="pt-6">
          <h1 className="text-4xl font-semibold tracking-tight mb-2 animate-fade-in">Welcome Back!</h1>
          <p className="text-muted-foreground mb-8 max-w-3xl animate-fade-in stagger-delay-1">
            Track your fitness progress, manage your nutrition, and achieve your health goals. Today is a great day to be active!
          </p>

          <MetricsPanel />
        </section>

        <section>
          <ActivityChart />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-delayed-fade-in stagger-delay-3">
          <DashboardCard
            title="Quick Workout"
            icon={<Dumbbell className="h-5 w-5" />}
            animationDelay={1}
          >
            <div className="flex flex-col h-full justify-between">
              <p className="text-muted-foreground text-sm mb-4">
                Start a quick workout session tailored to your goals and availability.
              </p>
              <Button className="w-full mt-2">
                Start Workout
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Log Nutrition"
            icon={<Apple className="h-5 w-5" />}
            animationDelay={2}
          >
            <div className="flex flex-col h-full justify-between">
              <p className="text-muted-foreground text-sm mb-4">
                Track your meals and stay on top of your nutrition goals.
              </p>
              <Button className="w-full mt-2" variant="outline">
                Log Meal
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Training Plan"
            icon={<Calendar className="h-5 w-5" />}
            animationDelay={3}
          >
            <div className="flex flex-col h-full justify-between">
              <p className="text-muted-foreground text-sm mb-4">
                View your upcoming workout schedule for the week.
              </p>
              <Button className="w-full mt-2" variant="outline">
                See Plan
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Progress Tracker"
            icon={<TrendingUp className="h-5 w-5" />}
            animationDelay={4}
          >
            <div className="flex flex-col h-full justify-between">
              <p className="text-muted-foreground text-sm mb-4">
                Check your fitness progress and milestones.
              </p>
              <Button className="w-full mt-2" variant="outline">
                View Progress
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </DashboardCard>
        </section>

        <section>
          <Tabs defaultValue="workouts" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Your Fitness Activities</h2>
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="workouts">Workouts</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="workouts" className="m-0">
              <WorkoutTracker />
            </TabsContent>

            <TabsContent value="achievements" className="m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-delayed-fade-in">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "flex flex-col items-center p-6 border border-border/50 rounded-lg bg-card text-center transition-all hover:shadow-soft",
                      `stagger-delay-${i}`
                    )}
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Trophy className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">
                      {i === 1 ? "Workout Warrior" : i === 2 ? "Step Master" : "Consistency King"}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {i === 1 
                        ? "Completed 10 workouts" 
                        : i === 2 
                          ? "Reached 100,000 steps" 
                          : "7-day workout streak"
                      }
                    </p>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                      {i === 1 ? "Mar 15, 2024" : i === 2 ? "Mar 10, 2024" : "Mar 5, 2024"}
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </Layout>
  );
};

export default Index;

function Badge({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium", 
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}

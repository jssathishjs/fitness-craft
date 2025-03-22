
import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Sample data
const activityData = [
  { day: 'Mon', steps: 6500, calories: 1800, distance: 4.2, workouts: 1, duration: 45 },
  { day: 'Tue', steps: 8200, calories: 2100, distance: 5.5, workouts: 1, duration: 60 },
  { day: 'Wed', steps: 7400, calories: 1950, distance: 4.8, workouts: 0, duration: 0 },
  { day: 'Thu', steps: 9100, calories: 2300, distance: 6.2, workouts: 1, duration: 75 },
  { day: 'Fri', steps: 8700, calories: 2200, distance: 5.8, workouts: 1, duration: 55 },
  { day: 'Sat', steps: 10200, calories: 2500, distance: 7.1, workouts: 2, duration: 120 },
  { day: 'Sun', steps: 6800, calories: 1700, distance: 4.5, workouts: 0, duration: 0 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glassmorphism text-foreground p-3 rounded-md text-sm">
        <p className="font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="flex items-center gap-2 mt-1">
            <span 
              className="w-2 h-2 rounded-full inline-block" 
              style={{ backgroundColor: entry.color }} 
            />
            <span>{`${entry.name}: ${entry.value.toLocaleString()}`}</span>
          </p>
        ))}
      </div>
    );
  }

  return null;
};

interface ChartCardProps {
  title: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}

function ChartCard({ title, subtitle, className, children }: ChartCardProps) {
  return (
    <div className={cn("bg-card rounded-lg border border-border/40 p-4 h-full shadow-sm", className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="h-[300px]">
        {children}
      </div>
    </div>
  );
}

export function ActivityChart() {
  const [activeChart, setActiveChart] = useState('steps');

  return (
    <div className="animate-delayed-fade-in stagger-delay-2">
      <Tabs defaultValue="steps" onValueChange={setActiveChart} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Weekly Activity</h2>
          <TabsList className="grid grid-cols-4 h-9">
            <TabsTrigger value="steps">Steps</TabsTrigger>
            <TabsTrigger value="calories">Calories</TabsTrigger>
            <TabsTrigger value="distance">Distance</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="steps" className="m-0">
          <ChartCard title="Daily Steps" subtitle="This Week">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={activityData}
                margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickFormatter={(value) => `${value.toLocaleString()}`}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="steps" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorSteps)" 
                  name="Steps"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>

        <TabsContent value="calories" className="m-0">
          <ChartCard title="Calories Burned" subtitle="This Week">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={activityData}
                margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickFormatter={(value) => `${value.toLocaleString()}`}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="hsl(var(--warning))" 
                  fillOpacity={1} 
                  fill="url(#colorCalories)" 
                  name="Calories"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>

        <TabsContent value="distance" className="m-0">
          <ChartCard title="Distance Traveled" subtitle="This Week (mi)">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={activityData}
                margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorDistance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--info))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--info))" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickFormatter={(value) => `${value}`}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="distance" 
                  stroke="hsl(var(--info))" 
                  fillOpacity={1} 
                  fill="url(#colorDistance)"
                  name="Distance (mi)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>

        <TabsContent value="workouts" className="m-0">
          <ChartCard title="Workout Activity" subtitle="This Week">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activityData}
                margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  yAxisId="left"
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  orientation="right"
                  yAxisId="right"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="workouts" 
                  name="Workouts" 
                  fill="hsl(var(--accent))" 
                  yAxisId="left"
                  radius={[4, 4, 0, 0]} 
                />
                <Bar 
                  dataKey="duration" 
                  name="Duration (min)" 
                  fill="hsl(var(--primary))" 
                  yAxisId="right"
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}

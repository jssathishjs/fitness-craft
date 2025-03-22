
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { ActivityChart } from '@/components/dashboard/ActivityChart';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Scale, 
  Ruler, 
  ActivitySquare 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockUserData, mockWeeklyActivity } from '@/utils/mockData';
import { cn } from '@/lib/utils';

const progressData = mockUserData.weightHistory.map(entry => ({
  date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  weight: entry.weight
}));

const activityData = Object.keys(mockWeeklyActivity).map(day => {
  const activity = mockWeeklyActivity[day as keyof typeof mockWeeklyActivity];
  return {
    day,
    steps: activity.steps,
    calories: activity.caloriesBurned,
    activeMinutes: activity.activeMinutes
  };
});

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glassmorphism p-3 rounded-md text-sm">
        <p className="font-semibold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`tooltip-${index}`} className="flex items-center gap-2 mt-1">
            <span 
              className="w-2 h-2 rounded-full inline-block" 
              style={{ backgroundColor: entry.color }} 
            />
            <span>
              {`${entry.name}: ${typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}`}
            </span>
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const Progress = () => {
  const [timeFrame, setTimeFrame] = React.useState('week');
  
  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <section className="pt-6">
          <h1 className="text-4xl font-semibold tracking-tight mb-2 animate-fade-in">Your Progress</h1>
          <p className="text-muted-foreground mb-8 max-w-3xl animate-fade-in stagger-delay-1">
            Track your fitness journey over time and see how far you've come.
          </p>
        </section>

        <section className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-6">
            <h2 className="text-2xl font-semibold">Progress Overview</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Mar 11 - Mar 17, 2024</span>
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Select defaultValue="week" onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-delayed-fade-in stagger-delay-1">
          <DashboardCard
            title="Body Metrics"
            icon={<Scale className="h-5 w-5" />}
            className="col-span-1"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Current Weight</p>
                  <p className="text-2xl font-semibold">{mockUserData.weight.toFixed(1)} kg</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Target Weight</p>
                  <p className="text-2xl font-semibold">{mockUserData.targetWeight.toFixed(1)} kg</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Weight Change</p>
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={progressData}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }} 
                        tickLine={false}
                        axisLine={{ stroke: 'hsl(var(--border))' }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }} 
                        tickLine={false}
                        axisLine={{ stroke: 'hsl(var(--border))' }}
                        domain={['dataMin - 1', 'dataMax + 1']}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="weight" 
                        stroke="hsl(var(--primary))" 
                        activeDot={{ r: 8 }}
                        name="Weight (kg)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border border-border/50 rounded-md">
                  <div className="flex items-center gap-2 mb-1">
                    <Ruler className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Height</p>
                  </div>
                  <p className="text-lg font-medium">{mockUserData.height} cm</p>
                </div>
                <div className="p-3 border border-border/50 rounded-md">
                  <div className="flex items-center gap-2 mb-1">
                    <Scale className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">BMI</p>
                  </div>
                  <p className="text-lg font-medium">{mockUserData.bmi.toFixed(1)}</p>
                </div>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard
            title="Activity Metrics"
            icon={<ActivitySquare className="h-5 w-5" />}
            className="col-span-2"
          >
            <div className="space-y-6">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={activityData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fontSize: 12 }} 
                      tickLine={false}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                    />
                    <YAxis 
                      yAxisId="left" 
                      orientation="left" 
                      stroke="hsl(var(--primary))" 
                      tick={{ fontSize: 12 }} 
                      tickLine={false}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      stroke="hsl(var(--accent))" 
                      tick={{ fontSize: 12 }} 
                      tickLine={false}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar 
                      yAxisId="left" 
                      dataKey="steps" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]}
                      name="Steps"
                    />
                    <Bar 
                      yAxisId="right" 
                      dataKey="activeMinutes" 
                      fill="hsl(var(--accent))" 
                      radius={[4, 4, 0, 0]}
                      name="Active Minutes"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <ProgressMetric 
                  title="Average Steps" 
                  value={mockUserData.averageSteps.toLocaleString()} 
                  target="10,000"
                  percentage={(mockUserData.averageSteps / 10000) * 100}
                  color="bg-primary"
                />
                <ProgressMetric 
                  title="Active Minutes" 
                  value={Object.values(mockWeeklyActivity).reduce((sum, day) => sum + day.activeMinutes, 0).toString()} 
                  target="1,050"
                  percentage={(Object.values(mockWeeklyActivity).reduce((sum, day) => sum + day.activeMinutes, 0) / 1050) * 100}
                  color="bg-accent"
                />
                <ProgressMetric 
                  title="Calories Burned" 
                  value={Object.values(mockWeeklyActivity).reduce((sum, day) => sum + day.caloriesBurned, 0).toLocaleString()} 
                  target="15,000"
                  percentage={(Object.values(mockWeeklyActivity).reduce((sum, day) => sum + day.caloriesBurned, 0) / 15000) * 100}
                  color="bg-warning"
                />
              </div>
            </div>
          </DashboardCard>
        </section>

        <section className="animate-delayed-fade-in stagger-delay-2">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="workouts">Workouts</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="m-0">
              <ActivityChart />
            </TabsContent>

            <TabsContent value="workouts" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard
                  title="Workout Frequency"
                  className="col-span-1"
                >
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={Object.keys(mockWeeklyActivity).map(day => ({
                          day,
                          workouts: mockWeeklyActivity[day as keyof typeof mockWeeklyActivity].workouts.length,
                          duration: mockWeeklyActivity[day as keyof typeof mockWeeklyActivity].workouts.reduce((sum, workout) => sum + workout.duration, 0)
                        }))}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="day" 
                          tick={{ fontSize: 12 }} 
                          tickLine={false}
                          axisLine={{ stroke: 'hsl(var(--border))' }}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }} 
                          tickLine={false}
                          axisLine={{ stroke: 'hsl(var(--border))' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar 
                          dataKey="workouts" 
                          fill="hsl(var(--info))" 
                          radius={[4, 4, 0, 0]}
                          name="Workouts"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </DashboardCard>
                
                <DashboardCard
                  title="Workout Duration"
                  className="col-span-1"
                >
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={Object.keys(mockWeeklyActivity).map(day => ({
                          day,
                          duration: mockWeeklyActivity[day as keyof typeof mockWeeklyActivity].workouts.reduce((sum, workout) => sum + workout.duration, 0)
                        }))}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="day" 
                          tick={{ fontSize: 12 }} 
                          tickLine={false}
                          axisLine={{ stroke: 'hsl(var(--border))' }}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }} 
                          tickLine={false}
                          axisLine={{ stroke: 'hsl(var(--border))' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar 
                          dataKey="duration" 
                          fill="hsl(var(--accent))" 
                          radius={[4, 4, 0, 0]}
                          name="Minutes"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </DashboardCard>
              </div>
            </TabsContent>

            <TabsContent value="nutrition" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard
                  title="Calorie Intake vs. Goal"
                  className="col-span-1"
                >
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={Array(7).fill(0).map((_, i) => {
                          const date = new Date();
                          date.setDate(date.getDate() - 6 + i);
                          return {
                            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                            consumed: 1800 + Math.random() * 600,
                            goal: 2200
                          };
                        })}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }} 
                          tickLine={false}
                          axisLine={{ stroke: 'hsl(var(--border))' }}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }} 
                          tickLine={false}
                          axisLine={{ stroke: 'hsl(var(--border))' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="consumed" 
                          stroke="hsl(var(--info))" 
                          activeDot={{ r: 8 }}
                          name="Calories Consumed"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="goal" 
                          stroke="hsl(var(--muted-foreground))" 
                          strokeDasharray="3 3"
                          name="Calorie Goal"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </DashboardCard>
                
                <DashboardCard
                  title="Macronutrient Distribution"
                  className="col-span-1"
                >
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={Array(7).fill(0).map((_, i) => {
                          const date = new Date();
                          date.setDate(date.getDate() - 6 + i);
                          return {
                            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                            protein: 100 + Math.random() * 50,
                            carbs: 180 + Math.random() * 60,
                            fat: 50 + Math.random() * 30,
                          };
                        })}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }} 
                          tickLine={false}
                          axisLine={{ stroke: 'hsl(var(--border))' }}
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }} 
                          tickLine={false}
                          axisLine={{ stroke: 'hsl(var(--border))' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar 
                          dataKey="protein" 
                          stackId="a" 
                          fill="#8884d8" 
                          name="Protein (g)"
                        />
                        <Bar 
                          dataKey="carbs" 
                          stackId="a" 
                          fill="#82ca9d" 
                          name="Carbs (g)"
                        />
                        <Bar 
                          dataKey="fat" 
                          stackId="a" 
                          fill="#ffc658" 
                          name="Fat (g)"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </DashboardCard>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </Layout>
  );
};

interface ProgressMetricProps {
  title: string;
  value: string;
  target: string;
  percentage: number;
  color?: string;
}

function ProgressMetric({ title, value, target, percentage, color = "bg-primary" }: ProgressMetricProps) {
  return (
    <div className="p-4 border border-border/50 rounded-lg">
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <div className="flex items-baseline gap-1">
        <p className="text-xl font-semibold">{value}</p>
        <p className="text-xs text-muted-foreground">/ {target}</p>
      </div>
      <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full", color)} 
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Progress;

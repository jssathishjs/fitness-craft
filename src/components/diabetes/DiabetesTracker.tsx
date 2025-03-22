
import React, { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  Clock, 
  Droplet, 
  Syringe, 
  Apple, 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  ListChecks
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Mock data for glucose readings
const mockGlucoseData = [
  { id: 1, timestamp: '2024-06-01 07:30', level: 110, status: 'normal', notes: 'Before breakfast', insulin: 4, carbs: 30 },
  { id: 2, timestamp: '2024-06-01 12:00', level: 145, status: 'high', notes: 'After lunch', insulin: 6, carbs: 45 },
  { id: 3, timestamp: '2024-06-01 18:30', level: 100, status: 'normal', notes: 'Before dinner', insulin: 5, carbs: 40 },
  { id: 4, timestamp: '2024-06-01 22:00', level: 95, status: 'normal', notes: 'Before bed', insulin: 3, carbs: 15 },
  { id: 5, timestamp: '2024-06-02 07:45', level: 120, status: 'normal', notes: 'Before breakfast', insulin: 4, carbs: 30 },
  { id: 6, timestamp: '2024-06-02 12:15', level: 160, status: 'high', notes: 'After lunch', insulin: 7, carbs: 50 },
  { id: 7, timestamp: '2024-06-02 18:45', level: 90, status: 'normal', notes: 'Before dinner', insulin: 5, carbs: 35 },
  { id: 8, timestamp: '2024-06-02 22:15', level: 85, status: 'low', notes: 'Before bed', insulin: 2, carbs: 20 },
  { id: 9, timestamp: '2024-06-03 08:00', level: 115, status: 'normal', notes: 'Before breakfast', insulin: 4, carbs: 30 },
  { id: 10, timestamp: '2024-06-03 12:30', level: 150, status: 'high', notes: 'After lunch', insulin: 6, carbs: 45 },
];

// Format data for charts
const chartData = mockGlucoseData.map(reading => ({
  name: format(new Date(reading.timestamp), 'MMM dd HH:mm'),
  glucose: reading.level,
  insulin: reading.insulin,
  carbs: reading.carbs,
}));

// Form schema for glucose readings
const glucoseFormSchema = z.object({
  level: z.coerce.number()
    .min(40, { message: "Glucose level must be at least 40 mg/dL" })
    .max(400, { message: "Glucose level must be at most 400 mg/dL" }),
  insulin: z.coerce.number()
    .min(0, { message: "Insulin dose cannot be negative" })
    .optional(),
  carbs: z.coerce.number()
    .min(0, { message: "Carbs cannot be negative" })
    .optional(),
  notes: z.string().optional(),
  reading_time: z.date(),
});

type GlucoseFormValues = z.infer<typeof glucoseFormSchema>;

export function DiabetesTracker() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<'chart' | 'log'>('chart');

  // Define form
  const form = useForm<GlucoseFormValues>({
    resolver: zodResolver(glucoseFormSchema),
    defaultValues: {
      level: undefined,
      insulin: undefined,
      carbs: undefined,
      notes: '',
      reading_time: new Date(),
    },
  });

  // Stats summary
  const stats = {
    average: {
      daily: 120,
      weekly: 118,
      monthly: 125
    },
    range: {
      min: 85,
      max: 160
    },
    targetRange: {
      inRange: 75, // percentage
      belowRange: 5, // percentage
      aboveRange: 20 // percentage
    }
  };

  // Handle form submission
  function onSubmit(data: GlucoseFormValues) {
    console.log(data);
    // In a real app, we would save this data
    setIsDialogOpen(false);
    form.reset();
  }

  return (
    <div className="animate-delayed-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Glucose Tracker</h2>
          <p className="text-sm text-muted-foreground">Track and manage your diabetes metrics</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Log Reading
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Log Glucose Reading</DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Glucose Level (mg/dL)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter glucose level" {...field} type="number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="insulin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Insulin Dose (units)</FormLabel>
                        <FormControl>
                          <Input placeholder="Optional" {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="carbs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Carbs (grams)</FormLabel>
                        <FormControl>
                          <Input placeholder="Optional" {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="reading_time"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Reading Time</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP p")
                              ) : (
                                <span>Pick date and time</span>
                              )}
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Input placeholder="Add notes about this reading" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit">Save Reading</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Droplet className="h-5 w-5 mr-2 text-blue-500" />
              Average Glucose
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold">{stats.average.daily} mg/dL</p>
                <p className="text-sm text-muted-foreground">Today's Average</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-1">{stats.average.weekly}</span>
                  <span className="text-xs text-muted-foreground">7d</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-1">{stats.average.monthly}</span>
                  <span className="text-xs text-muted-foreground">30d</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="h-5 w-5 mr-2 text-indigo-500" />
              Glucose Range
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">{stats.range.min}</p>
                <p className="text-lg">-</p>
                <p className="text-3xl font-bold">{stats.range.max}</p>
                <p className="text-sm text-muted-foreground">mg/dL</p>
              </div>
              <div className="flex items-center gap-1">
                <TrendingDown className="h-5 w-5 text-blue-500" />
                <TrendingUp className="h-5 w-5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ListChecks className="h-5 w-5 mr-2 text-green-500" />
              Target Range
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">In Range (70-140 mg/dL)</span>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-green-500">{stats.targetRange.inRange}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Below Range</span>
                <span className="text-lg font-bold text-blue-500">{stats.targetRange.belowRange}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Above Range</span>
                <span className="text-lg font-bold text-red-500">{stats.targetRange.aboveRange}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Chart & Log Tabs */}
      <div className="bg-card border border-border/50 rounded-lg mb-8">
        <div className="border-b border-border/50 px-4 py-3 flex">
          <button 
            className={cn(
              "px-4 py-2 font-medium rounded-md",
              activeTab === 'chart' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
            onClick={() => setActiveTab('chart')}
          >
            Glucose Chart
          </button>
          <button 
            className={cn(
              "px-4 py-2 font-medium rounded-md",
              activeTab === 'log' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
            onClick={() => setActiveTab('log')}
          >
            Reading Log
          </button>
        </div>
        
        <div className="p-4">
          {activeTab === 'chart' ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Glucose Trend</h3>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        {format(selectedDate, 'MMM dd, yyyy')}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="h-[400px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }} 
                      tickLine={false}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                      angle={-45}
                      textAnchor="end"
                    />
                    <YAxis 
                      yAxisId="glucose"
                      tick={{ fontSize: 12 }} 
                      tickLine={false}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                      domain={[40, 220]}
                    />
                    <YAxis 
                      yAxisId="insulin"
                      orientation="right"
                      tick={{ fontSize: 12 }} 
                      tickLine={false}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                      domain={[0, 20]}
                    />
                    <Tooltip />
                    <Legend />
                    
                    {/* Target range background */}
                    <rect x="0%" y="70" width="100%" height="70" fill="rgba(0, 128, 0, 0.1)" />
                    
                    <Line 
                      type="monotone" 
                      dataKey="glucose" 
                      stroke="#8884d8" 
                      yAxisId="glucose"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="Glucose (mg/dL)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="insulin" 
                      stroke="#ff7300" 
                      yAxisId="insulin"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      name="Insulin (units)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <div className="h-3 w-6 bg-green-100 border border-green-300 rounded-sm"></div>
                <span>Target Range (70-140 mg/dL)</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Reading Log</h3>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Glucose</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Insulin</TableHead>
                      <TableHead>Carbs</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockGlucoseData.map((reading) => (
                      <TableRow key={reading.id}>
                        <TableCell>
                          <div className="font-medium">{format(new Date(reading.timestamp), 'MMM dd')}</div>
                          <div className="text-xs text-muted-foreground">{format(new Date(reading.timestamp), 'h:mm a')}</div>
                        </TableCell>
                        <TableCell>{reading.level} mg/dL</TableCell>
                        <TableCell>
                          <Badge variant={
                            reading.status === 'high' ? 'destructive' : 
                            reading.status === 'low' ? 'default' : 'outline'
                          }>
                            {reading.status === 'high' ? 'High' : 
                             reading.status === 'low' ? 'Low' : 'Normal'}
                          </Badge>
                        </TableCell>
                        <TableCell>{reading.insulin} units</TableCell>
                        <TableCell>{reading.carbs}g</TableCell>
                        <TableCell className="text-muted-foreground">{reading.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="bg-card border border-border/50 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-3">Insights & Recommendations</h3>
        
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-md">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <TrendingDown className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h4 className="font-medium text-blue-700 dark:text-blue-400">Low Glucose Pattern</h4>
                <p className="text-sm text-blue-700/80 dark:text-blue-400/80">
                  You tend to have lower glucose levels before bed. Consider a small protein-rich snack in the evening.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-md">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <TrendingUp className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h4 className="font-medium text-red-700 dark:text-red-400">Post-Lunch Spike</h4>
                <p className="text-sm text-red-700/80 dark:text-red-400/80">
                  Consider taking insulin 15-20 minutes before lunch to better manage post-meal glucose levels.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-md">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Syringe className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h4 className="font-medium text-green-700 dark:text-green-400">Good Insulin Management</h4>
                <p className="text-sm text-green-700/80 dark:text-green-400/80">
                  Your insulin dosing for breakfast has been effective at maintaining target glucose levels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

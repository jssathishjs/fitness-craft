
import React, { useState } from 'react';
import { 
  CalendarDays, 
  ChevronRight, 
  Clock, 
  Dumbbell, 
  Flame, 
  Target
} from 'lucide-react';
import { DashboardCard } from '../dashboard/DashboardCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Workout {
  id: string;
  title: string;
  duration: number;
  calories: number;
  type: 'strength' | 'cardio' | 'flexibility' | 'sports';
  completed: boolean;
  intensity: 'low' | 'medium' | 'high';
  progress?: number;
  date?: string;
}

const upcomingWorkouts: Workout[] = [
  {
    id: '1',
    title: 'Upper Body Strength',
    duration: 45,
    calories: 320,
    type: 'strength',
    completed: false,
    intensity: 'high',
    date: 'Today, 5:30 PM'
  },
  {
    id: '2',
    title: 'HIIT Cardio',
    duration: 30,
    calories: 380,
    type: 'cardio',
    completed: false,
    intensity: 'high',
    date: 'Tomorrow, 6:00 AM'
  },
  {
    id: '3',
    title: 'Recovery Yoga',
    duration: 60,
    calories: 180,
    type: 'flexibility',
    completed: false,
    intensity: 'low',
    date: 'Wed, 7:00 PM'
  }
];

const recentWorkouts: Workout[] = [
  {
    id: '4',
    title: 'Leg Day',
    duration: 55,
    calories: 410,
    type: 'strength',
    completed: true,
    intensity: 'high',
    progress: 100
  },
  {
    id: '5',
    title: 'Morning Run',
    duration: 40,
    calories: 350,
    type: 'cardio',
    completed: true,
    intensity: 'medium',
    progress: 100
  },
  {
    id: '6',
    title: 'Basketball',
    duration: 90,
    calories: 680,
    type: 'sports',
    completed: true,
    intensity: 'medium',
    progress: 100
  }
];

const inProgressWorkouts: Workout[] = [
  {
    id: '7',
    title: 'Core Strength',
    duration: 30,
    calories: 250,
    type: 'strength',
    completed: false,
    intensity: 'medium',
    progress: 65
  }
];

const getTypeIcon = (type: Workout['type']) => {
  switch (type) {
    case 'strength':
      return <Dumbbell className="h-4 w-4" />;
    case 'cardio':
      return <Flame className="h-4 w-4" />;
    case 'flexibility':
      return <Target className="h-4 w-4" />;
    case 'sports':
      return <Target className="h-4 w-4" />;
    default:
      return <Dumbbell className="h-4 w-4" />;
  }
};

const getTypeColor = (type: Workout['type']) => {
  switch (type) {
    case 'strength':
      return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-800/20 dark:text-blue-300 dark:border-blue-800/30';
    case 'cardio':
      return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-800/20 dark:text-red-300 dark:border-red-800/30';
    case 'flexibility':
      return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-800/20 dark:text-purple-300 dark:border-purple-800/30';
    case 'sports':
      return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-800/20 dark:text-green-300 dark:border-green-800/30';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/20 dark:text-gray-300 dark:border-gray-800/30';
  }
};

const getIntensityColor = (intensity: Workout['intensity']) => {
  switch (intensity) {
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-800/20 dark:text-green-300 dark:border-green-800/30';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-800/20 dark:text-yellow-300 dark:border-yellow-800/30';
    case 'high':
      return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-800/20 dark:text-red-300 dark:border-red-800/30';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/20 dark:text-gray-300 dark:border-gray-800/30';
  }
};

function WorkoutItem({ workout }: { workout: Workout }) {
  return (
    <div className="flex flex-col space-y-4 p-4 border border-border/50 rounded-lg hover:shadow-soft transition-all">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h3 className="font-medium text-lg">{workout.title}</h3>
          {workout.date && (
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5 mr-1" />
              <span>{workout.date}</span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge 
            variant="outline" 
            className={cn("flex items-center gap-1 px-2 py-0.5 text-xs", getTypeColor(workout.type))}
          >
            {getTypeIcon(workout.type)}
            <span>
              {workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}
            </span>
          </Badge>
          <Badge 
            variant="outline" 
            className={cn("px-2 py-0.5 text-xs", getIntensityColor(workout.intensity))}
          >
            {workout.intensity.charAt(0).toUpperCase() + workout.intensity.slice(1)} Intensity
          </Badge>
        </div>
      </div>
      
      {workout.progress !== undefined && workout.progress < 100 && (
        <div className="w-full">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-xs font-medium">{workout.progress}%</span>
          </div>
          <Progress value={workout.progress} className="h-1.5" />
        </div>
      )}
      
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{workout.duration} min</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Flame className="h-3.5 w-3.5 mr-1" />
            <span>{workout.calories} kcal</span>
          </div>
        </div>
        <Button variant="outline" size="sm" className="h-8">
          {workout.completed ? 'Details' : 'Start'}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

export function WorkoutTracker() {
  const [showAllRecent, setShowAllRecent] = useState(false);
  const displayedRecent = showAllRecent ? recentWorkouts : recentWorkouts.slice(0, 2);
  
  return (
    <div className="grid grid-cols-1 gap-8 animate-delayed-fade-in stagger-delay-3">
      {inProgressWorkouts.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">In Progress</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {inProgressWorkouts.map((workout) => (
              <WorkoutItem key={workout.id} workout={workout} />
            ))}
          </div>
        </div>
      )}
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming Workouts</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {upcomingWorkouts.map((workout) => (
            <WorkoutItem key={workout.id} workout={workout} />
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Workouts</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowAllRecent(!showAllRecent)}
          >
            {showAllRecent ? 'Show Less' : 'View All'}
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {displayedRecent.map((workout) => (
            <WorkoutItem key={workout.id} workout={workout} />
          ))}
        </div>
      </div>
    </div>
  );
}


import React from 'react';
import { 
  BarChart3, 
  Calendar, 
  ChevronRight, 
  Heart, 
  History, 
  Settings, 
  User,
  Weight
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

const profileData = {
  name: 'Alex Johnson',
  joinDate: 'June 2023',
  goalProgress: 68,
  stats: {
    workouts: 87,
    calories: 48200,
    minutes: 3240
  },
  goals: [
    { id: 1, name: 'Lose 10 pounds', current: 6, target: 10, unit: 'lbs', type: 'weight', color: 'bg-blue-500' },
    { id: 2, name: 'Train 4x per week', current: 3, target: 4, unit: 'workouts', type: 'activity', color: 'bg-green-500' },
    { id: 3, name: 'Run 20 miles', current: 12.5, target: 20, unit: 'miles', type: 'cardio', color: 'bg-purple-500' },
  ],
  achievements: [
    { id: 1, name: '7-Day Streak', description: 'Worked out for 7 days in a row', date: 'Mar 15, 2024', icon: <Calendar className="h-5 w-5" /> },
    { id: 2, name: '10K Steps', description: 'Reached 10,000 steps in a day', date: 'Mar 12, 2024', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 3, name: 'First Month', description: 'Completed one month with FitnessCraft', date: 'Feb 28, 2024', icon: <Heart className="h-5 w-5" /> },
  ]
};

interface ListItemProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
  className?: string;
}

function ListItem({ icon, title, onClick, className }: ListItemProps) {
  return (
    <div 
      className={cn(
        "flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-4">
          {icon}
        </div>
        <span className="font-medium">{title}</span>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </div>
  );
}

export function ProfileSection() {
  return (
    <div className="flex flex-col space-y-8 animate-delayed-fade-in">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 border border-border/50 rounded-lg bg-card shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 border-2 border-primary/20">
            <AvatarImage src="" />
            <AvatarFallback className="text-2xl">AJ</AvatarFallback>
          </Avatar>
          
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-1">{profileData.name}</h2>
            <p className="text-muted-foreground mb-2">Member since {profileData.joinDate}</p>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-semibold">{profileData.stats.workouts}</span>
                <span className="text-xs text-muted-foreground">Workouts</span>
              </div>
              <div className="w-px h-10 bg-border"></div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-semibold">{Math.round(profileData.stats.calories / 1000)}k</span>
                <span className="text-xs text-muted-foreground">Calories</span>
              </div>
              <div className="w-px h-10 bg-border"></div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-semibold">{Math.round(profileData.stats.minutes / 60)}</span>
                <span className="text-xs text-muted-foreground">Hours</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline">
            <History className="h-4 w-4 mr-2" />
            History
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
      
      {/* Goals & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Goals
            </CardTitle>
            <CardDescription>Track your progress towards your fitness goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profileData.goals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{goal.name}</h3>
                  <span className="text-sm text-muted-foreground">
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                </div>
                <div className="relative">
                  <Progress 
                    value={Math.min((goal.current / goal.target) * 100, 100)} 
                    className={cn("h-2", goal.color)} 
                  />
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="border-t border-border/50 bg-muted/10 flex justify-end">
            <Button variant="outline" size="sm">
              Add New Goal
            </Button>
          </CardFooter>
        </Card>
        
        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Achievements
            </CardTitle>
            <CardDescription>Your fitness milestones and badges</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profileData.achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-start gap-3 p-3 border border-border/50 rounded-md">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="font-medium">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">Earned on {achievement.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="border-t border-border/50 bg-muted/10 flex justify-between">
            <span className="text-sm text-muted-foreground">3 of 24 achievements unlocked</span>
            <Button variant="link" size="sm" className="p-0">
              View All
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Settings */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Account & Settings</h2>
        <div className="space-y-2 border border-border/50 rounded-lg overflow-hidden">
          <Accordion type="single" collapsible className="border-0">
            <AccordionItem value="account" className="border-0">
              <AccordionTrigger className="px-4 hover:bg-muted/30 hover:no-underline">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-4">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Account Settings</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-t border-b border-border/50 bg-muted/10 px-0">
                <div className="px-4 py-2 space-y-2">
                  <ListItem icon={<User className="h-5 w-5" />} title="Personal Information" />
                  <ListItem icon={<Lock className="h-5 w-5" />} title="Security & Password" />
                  <ListItem icon={<Mail className="h-5 w-5" />} title="Notification Preferences" />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <ListItem icon={<Weight className="h-5 w-5" />} title="Fitness Tracking" />
          <ListItem icon={<Calendar className="h-5 w-5" />} title="Workout Schedule" />
          <ListItem icon={<BarChart3 className="h-5 w-5" />} title="Reports & Analytics" />
          <ListItem icon={<Heart className="h-5 w-5" />} title="Health Metrics" />
        </div>
      </div>
    </div>
  );
}

function Award(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function Lock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function Mail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function Target(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

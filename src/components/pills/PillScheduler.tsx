
import React, { useState } from 'react';
import { Calendar, Clock, Pill, AlarmCheck, Bell, Plus, Save, X } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type MedicationSchedule = {
  id: string;
  medicationId: string;
  medicationName: string;
  color: string;
  time: string;
  days: string[];
  reminder: boolean;
};

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function PillScheduler() {
  const [schedules, setSchedules] = useState<MedicationSchedule[]>([
    {
      id: '1',
      medicationId: '1',
      medicationName: 'Metformin',
      color: 'bg-blue-500',
      time: '08:00',
      days: ['Monday', 'Wednesday', 'Friday'],
      reminder: true,
    },
    {
      id: '2',
      medicationId: '1',
      medicationName: 'Metformin',
      color: 'bg-blue-500',
      time: '20:00',
      days: ['Monday', 'Wednesday', 'Friday'],
      reminder: true,
    },
    {
      id: '3',
      medicationId: '2',
      medicationName: 'Lisinopril',
      color: 'bg-green-500',
      time: '09:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      reminder: true,
    },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newSchedule, setNewSchedule] = useState<Partial<MedicationSchedule>>({
    time: '08:00',
    days: [],
    reminder: true,
  });

  const { toast } = useToast();

  // Mock medications data
  const medications = [
    { id: '1', name: 'Metformin', color: 'bg-blue-500' },
    { id: '2', name: 'Lisinopril', color: 'bg-green-500' },
    { id: '3', name: 'Atorvastatin', color: 'bg-purple-500' },
  ];

  const handleAddSchedule = () => {
    if (!newSchedule.medicationId || !newSchedule.time || newSchedule.days?.length === 0) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields.",
      });
      return;
    }

    const medication = medications.find(med => med.id === newSchedule.medicationId);
    
    const schedule: MedicationSchedule = {
      id: Date.now().toString(),
      medicationId: newSchedule.medicationId!,
      medicationName: medication?.name || '',
      color: medication?.color || 'bg-gray-500',
      time: newSchedule.time!,
      days: newSchedule.days || [],
      reminder: newSchedule.reminder || false,
    };

    setSchedules([...schedules, schedule]);
    setDialogOpen(false);
    setNewSchedule({
      time: '08:00',
      days: [],
      reminder: true,
    });

    toast({
      title: "Schedule Added",
      description: `${medication?.name} has been scheduled for ${newSchedule.days?.length} days.`,
    });
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
    toast({
      title: "Schedule Removed",
      description: "The medication schedule has been removed.",
    });
  };

  const toggleDay = (day: string) => {
    if (newSchedule.days?.includes(day)) {
      setNewSchedule({
        ...newSchedule,
        days: newSchedule.days.filter(d => d !== day),
      });
    } else {
      setNewSchedule({
        ...newSchedule,
        days: [...(newSchedule.days || []), day],
      });
    }
  };

  const todaySchedules = schedules.filter(schedule => 
    schedule.days.includes(format(new Date(), 'EEEE'))
  ).sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap md:flex-nowrap gap-4 justify-between items-center">
        <h2 className="text-2xl font-medium">Medication Schedule</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Add Schedule
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Medication Schedule</DialogTitle>
              <DialogDescription>
                Set up a schedule for when to take your medication.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="medication">Medication</Label>
                <select 
                  id="medication"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newSchedule.medicationId || ''}
                  onChange={(e) => setNewSchedule({...newSchedule, medicationId: e.target.value})}
                >
                  <option value="" disabled>Select a medication</option>
                  {medications.map(med => (
                    <option key={med.id} value={med.id}>{med.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input 
                  id="time" 
                  type="time" 
                  value={newSchedule.time || ''}
                  onChange={(e) => setNewSchedule({...newSchedule, time: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Days of Week</Label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {DAYS_OF_WEEK.map((day) => (
                    <Button
                      key={day}
                      type="button"
                      variant={newSchedule.days?.includes(day) ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => toggleDay(day)}
                    >
                      <div className="flex items-center">
                        {day.substring(0, 3)}
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="reminder"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={newSchedule.reminder || false}
                  onChange={(e) => setNewSchedule({...newSchedule, reminder: e.target.checked})}
                />
                <Label htmlFor="reminder">Enable notifications</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSchedule}>
                Save Schedule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todaySchedules.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No medications scheduled for today.</p>
            ) : (
              <div className="space-y-4">
                {todaySchedules.map((schedule) => (
                  <div key={schedule.id} className="flex items-center justify-between p-3 rounded-md border">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-md ${schedule.color}`}>
                        <Pill className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{schedule.medicationName}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {schedule.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <AlarmCheck className="h-4 w-4" />
                        <span className="sr-only">Mark as taken</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div>
          <h3 className="text-lg font-medium mb-4">All Scheduled Medications</h3>
          <div className="space-y-4">
            {schedules.map((schedule) => (
              <Card key={schedule.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-md ${schedule.color}`}>
                        <Pill className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{schedule.medicationName}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {schedule.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {schedule.reminder && (
                        <Bell className="h-4 w-4 text-primary" />
                      )}
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleDeleteSchedule(schedule.id)}
                      >
                        <X className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-1 mt-2">
                      {schedule.days.map((day) => (
                        <span key={day} className="text-xs bg-secondary px-2 py-1 rounded-md">
                          {day.substring(0, 3)}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

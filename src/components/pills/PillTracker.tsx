
import React, { useState } from 'react';
import { Plus, Pill, RefreshCw, MoreVertical, Calendar, X } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

type Medication = {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  refillDate: string;
  color: string;
};

const PILL_COLORS = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-orange-500',
];

export function PillTracker() {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      refillDate: '2023-08-15',
      color: 'bg-blue-500',
    },
    {
      id: '2',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      refillDate: '2023-08-20',
      color: 'bg-green-500',
    },
    {
      id: '3',
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily at bedtime',
      refillDate: '2023-09-01',
      color: 'bg-purple-500',
    },
  ]);

  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(PILL_COLORS[0]);

  const form = useForm({
    defaultValues: {
      name: '',
      dosage: '',
      frequency: '',
      refillDate: format(new Date(), 'yyyy-MM-dd'),
    },
  });

  const { toast } = useToast();

  const onSubmit = (data: any) => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: data.name,
      dosage: data.dosage,
      frequency: data.frequency,
      refillDate: data.refillDate,
      color: selectedColor,
    };

    setMedications([...medications, newMedication]);
    form.reset();
    setSelectedColor(PILL_COLORS[0]);
    setOpen(false);
    
    toast({
      title: "Medication Added",
      description: `${data.name} has been added to your medications.`,
    });
  };

  const handleDeleteMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
    toast({
      title: "Medication Removed",
      description: "The medication has been removed from your list.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap md:flex-nowrap gap-4 justify-between items-center">
        <h2 className="text-2xl font-medium">Your Medications</h2>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Add Medication
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Add New Medication</DrawerTitle>
              <DrawerDescription>
                Enter the details of your medication to add it to your tracker.
              </DrawerDescription>
            </DrawerHeader>
            
            <div className="px-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medication Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Metformin" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dosage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dosage</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 500mg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frequency</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Once daily" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="refillDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Refill Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <Label>Pill Color</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {PILL_COLORS.map((color) => (
                        <button
                          key={color}
                          type="button"
                          className={`w-8 h-8 rounded-full ${color} ${
                            selectedColor === color ? "ring-2 ring-offset-2 ring-ring" : ""
                          }`}
                          onClick={() => setSelectedColor(color)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <DrawerFooter className="px-0">
                    <Button type="submit">Add Medication</Button>
                  </DrawerFooter>
                </form>
              </Form>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {medications.map((medication) => (
          <Card key={medication.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-md ${medication.color}`}>
                    <Pill className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-xl">{medication.name}</CardTitle>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Medication Options</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                      <Button className="w-full justify-start" variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        View Schedule
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Log Refill
                      </Button>
                      <Button 
                        className="w-full justify-start" 
                        variant="destructive"
                        onClick={() => handleDeleteMedication(medication.id)}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Remove Medication
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>{medication.dosage} - {medication.frequency}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-sm">
                <span className="font-medium">Next refill:</span> {format(new Date(medication.refillDate), 'PPP')}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                asChild
              >
                <a href="/schedule-pills">Schedule Reminders</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

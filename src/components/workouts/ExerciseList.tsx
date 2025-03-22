
import React, { useState } from 'react';
import { 
  Check, 
  ChevronDown, 
  Clock, 
  Dumbbell, 
  Edit, 
  Heart, 
  Plus, 
  Search,
  Target
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface Exercise {
  id: string;
  name: string;
  targetMuscle: string;
  category: string;
  equipment: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const exercises: Exercise[] = [
  {
    id: '1',
    name: 'Barbell Bench Press',
    targetMuscle: 'Chest',
    category: 'Strength',
    equipment: 'Barbell',
    difficulty: 'intermediate'
  },
  {
    id: '2',
    name: 'Pull-up',
    targetMuscle: 'Back',
    category: 'Strength',
    equipment: 'Bodyweight',
    difficulty: 'intermediate'
  },
  {
    id: '3',
    name: 'Squat',
    targetMuscle: 'Legs',
    category: 'Strength',
    equipment: 'Barbell',
    difficulty: 'intermediate'
  },
  {
    id: '4',
    name: 'Deadlift',
    targetMuscle: 'Back',
    category: 'Strength',
    equipment: 'Barbell',
    difficulty: 'advanced'
  },
  {
    id: '5',
    name: 'Shoulder Press',
    targetMuscle: 'Shoulders',
    category: 'Strength',
    equipment: 'Dumbbell',
    difficulty: 'intermediate'
  },
  {
    id: '6',
    name: 'Bicep Curl',
    targetMuscle: 'Arms',
    category: 'Strength',
    equipment: 'Dumbbell',
    difficulty: 'beginner'
  },
  {
    id: '7',
    name: 'Tricep Extension',
    targetMuscle: 'Arms',
    category: 'Strength',
    equipment: 'Cable',
    difficulty: 'beginner'
  },
  {
    id: '8',
    name: 'Plank',
    targetMuscle: 'Core',
    category: 'Strength',
    equipment: 'Bodyweight',
    difficulty: 'beginner'
  }
];

const muscleGroups = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const equipments = ['All', 'Barbell', 'Dumbbell', 'Machine', 'Bodyweight', 'Cable', 'Kettlebell'];

const getDifficultyColor = (difficulty: Exercise['difficulty']) => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-800/20 dark:text-green-300 dark:border-green-800/30';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-800/20 dark:text-yellow-300 dark:border-yellow-800/30';
    case 'advanced':
      return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-800/20 dark:text-red-300 dark:border-red-800/30';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/20 dark:text-gray-300 dark:border-gray-800/30';
  }
};

export function ExerciseList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState('All');
  const [openExercise, setOpenExercise] = useState<string | null>(null);

  const filteredExercises = exercises.filter(exercise => {
    return (
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedMuscle === 'All' || exercise.targetMuscle === selectedMuscle) &&
      (selectedDifficulty === 'All' || 
        exercise.difficulty === selectedDifficulty.toLowerCase()) &&
      (selectedEquipment === 'All' || exercise.equipment === selectedEquipment)
    );
  });

  const handleExerciseToggle = (id: string) => {
    setOpenExercise(openExercise === id ? null : id);
  };

  return (
    <div className="animate-delayed-fade-in stagger-delay-3">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Exercise Library</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Custom
        </Button>
      </div>

      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select 
            value={selectedMuscle} 
            onValueChange={setSelectedMuscle}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by muscle group" />
            </SelectTrigger>
            <SelectContent>
              {muscleGroups.map((muscle) => (
                <SelectItem key={muscle} value={muscle}>
                  {muscle}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={selectedDifficulty} 
            onValueChange={setSelectedDifficulty}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={selectedEquipment} 
            onValueChange={setSelectedEquipment}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by equipment" />
            </SelectTrigger>
            <SelectContent>
              {equipments.map((equipment) => (
                <SelectItem key={equipment} value={equipment}>
                  {equipment}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise) => (
            <Collapsible
              key={exercise.id}
              open={openExercise === exercise.id}
              onOpenChange={() => handleExerciseToggle(exercise.id)}
              className="border border-border/50 rounded-lg overflow-hidden"
            >
              <CollapsibleTrigger className="flex justify-between items-center w-full p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center">
                  <Dumbbell className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div className="text-left">
                    <h3 className="font-medium">{exercise.name}</h3>
                    <p className="text-sm text-muted-foreground">{exercise.targetMuscle} • {exercise.equipment}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="outline" 
                    className={cn("px-2 py-0.5 text-xs", getDifficultyColor(exercise.difficulty))}
                  >
                    {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
                  </Badge>
                  <ChevronDown className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform",
                    openExercise === exercise.id && "transform rotate-180"
                  )} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 border-t border-border/50 bg-muted/10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground mb-1">Target Muscle</span>
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-2 text-primary" />
                      <span>{exercise.targetMuscle}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground mb-1">Equipment</span>
                    <div className="flex items-center">
                      <Dumbbell className="h-4 w-4 mr-2 text-primary" />
                      <span>{exercise.equipment}</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground mb-1">Difficulty</span>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-primary" />
                      <span>{exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Workout
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Search className="h-10 w-10 mb-2 text-muted-foreground/50" />
            <h3 className="text-lg font-medium">No exercises found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
}

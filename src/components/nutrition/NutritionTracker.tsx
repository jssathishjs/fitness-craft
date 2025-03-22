
import React, { useState } from 'react';
import { 
  Apple, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Circle, 
  Droplets, 
  FlameIcon, 
  Plus
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  time?: string;
}

interface MealSection {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  title: string;
  items: FoodItem[];
}

const mealSections: MealSection[] = [
  {
    type: 'breakfast',
    title: 'Breakfast',
    items: [
      {
        id: '1',
        name: 'Oatmeal with Berries',
        calories: 320,
        proteins: 12,
        carbs: 58,
        fats: 6,
        mealType: 'breakfast',
        time: '7:30 AM'
      },
      {
        id: '2',
        name: 'Greek Yogurt',
        calories: 150,
        proteins: 15,
        carbs: 8,
        fats: 5,
        mealType: 'breakfast',
        time: '7:45 AM'
      }
    ]
  },
  {
    type: 'lunch',
    title: 'Lunch',
    items: [
      {
        id: '3',
        name: 'Chicken Salad',
        calories: 420,
        proteins: 35,
        carbs: 25,
        fats: 18,
        mealType: 'lunch',
        time: '12:30 PM'
      }
    ]
  },
  {
    type: 'dinner',
    title: 'Dinner',
    items: [
      {
        id: '4',
        name: 'Salmon with Vegetables',
        calories: 480,
        proteins: 40,
        carbs: 20,
        fats: 22,
        mealType: 'dinner',
        time: '7:00 PM'
      }
    ]
  },
  {
    type: 'snack',
    title: 'Snacks',
    items: [
      {
        id: '5',
        name: 'Protein Bar',
        calories: 210,
        proteins: 20,
        carbs: 25,
        fats: 8,
        mealType: 'snack',
        time: '3:15 PM'
      },
      {
        id: '6',
        name: 'Apple',
        calories: 80,
        proteins: 0,
        carbs: 21,
        fats: 0,
        mealType: 'snack',
        time: '5:00 PM'
      }
    ]
  }
];

const nutritionGoals = {
  calories: 2200,
  proteins: 140,
  carbs: 220,
  fats: 70,
  water: 3000 // ml
};

const waterIntake = 1800; // ml

export function NutritionTracker() {
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  const toggleExpandedMeal = (mealType: string) => {
    setExpandedMeal(expandedMeal === mealType ? null : mealType);
  };

  // Calculate totals
  const totalNutrition = mealSections.reduce(
    (acc, section) => {
      const sectionTotals = section.items.reduce(
        (sectionAcc, item) => {
          return {
            calories: sectionAcc.calories + item.calories,
            proteins: sectionAcc.proteins + item.proteins,
            carbs: sectionAcc.carbs + item.carbs,
            fats: sectionAcc.fats + item.fats,
          };
        },
        { calories: 0, proteins: 0, carbs: 0, fats: 0 }
      );

      return {
        calories: acc.calories + sectionTotals.calories,
        proteins: acc.proteins + sectionTotals.proteins,
        carbs: acc.carbs + sectionTotals.carbs,
        fats: acc.fats + sectionTotals.fats,
      };
    },
    { calories: 0, proteins: 0, carbs: 0, fats: 0 }
  );

  // Calculate percentages for macros
  const macrosData = [
    { name: 'Proteins', value: totalNutrition.proteins * 4 }, // 4 calories per gram
    { name: 'Carbs', value: totalNutrition.carbs * 4 }, // 4 calories per gram
    { name: 'Fats', value: totalNutrition.fats * 9 }, // 9 calories per gram
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

  // Water intake percentage
  const waterPercentage = Math.min(Math.round((waterIntake / nutritionGoals.water) * 100), 100);

  // Progress percentages
  const caloriesPercentage = Math.min(Math.round((totalNutrition.calories / nutritionGoals.calories) * 100), 100);
  const proteinsPercentage = Math.min(Math.round((totalNutrition.proteins / nutritionGoals.proteins) * 100), 100);
  const carbsPercentage = Math.min(Math.round((totalNutrition.carbs / nutritionGoals.carbs) * 100), 100);
  const fatsPercentage = Math.min(Math.round((totalNutrition.fats / nutritionGoals.fats) * 100), 100);

  // Bar chart data for calorie breakdown by meal
  const caloriesByMeal = mealSections.map(section => {
    const totalCalories = section.items.reduce((acc, item) => acc + item.calories, 0);
    return {
      name: section.title,
      calories: totalCalories
    };
  });

  return (
    <div className="animate-delayed-fade-in stagger-delay-3">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Nutrition Tracker</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Log Food
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Macronutrient Distribution */}
        <div className="col-span-1 bg-card rounded-lg border border-border/50 p-4 shadow-sm">
          <h3 className="font-medium mb-3">Macronutrient Breakdown</h3>
          <div className="flex items-center justify-center h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macrosData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {macrosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-[#8884d8] mb-1"></div>
              <span className="text-xs text-muted-foreground">Proteins</span>
              <span className="font-medium">{totalNutrition.proteins}g</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-[#82ca9d] mb-1"></div>
              <span className="text-xs text-muted-foreground">Carbs</span>
              <span className="font-medium">{totalNutrition.carbs}g</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-[#ffc658] mb-1"></div>
              <span className="text-xs text-muted-foreground">Fats</span>
              <span className="font-medium">{totalNutrition.fats}g</span>
            </div>
          </div>
        </div>

        {/* Calorie and Macros Progress */}
        <div className="col-span-1 bg-card rounded-lg border border-border/50 p-4 shadow-sm">
          <h3 className="font-medium mb-3">Daily Nutrition Goals</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Calories</span>
                <span className="text-sm text-muted-foreground">
                  {totalNutrition.calories} / {nutritionGoals.calories} kcal
                </span>
              </div>
              <Progress 
                value={caloriesPercentage} 
                className={cn(
                  "h-2",
                  caloriesPercentage > 100 ? "bg-destructive" : "bg-primary"
                )} 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Proteins</span>
                <span className="text-sm text-muted-foreground">
                  {totalNutrition.proteins} / {nutritionGoals.proteins}g
                </span>
              </div>
              <Progress 
                value={proteinsPercentage} 
                className="h-2 bg-[#8884d8]" 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Carbs</span>
                <span className="text-sm text-muted-foreground">
                  {totalNutrition.carbs} / {nutritionGoals.carbs}g
                </span>
              </div>
              <Progress 
                value={carbsPercentage} 
                className="h-2 bg-[#82ca9d]" 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Fats</span>
                <span className="text-sm text-muted-foreground">
                  {totalNutrition.fats} / {nutritionGoals.fats}g
                </span>
              </div>
              <Progress 
                value={fatsPercentage} 
                className="h-2 bg-[#ffc658]" 
              />
            </div>
          </div>
        </div>

        {/* Water Intake and Calories by Meal */}
        <div className="col-span-1 bg-card rounded-lg border border-border/50 p-4 shadow-sm">
          <div className="mb-5">
            <h3 className="font-medium mb-3">Water Intake</h3>
            <div className="flex items-center mb-2">
              <div className="relative w-full h-6 bg-muted/50 rounded-full mr-4">
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-400 rounded-full transition-all duration-500 ease-out-expo"
                  style={{ width: `${waterPercentage}%` }}
                ></div>
              </div>
              <Droplets className="h-5 w-5 text-blue-400" />
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{waterIntake} ml</span>
              <span>{waterPercentage}%</span>
              <span className="text-muted-foreground">{nutritionGoals.water} ml</span>
            </div>
          </div>
          
          <h3 className="font-medium mb-3">Calories by Meal</h3>
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={caloriesByMeal}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <Tooltip 
                  formatter={(value) => [`${value} kcal`, 'Calories']} 
                />
                <Bar 
                  dataKey="calories" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Food Log */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Today's Food Log</h3>
        
        <div className="space-y-3">
          {mealSections.map((section) => (
            <Collapsible
              key={section.type}
              open={expandedMeal === section.type}
              onOpenChange={() => toggleExpandedMeal(section.type)}
              className="border border-border/50 rounded-lg overflow-hidden"
            >
              <CollapsibleTrigger className="flex justify-between items-center w-full p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center">
                  <Apple className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div className="text-left">
                    <h3 className="font-medium">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {section.items.reduce((acc, item) => acc + item.calories, 0)} calories • {section.items.length} items
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {expandedMeal === section.type ? 
                    <ChevronUp className="h-5 w-5 text-muted-foreground" /> : 
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  }
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="border-t border-border/50">
                {section.items.map((item, index) => (
                  <div 
                    key={item.id}
                    className={cn(
                      "p-4 flex justify-between items-center hover:bg-muted/30 transition-colors",
                      index < section.items.length - 1 && "border-b border-border/30"
                    )}
                  >
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.time}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-muted-foreground">Calories</span>
                        <span className="font-medium">{item.calories}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-muted-foreground">P</span>
                        <span>{item.proteins}g</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-muted-foreground">C</span>
                        <span>{item.carbs}g</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-muted-foreground">F</span>
                        <span>{item.fats}g</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="p-3 flex justify-end border-t border-border/50 bg-muted/10">
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add to {section.title}
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}

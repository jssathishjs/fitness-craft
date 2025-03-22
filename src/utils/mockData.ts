
export interface UserData {
  id: string;
  name: string;
  age: number;
  height: number; // in cm
  weight: number; // in kg
  bmi: number;
  goal: string;
  targetWeight: number;
  weightHistory: { date: string; weight: number }[];
  workoutCount: number;
  totalCaloriesBurned: number;
  averageSteps: number;
}

export const mockUserData: UserData = {
  id: "user-1",
  name: "Alex Johnson",
  age: 32,
  height: 178,
  weight: 78.4,
  bmi: 24.7,
  goal: "Maintain weight and increase strength",
  targetWeight: 78,
  weightHistory: [
    { date: "2024-02-01", weight: 80.2 },
    { date: "2024-02-08", weight: 79.8 },
    { date: "2024-02-15", weight: 79.5 },
    { date: "2024-02-22", weight: 79.1 },
    { date: "2024-03-01", weight: 78.7 },
    { date: "2024-03-08", weight: 78.4 },
  ],
  workoutCount: 87,
  totalCaloriesBurned: 48200,
  averageSteps: 7800,
};

export interface DailyActivity {
  date: string;
  steps: number;
  caloriesBurned: number;
  activeMinutes: number;
  distance: number; // in km
  heartRate: { time: string; value: number }[];
  workouts: Workout[];
}

export interface Workout {
  id: string;
  name: string;
  type: "strength" | "cardio" | "flexibility" | "hiit" | "sports";
  duration: number; // in minutes
  caloriesBurned: number;
  exercises: Exercise[];
  startTime: string;
  endTime: string;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number; // in minutes or seconds
  distance?: number; // in km or miles
  caloriesBurned: number;
}

export const mockWeeklyActivity: Record<string, DailyActivity> = {
  "Monday": {
    date: "2024-03-11",
    steps: 8293,
    caloriesBurned: 1862,
    activeMinutes: 78,
    distance: 6.2,
    heartRate: [
      { time: "06:00", value: 62 },
      { time: "09:00", value: 75 },
      { time: "12:00", value: 68 },
      { time: "15:00", value: 82 },
      { time: "18:00", value: 90 },
      { time: "21:00", value: 65 },
    ],
    workouts: [
      {
        id: "w1",
        name: "Morning Run",
        type: "cardio",
        duration: 32,
        caloriesBurned: 320,
        exercises: [
          {
            id: "e1",
            name: "Running",
            duration: 32,
            distance: 4.5,
            caloriesBurned: 320,
          },
        ],
        startTime: "06:30",
        endTime: "07:02",
        completed: true,
      },
    ],
  },
  "Tuesday": {
    date: "2024-03-12",
    steps: 7105,
    caloriesBurned: 2210,
    activeMinutes: 105,
    distance: 5.3,
    heartRate: [
      { time: "06:00", value: 64 },
      { time: "09:00", value: 72 },
      { time: "12:00", value: 70 },
      { time: "15:00", value: 85 },
      { time: "18:00", value: 130 },
      { time: "21:00", value: 75 },
    ],
    workouts: [
      {
        id: "w2",
        name: "Upper Body Strength",
        type: "strength",
        duration: 65,
        caloriesBurned: 480,
        exercises: [
          {
            id: "e2",
            name: "Bench Press",
            sets: 4,
            reps: 8,
            weight: 80,
            caloriesBurned: 120,
          },
          {
            id: "e3",
            name: "Pull-ups",
            sets: 4,
            reps: 10,
            caloriesBurned: 100,
          },
          {
            id: "e4",
            name: "Shoulder Press",
            sets: 3,
            reps: 12,
            weight: 20,
            caloriesBurned: 90,
          },
          {
            id: "e5",
            name: "Bicep Curls",
            sets: 3,
            reps: 15,
            weight: 15,
            caloriesBurned: 70,
          },
          {
            id: "e6",
            name: "Tricep Extensions",
            sets: 3,
            reps: 15,
            weight: 12.5,
            caloriesBurned: 60,
          },
        ],
        startTime: "18:15",
        endTime: "19:20",
        completed: true,
      },
    ],
  },
  "Wednesday": {
    date: "2024-03-13",
    steps: 9845,
    caloriesBurned: 1940,
    activeMinutes: 85,
    distance: 7.4,
    heartRate: [
      { time: "06:00", value: 60 },
      { time: "09:00", value: 73 },
      { time: "12:00", value: 68 },
      { time: "15:00", value: 78 },
      { time: "18:00", value: 92 },
      { time: "21:00", value: 64 },
    ],
    workouts: [
      {
        id: "w3",
        name: "Yoga Flow",
        type: "flexibility",
        duration: 45,
        caloriesBurned: 210,
        exercises: [
          {
            id: "e7",
            name: "Yoga Sequence",
            duration: 45,
            caloriesBurned: 210,
          },
        ],
        startTime: "18:30",
        endTime: "19:15",
        completed: true,
      },
    ],
  },
  "Thursday": {
    date: "2024-03-14",
    steps: 6328,
    caloriesBurned: 1760,
    activeMinutes: 65,
    distance: 4.7,
    heartRate: [
      { time: "06:00", value: 62 },
      { time: "09:00", value: 71 },
      { time: "12:00", value: 69 },
      { time: "15:00", value: 75 },
      { time: "18:00", value: 120 },
      { time: "21:00", value: 68 },
    ],
    workouts: [
      {
        id: "w4",
        name: "Lower Body Strength",
        type: "strength",
        duration: 70,
        caloriesBurned: 550,
        exercises: [
          {
            id: "e8",
            name: "Squats",
            sets: 4,
            reps: 10,
            weight: 100,
            caloriesBurned: 150,
          },
          {
            id: "e9",
            name: "Deadlifts",
            sets: 4,
            reps: 8,
            weight: 120,
            caloriesBurned: 180,
          },
          {
            id: "e10",
            name: "Lunges",
            sets: 3,
            reps: 12,
            weight: 20,
            caloriesBurned: 90,
          },
          {
            id: "e11",
            name: "Leg Press",
            sets: 3,
            reps: 15,
            weight: 150,
            caloriesBurned: 130,
          },
        ],
        startTime: "17:45",
        endTime: "18:55",
        completed: true,
      },
    ],
  },
  "Friday": {
    date: "2024-03-15",
    steps: 7582,
    caloriesBurned: 1890,
    activeMinutes: 72,
    distance: 5.7,
    heartRate: [
      { time: "06:00", value: 61 },
      { time: "09:00", value: 74 },
      { time: "12:00", value: 70 },
      { time: "15:00", value: 76 },
      { time: "18:00", value: 88 },
      { time: "21:00", value: 66 },
    ],
    workouts: [
      {
        id: "w5",
        name: "HIIT Session",
        type: "hiit",
        duration: 35,
        caloriesBurned: 420,
        exercises: [
          {
            id: "e12",
            name: "HIIT Circuit",
            duration: 35,
            caloriesBurned: 420,
          },
        ],
        startTime: "17:30",
        endTime: "18:05",
        completed: true,
      },
    ],
  },
  "Saturday": {
    date: "2024-03-16",
    steps: 12450,
    caloriesBurned: 2380,
    activeMinutes: 135,
    distance: 9.3,
    heartRate: [
      { time: "06:00", value: 60 },
      { time: "09:00", value: 80 },
      { time: "12:00", value: 95 },
      { time: "15:00", value: 110 },
      { time: "18:00", value: 75 },
      { time: "21:00", value: 65 },
    ],
    workouts: [
      {
        id: "w6",
        name: "Long Run",
        type: "cardio",
        duration: 75,
        caloriesBurned: 750,
        exercises: [
          {
            id: "e13",
            name: "Running",
            duration: 75,
            distance: 10,
            caloriesBurned: 750,
          },
        ],
        startTime: "09:15",
        endTime: "10:30",
        completed: true,
      },
      {
        id: "w7",
        name: "Core Workout",
        type: "strength",
        duration: 30,
        caloriesBurned: 220,
        exercises: [
          {
            id: "e14",
            name: "Planks",
            sets: 3,
            duration: 60, // seconds
            caloriesBurned: 45,
          },
          {
            id: "e15",
            name: "Crunches",
            sets: 3,
            reps: 20,
            caloriesBurned: 50,
          },
          {
            id: "e16",
            name: "Russian Twists",
            sets: 3,
            reps: 30,
            caloriesBurned: 60,
          },
          {
            id: "e17",
            name: "Leg Raises",
            sets: 3,
            reps: 15,
            caloriesBurned: 65,
          },
        ],
        startTime: "16:00",
        endTime: "16:30",
        completed: true,
      },
    ],
  },
  "Sunday": {
    date: "2024-03-17",
    steps: 5910,
    caloriesBurned: 1410,
    activeMinutes: 45,
    distance: 4.4,
    heartRate: [
      { time: "06:00", value: 58 },
      { time: "09:00", value: 65 },
      { time: "12:00", value: 70 },
      { time: "15:00", value: 72 },
      { time: "18:00", value: 68 },
      { time: "21:00", value: 62 },
    ],
    workouts: [
      {
        id: "w8",
        name: "Mobility & Recovery",
        type: "flexibility",
        duration: 40,
        caloriesBurned: 180,
        exercises: [
          {
            id: "e18",
            name: "Stretching Routine",
            duration: 25,
            caloriesBurned: 110,
          },
          {
            id: "e19",
            name: "Foam Rolling",
            duration: 15,
            caloriesBurned: 70,
          },
        ],
        startTime: "17:00",
        endTime: "17:40",
        completed: true,
      },
    ],
  },
};

// Helper function to calculate daily summary
export const getDailySummary = (day: keyof typeof mockWeeklyActivity) => {
  const dayData = mockWeeklyActivity[day];
  return {
    steps: dayData.steps,
    calories: dayData.caloriesBurned,
    activeMinutes: dayData.activeMinutes,
    distance: dayData.distance,
    workouts: dayData.workouts.length,
  };
};

// Nutrition data
export interface NutritionDay {
  date: string;
  caloriesConsumed: number;
  caloriesGoal: number;
  macros: {
    protein: number; // in grams
    carbs: number; // in grams
    fat: number; // in grams
  };
  meals: Meal[];
  water: number; // in ml
}

export interface Meal {
  id: string;
  name: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  time: string;
  foods: Food[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface Food {
  id: string;
  name: string;
  amount: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export const mockNutritionData: NutritionDay = {
  date: "2024-03-17",
  caloriesConsumed: 2150,
  caloriesGoal: 2400,
  macros: {
    protein: 140,
    carbs: 220,
    fat: 70,
  },
  meals: [
    {
      id: "m1",
      name: "Breakfast",
      type: "breakfast",
      time: "07:30",
      foods: [
        {
          id: "f1",
          name: "Oatmeal",
          amount: 1,
          unit: "cup",
          calories: 300,
          protein: 10,
          carbs: 54,
          fat: 5,
        },
        {
          id: "f2",
          name: "Banana",
          amount: 1,
          unit: "medium",
          calories: 105,
          protein: 1.3,
          carbs: 27,
          fat: 0.4,
        },
        {
          id: "f3",
          name: "Greek Yogurt",
          amount: 150,
          unit: "g",
          calories: 150,
          protein: 15,
          carbs: 8,
          fat: 5,
        },
      ],
      totalCalories: 555,
      totalProtein: 26.3,
      totalCarbs: 89,
      totalFat: 10.4,
    },
    {
      id: "m2",
      name: "Lunch",
      type: "lunch",
      time: "12:30",
      foods: [
        {
          id: "f4",
          name: "Grilled Chicken Breast",
          amount: 150,
          unit: "g",
          calories: 240,
          protein: 45,
          carbs: 0,
          fat: 6,
        },
        {
          id: "f5",
          name: "Brown Rice",
          amount: 1,
          unit: "cup",
          calories: 215,
          protein: 5,
          carbs: 45,
          fat: 1.8,
        },
        {
          id: "f6",
          name: "Mixed Vegetables",
          amount: 150,
          unit: "g",
          calories: 75,
          protein: 4,
          carbs: 15,
          fat: 0.5,
        },
      ],
      totalCalories: 530,
      totalProtein: 54,
      totalCarbs: 60,
      totalFat: 8.3,
    },
    {
      id: "m3",
      name: "Dinner",
      type: "dinner",
      time: "19:00",
      foods: [
        {
          id: "f7",
          name: "Salmon Fillet",
          amount: 170,
          unit: "g",
          calories: 350,
          protein: 36,
          carbs: 0,
          fat: 22,
        },
        {
          id: "f8",
          name: "Sweet Potato",
          amount: 1,
          unit: "medium",
          calories: 180,
          protein: 4,
          carbs: 41,
          fat: 0.3,
        },
        {
          id: "f9",
          name: "Green Salad",
          amount: 150,
          unit: "g",
          calories: 35,
          protein: 2,
          carbs: 7,
          fat: 0.5,
        },
      ],
      totalCalories: 565,
      totalProtein: 42,
      totalCarbs: 48,
      totalFat: 22.8,
    },
    {
      id: "m4",
      name: "Snacks",
      type: "snack",
      time: "10:30, 15:30",
      foods: [
        {
          id: "f10",
          name: "Protein Bar",
          amount: 1,
          unit: "bar",
          calories: 210,
          protein: 20,
          carbs: 23,
          fat: 8,
        },
        {
          id: "f11",
          name: "Apple",
          amount: 1,
          unit: "medium",
          calories: 80,
          protein: 0.4,
          carbs: 21,
          fat: 0.3,
        },
        {
          id: "f12",
          name: "Almonds",
          amount: 30,
          unit: "g",
          calories: 180,
          protein: 6,
          carbs: 6,
          fat: 14,
        },
      ],
      totalCalories: 470,
      totalProtein: 26.4,
      totalCarbs: 50,
      totalFat: 22.3,
    },
  ],
  water: 2500,
};

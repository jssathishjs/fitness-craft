
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from '@/pages/Index';
import Profile from '@/pages/Profile';
import Progress from '@/pages/Progress';
import Workouts from '@/pages/Workouts';
import Nutrition from '@/pages/Nutrition';
import Diabetes from '@/pages/Diabetes';
import BloodPressure from '@/pages/BloodPressure';
import Pills from '@/pages/Pills';
import SchedulePills from '@/pages/SchedulePills';
import NotFound from '@/pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/diabetes" element={<Diabetes />} />
        <Route path="/blood-pressure" element={<BloodPressure />} />
        <Route path="/pills" element={<Pills />} />
        <Route path="/schedule-pills" element={<SchedulePills />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

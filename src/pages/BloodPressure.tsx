import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BloodPressureReading {
  date: string;
  systolic: number;
  diastolic: number;
  pulse: number;
}

const BloodPressure = () => {
  const [readings, setReadings] = useState<BloodPressureReading[]>([]);
  const [newReading, setNewReading] = useState({
    systolic: '',
    diastolic: '',
    pulse: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reading: BloodPressureReading = {
      date: new Date().toISOString().split('T')[0],
      systolic: parseInt(newReading.systolic),
      diastolic: parseInt(newReading.diastolic),
      pulse: parseInt(newReading.pulse),
    };
    setReadings([...readings, reading]);
    setNewReading({ systolic: '', diastolic: '', pulse: '' });
  };

  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <section className="pt-6">
          <h1 className="text-4xl font-semibold tracking-tight mb-2 animate-fade-in">Blood Pressure Monitor</h1>
          <p className="text-muted-foreground mb-8 max-w-3xl animate-fade-in stagger-delay-1">
            Track your blood pressure readings over time to monitor your cardiovascular health.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Record New Reading</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="systolic">Systolic (mmHg)</Label>
                <Input
                  id="systolic"
                  type="number"
                  value={newReading.systolic}
                  onChange={(e) => setNewReading({ ...newReading, systolic: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
                <Input
                  id="diastolic"
                  type="number"
                  value={newReading.diastolic}
                  onChange={(e) => setNewReading({ ...newReading, diastolic: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pulse">Pulse (bpm)</Label>
                <Input
                  id="pulse"
                  type="number"
                  value={newReading.pulse}
                  onChange={(e) => setNewReading({ ...newReading, pulse: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Record Reading</Button>
            </form>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Blood Pressure History</h2>
            <div className="h-[300px]">
              {readings.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={readings}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="systolic"
                      stroke="#8884d8"
                      name="Systolic"
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="diastolic"
                      stroke="#82ca9d"
                      name="Diastolic"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="pulse"
                      stroke="#ffc658"
                      name="Pulse"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No readings recorded yet
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BloodPressure; 

import React from 'react';
import { ActivitySquare, Heart, Scale, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface MetricItemProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  progressValue?: number;
  progressColor?: string;
  trend?: number;
  trendPositive?: boolean;
  className?: string;
}

export function MetricItem({
  title,
  value,
  subtitle,
  icon,
  progressValue,
  progressColor = 'bg-primary',
  trend,
  trendPositive,
  className,
}: MetricItemProps) {
  return (
    <div className={cn('flex flex-col h-full p-5 rounded-lg border border-border/50 bg-card', className)}>
      <div className="flex justify-between items-start mb-4">
        <div className="text-muted-foreground">{icon}</div>
        {trend !== undefined && (
          <div className={cn(
            'flex items-center text-xs font-medium',
            trendPositive ? 'text-success' : 'text-destructive'
          )}>
            <TrendingUp className={cn('h-3 w-3 mr-1', !trendPositive && 'rotate-180')} />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-grow">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-semibold">{value}</p>
          {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
        </div>
      </div>
      
      {progressValue !== undefined && (
        <div className="mt-4">
          <Progress value={progressValue} className={cn('h-1.5', progressColor)} />
        </div>
      )}
    </div>
  );
}

export function MetricsPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-delayed-fade-in stagger-delay-1">
      <MetricItem
        title="Daily Steps"
        value="8,293"
        subtitle="steps"
        icon={<ActivitySquare className="h-5 w-5" />}
        progressValue={75}
        progressColor="bg-primary"
        trend={5}
        trendPositive={true}
      />
      
      <MetricItem
        title="Heart Rate"
        value="68"
        subtitle="bpm"
        icon={<Heart className="h-5 w-5" />}
        progressValue={60}
        progressColor="bg-destructive/80"
        trend={2}
        trendPositive={false}
      />
      
      <MetricItem
        title="Weight"
        value="173.5"
        subtitle="lbs"
        icon={<Scale className="h-5 w-5" />}
        progressValue={85}
        progressColor="bg-info"
        trend={1.2}
        trendPositive={true}
      />
      
      <MetricItem
        title="Calories Burned"
        value="1,862"
        subtitle="kcal"
        icon={<TrendingUp className="h-5 w-5" />}
        progressValue={65}
        progressColor="bg-warning"
        trend={3}
        trendPositive={true}
      />
    </div>
  );
}

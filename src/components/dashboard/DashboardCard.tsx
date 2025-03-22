
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

interface DashboardCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
  animationDelay?: number;
}

export function DashboardCard({
  title,
  description,
  icon,
  className,
  contentClassName,
  headerClassName,
  footerClassName,
  children,
  footer,
  onClick,
  animationDelay = 0,
}: DashboardCardProps) {
  const delayClass = `stagger-delay-${animationDelay}`;
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-soft border-border/50 animate-delayed-fade-in",
        onClick && "cursor-pointer hover:-translate-y-1",
        delayClass,
        className
      )}
      onClick={onClick}
    >
      <CardHeader className={cn("flex flex-row items-center justify-between space-y-0 pb-2", headerClassName)}>
        <div>
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent className={cn("pt-4", contentClassName)}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className={cn("border-t border-border/50 bg-muted/30 px-6 py-3", footerClassName)}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}


import React from 'react';
import { Header } from './Header';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={cn("flex-1 pt-24 px-4 animate-fade-in", className)}>
        <div className="container mx-auto pb-8">
          {children}
        </div>
      </main>
      <footer className="py-6 border-t border-border bg-secondary/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} FitnessCraft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

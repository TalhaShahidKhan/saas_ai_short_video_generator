import React from 'react';
import DashboardProvider from './provider';
import { Toaster } from '@/components/ui/sonner';

function DashboardLayout({children}) {
  return (
    <div>
      <DashboardProvider>
      {children}
      <Toaster/>
      </DashboardProvider>
    </div>
  );
}

export default DashboardLayout;

"use client"
import { ThemeProvider } from '@/components/basic/theme-provider';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import React from 'react';

function ConvexClientProvider({children}) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

  return (
    <div>
        
    <ConvexProvider client={convex}>
        <ThemeProvider 
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >

        {children}
        </ThemeProvider>
    </ConvexProvider>
      
    </div>
  );
}

export default ConvexClientProvider;

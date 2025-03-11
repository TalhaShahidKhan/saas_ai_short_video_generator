"use client"
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import AppSidebar from "./components/AppSidebar";
import AppHeader from "./components/AppHeader";
import { useAuthContext } from "@/components/basic/theme-provider";
import { useRouter } from "next/navigation";

function DashboardProvider({ children }) {
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    return () => {
      user && isAuthenticated();
    };
  }, [user]);

  const isAuthenticated = () => {
    if (!user) {
      router.replace("/");
    }
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <AppHeader />
        <div className="p-10">
        {children}
        </div>
      </div>
    </SidebarProvider>
  );
}

export default DashboardProvider;

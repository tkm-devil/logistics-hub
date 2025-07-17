// components/layout/admin-layout.tsx
"use client";

import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import AuthGuard from "./auth-guard";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Mobile Backdrop */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onClose={closeSidebar}
          isMobile={isMobile}
        />

        {/* Main Content */}
        <div
          className={cn(
            "flex-1 flex flex-col transition-all duration-300 ease-in-out",
            !isMobile && sidebarCollapsed
              ? "ml-16"
              : !isMobile
              ? "ml-64"
              : "ml-0"
          )}
        >
          <Topbar
            onMenuClick={toggleSidebar}
            sidebarCollapsed={sidebarCollapsed}
            isMobile={isMobile}
          />

          <main
            className={cn(
              "flex-1 overflow-auto transition-all duration-300",
              "p-4 sm:p-6 lg:p-8"
            )}
          >
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}

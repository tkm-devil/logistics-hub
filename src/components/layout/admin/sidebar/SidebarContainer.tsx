import { memo } from "react";
import { cn } from "@/lib/utils";

interface SidebarContainerProps {
  isOpen: boolean;
  isCollapsed: boolean;
  isMobile: boolean;
  children: React.ReactNode;
}

function SidebarContainer({
  isOpen,
  isCollapsed,
  isMobile,
  children,
}: SidebarContainerProps) {
  const sidebarClasses = cn(
    "fixed top-0 left-0 z-50 h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 ease-in-out",
    isCollapsed && !isMobile ? "w-16" : "w-64",
    isMobile
      ? isOpen
        ? "translate-x-0"
        : "-translate-x-full"
      : "translate-x-0",
    "shadow-xl shadow-gray-900/5 dark:shadow-gray-900/20"
  );

  return (
    <aside className={sidebarClasses} role="complementary" aria-label="Sidebar">
      {children}
    </aside>
  );
}

export default memo(SidebarContainer);

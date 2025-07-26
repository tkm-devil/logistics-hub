import { memo } from "react";
import {
  dashboardItem,
  operationsItems,
  systemItems,
} from "../data/sidebarData";
import QuickActions from "../molecules/QuickActions";
import NavSection from "../molecules/NavSection";
import RecentItems from "../molecules/RecentItems";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Home, AlertTriangle } from "lucide-react";

interface SidebarNavigationProps {
  isCollapsed: boolean;
  searchQuery: string;
  pathname: string;
  onLinkClick: () => void;
}

function SidebarNavigation({
  isCollapsed,
  searchQuery,
  pathname,
  onLinkClick,
}: SidebarNavigationProps) {
  return (
    <nav
      className={cn("flex-1 overflow-y-auto p-4 space-y-2")}
      role="navigation"
      aria-label="Main Navigation"
    >
      <QuickActions isCollapsed={isCollapsed} onActionClick={onLinkClick} />
      <NavSection
        title="Dashboard"
        icon={LayoutDashboard}
        items={[dashboardItem]}
        searchQuery={searchQuery}
        pathname={pathname}
        isCollapsed={isCollapsed}
        onLinkClick={onLinkClick}
      />
      <NavSection
        title="Operations"
        icon={Home}
        items={operationsItems}
        searchQuery={searchQuery}
        pathname={pathname}
        isCollapsed={isCollapsed}
        onLinkClick={onLinkClick}
      />
      <NavSection
        title="System Logs"
        icon={AlertTriangle}
        items={systemItems}
        searchQuery={searchQuery}
        pathname={pathname}
        isCollapsed={isCollapsed}
        onLinkClick={onLinkClick}
      />
      <RecentItems isCollapsed={isCollapsed} onItemClick={onLinkClick} />
    </nav>
  );
}

export default memo(SidebarNavigation);

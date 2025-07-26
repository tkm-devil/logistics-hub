import { memo } from "react";
import BottomNavigation from "../molecules/BottomNavigation";
import { cn } from "@/lib/utils";

interface SidebarFooterProps {
  pathname: string;
  isCollapsed: boolean;
  onLinkClick: () => void;
}

function SidebarFooter({
  pathname,
  isCollapsed,
  onLinkClick,
}: SidebarFooterProps) {
  return (
    <div
      className={cn(
        "p-4 border-t border-gray-200/50 dark:border-gray-700/50",
        "bg-white/95 dark:bg-gray-900/95"
      )}
      role="contentinfo"
    >
      <BottomNavigation
        pathname={pathname}
        isCollapsed={isCollapsed}
        onLinkClick={onLinkClick}
      />
    </div>
  );
}

export default memo(SidebarFooter);

import { memo } from "react";
import SidebarLogo from "../atoms/SidebarLogo";
import SearchBar from "../atoms/SearchBar";
import { cn } from "@/lib/utils";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

function SidebarHeader({
  isCollapsed,
  searchQuery,
  onSearchChange,
}: SidebarHeaderProps) {
  return (
    <div
      className={cn(
        "p-4 border-b border-gray-200/50 dark:border-gray-700/50",
        "bg-white/95 dark:bg-gray-900/95"
      )}
      role="banner"
    >
      <SidebarLogo isCollapsed={isCollapsed} />
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        isCollapsed={isCollapsed}
      />
    </div>
  );
}

export default memo(SidebarHeader);

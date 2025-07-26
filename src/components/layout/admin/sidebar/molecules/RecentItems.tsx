import { memo } from "react";
import { recentItems } from "../data/sidebarData";
import SectionHeader from "../atoms/SectionHeader";
import RecentItem from "../atoms/RecentItem";
import { Activity } from "lucide-react";

interface RecentItemsProps {
  isCollapsed: boolean;
  onItemClick: () => void;
}

function RecentItems({ isCollapsed, onItemClick }: RecentItemsProps) {
  if (isCollapsed) return null;

  return (
    <div className="mt-8" role="region" aria-label="Recent Items">
      <SectionHeader
        title="Recent Items"
        icon={Activity}
        isCollapsed={isCollapsed}
      />
      <div className="space-y-1">
        {recentItems.map((item) => (
          <RecentItem
            key={item.href}
            {...item}
            isCollapsed={isCollapsed}
            onClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(RecentItems);

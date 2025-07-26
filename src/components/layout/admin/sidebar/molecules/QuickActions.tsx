import { memo } from "react";
import { quickActionItems } from "../data/sidebarData";
import QuickActionButton from "../atoms/QuickActionButton";
import { cn } from "@/lib/utils";

interface QuickActionsProps {
  isCollapsed: boolean;
  onActionClick: () => void;
}

function QuickActions({ isCollapsed, onActionClick }: QuickActionsProps) {
  if (isCollapsed) return null;

  return (
    <div className="mb-6" role="region" aria-label="Quick Actions">
      <div className="flex items-center space-x-2 mb-3">
        <span className="h-4 w-4 text-amber-500" aria-hidden="true" />{" "}
        {/* Placeholder for Zap icon */}
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
          Quick Actions
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {quickActionItems.map(({ label, icon, className }, index) => (
          <QuickActionButton
            key={label}
            icon={icon}
            label={label}
            className={className}
            onClick={onActionClick}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(QuickActions);

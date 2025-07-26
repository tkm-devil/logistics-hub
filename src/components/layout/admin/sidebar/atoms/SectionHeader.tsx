import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  icon: LucideIcon;
  isCollapsed: boolean;
}

export default function SectionHeader({
  title,
  icon: Icon,
  isCollapsed,
}: SectionHeaderProps) {
  if (isCollapsed) return null;

  return (
    <div className="flex items-center space-x-2 mb-3 mt-6">
      <Icon className="h-4 w-4 text-blue-500" aria-hidden="true" />
      <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
        {title}
      </span>
    </div>
  );
}

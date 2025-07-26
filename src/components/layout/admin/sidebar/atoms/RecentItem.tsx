import Link from "next/link";
import { cn } from "@/lib/utils";
import { RecentItem as RecentItemType } from "../types/NavItem.types";

interface RecentItemProps extends RecentItemType {
  isCollapsed: boolean;
  onClick: () => void;
}

export default function RecentItem({
  href,
  label,
  icon: Icon,
  isCollapsed,
  onClick,
}: RecentItemProps) {
  if (isCollapsed) return null;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-300",
        "hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white transition-colors"
      )}
    >
      <Icon className="h-4 w-4 mr-3 text-gray-400" aria-hidden="true" />
      <span className="truncate">{label}</span>
    </Link>
  );
}

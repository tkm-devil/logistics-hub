import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { NavItem } from "../types/NavItem.types";

interface NavLinkProps extends NavItem {
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
}

export default function NavLink({
  href,
  label,
  icon: Icon,
  badge,
  isNew,
  isActive,
  isCollapsed,
  onClick,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
        "hover:bg-gray-50 dark:hover:bg-gray-800/50",
        isActive
          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
          : "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon
        className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-400")}
        aria-hidden="true"
      />
      {!isCollapsed && (
        <>
          <span className="ml-3 truncate">{label}</span>
          <div className="ml-auto flex items-center space-x-2">
            {badge !== undefined && (
              <Badge
                variant={isActive ? "secondary" : "default"}
                className="text-xs"
              >
                {badge}
              </Badge>
            )}
            {isNew && (
              <Badge variant="destructive" className="text-xs">
                New
              </Badge>
            )}
          </div>
        </>
      )}
    </Link>
  );
}

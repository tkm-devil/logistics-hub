import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarLogoProps {
  isCollapsed: boolean;
}

export default function SidebarLogo({ isCollapsed }: SidebarLogoProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
        <Shield className="h-4 w-4 text-white" aria-hidden="true" />
      </div>
      {!isCollapsed && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Admin
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Control Panel
          </p>
        </div>
      )}
    </div>
  );
}

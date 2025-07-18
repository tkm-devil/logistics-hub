// components/layout/sidebar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard,
  Truck,
  Package,
  Users,
  Warehouse,
  Bell,
  AlertTriangle,
  Search,
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  HelpCircle,
  Zap,
  Activity,
  Shield,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  isNew?: boolean;
  description?: string;
}

const navItems: NavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Overview and analytics",
  },
  {
    href: "/admin/shipments",
    label: "Shipments",
    icon: Package,
    badge: 12,
    description: "Track and manage shipments",
  },
  {
    href: "/admin/vehicles",
    label: "Vehicles",
    icon: Truck,
    badge: 3,
    description: "Fleet management",
  },
  {
    href: "/admin/warehouses",
    label: "Warehouses",
    icon: Warehouse,
    description: "Storage facilities",
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: Users,
    description: "User management",
  },
  {
    href: "/admin/incidents",
    label: "Incidents",
    icon: AlertTriangle,
    badge: 5,
    description: "Security incidents",
  },
  {
    href: "/admin/notifications",
    label: "Notifications",
    icon: Bell,
    badge: 8,
    isNew: true,
    description: "System notifications",
  },
];

const bottomNavItems: NavItem[] = [
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
    description: "System configuration",
  },
  {
    href: "/admin/help",
    label: "Help & Support",
    icon: HelpCircle,
    description: "Get assistance",
  },
];

const recentItems = [
  { href: "/admin/shipments/SH001", label: "Shipment SH001", icon: Package },
  { href: "/admin/vehicles/VH001", label: "Vehicle VH001", icon: Truck },
  {
    href: "/admin/incidents/INC001",
    label: "Incident INC001",
    icon: AlertTriangle,
  },
];

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  isMobile: boolean;
}

export default function Sidebar({
  isOpen,
  isCollapsed,
  onClose,
  isMobile,
}: SidebarProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(navItems);
  const [showRecent, setShowRecent] = useState(false);

  useEffect(() => {
    const filtered = navItems.filter(
      (item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery]);

  const sidebarClasses = cn(
    "fixed top-0 left-0 z-50 h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 ease-in-out",
    // Width classes
    isCollapsed && !isMobile ? "w-16" : "w-64",
    // Mobile positioning
    isMobile
      ? isOpen
        ? "translate-x-0"
        : "-translate-x-full"
      : "translate-x-0",
    // Shadow
    "shadow-xl shadow-gray-900/5 dark:shadow-gray-900/20"
  );

  const isActiveLink = (href: string) => {
    return (
      pathname === href || (href !== "/admin" && pathname.startsWith(href))
    );
  };

  const handleLinkClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  return (
    <aside className={sidebarClasses}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Admin
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Control Panel
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Search */}
        {!isCollapsed && (
          <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search navigation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Quick Actions */}
          {!isCollapsed && (
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="h-4 w-4 text-amber-500" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Quick Actions
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-auto p-2 flex flex-col items-center space-y-1 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  onClick={handleLinkClick}
                >
                  <Package className="h-4 w-4" />
                  <span className="text-xs">New Shipment</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-auto p-2 flex flex-col items-center space-y-1 hover:bg-green-50 dark:hover:bg-green-900/20"
                  onClick={handleLinkClick}
                >
                  <Activity className="h-4 w-4" />
                  <span className="text-xs">View Reports</span>
                </Button>
              </div>
            </div>
          )}

          {/* Main Navigation */}
          <div className="space-y-1">
            {!isCollapsed && (
              <div className="flex items-center space-x-2 mb-3">
                <Home className="h-4 w-4 text-blue-500" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Main Menu
                </span>
              </div>
            )}

            {filteredItems.map(
              ({ href, label, icon: Icon, badge, isNew, description }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={handleLinkClick}
                  className={cn(
                    "group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    "hover:bg-gray-50 dark:hover:bg-gray-800/50",
                    isActiveLink(href)
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isActiveLink(href)
                        ? "text-white"
                        : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                    )}
                  />

                  {!isCollapsed && (
                    <>
                      <span className="ml-3 truncate">{label}</span>
                      <div className="ml-auto flex items-center space-x-2">
                        {badge && (
                          <Badge
                            variant={
                              isActiveLink(href) ? "secondary" : "default"
                            }
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
              )
            )}
          </div>

          {/* Recent Items */}
          {!isCollapsed && (
            <div className="mt-8">
              <div className="flex items-center space-x-2 mb-3">
                <Activity className="h-4 w-4 text-green-500" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Recent Items
                </span>
              </div>
              <div className="space-y-1">
                {recentItems.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={handleLinkClick}
                    className="flex items-center rounded-lg px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Icon className="h-4 w-4 mr-3 text-gray-400" />
                    <span className="truncate">{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="space-y-1">
            {bottomNavItems.map(({ href, label, icon: Icon, description }) => (
              <Link
                key={href}
                href={href}
                onClick={handleLinkClick}
                className={cn(
                  "group flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  "hover:bg-gray-50 dark:hover:bg-gray-800/50",
                  isActiveLink(href)
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                    : "text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isActiveLink(href)
                      ? "text-white"
                      : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                  )}
                />

                {!isCollapsed && <span className="ml-3 truncate">{label}</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

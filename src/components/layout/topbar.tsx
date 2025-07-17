// components/layout/topbar.tsx
"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, usePathname } from "next/navigation";
import {
  Moon,
  Sun,
  LogOut,
  User,
  Menu,
  Search,
  Bell,
  Settings,
  ChevronDown,
  Activity,
  Shield,
  Zap,
  Globe,
  Palette,
  Monitor,
  Truck,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TopbarProps {
  onMenuClick: () => void;
  sidebarCollapsed: boolean;
  isMobile: boolean;
}

const quickSearchItems = [
  { label: "Dashboard", href: "/admin", icon: Activity },
  { label: "Shipments", href: "/admin/shipments", icon: Package },
  { label: "Vehicles", href: "/admin/vehicles", icon: Truck },
  { label: "Users", href: "/admin/users", icon: User },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const notifications = [
  {
    id: 1,
    title: "New shipment arrived",
    description: "Shipment SH001 has been delivered to Warehouse A",
    time: "2 minutes ago",
    type: "success",
    unread: true,
  },
  {
    id: 2,
    title: "Vehicle maintenance due",
    description: "Vehicle VH001 requires scheduled maintenance",
    time: "1 hour ago",
    type: "warning",
    unread: true,
  },
  {
    id: 3,
    title: "Security incident reported",
    description: "Unauthorized access attempt detected",
    time: "3 hours ago",
    type: "error",
    unread: false,
  },
];

const breadcrumbMap: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/shipments": "Shipments",
  "/admin/vehicles": "Vehicles",
  "/admin/warehouses": "Warehouses",
  "/admin/users": "Users",
  "/admin/incidents": "Incidents",
  "/admin/notifications": "Notifications",
  "/admin/settings": "Settings",
};

export default function Topbar({
  onMenuClick,
  sidebarCollapsed,
  isMobile,
}: TopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const { setTheme, theme } = useTheme();
  const [email, setEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationCount, setNotificationCount] = useState(
    notifications.filter((n) => n.unread).length
  );
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setEmail(user?.email ?? null);

      if (user) {
        const { data: role } = await supabase.rpc("get_user_role");
        setUserRole(role);
      }
    };
    getUser();
  }, [supabase]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleSearch = (href: string) => {
    router.push(href);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const getBreadcrumb = () => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.map((segment, index) => {
      const path = "/" + segments.slice(0, index + 1).join("/");
      return {
        label:
          breadcrumbMap[path] ||
          segment.charAt(0).toUpperCase() + segment.slice(1),
        path,
        isLast: index === segments.length - 1,
      };
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getUserInitials = (email: string) => {
    return email.split("@")[0].charAt(0).toUpperCase();
  };

  const getStatusColor = () => {
    // Simulate system status
    return "bg-green-500"; // green for healthy, yellow for warning, red for error
  };

  const filteredSearchItems = quickSearchItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Breadcrumbs */}
          {!isMobile && (
            <nav className="flex items-center space-x-2 text-sm">
              {getBreadcrumb().map((crumb, index) => (
                <div key={crumb.path} className="flex items-center">
                  {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                  <span
                    className={
                      crumb.isLast
                        ? "text-gray-900 dark:text-white font-medium"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    }
                  >
                    {crumb.label}
                  </span>
                </div>
              ))}
            </nav>
          )}

          {/* System Status */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className={`h-2 w-2 rounded-full ${getStatusColor()}`} />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              All systems operational
            </span>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <Popover open={searchOpen} onOpenChange={setSearchOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal bg-gray-50 dark:bg-gray-800 border-0 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Search className="mr-2 h-4 w-4 text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  Search anything...
                </span>
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="center">
              <Command>
                <CommandInput
                  placeholder="Search navigation..."
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Navigation">
                    {filteredSearchItems.map((item) => (
                      <CommandItem
                        key={item.href}
                        onSelect={() => handleSearch(item.href)}
                        className="flex items-center cursor-pointer"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile Search */}
          <div className="sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 dark:hover:bg-gray-800 text-amber-600"
              title="Quick Actions"
            >
              <Zap className="h-5 w-5" />
            </Button>
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <Badge variant="secondary" className="text-xs">
                  {notificationCount} new
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex flex-col items-start p-4 cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium text-sm">
                        {notification.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      {notification.description}
                    </p>
                    {notification.unread && (
                      <div className="h-2 w-2 bg-blue-500 rounded-full mt-2" />
                    )}
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center cursor-pointer">
                <span className="text-sm">View all notifications</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {theme === "dark" ? (
                  <Moon className="h-5 w-5" />
                ) : theme === "light" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Monitor className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="cursor-pointer"
              >
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="cursor-pointer"
              >
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="cursor-pointer"
              >
                <Monitor className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-3"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm">
                    {email ? getUserInitials(email) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {getGreeting()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-32">
                    {email}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{email}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {userRole} Account
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <Shield className="mr-2 h-4 w-4" />
                Security
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="cursor-pointer">
                  <Palette className="mr-2 h-4 w-4" />
                  Preferences
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem className="cursor-pointer">
                    <Globe className="mr-2 h-4 w-4" />
                    Language
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Display
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 dark:text-red-400"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Current Time */}
          <div className="hidden lg:block text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {currentTime.toLocaleTimeString()}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {currentTime.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

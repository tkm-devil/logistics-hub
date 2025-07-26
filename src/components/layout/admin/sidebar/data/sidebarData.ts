import {
  LayoutDashboard,
  Truck,
  Package,
  Users,
  Warehouse,
  Bell,
  AlertTriangle,
  Search,
  Home,
  Settings,
  HelpCircle,
  Zap,
  Activity,
  Shield,
  Boxes,
  FileText,
} from "lucide-react";
import { NavItem, RecentItem } from "../types/NavItem.types";

export const dashboardItem: NavItem = {
  href: "/admin",
  label: "Dashboard",
  icon: LayoutDashboard,
  description: "Overview and analytics",
};

export const operationsItems: NavItem[] = [
  {
    href: "/admin/shipments",
    label: "Shipments",
    icon: Package,
    description: "Track and manage shipments",
  },
  {
    href: "/admin/vehicles",
    label: "Vehicles",
    icon: Truck,
    description: "Fleet management",
  },
  {
    href: "/admin/warehouses",
    label: "Warehouses",
    icon: Warehouse,
    description: "Storage facilities",
  },
  {
    href: "/admin/inventory",
    label: "Inventory",
    icon: Boxes,
    description: "Stock and units",
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: Users,
    description: "User management",
  },
];

export const systemItems: NavItem[] = [
  {
    href: "/admin/incidents",
    label: "Incidents",
    icon: AlertTriangle,
    badge: 5, // Placeholder, to be replaced with dynamic data
    description: "Security events",
  },
  {
    href: "/admin/notifications",
    label: "Notifications",
    icon: Bell,
    badge: 8, // Placeholder, to be replaced with dynamic data
    isNew: true,
    description: "System notifications",
  },
  {
    href: "/admin/audit-logs",
    label: "Audit Logs",
    icon: FileText,
    description: "Change history",
  },
];

export const bottomNavItems: NavItem[] = [
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

export const recentItems: RecentItem[] = [
  { href: "/admin/shipments/SH001", label: "Shipment SH001", icon: Package },
  { href: "/admin/vehicles/VH001", label: "Vehicle VH001", icon: Truck },
  {
    href: "/admin/incidents/INC001",
    label: "Incident INC001",
    icon: AlertTriangle,
  },
];

export const quickActionItems = [
  {
    label: "New Shipment",
    icon: Package,
    variant: "outline",
    className: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
  },
  {
    label: "View Reports",
    icon: Activity,
    variant: "outline",
    className: "hover:bg-green-50 dark:hover:bg-green-900/20",
  },
] as const;

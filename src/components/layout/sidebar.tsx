// components/layout/sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Truck,
  Package,
  Users,
  Warehouse,
  Bell,
  AlertTriangle,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/shipments', label: 'Shipments', icon: Package },
  { href: '/admin/vehicles', label: 'Vehicles', icon: Truck },
  { href: '/admin/warehouses', label: 'Warehouses', icon: Warehouse },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/incidents', label: 'Incidents', icon: AlertTriangle },
  { href: '/admin/notifications', label: 'Notifications', icon: Bell },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4 hidden md:block">
      <nav className="space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 rounded px-3 py-2 text-sm font-medium hover:bg-gray-100',
              pathname.startsWith(href) ? 'bg-gray-100 text-black' : 'text-gray-600'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  isNew?: boolean;
  description?: string;
}

interface RecentItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export type { NavItem, RecentItem };

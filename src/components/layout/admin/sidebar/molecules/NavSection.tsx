import { memo } from "react";
import { NavItem } from "../types/NavItem.types";
import { filterNavItems, isActiveLink } from "../data/sidebarUtils";
import SectionHeader from "../atoms/SectionHeader";
import NavLink from "../atoms/NavLink";
import { LucideIcon } from "lucide-react";

interface NavSectionProps {
  title: string;
  icon: LucideIcon;
  items: NavItem[];
  searchQuery: string;
  pathname: string;
  isCollapsed: boolean;
  onLinkClick: () => void;
}

function NavSection({
  title,
  icon,
  items,
  searchQuery,
  pathname,
  isCollapsed,
  onLinkClick,
}: NavSectionProps) {
  const filteredItems = filterNavItems(items, searchQuery);

  return (
    <div
      className="space-y-2"
      role="navigation"
      aria-labelledby={`${title}-header`}
    >
      <SectionHeader title={title} icon={icon} isCollapsed={isCollapsed} />
      {filteredItems.length === 0 && !isCollapsed ? (
        <p
          className="text-sm text-gray-500 dark:text-gray-400 px-3"
          role="alert"
        >
          No results found
        </p>
      ) : (
        filteredItems.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            isActive={isActiveLink(item.href, pathname)}
            isCollapsed={isCollapsed}
            onClick={onLinkClick}
          />
        ))
      )}
    </div>
  );
}

export default memo(NavSection);

import { memo } from "react";
import { bottomNavItems } from "../data/sidebarData";
import { isActiveLink } from "../data/sidebarUtils";
import NavLink from "../atoms/NavLink";

interface BottomNavigationProps {
  pathname: string;
  isCollapsed: boolean;
  onLinkClick: () => void;
}

function BottomNavigation({
  pathname,
  isCollapsed,
  onLinkClick,
}: BottomNavigationProps) {
  return (
    <div className="space-y-1" role="navigation" aria-label="Bottom Navigation">
      {bottomNavItems.map((item) => (
        <NavLink
          key={item.href}
          {...item}
          isActive={isActiveLink(item.href, pathname)}
          isCollapsed={isCollapsed}
          onClick={onLinkClick}
        />
      ))}
    </div>
  );
}

export default memo(BottomNavigation);

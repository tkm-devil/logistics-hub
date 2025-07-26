"use client";

import { memo, useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import SidebarContainer from "./SidebarContainer";
import SidebarContent from "./SidebarContent";
import SidebarHeader from "./organisms/SidebarHeader";
import SidebarNavigation from "./organisms/SidebarNavigation";
import SidebarFooter from "./organisms/SidebarFooter";

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  isMobile: boolean;
}

function Sidebar({ isOpen, isCollapsed, onClose, isMobile }: SidebarProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLinkClick = useCallback(() => {
    if (isMobile) onClose();
  }, [isMobile, onClose]);

  return (
    <SidebarContainer
      isOpen={isOpen}
      isCollapsed={isCollapsed}
      isMobile={isMobile}
    >
      <SidebarContent>
        <SidebarHeader
          isCollapsed={isCollapsed}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <SidebarNavigation
          isCollapsed={isCollapsed}
          searchQuery={searchQuery}
          pathname={pathname}
          onLinkClick={handleLinkClick}
        />
        <SidebarFooter
          pathname={pathname}
          isCollapsed={isCollapsed}
          onLinkClick={handleLinkClick}
        />
      </SidebarContent>
    </SidebarContainer>
  );
}

export default memo(Sidebar);

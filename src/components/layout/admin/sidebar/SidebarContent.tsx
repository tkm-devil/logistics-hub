import { memo } from "react";
import { cn } from "@/lib/utils";

interface SidebarContentProps {
  children: React.ReactNode;
}

function SidebarContent({ children }: SidebarContentProps) {
  return <div className={cn("flex flex-col h-full")}>{children}</div>;
}

export default memo(SidebarContent);

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface QuickActionButtonProps {
  icon: LucideIcon;
  label: string;
  className?: string;
  onClick: () => void;
}

export default function QuickActionButton({
  icon: Icon,
  label,
  className,
  onClick,
}: QuickActionButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "h-auto p-2 flex flex-col items-center space-y-1",
        className
      )}
      onClick={onClick}
      aria-label={label}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span className="text-xs">{label}</span>
    </Button>
  );
}
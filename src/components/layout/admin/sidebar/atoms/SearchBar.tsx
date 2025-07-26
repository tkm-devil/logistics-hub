import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isCollapsed: boolean;
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
  isCollapsed,
}: SearchBarProps) {
  if (isCollapsed) return null;

  return (
    <div className="relative">
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
        aria-hidden="true"
      />
      <Input
        placeholder="Search navigation..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className={cn(
          "pl-10 bg-gray-50 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-blue-500"
        )}
        aria-label="Search navigation"
      />
    </div>
  );
}
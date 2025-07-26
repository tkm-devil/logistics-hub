import { NavItem } from "../types/NavItem.types";

export const filterNavItems = (
  items: NavItem[],
  searchQuery: string
): NavItem[] => {
  return items.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export const isActiveLink = (href: string, pathname: string): boolean => {
  return pathname === href || (href !== "/admin" && pathname.startsWith(href));
};

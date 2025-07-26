import { getInventoryItems } from "@/lib/queries/inventory_items";
import AdminInventoryItemsClient from "./admin-inventory-items-client";

export default async function AdminInventoryItemsPage() {
  const { data: items, error } = await getInventoryItems();

  if (error || !items) {
    return <p className="text-red-500">Failed to load inventory items.</p>;
  }

  return <AdminInventoryItemsClient items={items} />;
}

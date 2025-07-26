// app/admin/inventory-items/admin-inventory-items-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InventoryItem } from "@/components/tables/inventory-item-table";
import InventoryItemTable from "@/components/tables/inventory-item-table";
import InventoryItemCreateModal from "@/components/modals/InventoryItemCreateModal";
import InventoryItemEditModal from "@/components/modals/InventoryItemEditModal";
import { Button } from "@/components/ui/button";

interface AdminInventoryItemsClientProps {
  items: InventoryItem[];
}

export default function AdminInventoryItemsClient({
  items,
}: AdminInventoryItemsClientProps) {
  const router = useRouter();
  const [openCreate, setOpenCreate] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const refresh = () => router.refresh();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Inventory Items</h2>
        <Button onClick={() => setOpenCreate(true)}>+ Add Inventory Item</Button>
      </div>

      <InventoryItemTable
        data={items}
        onEdit={(item) => setEditingItem(item)}
        onDelete={(item) => {
          // Optional: add delete handler here
        }}
      />

      <InventoryItemCreateModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={refresh}
      />

      {editingItem && (
        <InventoryItemEditModal
          open={!!editingItem}
          onClose={() => setEditingItem(null)}
          item={editingItem}
          onUpdated={refresh}
        />
      )}
    </div>
  );
}

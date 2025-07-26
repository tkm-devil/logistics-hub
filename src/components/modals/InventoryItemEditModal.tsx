// components/modals/InventoryItemEditModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import InventoryItemForm, {
  UpdateInventoryItem,
} from "@/components/forms/inventory-item-form";

interface InventoryItemEditModalProps {
  open: boolean;
  onClose: () => void;
  item: UpdateInventoryItem & { id: string };
  onUpdated?: () => void;
}

export default function InventoryItemEditModal({
  open,
  onClose,
  item,
  onUpdated,
}: InventoryItemEditModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Inventory Item</DialogTitle>
        </DialogHeader>
        <InventoryItemForm
          initialData={item}
          onSuccess={() => {
            onClose();
            onUpdated?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

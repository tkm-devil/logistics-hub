// components/modals/InventoryItemCreateModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import InventoryItemForm from "@/components/forms/inventory-item-form";

interface InventoryItemCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export default function InventoryItemCreateModal({
  open,
  onClose,
  onCreated,
}: InventoryItemCreateModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Inventory Item</DialogTitle>
        </DialogHeader>
        <InventoryItemForm
          onSuccess={() => {
            onClose();
            onCreated?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

// components/modals/WarehouseCreateModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import WarehouseForm from "@/components/forms/warehouse-form";

interface WarehouseCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export default function WarehouseCreateModal({
  open,
  onClose,
  onCreated,
}: WarehouseCreateModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Warehouse</DialogTitle>
        </DialogHeader>
        <WarehouseForm
          onSuccess={() => {
            onClose();
            onCreated?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

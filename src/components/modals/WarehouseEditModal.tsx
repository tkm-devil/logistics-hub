// components/modals/WarehouseEditModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import WarehouseForm, {
  UpdateWarehouse,
} from "@/components/forms/warehouse-form";

interface WarehouseEditModalProps {
  open: boolean;
  onClose: () => void;
  warehouse: UpdateWarehouse & { id: string };
  onUpdated?: () => void;
}

export default function WarehouseEditModal({
  open,
  onClose,
  warehouse,
  onUpdated,
}: WarehouseEditModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Warehouse</DialogTitle>
        </DialogHeader>
        <WarehouseForm
          initialData={warehouse}
          onSuccess={() => {
            onClose();
            onUpdated?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

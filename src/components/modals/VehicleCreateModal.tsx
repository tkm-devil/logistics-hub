// components/modals/VehicleCreateModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import VehicleForm from "@/components/forms/vehicle-form";

interface VehicleCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export default function VehicleCreateModal({
  open,
  onClose,
  onCreated,
}: VehicleCreateModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Vehicle</DialogTitle>
        </DialogHeader>
        <VehicleForm
          onSuccess={() => {
            onClose();
            onCreated?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

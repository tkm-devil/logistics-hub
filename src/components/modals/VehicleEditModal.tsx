// components/modals/VehicleEditModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import VehicleForm, { UpdateVehicle } from "@/components/forms/vehicle-form";

interface VehicleEditModalProps {
  open: boolean;
  onClose: () => void;
  vehicle: UpdateVehicle & { id: string };
  onUpdated?: () => void;
}

export default function VehicleEditModal({
  open,
  onClose,
  vehicle,
  onUpdated,
}: VehicleEditModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Vehicle</DialogTitle>
        </DialogHeader>
        <VehicleForm
          initialData={vehicle}
          onSuccess={() => {
            onClose();
            onUpdated?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

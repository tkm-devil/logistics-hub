// components/modals/ShipmentCreateModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import ShipmentForm from "@/components/forms/shipment-form";

interface ShipmentCreateModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  onSuccess?: () => void;
}

export default function ShipmentCreateModal({
  open,
  setOpen,
  onSuccess,
}: ShipmentCreateModalProps) {
  const handleSuccess = () => {
    setOpen(false);
    if (onSuccess) onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Shipment</DialogTitle>
          <DialogDescription>
            Fill in the shipment details and click create to save it.
          </DialogDescription>
        </DialogHeader>

        <ShipmentForm onSuccess={handleSuccess} />

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}

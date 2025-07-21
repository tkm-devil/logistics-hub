// components/modals/ShipmentEditModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Shipment } from "@/components/tables/shipment-table";
import ShipmentForm from "@/components/forms/shipment-form";
import { useEffect, useState } from "react";

interface ShipmentEditModalProps {
  shipment: Shipment | null;
  open: boolean;
  setOpen: (value: boolean) => void;
  onSuccess?: () => void;
}

export default function ShipmentEditModal({
  shipment,
  open,
  setOpen,
  onSuccess,
}: ShipmentEditModalProps) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (shipment) setKey((k) => k + 1);
  }, [shipment]);

  const handleSuccess = () => {
    setOpen(false);
    if (onSuccess) onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Shipment</DialogTitle>
          <DialogDescription>
            Make changes to the shipment’s details. Click update when you're
            done.
          </DialogDescription>
        </DialogHeader>

        {shipment && (
          <ShipmentForm
            key={key}
            initialData={shipment}
            onSuccess={handleSuccess}
          />
        )}

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}

// components/modals/IncidentCreateModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import IncidentForm from "@/components/forms/incident-form";

interface IncidentCreateModalProps {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

export default function IncidentCreateModal({
  open,
  onClose,
  onCreated,
}: IncidentCreateModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Incident</DialogTitle>
        </DialogHeader>
        <IncidentForm
          onSuccess={() => {
            onClose();
            onCreated?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

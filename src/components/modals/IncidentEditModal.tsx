// components/modals/IncidentEditModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import IncidentForm, { UpdateIncident } from "@/components/forms/incident-form";

interface IncidentEditModalProps {
  open: boolean;
  onClose: () => void;
  incident: UpdateIncident & { id: string };
  onUpdated?: () => void;
}

export default function IncidentEditModal({
  open,
  onClose,
  incident,
  onUpdated,
}: IncidentEditModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Incident</DialogTitle>
        </DialogHeader>
        <IncidentForm
          initialData={incident}
          onSuccess={() => {
            onClose();
            onUpdated?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

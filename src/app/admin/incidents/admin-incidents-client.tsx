// app/admin/incidents/admin-incidents-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Incident } from "@/components/tables/incident-table";
import IncidentTable from "@/components/tables/incident-table";
import IncidentCreateModal from "@/components/modals/IncidentCreateModal";
import IncidentEditModal from "@/components/modals/IncidentEditModal";
import { Button } from "@/components/ui/button";
import { deleteIncident } from "@/lib/queries/incidents";
import { toast } from "sonner";

interface AdminIncidentsClientProps {
  incidents: Incident[];
}

export default function AdminIncidentsClient({
  incidents,
}: AdminIncidentsClientProps) {
  const router = useRouter();
  const [openCreate, setOpenCreate] = useState(false);
  const [editingIncident, setEditingIncident] = useState<Incident | null>(null);

  const refresh = () => router.refresh();

  const handleDelete = async (incident: Incident) => {
    const confirm = window.confirm(
      `Are you sure you want to delete "${incident.title}"?`
    );
    if (!confirm) return;

    const { error } = await deleteIncident(incident.id);
    if (error) {
      toast.error(`Failed to delete incident: ${error.message}`);
    } else {
      toast.success("Incident deleted successfully");
      refresh();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Incident Reports</h2>
        <Button onClick={() => setOpenCreate(true)}>+ Report Incident</Button>
      </div>

      <IncidentTable
        data={incidents}
        onEdit={(i) => setEditingIncident(i)}
        onDelete={handleDelete}
      />

      <IncidentCreateModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={refresh}
      />

      {editingIncident && (
        <IncidentEditModal
          open={!!editingIncident}
          onClose={() => setEditingIncident(null)}
          incident={editingIncident}
          onUpdated={refresh}
        />
      )}
    </div>
  );
}

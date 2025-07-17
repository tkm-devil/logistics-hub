// app/admin/incidents/page.tsx

import { getIncidents } from "@/lib/queries/incidents";
import IncidentTable from "@/components/tables/incident-table";

export default async function AdminIncidentsPage() {
  const { data: incidents, error } = await getIncidents();

  if (error) {
    return <p className="text-red-500">Failed to load incidents.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Incident Management</h1>
      <IncidentTable data={incidents ?? []} />
    </div>
  );
}

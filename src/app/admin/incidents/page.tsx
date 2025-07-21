// app/admin/incidents/page.tsx

import { getIncidents } from "@/lib/queries/incidents";
import AdminIncidentsClient from "./admin-incidents-client";

export default async function AdminIncidentsPage() {
  const { data: incidents, error } = await getIncidents();

  if (error || !incidents) {
    return <p className="text-red-500">❌ Failed to load incidents.</p>;
  }

  return <AdminIncidentsClient incidents={incidents} />;
}

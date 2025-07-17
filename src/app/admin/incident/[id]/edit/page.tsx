// app/admin/incidents/[id]/edit/page.tsx

import { getIncidentById } from "@/lib/queries/incidents";
import IncidentForm from "@/components/forms/incident-form";
import { notFound } from "next/navigation";

export default async function EditIncidentPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: incident, error } = await getIncidentById(params.id);

  if (!incident || error) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Edit Incident</h1>
      <IncidentForm initialData={incident} />
    </div>
  );
}

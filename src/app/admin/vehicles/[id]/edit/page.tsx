// app/admin/vehicles/[id]/edit/page.tsx

import { getVehicleById } from "@/lib/queries/vehicles";
import VehicleForm from "@/components/forms/vehicle-form";
import { notFound } from "next/navigation";

export default async function EditVehiclePage({
  params,
}: {
  params: { id: string };
}) {
  const { data: vehicle, error } = await getVehicleById(params.id);

  if (!vehicle || error) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Edit Vehicle</h1>
      <VehicleForm initialData={vehicle} />
    </div>
  );
}

// app/admin/vehicles/page.tsx

import { getVehicles } from "@/lib/queries/vehicles";
import VehicleTable from "@/components/tables/vehicle-table";

export default async function AdminVehiclesPage() {
  const { data: vehicles, error } = await getVehicles();

  if (error) {
    return <p className="text-red-500">Failed to load vehicles.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Vehicle Management</h1>
      <VehicleTable data={vehicles ?? []} />
    </div>
  );
}

// app/admin/vehicles/page.tsx

import { getVehicles } from "@/lib/queries/vehicles";
import AdminVehiclesClient from "./admin-vehicles-client";

export default async function AdminVehiclesPage() {
  const { data: vehicles, error } = await getVehicles();

  if (error || !vehicles) {
    return <p className="text-red-500">Failed to load vehicles.</p>;
  }

  return <AdminVehiclesClient vehicles={vehicles} />;
}

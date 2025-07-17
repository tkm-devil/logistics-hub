// app/admin/shipments/page.tsx

import { getShipments } from "@/lib/queries/shipments";
import ShipmentTable from "@/components/tables/shipment-table";

export default async function AdminShipmentsPage() {
  const { data: shipments, error } = await getShipments();

  if (error) {
    return <p className="text-red-500">Failed to load shipments.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Shipments</h1>
      <ShipmentTable data={shipments ?? []} />
    </div>
  );
}

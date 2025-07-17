// app/admin/warehouses/page.tsx

import { getWarehouses } from "@/lib/queries/warehouses";
import WarehouseTable from "@/components/tables/warehouse-table";

export default async function AdminWarehousesPage() {
  const { data: warehouses, error } = await getWarehouses();

  if (error) {
    return <p className="text-red-500">Failed to load warehouses.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Warehouse Management</h1>
      <WarehouseTable data={warehouses ?? []} />
    </div>
  );
}

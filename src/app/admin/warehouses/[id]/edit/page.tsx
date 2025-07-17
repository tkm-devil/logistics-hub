// app/admin/warehouses/[id]/edit/page.tsx

import { getWarehouseById } from "@/lib/queries/warehouses";
import WarehouseForm from "@/components/forms/warehouse-form";
import { notFound } from "next/navigation";

export default async function EditWarehousePage({
  params,
}: {
  params: { id: string };
}) {
  const { data: warehouse, error } = await getWarehouseById(params.id);

  if (!warehouse || error) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Edit Warehouse</h1>
      <WarehouseForm initialData={warehouse} />
    </div>
  );
}

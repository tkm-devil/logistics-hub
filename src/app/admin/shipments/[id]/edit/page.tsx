// app/admin/shipments/[id]/edit/page.tsx

import ShipmentForm from "@/components/forms/shipment-form";
import { getShipmentById } from "@/lib/queries/shipments";
import { notFound } from "next/navigation";

export default async function EditShipmentPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: shipment, error } = await getShipmentById(params.id);

  if (!shipment || error) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Edit Shipment</h1>
      <ShipmentForm initialData={shipment} />
    </div>
  );
}

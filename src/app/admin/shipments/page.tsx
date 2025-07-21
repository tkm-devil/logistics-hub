// app/admin/shipments/page.tsx
import { getShipments } from "@/lib/queries/shipments";
import AdminShipmentsClient from "./admin-shipments-client";

export default async function AdminShipmentsPage() {
  const { data: shipments, error } = await getShipments();

  if (error) {
    return <div className="text-red-500">Failed to load shipments: {error.message}</div>;
  }

  return <AdminShipmentsClient shipments={shipments || []} />;
}
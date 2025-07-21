// app/admin/vehicles/admin-vehicles-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Vehicle } from "@/components/tables/vehicle-table";
import VehicleTable from "@/components/tables/vehicle-table";
import VehicleCreateModal from "@/components/modals/VehicleCreateModal";
import VehicleEditModal from "@/components/modals/VehicleEditModal";
import { Button } from "@/components/ui/button";

interface AdminVehiclesClientProps {
  vehicles: Vehicle[];
}

export default function AdminVehiclesClient({
  vehicles,
}: AdminVehiclesClientProps) {
  const router = useRouter();
  const [openCreate, setOpenCreate] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const refresh = () => router.refresh();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Vehicles</h2>
        <Button onClick={() => setOpenCreate(true)}>+ Add Vehicle</Button>
      </div>

      <VehicleTable
        data={vehicles}
        onEdit={(v) => setEditingVehicle(v)}
        onDelete={(v) => {
          // Optional: add delete handler here
        }}
      />

      <VehicleCreateModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={refresh}
      />

      {editingVehicle && (
        <VehicleEditModal
          open={!!editingVehicle}
          onClose={() => setEditingVehicle(null)}
          vehicle={editingVehicle}
          onUpdated={refresh}
        />
      )}
    </div>
  );
}

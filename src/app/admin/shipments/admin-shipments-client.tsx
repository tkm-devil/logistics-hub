// app/admin/shipments/admin-shipments-client.tsx
"use client";

import { useState } from "react";
import ShipmentTable, { Shipment } from "@/components/tables/shipment-table";
import ShipmentEditModal from "@/components/modals/ShipmentEditModal";
import ShipmentCreateModal from "@/components/modals/ShipmentCreateModal";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface AdminShipmentsClientProps {
  shipments: Shipment[];
}

export default function AdminShipmentsClient({
  shipments,
}: AdminShipmentsClientProps) {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(
    null
  );
  const [editOpen, setEditOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const handleEdit = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setEditOpen(true);
  };

  const handleCreate = () => {
    setSelectedShipment(null);
    setCreateOpen(true);
  };

  const handleSuccess = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Shipments</h1>
        <Button onClick={handleCreate} variant="default">
          <PlusCircle className="mr-2 h-4 w-4" /> Create Shipment
        </Button>
      </div>

      <ShipmentTable data={shipments} onEdit={handleEdit} />

      <ShipmentEditModal
        shipment={selectedShipment}
        open={editOpen}
        setOpen={setEditOpen}
        onSuccess={handleSuccess}
      />

      <ShipmentCreateModal
        open={createOpen}
        setOpen={setCreateOpen}
        onSuccess={handleSuccess}
      />
    </div>
  );
}

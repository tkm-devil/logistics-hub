// app/admin/warehouses/admin-warehouses-client.tsx
'use client';

import { useState } from 'react';
import { Warehouse } from '@/components/tables/warehouse-table';
import WarehouseTable from '@/components/tables/warehouse-table';
import WarehouseCreateModal from '@/components/modals/WarehouseCreateModal';
import WarehouseEditModal from '@/components/modals/WarehouseEditModal';
import { Button } from '@/components/ui/button';

interface AdminWarehousesClientProps {
  warehouses: Warehouse[];
}

export default function AdminWarehousesClient({ warehouses }: AdminWarehousesClientProps) {
  const [openCreate, setOpenCreate] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(null);
  const [data, setData] = useState(warehouses);

  const reloadData = async () => {
    const res = await fetch('/api/admin/warehouses'); // Add API route later if needed
    const updated = await res.json();
    setData(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Warehouses</h2>
        <Button onClick={() => setOpenCreate(true)}>+ Add Warehouse</Button>
      </div>

      <WarehouseTable
        data={data}
        onEdit={(wh) => setEditingWarehouse(wh)}
        onDelete={(wh) => {
          // Optional: Add confirmation + delete mutation
        }}
      />

      {/* Create Modal */}
      <WarehouseCreateModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={reloadData}
      />

      {/* Edit Modal */}
      {editingWarehouse && (
        <WarehouseEditModal
          open={!!editingWarehouse}
          onClose={() => setEditingWarehouse(null)}
          warehouse={editingWarehouse}
          onUpdated={reloadData}
        />
      )}
    </div>
  );
}

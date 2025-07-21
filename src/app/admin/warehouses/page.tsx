// app/admin/warehouses/page.tsx
import { getWarehouses } from '@/lib/queries/warehouses';
import AdminWarehousesClient from './admin-warehouses-client';

export default async function AdminWarehousesPage() {
  const { data: warehouses, error } = await getWarehouses();

  if (error || !warehouses) {
    return <div className="text-red-500">❌ Failed to load warehouses</div>;
  }

  return <AdminWarehousesClient warehouses={warehouses} />;
}

// app/admin/users/page.tsx

import { getUsers } from "@/lib/queries/users";
import UserTable from "@/components/tables/user-table";

export default async function AdminUsersPage() {
  const { data: users, error } = await getUsers();

  if (error) {
    return <p className="text-red-500">Failed to load users.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Management</h1>
      <UserTable data={users ?? []} />
    </div>
  );
}

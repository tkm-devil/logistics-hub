// app/admin/users/page.tsx
import { getUsers } from "@/lib/queries/users";
import { User } from "@/components/tables/user-table";
import AdminUsersClient from "./admin-users-client";

export default async function AdminUsersPage() {
  const { data: users, error } = await getUsers();

  if (error) {
    console.error("❌ Supabase error loading users:", error.message);
    return (
      <div className="text-red-500 space-y-2">
        <p>Failed to load users.</p>
        <pre className="text-sm bg-red-100 text-red-700 p-2 rounded-md">
          {error.message}
        </pre>
      </div>
    );
  }

  return <AdminUsersClient users={users ?? []} />;
}

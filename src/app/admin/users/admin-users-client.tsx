"use client";

import { useState } from "react";
import UserTable, { User } from "@/components/tables/user-table";
import UserEditModal from "@/components/modals/UserEditModal";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function AdminUsersClient({ users }: { users: User[] }) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Search Users</h2>
        <div>
          <Alert variant="default">
          <Terminal />
          <AlertTitle>New User Creation</AlertTitle>
          <AlertDescription>
            New users can be added via the Supabase Dashboard or
            programmatically through an admin-only API.
          </AlertDescription>
        </Alert>
        </div>
      </div>

      <UserTable data={users} onEdit={handleEdit} />

      <UserEditModal
        user={selectedUser}
        open={editOpen}
        setOpen={setEditOpen}
        onSuccess={() => {
          // Optional: revalidate or show toast
        }}
      />
    </>
  );
}

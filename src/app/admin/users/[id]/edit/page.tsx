// app/admin/users/[id]/edit/page.tsx

import { getUserById } from "@/lib/queries/users";
import UserForm from "@/components/forms/user-form";
import { notFound } from "next/navigation";

export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: user, error } = await getUserById(params.id);

  if (!user || error) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Edit User</h1>
      <UserForm initialData={user} />
    </div>
  );
}

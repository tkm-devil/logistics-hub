// components/forms/user-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserSchema, UpdateUserSchema } from "@/types/zod-schema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;

interface UserFormProps {
  initialData?: Partial<UpdateUser> & { id?: string };
  onSuccess?: () => void;
}

export default function UserForm({ initialData, onSuccess }: UserFormProps) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = !!initialData?.id;

  const form = useForm<CreateUser | UpdateUser>({
    resolver: zodResolver(isEdit ? UpdateUserSchema : CreateUserSchema),
    defaultValues: {
      ...initialData,
      name: initialData?.name ?? "",
      email: initialData?.email ?? "",
      phone: initialData?.phone ?? "",
      role_id: initialData?.role_id ?? "",
      is_active: initialData?.is_active ?? true,
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("users").upsert({
      ...values,
      id: initialData?.id,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (onSuccess) onSuccess();
    else router.push("/admin/users");
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 max-w-2xl"
    >
      <Input placeholder="Name" {...form.register("name")} />
      <Input placeholder="Email" type="email" {...form.register("email")} />
      <Input placeholder="Phone" {...form.register("phone")} />
      <Input placeholder="Role ID" {...form.register("role_id")} />

      <div className="flex items-center gap-2">
        <Label htmlFor="is_active">Active</Label>
        <Switch
          id="is_active"
          checked={form.watch("is_active") ?? true}
          onCheckedChange={(checked) => form.setValue("is_active", checked)}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : isEdit ? "Update User" : "Create User"}
      </Button>
    </form>
  );
}

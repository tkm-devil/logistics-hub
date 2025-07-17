// components/forms/warehouse-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateWarehouseSchema,
  UpdateWarehouseSchema,
} from "@/types/zod-schema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export type CreateWarehouse = z.infer<typeof CreateWarehouseSchema>;
export type UpdateWarehouse = z.infer<typeof UpdateWarehouseSchema>;

interface WarehouseFormProps {
  initialData?: Partial<UpdateWarehouse> & { id?: string };
  onSuccess?: () => void;
}

export default function WarehouseForm({
  initialData,
  onSuccess,
}: WarehouseFormProps) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = !!initialData?.id;

  const form = useForm<CreateWarehouse | UpdateWarehouse>({
    resolver: zodResolver(
      isEdit ? UpdateWarehouseSchema : CreateWarehouseSchema
    ),
    defaultValues: {
      ...initialData,
      name: initialData?.name ?? "",
      location: initialData?.location ?? "",
      address: initialData?.address ?? "",
      coordinates: initialData?.coordinates ?? "",
      capacity_m3: initialData?.capacity_m3 ?? undefined,
      manager_id: initialData?.manager_id ?? "",
      is_active: initialData?.is_active ?? true,
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("warehouses").upsert({
      ...values,
      id: initialData?.id,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (onSuccess) onSuccess();
    else router.push("/admin/warehouses");
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 max-w-2xl"
    >
      <Input placeholder="Warehouse Name" {...form.register("name")} />
      <Input placeholder="Location" {...form.register("location")} />
      <Input placeholder="Address" {...form.register("address")} />
      <Input
        placeholder="Coordinates (optional)"
        {...form.register("coordinates")}
      />
      <Input
        type="number"
        placeholder="Capacity (m³)"
        {...form.register("capacity_m3", { valueAsNumber: true })}
      />
      <Input placeholder="Manager ID" {...form.register("manager_id")} />

      <div className="flex items-center space-x-2">
        <Switch
          checked={form.watch("is_active") ?? true}
          onCheckedChange={(checked) => form.setValue("is_active", checked)}
        />
        <Label>Is Active</Label>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading
          ? "Saving..."
          : isEdit
          ? "Update Warehouse"
          : "Create Warehouse"}
      </Button>
    </form>
  );
}

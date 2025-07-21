// components/forms/shipment-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateShipmentSchema, UpdateShipmentSchema } from "@/types/zod-schema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export type CreateShipment = z.infer<typeof CreateShipmentSchema>;
export type UpdateShipment = z.infer<typeof UpdateShipmentSchema>;

interface ShipmentFormProps {
  initialData?: Partial<UpdateShipment> & { id?: string };
  onSuccess?: () => void;
}

export default function ShipmentForm({
  initialData,
  onSuccess,
}: ShipmentFormProps) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = !!initialData?.id;

  const form = useForm<CreateShipment | UpdateShipment>({
    resolver: zodResolver(isEdit ? UpdateShipmentSchema : CreateShipmentSchema),
    defaultValues: {
      ...initialData,
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      origin: initialData?.origin ?? "",
      destination: initialData?.destination ?? "",
      priority: initialData?.priority ?? "normal",
      total_weight_kg: initialData?.total_weight_kg ?? 0,
      total_volume_m3: initialData?.total_volume_m3 ?? 0,
      cost: initialData?.cost ?? 0,
      client_id: initialData?.client_id ?? "",
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("shipments").upsert({
      ...values,
      id: initialData?.id,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (onSuccess) onSuccess();
    else router.push("/admin/shipments");
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this shipment?");
    if (!confirmed) return;

    setLoading(true);

    const { error } = await supabase
      .from("shipments")
      .delete()
      .eq("id", initialData?.id);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin/shipments");
    router.refresh();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 max-w-2xl"
    >
      <Input placeholder="Title" {...form.register("title")} />
      <Textarea placeholder="Description" {...form.register("description")} />
      <Input placeholder="Origin" {...form.register("origin")} />
      <Input placeholder="Destination" {...form.register("destination")} />
      <Input
        type="number"
        placeholder="Weight (kg)"
        {...form.register("total_weight_kg", { valueAsNumber: true })}
      />
      <Input
        type="number"
        placeholder="Volume (m³)"
        {...form.register("total_volume_m3", { valueAsNumber: true })}
      />
      <Input
        type="number"
        placeholder="Cost"
        {...form.register("cost", { valueAsNumber: true })}
      />
      <Input placeholder="Client ID" {...form.register("client_id")} />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-between items-center gap-4">
        <Button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : isEdit
            ? "Update Shipment"
            : "Create Shipment"}
        </Button>
        {isEdit && (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete Shipment
          </Button>
        )}
      </div>
    </form>
  );
}

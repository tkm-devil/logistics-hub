// components/forms/vehicle-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateVehicleSchema, UpdateVehicleSchema } from "@/types/zod-schema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CreateVehicle = z.infer<typeof CreateVehicleSchema>;
export type UpdateVehicle = z.infer<typeof UpdateVehicleSchema>;

interface VehicleFormProps {
  initialData?: Partial<UpdateVehicle> & { id?: string };
  onSuccess?: () => void;
}

export default function VehicleForm({
  initialData,
  onSuccess,
}: VehicleFormProps) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = !!initialData?.id;

  const form = useForm<CreateVehicle | UpdateVehicle>({
    resolver: zodResolver(isEdit ? UpdateVehicleSchema : CreateVehicleSchema),
    defaultValues: {
      ...initialData,
      license_plate: initialData?.license_plate ?? "",
      type: initialData?.type ?? "truck",
      make: initialData?.make ?? "",
      model: initialData?.model ?? "",
      year: initialData?.year ?? new Date().getFullYear(),
      capacity_kg: initialData?.capacity_kg ?? undefined,
      fuel_type: initialData?.fuel_type,
      status: initialData?.status,
      driver_id: initialData?.driver_id ?? "",
      warehouse_id: initialData?.warehouse_id ?? "",
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("vehicles").upsert({
      ...values,
      id: initialData?.id,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (onSuccess) onSuccess();
    else router.push("/admin/vehicles");
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 max-w-2xl"
    >
      <Input placeholder="License Plate" {...form.register("license_plate")} />
      <Input placeholder="Make" {...form.register("make")} />
      <Input placeholder="Model" {...form.register("model")} />
      <Input
        type="number"
        placeholder="Year"
        {...form.register("year", { valueAsNumber: true })}
      />
      <Input
        type="number"
        placeholder="Capacity (kg)"
        {...form.register("capacity_kg", { valueAsNumber: true })}
      />
      <Input placeholder="Driver ID" {...form.register("driver_id")} />
      <Input placeholder="Warehouse ID" {...form.register("warehouse_id")} />

      <Label>Fuel Type</Label>
      <Select
        onValueChange={(val) =>
          form.setValue(
            "fuel_type",
            val as "diesel" | "petrol" | "electric" | "hybrid"
          )
        }
        defaultValue={form.watch("fuel_type") || "diesel"}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select fuel type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="diesel">Diesel</SelectItem>
          <SelectItem value="petrol">Petrol</SelectItem>
          <SelectItem value="electric">Electric</SelectItem>
          <SelectItem value="hybrid">Hybrid</SelectItem>
        </SelectContent>
      </Select>

      <Label>Status</Label>
      <Select
        onValueChange={(val) =>
          form.setValue(
            "status",
            val as "available" | "in_service" | "maintenance" | "out_of_service"
          )
        }
        defaultValue={form.watch("status") || "available"}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="available">Available</SelectItem>
          <SelectItem value="in_service">In Service</SelectItem>
          <SelectItem value="maintenance">Maintenance</SelectItem>
          <SelectItem value="out_of_service">Out of Service</SelectItem>
        </SelectContent>
      </Select>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : isEdit ? "Update Vehicle" : "Create Vehicle"}
      </Button>
    </form>
  );
}

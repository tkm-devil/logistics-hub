"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  InventoryItemInsertSchema,
  InventoryItemUpdateSchema,
} from "@/types/zod-schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export type CreateInventoryItem = z.infer<typeof InventoryItemInsertSchema>;
export type UpdateInventoryItem = z.infer<typeof InventoryItemUpdateSchema>;

type InventoryItemFormProps = {
  initialData?: Partial<UpdateInventoryItem & {id? : string}>;
  onSuccess?: () => void;
};

export default function InventoryItemForm({ initialData, onSuccess }: InventoryItemFormProps) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = !!initialData?.id;

  const form = useForm<
    | z.infer<typeof InventoryItemInsertSchema>
    | z.infer<typeof InventoryItemUpdateSchema>
  >({
    resolver: zodResolver(
      isEdit ? InventoryItemUpdateSchema : InventoryItemInsertSchema
    ),
    defaultValues: {
      ...initialData,
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      sku: initialData?.sku ?? "",
      category: initialData?.category ?? "",
      quantity: initialData?.quantity ?? 0,
      unit: initialData?.unit ?? "pieces",
      weight_kg: initialData?.weight_kg ?? undefined,
      volume_m3: initialData?.volume_m3 ?? undefined,
      value: initialData?.value ?? undefined,
      fragile: initialData?.fragile ?? false,
      temperature_sensitive: initialData?.temperature_sensitive ?? false,
      hazardous: initialData?.hazardous ?? false,
      expiry_date: initialData?.expiry_date ?? undefined,
      shipment_id: initialData?.shipment_id ?? null,
      warehouse_id: initialData?.warehouse_id ?? null,
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("inventory_items").upsert({
      ...values,
      id: initialData?.id,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (onSuccess) onSuccess();
    else router.push("/admin/inventory");
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 max-w-2xl"
    >
      <Input placeholder="Name" {...form.register("name")} />
      <Textarea placeholder="Description" {...form.register("description")} />
      <Input placeholder="SKU" {...form.register("sku")} />
      <Input placeholder="Category" {...form.register("category")} />
      <Input
        type="number"
        placeholder="Quantity"
        {...form.register("quantity", { valueAsNumber: true })}
      />

      <Label>Unit</Label>
      <Select
        onValueChange={(val) => form.setValue("unit", val as any)}
        defaultValue={form.watch("unit") || "pieces"}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select unit" />
        </SelectTrigger>
        <SelectContent>
          {["pieces", "kg", "liters", "boxes", "pallets"].map((unit) => (
            <SelectItem key={unit} value={unit}>
              {unit}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="number"
        placeholder="Weight (kg)"
        step="0.01"
        {...form.register("weight_kg", { valueAsNumber: true })}
      />
      <Input
        type="number"
        placeholder="Volume (m³)"
        step="0.01"
        {...form.register("volume_m3", { valueAsNumber: true })}
      />
      <Input
        type="number"
        placeholder="Value"
        step="0.01"
        {...form.register("value", { valueAsNumber: true })}
      />

      <div className="flex gap-4 items-center">
        <Checkbox
          checked={!!form.watch("fragile")}
          onCheckedChange={(checked) => form.setValue("fragile", !!checked)}
        />
        <Label>Fragile</Label>

        <Checkbox
          checked={!!form.watch("temperature_sensitive")}
          onCheckedChange={(checked) =>
            form.setValue("temperature_sensitive", !!checked)
          }
        />
        <Label>Temperature Sensitive</Label>

        <Checkbox
          checked={!!form.watch("hazardous")}
          onCheckedChange={(checked) => form.setValue("hazardous", !!checked)}
        />
        <Label>Hazardous</Label>
      </div>

      <Input type="date" {...form.register("expiry_date")} />
      <Input placeholder="Shipment ID" {...form.register("shipment_id")} />
      <Input placeholder="Warehouse ID" {...form.register("warehouse_id")} />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : isEdit ? "Update Item" : "Create Item"}
      </Button>
    </form>
  );
}

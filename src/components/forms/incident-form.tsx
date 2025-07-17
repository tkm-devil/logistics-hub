// components/forms/incident-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateIncidentSchema, UpdateIncidentSchema } from "@/types/zod-schema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export type CreateIncident = z.infer<typeof CreateIncidentSchema>;
export type UpdateIncident = z.infer<typeof UpdateIncidentSchema>;

interface IncidentFormProps {
  initialData?: Partial<UpdateIncident> & { id?: string };
  onSuccess?: () => void;
}

export default function IncidentForm({
  initialData,
  onSuccess,
}: IncidentFormProps) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = !!initialData?.id;

  const form = useForm<CreateIncident | UpdateIncident>({
    resolver: zodResolver(isEdit ? UpdateIncidentSchema : CreateIncidentSchema),
    defaultValues: {
      ...initialData,
      shipment_id: initialData?.shipment_id ?? "",
      type: initialData?.type ?? "damage",
      severity: initialData?.severity ?? "medium",
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      location: initialData?.location ?? "",
      coordinates: initialData?.coordinates ?? "",
      reported_by: initialData?.reported_by ?? "",
      assigned_to: initialData?.assigned_to ?? "",
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("incidents").upsert({
      ...values,
      id: initialData?.id,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (onSuccess) onSuccess();
    else router.push("/admin/incidents");
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 max-w-2xl"
    >
      <Input placeholder="Shipment ID" {...form.register("shipment_id")} />
      <Input
        placeholder="Reported By (User ID)"
        {...form.register("reported_by")}
      />
      <Input
        placeholder="Assigned To (User ID)"
        {...form.register("assigned_to")}
      />

      <Select
        value={form.watch("type")}
        onValueChange={(value) => form.setValue("type", value as any)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="damage">Damage</SelectItem>
          <SelectItem value="delay">Delay</SelectItem>
          <SelectItem value="loss">Loss</SelectItem>
          <SelectItem value="theft">Theft</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={form.watch("severity")}
        onValueChange={(value) => form.setValue("severity", value as any)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Severity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="critical">Critical</SelectItem>
        </SelectContent>
      </Select>

      <Input placeholder="Title" {...form.register("title")} />
      <Textarea placeholder="Description" {...form.register("description")} />
      <Input placeholder="Location" {...form.register("location")} />
      <Input placeholder="Coordinates" {...form.register("coordinates")} />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : isEdit ? "Update Incident" : "Create Incident"}
      </Button>
    </form>
  );
}

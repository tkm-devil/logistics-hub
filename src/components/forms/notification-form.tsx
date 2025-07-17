// components/forms/notification-form.tsx
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateNotificationSchema,
  NotificationTypeEnum,
  PriorityEnum,
} from "@/types/zod-schema";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export type CreateNotification = z.infer<typeof CreateNotificationSchema>;

interface NotificationFormProps {
  initialData?: Partial<CreateNotification> & { id?: string };
  onSuccess?: () => void;
}

export default function NotificationForm({
  initialData,
  onSuccess,
}: NotificationFormProps) {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Define proper default values that match the schema
  const defaultValues: CreateNotification = {
    user_id: initialData?.user_id ?? "",
    type: (initialData?.type ?? "system_message") as CreateNotification["type"],
    title: initialData?.title ?? "",
    message: initialData?.message ?? "",
    related_shipment_id: initialData?.related_shipment_id,
    related_incident_id: initialData?.related_incident_id,
    priority: (initialData?.priority ??
      "normal") as CreateNotification["priority"],
    expires_at: initialData?.expires_at ?? undefined,
  };

  const form = useForm<CreateNotification>({
    resolver: zodResolver(CreateNotificationSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<CreateNotification> = async (values) => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.from("notifications").insert(values);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (onSuccess) onSuccess();
    else router.push("/admin/notifications");
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 max-w-2xl"
    >
      <Input placeholder="User ID" {...form.register("user_id")} />

      <Select
        value={form.watch("type")}
        onValueChange={(val) =>
          form.setValue("type", val as CreateNotification["type"])
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
        <SelectContent>
          {NotificationTypeEnum.options.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input placeholder="Title" {...form.register("title")} />
      <Textarea placeholder="Message" {...form.register("message")} />

      <Select
        value={form.watch("priority")}
        onValueChange={(val) =>
          form.setValue("priority", val as CreateNotification["priority"])
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Priority" />
        </SelectTrigger>
        <SelectContent>
          {PriorityEnum.options.map((p) => (
            <SelectItem key={p} value={p}>
              {p}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        placeholder="Related Shipment ID"
        {...form.register("related_shipment_id")}
      />
      <Input
        placeholder="Related Incident ID"
        {...form.register("related_incident_id")}
      />
      <Input type="datetime-local" {...form.register("expires_at")} />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Send Notification"}
      </Button>
    </form>
  );
}

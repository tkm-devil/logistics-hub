// src/lib/queries/notifications.ts

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import {
  CreateNotificationSchema,
  MarkNotificationReadSchema,
} from "@/types/zod-schema";

/**
 * Get all notifications for a specific user (sorted: unread first, then newest).
 */
export async function getNotificationsForUser(userId: string) {
  const supabase = await createClient();

  return supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("read", { ascending: true })
    .order("created_at", { ascending: false });
}

/**
 * Get a single notification by ID.
 */
export async function getNotificationById(id: string) {
  const supabase = await createClient();
  return supabase.from("notifications").select("*").eq("id", id).single();
}

/**
 * Create a new notification.
 */
export async function createNotification(data: z.infer<typeof CreateNotificationSchema>) {
  const supabase = await createClient();
  return supabase.from("notifications").insert(data).select().single();
}

/**
 * Mark a notification as read.
 */
export async function markNotificationRead(id: string, data: z.infer<typeof MarkNotificationReadSchema>) {
  const supabase = await createClient();
  return supabase
    .from("notifications")
    .update({
      read: data.read,
      read_at: data.read ? new Date().toISOString() : null,
    })
    .eq("id", id)
    .select()
    .single();
}

/**
 * Delete a notification (hard delete).
 */
export async function deleteNotification(id: string) {
  const supabase = await createClient();
  return supabase.from("notifications").delete().eq("id", id);
}

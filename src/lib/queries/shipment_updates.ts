// src/lib/queries/shipment_updates.ts

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import {
  ShipmentUpdateInsertSchema,
  ShipmentUpdateUpdateSchema,
} from "@/types/zod-schema";

/**
 * Get all updates for a specific shipment, sorted by created_at ascending.
 */
export async function getShipmentUpdates(shipmentId: string) {
  const supabase = await createClient();

  return supabase
    .from("shipment_updates")
    .select("*")
    .eq("shipment_id", shipmentId)
    .order("created_at", { ascending: true });
}

/**
 * Get a single shipment update by ID.
 */
export async function getShipmentUpdateById(id: string) {
  const supabase = await createClient();
  return supabase.from("shipment_updates").select("*").eq("id", id).single();
}

/**
 * Create a new shipment update (manual or automated).
 */
export async function createShipmentUpdate(
  data: z.infer<typeof ShipmentUpdateInsertSchema>
) {
  const supabase = await createClient();
  return supabase.from("shipment_updates").insert(data).select().single();
}

/**
 * Update a shipment update record.
 */
export async function updateShipmentUpdate(
  id: string,
  data: z.infer<typeof ShipmentUpdateUpdateSchema>
) {
  const supabase = await createClient();
  return supabase
    .from("shipment_updates")
    .update(data)
    .eq("id", id)
    .select()
    .single();
}

/**
 * Delete a shipment update (use cautiously if auditing is important).
 */
export async function deleteShipmentUpdate(id: string) {
  const supabase = await createClient();
  return supabase.from("shipment_updates").delete().eq("id", id);
}

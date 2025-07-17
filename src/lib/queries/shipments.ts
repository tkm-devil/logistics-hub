// src/lib/queries/shipments.ts

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import {
  CreateShipmentSchema,
  UpdateShipmentSchema,
  ShipmentFilterSchema,
} from "@/types/zod-schema";

/**
 * Get all shipments with optional filters.
 * Filters by status, priority, client_id, driver_id, date range, search.
 */
export async function getShipments(
  filters?: z.infer<typeof ShipmentFilterSchema>
) {
  const supabase = await createClient();

  let query = supabase
    .from("shipments")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }

  if (filters?.priority) {
    query = query.eq("priority", filters.priority);
  }

  if (filters?.client_id) {
    query = query.eq("client_id", filters.client_id);
  }

  if (filters?.driver_id) {
    query = query.eq("driver_id", filters.driver_id);
  }

  if (filters?.date_from) {
    query = query.gte("scheduled_date", filters.date_from);
  }

  if (filters?.date_to) {
    query = query.lte("scheduled_date", filters.date_to);
  }

  if (filters?.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,origin.ilike.%${filters.search}%,destination.ilike.%${filters.search}%`
    );
  }

  return query;
}

/**
 * Get a single shipment by ID.
 */
export async function getShipmentById(id: string) {
  const supabase = await createClient();
  return supabase.from("shipments").select("*").eq("id", id).single();
}

/**
 * Create a new shipment.
 */
export async function createShipment(
  data: z.infer<typeof CreateShipmentSchema>
) {
  const supabase = await createClient();
  return supabase.from("shipments").insert(data).select().single();
}

/**
 * Update an existing shipment.
 */
export async function updateShipment(
  id: string,
  data: z.infer<typeof UpdateShipmentSchema>
) {
  const supabase = await createClient();
  return supabase.from("shipments").update(data).eq("id", id).select().single();
}

/**
 * Delete a shipment (hard delete).
 * If using soft delete, update a status flag instead.
 */
export async function deleteShipment(id: string) {
  const supabase = await createClient();
  return supabase.from("shipments").delete().eq("id", id);
}

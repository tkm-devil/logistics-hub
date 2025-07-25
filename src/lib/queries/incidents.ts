// src/lib/queries/incidents.ts

import { z } from "zod";
import { createClient } from "@/utils/supabase/client";
import {
  IncidentInsertSchema,
  IncidentUpdateSchema,
  ResolveIncidentSchema,
} from "@/types/zod-schema";

type IncidentFilters = {
  shipment_id?: string;
  severity?: string;
  type?: string;
  resolved?: boolean;
};

/**
 * Get all incidents with optional filters.
 */
export async function getIncidents(filters?: IncidentFilters) {
  const supabase = await createClient();

  let query = supabase.from("incidents").select("*").order("created_at", { ascending: false });

  if (filters?.shipment_id) {
    query = query.eq("shipment_id", filters.shipment_id);
  }

  if (filters?.severity) {
    query = query.eq("severity", filters.severity);
  }

  if (filters?.type) {
    query = query.eq("type", filters.type);
  }

  if (typeof filters?.resolved === "boolean") {
    query = query.eq("resolved", filters.resolved);
  }

  return query;
}

/**
 * Get a single incident by ID.
 */
export async function getIncidentById(id: string) {
  const supabase = await createClient();
  return supabase.from("incidents").select("*").eq("id", id).single();
}

/**
 * Create a new incident.
 */
export async function createIncident(data: z.infer<typeof IncidentInsertSchema>) {
  const supabase = await createClient();
  return supabase.from("incidents").insert(data).select().single();
}

/**
 * Update an incident.
 */
export async function updateIncident(id: string, data: z.infer<typeof IncidentUpdateSchema>) {
  const supabase = await createClient();
  return supabase.from("incidents").update(data).eq("id", id).select().single();
}

/**
 * Resolve an incident.
 */
export async function resolveIncident(id: string, data: z.infer<typeof ResolveIncidentSchema>) {
  const supabase = await createClient();
  return supabase
    .from("incidents")
    .update({
      resolved: true,
      resolution_notes: data.resolution_notes,
      resolved_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();
}

/**
 * Delete an incident (hard delete).
 */
export async function deleteIncident(id: string) {
  const supabase = await createClient();
  return supabase.from("incidents").delete().eq("id", id);
}

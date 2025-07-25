// src/lib/queries/warehouses.ts

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import {
  WarehouseInsertSchema,
  WarehouseUpdateSchema,
} from "@/types/zod-schema";

type WarehouseFilters = {
  location?: string;
  manager_id?: string;
  is_active?: boolean;
};

/**
 * Get all warehouses with optional filters.
 */
export async function getWarehouses(filters?: WarehouseFilters) {
  const supabase = await createClient();

  let query = supabase.from("warehouses").select("*").order("created_at", { ascending: false });

  if (filters?.location) {
    query = query.ilike("location", `%${filters.location}%`);
  }

  if (filters?.manager_id) {
    query = query.eq("manager_id", filters.manager_id);
  }

  if (typeof filters?.is_active === "boolean") {
    query = query.eq("is_active", filters.is_active);
  }

  return query;
}

/**
 * Get a single warehouse by ID.
 */
export async function getWarehouseById(id: string) {
  const supabase = await createClient();
  return supabase.from("warehouses").select("*").eq("id", id).single();
}

/**
 * Create a new warehouse.
 */
export async function createWarehouse(data: z.infer<typeof WarehouseInsertSchema>) {
  const supabase = await createClient();
  return supabase.from("warehouses").insert(data).select().single();
}

/**
 * Update an existing warehouse.
 */
export async function updateWarehouse(id: string, data: z.infer<typeof WarehouseUpdateSchema>) {
  const supabase = await createClient();
  return supabase.from("warehouses").update(data).eq("id", id).select().single();
}

/**
 * Delete a warehouse (hard delete).
 */
export async function deleteWarehouse(id: string) {
  const supabase = await createClient();
  return supabase.from("warehouses").delete().eq("id", id);
}

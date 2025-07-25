// src/lib/queries/inventory_items.ts

import { z } from "zod";
import { createClient } from "@/utils/supabase/client";
import {
  InventoryItemInsertSchema,
  InventoryItemUpdateSchema,
} from "@/types/zod-schema";

type InventoryItemFilters = {
  warehouse_id?: string;
  name?: string;
  category?: string;
  in_stock?: boolean;
};

/**
 * Get all inventory items with optional filters.
 */
export async function getInventoryItems(filters?: InventoryItemFilters) {
  const supabase = await createClient();

  let query = supabase.from("inventory_items").select("*").order("updated_at", { ascending: false });

  if (filters?.warehouse_id) {
    query = query.eq("warehouse_id", filters.warehouse_id);
  }

  if (filters?.name) {
    query = query.ilike("name", `%${filters.name}%`);
  }

  if (filters?.category) {
    query = query.eq("category", filters.category);
  }

  if (typeof filters?.in_stock === "boolean") {
    query = query.eq("in_stock", filters.in_stock);
  }

  return query;
}

/**
 * Get a single inventory item by ID.
 */
export async function getInventoryItemById(id: string) {
  const supabase = await createClient();
  return supabase.from("inventory_items").select("*").eq("id", id).single();
}

/**
 * Create a new inventory item.
 */
export async function createInventoryItem(data: z.infer<typeof InventoryItemInsertSchema>) {
  const supabase = await createClient();
  return supabase.from("inventory_items").insert(data).select().single();
}

/**
 * Update an inventory item.
 */
export async function updateInventoryItem(id: string, data: z.infer<typeof InventoryItemUpdateSchema>) {
  const supabase = await createClient();
  return supabase.from("inventory_items").update(data).eq("id", id).select().single();
}

/**
 * Delete an inventory item (hard delete).
 */
export async function deleteInventoryItem(id: string) {
  const supabase = await createClient();
  return supabase.from("inventory_items").delete().eq("id", id);
}

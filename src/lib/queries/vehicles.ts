// src/lib/queries/vehicles.ts

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import {
  VehicleInsertSchema,
  VehicleUpdateSchema,
} from "@/types/zod-schema";

type VehicleFilters = {
  status?: string;
  type?: string;
  driver_id?: string;
  warehouse_id?: string;
};

/**
 * Get all vehicles with optional filters.
 */
export async function getVehicles(filters?: VehicleFilters) {
  const supabase = await createClient();

  let query = supabase.from("vehicles").select("*").order("created_at", { ascending: false });

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }

  if (filters?.type) {
    query = query.eq("type", filters.type);
  }

  if (filters?.driver_id) {
    query = query.eq("driver_id", filters.driver_id);
  }

  if (filters?.warehouse_id) {
    query = query.eq("warehouse_id", filters.warehouse_id);
  }

  return query;
}

/**
 * Get a single vehicle by ID.
 */
export async function getVehicleById(id: string) {
  const supabase = await createClient();
  return supabase.from("vehicles").select("*").eq("id", id).single();
}

/**
 * Create a new vehicle.
 */
export async function createVehicle(data: z.infer<typeof VehicleInsertSchema>) {
  const supabase = await createClient();
  return supabase.from("vehicles").insert(data).select().single();
}

/**
 * Update an existing vehicle.
 */
export async function updateVehicle(id: string, data: z.infer<typeof VehicleUpdateSchema>) {
  const supabase = await createClient();
  return supabase.from("vehicles").update(data).eq("id", id).select().single();
}

/**
 * Delete a vehicle (hard delete).
 */
export async function deleteVehicle(id: string) {
  const supabase = await createClient();
  return supabase.from("vehicles").delete().eq("id", id);
}

/**
 * Assign a driver to a vehicle.
 */
export async function assignDriver(vehicleId: string, driverId: string) {
  const supabase = await createClient();
  return supabase.from("vehicles").update({ driver_id: driverId }).eq("id", vehicleId).select().single();
}

/**
 * Assign a warehouse to a vehicle.
 */
export async function assignWarehouse(vehicleId: string, warehouseId: string) {
  const supabase = await createClient();
  return supabase.from("vehicles").update({ warehouse_id: warehouseId }).eq("id", vehicleId).select().single();
}

// src/lib/queries/users.ts

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import {
  CreateUserSchema,
  UpdateUserSchema,
  UserFilterSchema,
} from "@/types/zod-schema";

/**
 * Get all users with optional filters.
 */
export async function getUsers(filters?: z.infer<typeof UserFilterSchema>) {
  const supabase = await createClient();

  let query = supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters?.role_id) {
    query = query.eq("role_id", filters.role_id);
  }

  if (typeof filters?.is_active === "boolean") {
    query = query.eq("is_active", filters.is_active);
  }

  if (filters?.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`
    );
  }

  return query;
}

/**
 * Get a single user by ID.
 */
export async function getUserById(id: string) {
  const supabase = await createClient();
  return supabase.from("users").select("*").eq("id", id).single();
}

/**
 * Create a new user.
 */
export async function createUser(data: z.infer<typeof CreateUserSchema>) {
  const supabase = await createClient();
  return supabase.from("users").insert(data).select().single();
}

/**
 * Update an existing user.
 */
export async function updateUser(
  id: string,
  data: z.infer<typeof UpdateUserSchema>
) {
  const supabase = await createClient();
  return supabase.from("users").update(data).eq("id", id).select().single();
}

/**
 * Delete a user (hard delete).
 */
export async function deleteUser(id: string) {
  const supabase = await createClient();
  return supabase.from("users").delete().eq("id", id);
}

/**
 * Assign or update a user role.
 */
export async function assignUserRole(id: string, roleId: string) {
  const supabase = await createClient();
  return supabase
    .from("users")
    .update({ role_id: roleId })
    .eq("id", id)
    .select()
    .single();
}

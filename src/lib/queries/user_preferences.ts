// src/lib/queries/user_prefernces.ts

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import {
  UserPreferenceInsertSchema,
  UserPreferenceUpdateSchema,
} from "@/types/zod-schema";

/**
 * Get user preferences by user ID.
 */
export async function getUserPreferences(userId: string) {
  const supabase = await createClient();
  return supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", userId)
    .single();
}

/**
 * Create default user preferences.
 */
export async function createUserPreferences(
  data: z.infer<typeof UserPreferenceInsertSchema>
) {
  const supabase = await createClient();
  return supabase
    .from("user_preferences")
    .insert(data)
    .select()
    .single();
}

/**
 * Update existing user preferences.
 */
export async function updateUserPreferences(
  userId: string,
  data: z.infer<typeof UserPreferenceUpdateSchema>
) {
  const supabase = await createClient();
  return supabase
    .from("user_preferences")
    .update(data)
    .eq("user_id", userId)
    .select()
    .single();
}

/**
 * Delete user preferences (optional utility).
 */
export async function deleteUserPreferences(userId: string) {
  const supabase = await createClient();
  return supabase
    .from("user_preferences")
    .delete()
    .eq("user_id", userId);
}

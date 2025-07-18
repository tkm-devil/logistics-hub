import { createClient } from "@/utils/supabase/client";

export type UserPreferences = {
  user_id: string;
  language: string;
  theme: "light" | "dark" | "system";
  timezone: string;
  sidebar_collapsed: boolean;
  beta_features_enabled: boolean;
  notifications_enabled: boolean;
  updated_at: string;
};

const supabase = createClient();

/**
 * Fetch current user's preferences
 */
export async function getUserPreferences(
  userId: string
): Promise<UserPreferences | null> {
  const { data, error } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No row found, safe to return null (can insert default later)
      return null;
    }
    console.error("Failed to fetch preferences:", error);
    return null;
  }

  return data;
}

/**
 * Create default preferences if none exist
 */
export async function initUserPreferences(userId: string): Promise<void> {
  const existing = await getUserPreferences(userId);
  if (!existing) {
    const { error } = await supabase
      .from("user_preferences")
      .insert({ user_id: userId })
      .single();

    if (error) {
      console.error("Failed to insert default preferences:", error);
    }
  }
}

/**
 * Update one or more preference fields
 */
export async function updateUserPreferences(
  userId: string,
  updates: Partial<UserPreferences>
): Promise<boolean> {
  const { error } = await supabase
    .from("user_preferences")
    .update(updates)
    .eq("user_id", userId);

  if (error) {
    console.error("Failed to update preferences:", error);
    return false;
  }

  return true;
}

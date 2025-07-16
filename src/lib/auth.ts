// lib/auth.ts
import { createClient } from "@/utils/supabase/server";
import { Database } from "@/types/supabase";

// Roles allowed for admin panel access
export const ALLOWED_ROLES = ["admin", "manager"] as const;

export async function getSession() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) return null;
  return data.session;
}

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user;
}

export async function getUserRole() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase.rpc("get_user_role");
  if (error || !data) return null;
  return data as string;
}

export async function isAdminOrManager() {
  const role = await getUserRole();
  return ALLOWED_ROLES.includes(role as (typeof ALLOWED_ROLES)[number]);
}

export async function requireAdminAccess() {
  const user = await getCurrentUser();
  const role = await getUserRole();

  if (!user || !ALLOWED_ROLES.includes(role as any)) {
    return {
      authorized: false,
      user: null,
      role: null,
    };
  }

  return {
    authorized: true,
    user,
    role,
  };
}

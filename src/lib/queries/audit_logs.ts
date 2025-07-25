import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { AuditLogRowSchema } from "@/types/zod-schema";

/**
 * Get all audit logs (admin use only; consider pagination).
 */
export async function getAllAuditLogs() {
  const supabase = await createClient();
  return supabase
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false });
}

/**
 * Get a specific audit log entry by ID.
 */
export async function getAuditLogById(id: string) {
  const supabase = await createClient();
  return supabase.from("audit_logs").select("*").eq("id", id).single();
}

/**
 * Get audit logs for a specific user.
 */
export async function getAuditLogsByUserId(userId: string) {
  const supabase = await createClient();
  return supabase
    .from("audit_logs")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
}

/**
 * Get audit logs for a specific table.
 */
export async function getAuditLogsByTableName(table: string) {
  const supabase = await createClient();
  return supabase
    .from("audit_logs")
    .select("*")
    .eq("table_name", table)
    .order("created_at", { ascending: false });
}

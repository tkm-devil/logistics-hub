// roles-server.ts
import { createClient } from "@/utils/supabase/server";

export async function getRolesServer() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("roles").select("id, name");
  if (error) throw new Error(error.message);
  return data;
}

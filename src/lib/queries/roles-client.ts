// roles-client.ts
import { createClient } from "@/utils/supabase/client";

export async function getRolesClient() {
  const supabase = createClient();
  const { data, error } = await supabase.from("roles").select("id, name");
  if (error) throw new Error(error.message);
  return data;
}

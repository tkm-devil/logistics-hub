"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import AuditLogTable, { AuditLog } from "@/components/tables/audit-log-table";
import { Card, CardContent } from "@/components/ui/card";
import { AuditLogRowSchema } from "@/types/zod-schema";

export default function AdminAuditLogsClient() {
  const [data, setData] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      const parsed = AuditLogRowSchema.array().safeParse(data);
      if (parsed.success) setData(parsed.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <h1 className="text-2xl font-semibold">Audit Logs</h1>
        <AuditLogTable data={data} />
      </CardContent>
    </Card>
  );
}

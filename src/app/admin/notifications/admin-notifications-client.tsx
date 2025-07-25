"use client";

import { useEffect, useState } from "react";
import NotificationTable from "@/components/tables/notification-table";
import NotificationCreateModal from "@/components/modals/NotificationCreateModal";
import { createClient } from "@/utils/supabase/client";
import { Notification } from "@/components/tables/notification-table";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminNotificationsClient() {
  const [data, setData] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setData(data as Notification[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Notifications</h1>
          <NotificationCreateModal onSuccess={fetchData} />
        </div>
        <NotificationTable data={data} />
      </CardContent>
    </Card>
  );
}

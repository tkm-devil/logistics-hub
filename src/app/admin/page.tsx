import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: role } = await supabase.rpc("get_user_role");

  // You can later fetch stats via Supabase functions or views
  const stats = {
    totalShipments: 1204,
    activeUsers: 87,
    incidentsToday: 3,
    revenueThisMonth: "₹3.2L",
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Shipments</p>
            <p className="text-2xl font-semibold">{stats.totalShipments}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Active Users</p>
            <p className="text-2xl font-semibold">{stats.activeUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Incidents Today</p>
            <p className="text-2xl font-semibold">{stats.incidentsToday}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Revenue (This Month)</p>
            <p className="text-2xl font-semibold">{stats.revenueThisMonth}</p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-medium mb-2">Recent Activity</h2>
            <p className="text-sm text-muted-foreground">Coming soon...</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-medium mb-2">Quick Actions</h2>
            <p className="text-sm text-muted-foreground">Coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

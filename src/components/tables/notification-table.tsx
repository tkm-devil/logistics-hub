// components/tables/notification-table.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, CheckCircle, XCircle } from "lucide-react";
import { z } from "zod";
import { NotificationRowSchema } from "@/types/zod-schema";

export type Notification = z.infer<typeof NotificationRowSchema>;

interface NotificationTableProps {
  data: Notification[];
}

export const notificationColumns: ColumnDef<Notification>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "read",
    header: "Read",
    cell: ({ row }) => {
      const read = row.getValue("read");
      return read ? (
        <CheckCircle className="h-4 w-4 text-green-500" />
      ) : (
        <XCircle className="h-4 w-4 text-red-500" />
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Sent On",
    cell: ({ row }) => {
      const date = row.getValue("created_at") as Date | undefined;
      return date instanceof Date && !isNaN(date.getTime())
        ? date.toLocaleDateString()
        : "-";
    },
  },
];

export default function NotificationTable({ data }: NotificationTableProps) {
  return (
    <DataTable
      columns={notificationColumns}
      data={data}
      searchPlaceholder="Search notifications..."
    />
  );
}

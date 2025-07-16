// components/tables/audit-log-table.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { z } from "zod";
import { AuditLogSchema } from "@/types/zod-schema";

export type AuditLog = z.infer<typeof AuditLogSchema>;

interface AuditLogTableProps {
  data: AuditLog[];
}

export const auditLogColumns: ColumnDef<AuditLog>[] = [
  {
    accessorKey: "action",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Action <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
  },
  {
    accessorKey: "table_name",
    header: "Table",
  },
  {
    accessorKey: "record_id",
    header: "Record ID",
  },
  {
    accessorKey: "ip_address",
    header: "IP Address",
  },
  {
    accessorKey: "created_at",
    header: "Timestamp",
    cell: ({ row }) => {
      const date = row.getValue("created_at") as Date | undefined;
      return date instanceof Date && !isNaN(date.getTime())
        ? date.toLocaleString()
        : "-";
    },
  },
];

export default function AuditLogTable({ data }: AuditLogTableProps) {
  return (
    <DataTable
      columns={auditLogColumns}
      data={data}
      searchPlaceholder="Search logs..."
    />
  );
}

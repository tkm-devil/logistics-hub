// components/tables/incident-table.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, CheckCircle, XCircle } from "lucide-react";
import { z } from "zod";
import { IncidentSchema } from "@/types/zod-schema";

export type Incident = z.infer<typeof IncidentSchema>;

interface IncidentTableProps {
  data: Incident[];
}

export const incidentColumns: ColumnDef<Incident>[] = [
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
    accessorKey: "severity",
    header: "Severity",
  },
  {
    accessorKey: "resolved",
    header: "Resolved",
    cell: ({ row }) => {
      const resolved = row.getValue("resolved");
      return resolved ? (
        <CheckCircle className="h-4 w-4 text-green-500" />
      ) : (
        <XCircle className="h-4 w-4 text-red-500" />
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Reported On",
    cell: ({ row }) => {
      const date = row.getValue("created_at") as Date | undefined;
      return date instanceof Date && !isNaN(date.getTime())
        ? date.toLocaleDateString()
        : "-";
    },
  },
];

export default function IncidentTable({ data }: IncidentTableProps) {
  return (
    <DataTable
      columns={incidentColumns}
      data={data}
      searchPlaceholder="Search incidents..."
    />
  );
}

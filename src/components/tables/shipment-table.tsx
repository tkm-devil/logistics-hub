// components/tables/shipment-table.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { z } from "zod";
import { ShipmentSchema } from "@/types/zod-schema";

export type Shipment = z.infer<typeof ShipmentSchema>;

interface ShipmentTableProps {
  data: Shipment[];
}

export const shipmentColumns: ColumnDef<Shipment>[] = [
  {
    accessorKey: "tracking_number",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tracking Number <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "scheduled_date",
    header: "Scheduled Date",
    cell: ({ row }) => {
      const date = row.getValue("scheduled_date") as Date | undefined;
      return date instanceof Date && !isNaN(date.getTime())
        ? date.toLocaleDateString()
        : "-";
    },
  },
];

export default function ShipmentTable({ data }: ShipmentTableProps) {
  return (
    <DataTable
      columns={shipmentColumns}
      data={data}
      searchPlaceholder="Search shipments..."
    />
  );
}

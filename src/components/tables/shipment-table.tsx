// components/tables/shipment-table.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, PencilIcon } from "lucide-react";
import { z } from "zod";
import { ShipmentRowSchema } from "@/types/zod-schema";

export type Shipment = z.infer<typeof ShipmentRowSchema>;

interface ShipmentTableProps {
  data: Shipment[];
  onEdit: (shipment: Shipment) => void;
}

export const shipmentColumns = (
  onEdit: (shipment: Shipment) => void
): ColumnDef<Shipment>[] => [
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
  { accessorKey: "title", header: "Title" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "priority", header: "Priority" },
  { accessorKey: "origin", header: "Origin" },
  { accessorKey: "destination", header: "Destination" },
  {
    accessorKey: "scheduled_date",
    header: "Scheduled Date",
    cell: ({ row }) => {
      const raw = row.getValue("scheduled_date");
      const date = raw ? new Date(raw as string) : null;
      return date && !isNaN(date.getTime())
        ? date.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })
        : "-";
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const shipment = row.original;
      return (
        <Button
          variant="outline"
          size="sm"
          className="text-blue-600 hover:underline flex items-center gap-1"
          onClick={() => onEdit(shipment)}
        >
          <PencilIcon className="w-4 h-4" />
          Edit
        </Button>
      );
    },
  },
];

export default function ShipmentTable({ data, onEdit }: ShipmentTableProps) {
  return (
    <DataTable
      columns={shipmentColumns(onEdit)}
      data={data}
      searchPlaceholder="Search shipments..."
    />
  );
}


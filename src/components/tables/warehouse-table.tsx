// components/tables/warehouse-table.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, CheckCircle, XCircle, Pencil, Trash } from "lucide-react";
import { z } from "zod";
import { WarehouseRowSchema } from "@/types/zod-schema";

export type Warehouse = z.infer<typeof WarehouseRowSchema>;

interface WarehouseTableProps {
  data: Warehouse[];
  onEdit?: (warehouse: Warehouse) => void;
  onDelete?: (warehouse: Warehouse) => void;
}

export const warehouseColumns = (
  onEdit?: (warehouse: Warehouse) => void,
  onDelete?: (warehouse: Warehouse) => void
): ColumnDef<Warehouse>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "capacity_m3",
    header: "Capacity (m³)",
  },
  {
    accessorKey: "is_active",
    header: "Active",
    cell: ({ row }) => {
      const isActive = row.getValue("is_active");
      return isActive ? (
        <CheckCircle className="h-4 w-4 text-green-500" />
      ) : (
        <XCircle className="h-4 w-4 text-red-500" />
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("created_at") as Date | undefined;
      return date instanceof Date && !isNaN(date.getTime())
        ? date.toLocaleDateString()
        : "-";
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const warehouse = row.original;
      return (
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onEdit?.(warehouse)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete?.(warehouse)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];

export default function WarehouseTable({
  data,
  onEdit,
  onDelete,
}: WarehouseTableProps) {
  return (
    <DataTable
      columns={warehouseColumns(onEdit, onDelete)}
      data={data}
      searchPlaceholder="Search warehouses..."
    />
  );
}

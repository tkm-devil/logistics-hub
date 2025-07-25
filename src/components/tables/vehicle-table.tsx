// components/tables/vehicle-table.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash } from "lucide-react";
import { z } from "zod";
import { VehicleRowSchema } from "@/types/zod-schema";

export type Vehicle = z.infer<typeof VehicleRowSchema>;

interface VehicleTableProps {
  data: Vehicle[];
  onEdit?: (vehicle: Vehicle) => void;
  onDelete?: (vehicle: Vehicle) => void;
}

export const vehicleColumns = (
  onEdit?: (vehicle: Vehicle) => void,
  onDelete?: (vehicle: Vehicle) => void
): ColumnDef<Vehicle>[] => [
  {
    accessorKey: "license_plate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Plate <ArrowUpDown className="ml-2 h-3 w-3" />
      </Button>
    ),
  },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "make", header: "Make" },
  { accessorKey: "model", header: "Model" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "capacity_kg", header: "Capacity (kg)" },
  { accessorKey: "fuel_type", header: "Fuel" },
  {
    accessorKey: "next_maintenance",
    header: "Next Maintenance",
    cell: ({ row }) => {
      const date = row.getValue("next_maintenance") as Date | undefined;
      return date instanceof Date && !isNaN(date.getTime())
        ? date.toLocaleDateString()
        : "-";
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const vehicle = row.original;
      return (
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" onClick={() => onEdit?.(vehicle)}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete?.(vehicle)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];

export default function VehicleTable({
  data,
  onEdit,
  onDelete,
}: VehicleTableProps) {
  return (
    <DataTable
      columns={vehicleColumns(onEdit, onDelete)}
      data={data}
      searchPlaceholder="Search vehicles..."
    />
  );
}

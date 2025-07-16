// components/tables/vehicle-table.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { z } from "zod";
import { VehicleSchema } from "@/types/zod-schema";

export type Vehicle = z.infer<typeof VehicleSchema>;

interface VehicleTableProps {
  data: Vehicle[];
}

export const vehicleColumns: ColumnDef<Vehicle>[] = [
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
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "make",
    header: "Make",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "capacity_kg",
    header: "Capacity (kg)",
  },
  {
    accessorKey: "fuel_type",
    header: "Fuel",
  },
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
];

export default function VehicleTable({ data }: VehicleTableProps) {
  return (
    <DataTable
      columns={vehicleColumns}
      data={data}
      searchPlaceholder="Search vehicles..."
    />
  );
}

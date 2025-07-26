"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Pencil, Trash } from "lucide-react";
import { z } from "zod";
import { InventoryItemRowSchema } from "@/types/zod-schema";

export type InventoryItem = z.infer<typeof InventoryItemRowSchema>;

interface InventoryItemTableProps {
  data: InventoryItem[];
  onEdit?: (item: InventoryItem) => void;
  onDelete?: (item: InventoryItem) => void;
}

export const inventoryItemColumns = (
  onEdit?: (item: InventoryItem) => void,
  onDelete?: (item: InventoryItem) => void
): ColumnDef<InventoryItem>[] => [
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
  { accessorKey: "sku", header: "SKU" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "quantity", header: "Quantity" },
  { accessorKey: "unit", header: "Unit" },
  { accessorKey: "weight_kg", header: "Weight (kg)" },
  { accessorKey: "volume_m3", header: "Volume (m³)" },
  { accessorKey: "value", header: "Value" },
  {
    accessorKey: "expiry_date",
    header: "Expiry",
    cell: ({ row }) => {
      const date = row.getValue("expiry_date") as Date | undefined;
      return date instanceof Date && !isNaN(date.getTime())
        ? date.toLocaleDateString()
        : "-";
    },
  },
  {
    accessorKey: "fragile",
    header: "Fragile",
    cell: ({ row }) => (row.getValue("fragile") ? "Yes" : "No"),
  },
  {
    accessorKey: "temperature_sensitive",
    header: "Temp. Sensitive",
    cell: ({ row }) => (row.getValue("temperature_sensitive") ? "Yes" : "No"),
  },
  {
    accessorKey: "hazardous",
    header: "Hazardous",
    cell: ({ row }) => (row.getValue("hazardous") ? "Yes" : "No"),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" onClick={() => onEdit?.(item)}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => onDelete?.(item)}>
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];

export default function InventoryItemTable({
  data,
  onEdit,
  onDelete,
}: InventoryItemTableProps) {
  return (
    <DataTable
      columns={inventoryItemColumns(onEdit, onDelete)}
      data={data}
      searchPlaceholder="Search inventory..."
    />
  );
}

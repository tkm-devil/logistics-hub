// components/tables/user-table.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, CheckCircle, XCircle } from "lucide-react";
import { z } from "zod";
import { UserSchema } from "@/types/zod-schema";

export type User = z.infer<typeof UserSchema>;

interface UserTableProps {
  data: User[];
}

export const userColumns: ColumnDef<User>[] = [
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
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
];

export default function UserTable({ data }: UserTableProps) {
  return (
    <DataTable
      columns={userColumns}
      data={data}
      searchPlaceholder="Search users..."
    />
  );
}

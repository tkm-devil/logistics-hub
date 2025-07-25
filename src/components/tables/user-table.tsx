// components/tables/user-table.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, CheckCircle, PencilIcon, XCircle } from "lucide-react";
import { z } from "zod";
import { UserRowSchema } from "@/types/zod-schema";
import Link from "next/link";
import { useMemo } from "react";

export type User = z.infer<typeof UserRowSchema>;

interface UserTableProps {
  data: User[];
  onEdit: (user: User) => void;
}

export const userColumns = (
  onEdit: (user: User) => void
): ColumnDef<User>[] => [
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
      const raw = row.getValue("created_at");
      const date = raw ? new Date(raw as string) : null;

      return date && !isNaN(date.getTime())
        ? date.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "-";
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Button
          variant="outline"
          size="sm"
          className="text-blue-600 hover:underline flex items-center gap-1"
          onClick={() => onEdit(user)}
        >
          <PencilIcon className="w-4 h-4" />
          Edit
        </Button>
      );
    },
  },
];

export default function UserTable({ data, onEdit }: UserTableProps) {
  const columns = useMemo(() => userColumns(onEdit), [onEdit]);
  return (
    <DataTable
      columns={columns}
      data={data}
      searchPlaceholder="Search users..."
    />
  );
}

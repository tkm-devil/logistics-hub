"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { User } from "@/components/tables/user-table";
import UserForm from "@/components/forms/user-form";
import { useEffect, useState } from "react";

interface UserEditModalProps {
  user: User | null;
  open: boolean;
  setOpen: (value: boolean) => void;
  onSuccess?: () => void;
}

export default function UserEditModal({
  user,
  open,
  setOpen,
  onSuccess,
}: UserEditModalProps) {
  // For closing after success
  const handleSuccess = () => {
    setOpen(false);
    if (onSuccess) onSuccess();
  };

  // Reset modal scroll/form state when user changes
  const [key, setKey] = useState(0);
  useEffect(() => {
    if (user) setKey((k) => k + 1);
  }, [user]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Make changes to the user’s details. Click update when you're done.
          </DialogDescription>
        </DialogHeader>

        {user && (
          <UserForm key={key} initialData={user} onSuccess={handleSuccess} />
        )}

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}

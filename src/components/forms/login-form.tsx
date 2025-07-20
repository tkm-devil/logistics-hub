// components/forms/login-form.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { LoginSchema } from "@/types/zod-schema";
import { createClient } from "@/utils/supabase/client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export type LoginInput = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (values: LoginInput) => {
    setFormError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (signInError) {
      setFormError(signInError.message);
      setLoading(false);
      return;
    }

    // Fetch role using RPC
    const { data: role, error: roleError } = await supabase.rpc(
      "get_user_role"
    );

    if (roleError || !role) {
      await supabase.auth.signOut();
      setFormError("Failed to determine user role.");
      setLoading(false);
      return;
    }

    // Redirect based on role
    switch (role) {
      case "admin":
      case "manager":
        router.push("/admin");
        break;
      case "client":
        router.push("/client");
        break;
      case "driver":
        router.push("/driver");
        break;
      case "staff":
        router.push("/staff");
        break;
      default:
        await supabase.auth.signOut();
        setFormError("Unauthorized role.");
        break;
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <div>
        <Input type="email" placeholder="Email" {...register("email")} />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {formError && <p className="text-sm text-red-500">{formError}</p>}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Login"}
      </Button>
    </form>
  );
}

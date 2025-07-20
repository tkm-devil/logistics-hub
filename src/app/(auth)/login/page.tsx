// app/(auth)/login/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import LoginForm from "@/components/forms/login-form";

export default async function LoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: role } = await supabase.rpc("get_user_role");

    switch (role) {
      case "admin":
      case "manager":
        redirect("/admin");
      case "client":
        redirect("/client");
      case "driver":
        redirect("/driver");
      case "staff":
        redirect("/staff");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 shadow-xl p-8 space-y-6 border border-zinc-200 dark:border-zinc-800">
        {/* Optional logo or brand text */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Login to your Logistics Hub account
          </p>
        </div>

        <LoginForm />

        {/* Optional footer for registration later */}
        <p className="text-sm text-center text-zinc-600 dark:text-zinc-400">
          Don’t have an account?{" "}
          <span className="text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline">
            Contact support
          </span>
        </p>
      </div>
    </div>
  );
}

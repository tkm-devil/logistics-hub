// components/layout/admin/auth-guard.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Loader2, Shield, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthState {
  loading: boolean;
  authorized: boolean;
  error: string | null;
  retryCount: number;
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const supabase = createClient();
  const [authState, setAuthState] = useState<AuthState>({
    loading: true,
    authorized: false,
    error: null,
    retryCount: 0,
  });

  const verifyUser = async () => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw new Error("Failed to authenticate user");
      }

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: role, error: roleError } = await supabase.rpc(
        "get_user_role"
      );

      if (roleError) {
        throw new Error("Failed to verify user permissions");
      }

      if (!["admin", "manager"].includes(role)) {
        await supabase.auth.signOut();
        router.push("/login");
        return;
      }

      setAuthState({
        loading: false,
        authorized: true,
        error: null,
        retryCount: 0,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        authorized: false,
        error: error instanceof Error ? error.message : "Authentication failed",
        retryCount: prev.retryCount + 1,
      }));
    }
  };

  useEffect(() => {
    verifyUser();
  }, [router, supabase]);

  const handleRetry = () => {
    verifyUser();
  };

  // Error State
  if (authState.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/10 dark:to-red-800/10">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <AlertCircle className="h-16 w-16 mx-auto text-red-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Authentication Error
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {authState.error}
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleRetry}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={authState.loading}
              >
                {authState.loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Retrying...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </>
                )}
              </Button>

              <Button
                onClick={() => router.push("/login")}
                variant="outline"
                className="w-full"
              >
                Back to Login
              </Button>
            </div>

            {authState.retryCount > 0 && (
              <p className="text-sm text-gray-500 mt-4">
                Retry attempts: {authState.retryCount}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Loading State with Skeleton
  if (authState.loading || !authState.authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/10 dark:to-indigo-800/10">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            {/* Logo/Brand Area */}
            <div className="mb-8">
              <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Admin Panel
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Verifying your credentials...
              </p>
            </div>

            {/* Loading Animation */}
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>

              {/* Progress Steps */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    Authenticating user...
                  </span>
                  <div className="h-2 w-2 bg-blue-600 rounded-full animate-pulse" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    Verifying permissions...
                  </span>
                  <div className="h-2 w-2 bg-gray-300 rounded-full" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">
                    Loading dashboard...
                  </span>
                  <div className="h-2 w-2 bg-gray-300 rounded-full" />
                </div>
              </div>
            </div>

            {/* Loading Skeleton */}
            <div className="mt-8 space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

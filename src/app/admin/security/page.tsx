"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  Key,
  Smartphone,
  Activity,
  LogOut,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";

type PasswordField = "current" | "new" | "confirm";

export default function SecurityPage() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  const [showPasswords, setShowPasswords] = useState<
    Record<PasswordField, boolean>
  >({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({
    type: "",
    message: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  const handlePasswordChange = async () => {
    setIsLoading(true);
    setFeedback({ type: "", message: "" });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setFeedback({ type: "error", message: "New passwords do not match" });
      setIsLoading(false);
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setFeedback({
        type: "error",
        message: "Password must be at least 8 characters long",
      });
      setIsLoading(false);
      return;
    }

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || "",
        password: passwordForm.currentPassword,
      });

      if (signInError) {
        setFeedback({
          type: "error",
          message: "Current password is incorrect",
        });
        setIsLoading(false);
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: passwordForm.newPassword,
      });

      if (updateError) {
        setFeedback({ type: "error", message: updateError.message });
      } else {
        setFeedback({
          type: "success",
          message: "Password updated successfully",
        });
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch {
      setFeedback({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOutAllSessions = async () => {
    if (!confirm("Are you sure you want to sign out of all sessions?")) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut({ scope: "global" });
      if (error) {
        setFeedback({
          type: "error",
          message: "Failed to sign out of all sessions",
        });
      } else {
        window.location.href = "/login";
      }
    } catch {
      setFeedback({ type: "error", message: "An unexpected error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: PasswordField) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { label: "Very Weak", color: "bg-red-500" },
      { label: "Weak", color: "bg-red-400" },
      { label: "Fair", color: "bg-yellow-500" },
      { label: "Good", color: "bg-blue-500" },
      { label: "Strong", color: "bg-green-500" },
    ];

    return { strength, ...(levels[strength - 1] || levels[0]) };
  };

  const passwordStrength = getPasswordStrength(passwordForm.newPassword);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Security Settings
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your account security and authentication settings
              </p>
            </div>
          </div>
        </div>

        {/* Feedback */}
        {feedback.message && (
          <div
            className={`p-4 rounded-lg border ${
              feedback.type === "success"
                ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300"
                : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300"
            }`}
          >
            <div className="flex items-center space-x-2">
              {feedback.type === "success" ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
              <span>{feedback.message}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Password Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Key className="text-green-500" /> Change Password
              </h2>

              {/* Current */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white pr-12"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
                  >
                    {showPasswords.current ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* New */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white pr-12"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
                  >
                    {showPasswords.new ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {passwordForm.newPassword && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-full h-2 rounded-full bg-gray-300 dark:bg-gray-600">
                      <div
                        className={`h-2 rounded-full ${passwordStrength.color}`}
                        style={{
                          width: `${(passwordStrength.strength / 5) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {passwordStrength.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white pr-12"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
                  >
                    {showPasswords.confirm ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <button
                onClick={handlePasswordChange}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg disabled:opacity-50"
              >
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </div>

            {/* Session Management */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <LogOut className="text-red-500" /> Session Management
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Active session for <b>{user?.email}</b>
              </p>
              <button
                onClick={handleSignOutAllSessions}
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg disabled:opacity-50"
              >
                {isLoading ? "Signing out..." : "Sign out of all sessions"}
              </button>
            </div>
          </div>

          {/* Sidebar Summary (Optional) */}
          <div className="space-y-6 hidden lg:block">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Security Tips
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc ml-4 space-y-1">
                <li>Use a unique password</li>
                <li>Change your password regularly</li>
                <li>Enable two-factor authentication</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

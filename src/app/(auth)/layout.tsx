// src/app/(auth)/layout.tsx
import "../../app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Logistics Hub",
  description: "Login securely to your Logistics Hub account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-zinc-950 antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          <main className="flex items-center justify-center min-h-screen px-4">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

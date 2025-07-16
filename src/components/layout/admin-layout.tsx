// components/layout/admin-layout.tsx
'use client';

import Sidebar from './sidebar';
import Topbar from './topbar';
import AuthGuard from './auth-guard';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className='flex-1 flex flex-col'>
          <Topbar />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}

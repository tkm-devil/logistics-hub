// app/login/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import LoginForm from '@/components/forms/login-form';

export default async function LoginPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const { data: role } = await supabase.rpc('get_user_role');
    if (role === 'admin' || role === 'manager') {
      redirect('/admin');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}

// src/middleware.ts
import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Match all request paths except the ones that should bypass auth
    '/((?!_next/static|_next/image|favicon.ico|.*\.(svg|png|jpg|jpeg|gif|webp)).*)',
  ],
};

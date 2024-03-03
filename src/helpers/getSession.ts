import { type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { User } from '@/mock/users';

export type Session = { id: string; name: string; role: User['role'] } | null;

export const getSession = (request?: NextRequest): Session => {
  if (!request) return JSON.parse(cookies().get('session')?.value || String(null));
  return JSON.parse(request.cookies.get('session')?.value || String(null));
};

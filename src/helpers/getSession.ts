import { GetUserById } from '@/services/GetUserById';
import type { User } from '@/lib/schemas';
import { cookies } from 'next/headers';
import { auth } from 'firebase-admin';

export type Session = { name: string; accountType: User['accountType'], id : string } | null;

export const getSession = async () => {
  const session = cookies().get('session');
  if (!session) return null;

  const decodedToken = await auth().verifySessionCookie(session.value, true);
  if (!decodedToken) return null;

  const { data, status } = await GetUserById(decodedToken.uid);
  if (status !== 200) return null;

  return { name: data.name, accountType: data.accountType, id : data.id};
};

export const getSessionUser = async () => {
  const session = cookies().get('session');
  if (!session) return null;

  const decodedToken = await auth().verifySessionCookie(session.value, true);
  if (!decodedToken) return null;

  const { data, status } = await GetUserById(decodedToken.uid);
  if (status !== 200) return null;

  return data;
};


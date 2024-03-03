import { userSchema, users } from '@/mock/users';
import { z } from 'zod';

export const generateDatabase = () => {
  const isLocalStorageValid = typeof localStorage !== 'undefined' ? localStorage : null;
  if (!isLocalStorageValid) return users;

  const database = z
    .array(userSchema)
    .safeParse(JSON.parse(localStorage.getItem('database') || String(null)));

  if (!database.success) {
    localStorage.setItem('database', JSON.stringify([users]));
    return users;
  }

  return database.data;
};

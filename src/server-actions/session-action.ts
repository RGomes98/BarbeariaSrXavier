'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { users } from '@/mock/users';

export const login = (formData: FormData) => {
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const user = users.find((user) => user.email === email && user.password === password);

  if (user) {
    const oneDay = 24 * 60 * 60 * 1000;

    cookies().set({
      httpOnly: true,
      name: 'session',
      expires: Date.now() + oneDay,
      value: JSON.stringify({ id: user.cpf, name: user.name, role: user.role }),
    });

    redirect('/');
  }
};

export const logout = () => {
  cookies().delete({ name: 'session' });
  redirect('/');
};

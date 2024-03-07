'use client';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { auth } from '@/firebaseConfig/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginSchema } from '@/lib/schemas';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const LoginForm = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [user] = useAuthState(auth);
  const { push } = useRouter();

  useEffect(() => {
    if (user) push('/');
  }, [user, push]);

  async function onSubmit(formData: LoginSchema) {
    const user = await signInWithEmailAndPassword(formData.email, formData.password);
    if (!user) return console.error('Ocorreu um erro ao entrar na sua conta.'); // Mostrar um toast

    // Mostrar um toast se o usuario logar
    push('/'); // Redirecionar pra home se o usuario logar
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <FormField
          name='email'
          control={form.control}
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormControl>
                <Input {...field} placeholder='Email' type='email' />
              </FormControl>
              <FormMessage className='px-0.5 text-start' />
            </FormItem>
          )}
        />
        <FormField
          name='password'
          control={form.control}
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormControl>
                <Input {...field} placeholder='Senha' type='password' />
              </FormControl>
              <FormMessage className='px-0.5 text-start' />
            </FormItem>
          )}
        />
        <Button type='submit' className='mt-4 w-full font-medium'>
          Entrar
        </Button>
      </form>
    </Form>
  );
};

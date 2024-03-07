'use client';

import { useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { createUserAccount } from '@/services/CreateUserAccount';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatPhoneNumber } from '@/utils/phone';
import { auth } from '@/firebaseConfig/firebase';
import { Button } from '@/components/ui/button';
import { RegisterSchema } from '@/lib/schemas';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { formatCPF } from '@/utils/cpf';
import { useEffect } from 'react';

export const RegisterForm = () => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { cpf: '', name: '', phone: '', email: '', password: '', confirmPassword: '' },
  });

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [user] = useAuthState(auth);
  const { push } = useRouter();

  useEffect(() => {
    if (user) push('/');
  }, [user, push]);

  async function onSubmit(formData: RegisterSchema) {
    const user = await createUserWithEmailAndPassword(formData.email, formData.password);

    if (!user) return console.error('Ocorreu um erro ao criar sua conta.'); // Mostrar um toast
    const { status, message } = createUserAccount(formData, user);

    console.log(message); //Mostrar um toast
    if (status === 'success') push('/'); //Redireciona pra home se conta for criada
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <FormField
          name='name'
          control={form.control}
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormControl>
                <Input {...field} placeholder='Nome' />
              </FormControl>
              <FormMessage className='px-0.5 text-start' />
            </FormItem>
          )}
        />
        <FormField
          name='cpf'
          control={form.control}
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormControl>
                <Input
                  {...field}
                  maxLength={14}
                  placeholder='CPF'
                  inputMode='numeric'
                  onChange={(event) => field.onChange(formatCPF(event.target.value))}
                />
              </FormControl>
              <FormMessage className='px-0.5 text-start' />
            </FormItem>
          )}
        />
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
          name='phone'
          control={form.control}
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormControl>
                <Input
                  {...field}
                  maxLength={15}
                  inputMode='numeric'
                  placeholder='Telefone'
                  onChange={(event) => field.onChange(formatPhoneNumber(event.target.value))}
                />
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
        <FormField
          name='confirmPassword'
          control={form.control}
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormControl>
                <Input {...field} placeholder='Confirmar Senha' type='password' />
              </FormControl>
              <FormMessage className='px-0.5 text-start' />
            </FormItem>
          )}
        />
        <Button type='submit' className='mt-4 w-full font-medium'>
          Criar Conta
        </Button>
      </form>
    </Form>
  );
};

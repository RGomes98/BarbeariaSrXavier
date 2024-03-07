'use client';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { LoginSchema } from '@/lib/schemas';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { login } from '@/services/LoginService';
import { redirect } from 'next/dist/server/api-utils';
import { getHairCut, getHairCuts } from '@/services/GetHairCuts';
import { getBarber, getBarbers } from '@/services/getBarbers';
import { createAppointment } from '@/services/CreateAppointment';
import { PayType } from '@/models/Appointment';
import { AccountType } from '@/models/UserData';
import {createPaymentLink, requestPaymentLink } from '@/services/CreatePaymentLink';

export const LoginForm = () => {
    const form = useForm<LoginSchema>({
      resolver: zodResolver(LoginSchema),
      defaultValues: { email: '', password: '' },
    });

   async function onSubmit(values: LoginSchema) {

    //  const userData = await login(values.email, values.password);
    //  if(userData !== undefined) {
    //   //logado
      
    //  }else{
    //   //problema pra fazer login
    //  }
    const data = await createPaymentLink(PayType.PIX, 100.00);
    console.log(data);
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

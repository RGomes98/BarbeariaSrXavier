'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { users } from '@/mock/users';
import {login as loginFirebase} from "../services/LoginService";
import { ref, set } from "firebase/database";
import createDataOnFirebase from '@/services/CreateDataOnFirebase';


export const login = (formData: FormData) => {
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
//  const user = users.find((user) => user.email === email && user.password === password);

const user = loginFirebase(email, password);



  if (user !== undefined) {

    const userCreated = createDataOnFirebase(user);

    if (userCreated !== undefined) {
      redirect('/');
    }

    //const oneDay = 24 * 60 * 60 * 1000;

    //com firebase só chamar o auth.currentUser se for null é pq não está logado

    // cookies().set({
    //   httpOnly: true,
    //   name: 'session',
    //   expires: Date.now() + oneDay,
    //   value: JSON.stringify({ id: user.cpf, name: user.name, role: user.role }),
    // });

  }
};

export const logout = () => {
  cookies().delete({ name: 'session' });
  redirect('/');
};

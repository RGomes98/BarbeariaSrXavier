import { firestore } from '../firebaseConfig/firebase';
import type { UserCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { AccountType } from '@/models/UserData';
import { Register } from '@/lib/schemas';

export const createUserAccount = (registerData: Register, userCredentials: UserCredential) => {
  //temos que criptografar o cpf, telefone e email do cara no banco de dados, pq se alguem roubar o banco de dados, ele vai ter acesso a esses dados

  //fazer pelo servidor

  try {
    setDoc(doc(firestore, 'users', userCredentials.user.uid), {
      createdAt: new Date(),
      cpf: registerData.cpf,
      name: registerData.name,
      email: registerData.email,
      id: userCredentials.user.uid,
      cellphone: registerData.phone,
      accountType: AccountType.USER,
    });

    return { status: 'success', message: 'Conta criada com sucesso!' } as const;
  } catch (error) {
    if (error instanceof Error) return { status: 'error', message: error.message } as const;
    throw error;
  }
};

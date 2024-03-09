import { collection, getDocs, query, where } from 'firebase/firestore';
import { initApp } from '@/firebaseConfig/firebase-admin-config';
import { firestore } from '@/firebaseConfig/firebase';
import { UserSchema } from '@/lib/schemas';

initApp();

export const GetUserById = async (id: string) => {
  try {
    const userQuery = await getDocs(query(collection(firestore, 'users'), where('id', '==', id)));
    if (userQuery.empty) throw new Error();

    const user = userQuery.docs[0];
    const parsedData = UserSchema.safeParse(user.data());
    if (!parsedData.success) throw new Error();

    return { data: parsedData.data, status: 200 } as const;
  } catch (error) {
    if (error instanceof Error) return { data: undefined, status: 500 } as const;
    throw error;
  }
};

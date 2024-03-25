import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '@/firebaseConfig/firebase';
import { UserSchema } from '@/lib/schemas';

export const GetUserByIdClient = async (id: string) => {
  const userQuery = await getDocs(query(collection(firestore, 'users'), where('id', '==', id)));
  const user = UserSchema.safeParse(userQuery.docs[0].data());
  if (!user.success) throw new Error('invalid user data structure');
  return user.data;
};

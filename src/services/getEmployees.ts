import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebaseConfig/firebase';
import { UsersSchema } from '@/lib/schemas';

export const getEmployees = async () => {
  const q = query(collection(firestore, 'users'), where('accountType', '==', 'EMPLOYEE'));
  const employees = UsersSchema.safeParse((await getDocs(q)).docs.map((doc) => doc.data()));
  if (!employees.success || !employees.data.length) return [];
  return employees.data;
};

export const getBarber = async (id: Number) => {
  const q = query(
    collection(firestore, 'users'),
    where('accountType', '==', 'EMPLOYEE'),
    where('id', '==', id),
  );

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    return { id: doc.id, ...data };
  } else {
    console.log('No such document!');
  }
};

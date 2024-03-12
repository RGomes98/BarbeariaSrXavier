import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebaseConfig/firebase';
import { AccountType } from '@/models/UserData';
import { TestSchema } from '@/lib/schemas';

export const getBarbers = async () => {
  const q = query(collection(firestore, 'users'), where('accountType', '==', AccountType.BARBER));
  const barbers = TestSchema.safeParse((await getDocs(q)).docs.map((doc) => doc.data()));
  if (!barbers.success || !barbers.data.length) return [];
  return barbers.data;
};

export const getBarber = async (id: Number) => {
  const q = query(
    collection(firestore, 'users'),
    where('accountType', '==', AccountType.BARBER),
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

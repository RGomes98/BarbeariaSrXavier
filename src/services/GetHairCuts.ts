import { collection, getDocs, query, where } from 'firebase/firestore';
import { HaircutSchema, HaircutsSchema } from '@/lib/schemas';
import { firestore } from '../firebaseConfig/firebase';
import { redirect } from 'next/navigation';

export const getHaircuts = async () => {
  const docSnap = await getDocs(collection(firestore, 'haircuts'));
  const haircuts = HaircutsSchema.safeParse(docSnap.docs.map((doc) => doc.data()));

  if (!haircuts.success) throw new Error('invalid haircuts data structure');
  return haircuts.data;
};

export const getHaircut = async (id: number) => {
  try {
    const q = query(collection(firestore, 'haircuts'), where('id', '==', id));
    const haircut = HaircutSchema.parse((await getDocs(q)).docs[0]?.data());

    return haircut;
  } catch (error) {
    redirect('/');
  }
};

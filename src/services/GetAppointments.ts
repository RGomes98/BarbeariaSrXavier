import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '@/firebaseConfig/firebase';
import { AppointmentsSchema } from '@/lib/schemas';

export const getAppoiments = async () => {
  const docSnap = await getDocs(collection(firestore, 'appointments'));
  const appointments = AppointmentsSchema.safeParse(docSnap.docs.map((data) => data.data()));
  if (!appointments.success) throw new Error('invalid appointments data structure');
  return appointments.data;
};

export const getAppoiment = async (id: string) => {
  const q = query(collection(firestore, 'appointments'), where('id', '==', id));

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    };
  } else {
    console.log('No such document!');
  }
};

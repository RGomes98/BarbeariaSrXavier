import { collection, query, where, getDocs } from 'firebase/firestore';
import { AppointmentSchema, AppointmentsSchema } from '@/lib/schemas';
import { firestore } from '@/firebaseConfig/firebase';

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

export const getAppoimentWithCallback = async (id: string, callback: () => void) => {
  try {
    const q = query(collection(firestore, 'appointments'), where('id', '==', id));
    const querySnapshot = await getDocs(q);

    return AppointmentSchema.parse(querySnapshot.docs[0].data());
  } catch (error) {
    callback();
  }
};

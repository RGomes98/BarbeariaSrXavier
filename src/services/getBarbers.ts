import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebaseConfig/firebase';
import { AccountType } from '@/models/UserData';
import { UserData } from '@/models/UserData';

const convertDocsToModel = (docs: any[]) => {
  return docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
    } as UserData;
  });
};

export const getBarbers = async () => {
  const q = query(collection(firestore, 'users'), where('accountType', '==', AccountType.BARBER));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.size > 0) {
    console.log('Document data:', querySnapshot.docs.map((doc) => doc.data()));
    return convertDocsToModel(querySnapshot.docs);
  } else {
    console.log('No such document!');
    return [];
  }
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

import { initApp } from '@/firebaseConfig/firebase-admin-config';
import { firestore } from 'firebase-admin';
import { Haircut } from '@/lib/schemas';

initApp();

export const updateHaircut = async (haircutId: string, updatedHaircut: Haircut): Promise<void> => {
  const collectionRef = firestore().collection('haircuts');
  const docRef = collectionRef.doc(haircutId);

  const snapshot = await docRef.get();
  if (snapshot.exists) {
    await docRef.update(updatedHaircut);
    console.log('Haircut updated successfully!');
  } else {
    console.log('Haircut not found!');
  }
};

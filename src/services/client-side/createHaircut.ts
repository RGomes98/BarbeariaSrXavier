import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig/firebase';
import { type UserCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Haircut } from '@/lib/schemas';

export const uploadHaircutImage = async (file: File): Promise<string> => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, file.name);

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    if (!(error instanceof Error)) throw error;
    throw new Error(`Failed to upload photo: ${error.message}`);
  }
};

export const getLastHaircutIndex = async () => {
  try {
    const haircutsRef = collection(firestore, 'haircuts');
    const haircutsQuery = query(haircutsRef, orderBy('id', 'desc'), limit(1));
    const haircutsSnapshot = await getDocs(haircutsQuery);

    if (haircutsSnapshot.empty) return 0;
    const maxId = haircutsSnapshot.docs[0].data().id;

    return maxId;
  } catch (error) {
    if (!(error instanceof Error)) throw error;
    throw new Error(`Failed to get max haircut id: ${error.message}`);
  }
};

export const createHaircut = async (haircut: Haircut, userCredentials: UserCredential, files: File[]) => {
  try {
    let idNum = (await getLastHaircutIndex()) + 1;
    let photoUri: string[] = [];

    files.forEach(async (file) => photoUri.push(await uploadHaircutImage(file)));
    await setDoc(doc(firestore, 'users', userCredentials.user.uid), {
      id: idNum,
      name: haircut.name,
      price: haircut.price,
      description: haircut.description,
      photoUri: photoUri,
    });

    return { status: 'success', message: 'Corte criado com sucesso!' } as const;
  } catch (error) {
    if (!(error instanceof Error)) throw error;
    return { status: 'error', message: error.message } as const;
  }
};

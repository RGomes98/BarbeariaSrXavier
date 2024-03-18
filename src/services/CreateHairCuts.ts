import { createUserWithEmailAndPassword, type UserCredential } from 'firebase/auth';
import { auth, firestore } from '../firebaseConfig/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Haircut, Register } from '@/lib/schemas';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';



export const createHairCuts = async (haircut: Haircut, userCredentials: UserCredential, files : File[]) => {
   let idNum = await getMaxHaircutId();
   idNum = idNum + 1;

   let photoUri: string[] = [];
   files.forEach(async (file) => {
        photoUri.push(await uploadPhoto(file));
   });

  try {
    await setDoc(doc(firestore, 'users', userCredentials.user.uid), {
      id: idNum,
      name: haircut.name,
      price: haircut.price,
      description: haircut.description,
      photoUri: photoUri,
    });

    return { status: 'success', message: 'Corte criado com sucesso!' } as const;
  } catch (error) {
    if (error instanceof Error) return { status: 'error', message: error.message } as const;
    throw error;
  }
};


export const uploadPhoto = async (file: File): Promise<string> => {
    try {
        const storage = getStorage();
        const storageRef = ref(storage, file.name);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to upload photo: ${error.message}`);
        }
        throw error;
    }
};


export const getMaxHaircutId = async () => {
    try {
        const haircutsRef = collection(firestore, 'haircuts');
        const haircutsQuery = query(haircutsRef, orderBy('id', 'desc'), limit(1));
        const haircutsSnapshot = await getDocs(haircutsQuery);

        if (haircutsSnapshot.empty) {
            return 0;
        }

        const maxId = haircutsSnapshot.docs[0].data().id;
        return maxId;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to get max haircut id: ${error.message}`);
        }
        throw error;
    }
};

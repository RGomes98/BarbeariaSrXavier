import { firestore } from 'firebase-admin';

async function updateHaircuts(haircutId: string, updatedHaircut: any): Promise<void> {
    const collectionRef = firestore().collection('haircuts');
    
    const docRef = collectionRef.doc(haircutId);

    const snapshot = await docRef.get();
    if (snapshot.exists) {
        await docRef.update(updatedHaircut);
        console.log('Haircut updated successfully!');
    } else {
        console.log('Haircut not found!');
    }
}


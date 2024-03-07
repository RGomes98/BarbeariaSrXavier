import { collection, addDoc, query, where, getDocs } from "firebase/firestore";


import { Appointment } from '@/models/Appointment'; // Import the Appoiment type
import { firestore } from "@/firebaseConfig/firebase";





const convertDocsToModel = (docs: any[]) => {
  return docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data
    } as Appointment;
  });
};


export const getAppoiments = async() => {

  const docSnap = await getDocs(collection(firestore, "appointments"));
    
  if (docSnap.size > 0) {
    console.log(docSnap.docs[0].data());
    return convertDocsToModel(docSnap.docs);
  } else {
    console.log("No such document!");
  }      
       
  };



  export const getAppoiment = async(id : string) => {
    const q = query(collection(firestore, "appointments"), where("id", "==", id));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        ...data
      } as Appointment;
    } else {
      console.log("No such document!");
    }
  };


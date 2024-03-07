import { redirect } from 'next/navigation';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, doc, getDocs, query, where } from "firebase/firestore";

import { getDatabase, ref, child, get } from "firebase/database";

import {auth, database, firestore} from '../firebaseConfig/firebase';
import { AccountType } from '@/models/UserData';

import firebase from 'firebase/app';
import { UserData } from '@/models/UserData';
import { HairCut } from '@/models/HairCut';



  const convertDocsToModel = (docs: any[]) => {
    return docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data
      } as UserData;
    });
  };

  export const getBarbers = async() => {

    const q = query(collection(firestore, "users"), where("accountType", "==", AccountType.BARBER));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      return convertDocsToModel(querySnapshot.docs);
    } else {
      console.log("No such document!");
    }
  };
  


export const getBarber = async(id : Number) => {
    const q = query(collection(firestore, "users"), where("accountType", "==", AccountType.BARBER), where("id", "==", id));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        return {
            id: doc.id,
            ...data
        } as HairCut;
    } else {
        console.log("No such document!");
    }
};
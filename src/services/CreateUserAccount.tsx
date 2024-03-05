import { redirect } from 'next/navigation';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { ref, set } from "firebase/database";

import {database} from '../../firebase';

import firebase from 'firebase/app';
import { UserData } from '@/models/UserData';

export const createUser = (userData : UserData, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, userData.email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        set(ref(database, 'users/' + user.uid), userData);
        redirect("/")
        
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
  };

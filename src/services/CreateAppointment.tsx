import { redirect } from 'next/navigation';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { ref, set } from "firebase/database";

import {database, firestore} from '../firebaseConfig/firebase';

import firebase from 'firebase/app';
import { UserData } from '@/models/UserData';
import { Appointment, PayType } from '../models/Appointment';
import { HairCut } from '../models/HairCut';

export const createAppointment = async(barber: UserData, hairCut : HairCut, currentUser: UserData, payType: PayType) => {
    const auth = getAuth();

    let appointment : Appointment

    appointment = {
        id: crypto.randomUUID(),
        barber: barber, 
        date: new Date(),
        haircut : hairCut,
        price: hairCut.price,
        user : currentUser,
        ispaid: false,
        payType: payType
    }

        addDoc(collection(firestore, "appointments"), appointment);
  };

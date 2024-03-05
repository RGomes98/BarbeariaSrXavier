import { redirect } from 'next/navigation';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { ref, set } from "firebase/database";

import {database} from '../../firebase';

import firebase from 'firebase/app';
import { UserData } from '@/models/UserData';
import { Appointment, PayType } from '@/models/appointment';
import { HairCut } from '@/models/hairCut';

export const createUser = (barber: UserData, hairCut : HairCut, currentUser: UserData, payType: PayType) => {
    const auth = getAuth();
    const user = auth.currentUser

    let appointment : Appointment

    appointment = {
        id: "randomn",
        barber: barber, 
        date: "getdata",
        haircut : hairCut,
        price: hairCut.price,
        user : currentUser,
        ispaid: "logica de pagamento, exceto se for dinheiro ai paga na hr",
        payType: payType
    }

    set(ref(database, 'appointment/' + barber.id), appointment);

  };

import { Appointment, PayType } from '../models/Appointment';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig/firebase';
import { UserData } from '@/models/UserData';
import { HairCut } from '../models/HairCut';

export const createAppointment = async (
  barber: UserData,
  hairCut: HairCut,
  currentUser: UserData,
  payType: PayType,
) => {
  let appointment: Appointment;

  appointment = {
    id: crypto.randomUUID(),
    barber: barber,
    date: new Date(),
    haircut: hairCut,
    price: hairCut.price,
    user: currentUser,
    ispaid: false,
    payType: payType,
  };

  addDoc(collection(firestore, 'appointments'), appointment);
};

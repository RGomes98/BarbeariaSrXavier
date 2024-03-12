import { Appointment, PayType } from '../models/Appointment';
import { collection, addDoc, setDoc, doc, updateDoc, FieldValue, arrayUnion } from 'firebase/firestore';
import { firestore } from '../firebaseConfig/firebase';
import { AccountType, UserData } from '@/models/UserData';
import { HairCut } from '../models/HairCut';
import { Employee } from '@/mock/users';

export const createAppointment = async (
  barber: Employee | undefined,
  hairCut: HairCut,
  currentUser: UserData,
  payType: PayType,
  scheduleHour: Date,
) => {
  let appointment: Appointment;

  // arrumar o barber e o id para random
  appointment = {
    id: "123",
    barber: {cpf: "123", name: "123", role: "EMPLOYEE", schedules: [], email: "123", password: "123", phone: "fasfas"},
    date: scheduleHour,
    haircut: hairCut,
    price: hairCut.price,
    user: currentUser,
    ispaid: false,
    payType: payType,
  };

  console.log(appointment);

  // mudar essa id ("Tjs7y8WFvHOF7vzsLKs30XOFHDb2") para dinamico currentUser.id
  updateDoc(doc(firestore, 'users',"Tjs7y8WFvHOF7vzsLKs30XOFHDb2"), {
    schedules: arrayUnion(appointment),
  }).then(() => {
    console.log('Document successfully written!');
  
  }).catch((error) => {
    console.error('Error writing document: ', error);
  });


 // addDoc(collection(firestore, 'appointments'), appointment);
};

import { redirect } from 'next/navigation';
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { collection, addDoc, doc, setDoc  } from "firebase/firestore";

import {app, auth, database, firestore} from '../firebaseConfig/firebase';

import firebase from 'firebase/app';
import { AccountType, UserData } from '@/models/UserData';
import { RegisterSchema } from '@/lib/schemas';

export  const createUser = async (values: RegisterSchema) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
    .then((userCredential) => {

        //temos que criptografar o cpf, telefone e email do cara no banco de dados, pq se alguem roubar o banco de dados, ele vai ter acesso a esses dados
        const userData: UserData = {
            cpf: values.cpf,
            name: values.name,
            cellphone: values.phone,
            email: values.email,
            accountType: AccountType.USER,
            createdAt: new Date(),
            id: userCredential.user.uid,
        };   

        // salvando dados do user no firebase para podermos pegar de volta. Podemos salvar no localstorage tbm para conseguir puxar isso locamente se o cara tiver logado... Depois que o cara faz cadastro ou login
        // tem q ser direcionado para a home, pq com os dois meios ele faz login
        setDoc(doc(firestore, "users", userData.id), userData);
        return userData
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
  };


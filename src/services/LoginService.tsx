import { redirect } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export const login = (email: string, password :string) => {

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        redirect("/")


    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
  };
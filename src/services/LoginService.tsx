import { redirect } from 'next/navigation';
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from '../firebaseConfig/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { UserData } from '@/models/UserData';


export const login = (email: string, password :string) => {

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        getdatafromfirebase(userCredential.user);

        return userCredential.user      
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
  };

  const getdatafromfirebase = async (user: User) => {
    const docRef = doc(firestore, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        
        const userData = docSnap.data();
        
        //temos que criptografar o cpf, telefone e email do cara no banco de dados, pq se alguem roubar o banco de dados, ele vai ter acesso a esses dados
        const currentUser: UserData = {
            cpf: userData?.cpf,
            name: userData?.name,
            cellphone: userData?.cellphone,
            email: userData?.email,
            accountType: userData?.accountType,
            createdAt: userData?.createdAt,
            id: userData?.id,
        };    

        console.log("Document data:", currentUser);

        
        // salvando dados do user no firebase para podermos pegar de volta. Podemos salvar no localstorage tbm para conseguir puxar isso locamente se o cara tiver logado... Depois que o cara faz cadastro ou login
        // tem q ser direcionado para a home, pq com os dois meios ele faz login
        localStorage.setItem('database', JSON.stringify(currentUser));
    } else {
        console.log("No such document!");
    }
  }
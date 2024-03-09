import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig/firebase';
import { Login } from '@/lib/schemas';

export const SignIn = async ({ formData, onSuccess }: { formData: Login; onSuccess: () => void }) => {
  try {
    const session = await signInWithEmailAndPassword(auth, formData.email, formData.password);
    const response = await fetch('/api/signIn', {
      method: 'POST',
      headers: { Authorization: `Bearer ${await session.user.getIdToken()}` },
    });

    if (response.status != 200) return; //Server Error
    onSuccess(); //Login Redirect
  } catch (error) {
    if (error instanceof Error) return; //Toast wrong credentials
    throw error;
  }
};

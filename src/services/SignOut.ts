import { auth } from '@/firebaseConfig/firebase';
import { signOut } from 'firebase/auth';

export const SignOut = async (onSuccess: () => void) => {
  await signOut(auth);
  const response = await fetch('/api/signOut', { method: 'POST' });
  if (response.status != 200) return; //Server Error
  onSuccess(); //Logout Refresh
};

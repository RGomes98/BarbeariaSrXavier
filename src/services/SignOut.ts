import { auth } from '@/firebaseConfig/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'sonner';

export const SignOut = async (onSuccess: () => void) => {
  await signOut(auth);
  const response = await fetch('/api/signOut', { method: 'POST' });
  if (response.status != 200) return toast.error('Ocorreu um erro durante o encerramento da sessão.');
  onSuccess();
};

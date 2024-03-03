import { login } from '@/server-actions/session-action';

export default function Page() {
  return (
    <form action={login}>
      <h2>Entrar</h2>
      <input name='email' type='email' placeholder='email' />
      <input name='password' type='password' placeholder='senha' />
      <button type='submit'>Entrar</button>
    </form>
  );
}

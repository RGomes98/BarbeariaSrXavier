import { Dashboard } from '@/components/Dashboard';
import { getSession } from '@/helpers/getSession';

export default async function Page() {
  const session = await getSession();
  return <Dashboard session={session} />;
}

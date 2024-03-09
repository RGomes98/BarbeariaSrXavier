import { ReceivedSchedules } from '@/components/ReceivedSchedules';
import { getSession } from '@/helpers/getSession';

export default async function Page() {
  const session = await getSession();
  return <ReceivedSchedules session={session} />;
}

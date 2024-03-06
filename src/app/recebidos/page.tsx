import { ReceivedSchedules } from '@/components/ReceivedSchedules';
import { getSession } from '@/helpers/getSession';

export default function Page() {
  const session = getSession();
  return <ReceivedSchedules session={session} />;
}

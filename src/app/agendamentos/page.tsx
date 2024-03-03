import { Schedules } from '@/components/Schedules/Schedules';
import { getSession } from '@/helpers/getSession';

export default function Page() {
  const session = getSession();
  return <Schedules session={session} />;
}

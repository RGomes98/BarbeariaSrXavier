import { Schedules } from '@/components/Schedules';
import { getSession } from '@/helpers/getSession';

export default async function Page() {
  const session = await getSession();
  return <Schedules session={session} />;
}

import StayUpdates from '@/components/stay-updates';
import {getStayById} from '@/lib/db/controller/Stay';
import {getUserByClerkId} from '@/lib/db/controller/User';
import {currentUser} from '@clerk/nextjs';
import {notFound} from 'next/navigation';

export default async function Page({params}: {params: {stayId: string}}) {
  const {stayId} = params;
  let stay = await getStayById(stayId);

  const clerkUser = await currentUser();
  if (!clerkUser) {
    return notFound();
  }
  const user = await getUserByClerkId(clerkUser.id);

  if (!stay || !user || !user._id) {
    return notFound();
  }

  stay = JSON.parse(JSON.stringify(stay));
  const stayUpdates = stay?.updates || [];

  return (
    <div className="w-full">
      <StayUpdates
        stayId={stayId}
        updates={stayUpdates}
        role={user.role || ''}
      />
    </div>
  );
}

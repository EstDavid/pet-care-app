import OwnerUpdates from '@/components/owner-updates';
import { currentUser } from '@clerk/nextjs';
import { getStaysByUser } from '@/lib/db/controller/Stay';
import { getUserByClerkId, getUserById } from '@/lib/db/controller/User';
import { notFound } from 'next/navigation';

export default async function Updates() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  const user = await getUserByClerkId(clerkUser.id);

  if (!user || !user._id) {
    return notFound();
  }

  const stays = await getStaysByUser(user?._id, new Date());
  console.log(stays);

  return <OwnerUpdates />;
}

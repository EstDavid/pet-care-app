import OwnerUpdates from '@/components/owner-updates';
import { currentUser } from '@clerk/nextjs';
import { getStaysByClerkUser } from '@/lib/db/controller/Stay';

export default async function Updates() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return null;
  }

  const stays = await getStaysByClerkUser(clerkUser.id);
  console.log(stays);

  if (clerkUser) {
    const stays = await getStaysByClerkUser(clerkUser.id);
  }
  // stays.forEach((stay) => {
  // console.log(stays);
  // });
  return <OwnerUpdates />;
}

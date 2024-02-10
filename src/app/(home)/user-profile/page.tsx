'use server';
import UserProfile from '@/components/user-profile';
import { getUserByClerkId } from '@/lib/db/controller/User';
import { notFound } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';
import Subheader from '@/components/navigation/subheader';
import CustomSignoutButton from '@/components/navigation/signout-button';

export default async function Page() {
  const clerkUser = await currentUser();
  const clerkUserId = clerkUser?.id;
  const rawUserData = await getUserByClerkId(clerkUserId || '');
  // serializing the user object to avoid circular structure error
  const user = JSON.parse(JSON.stringify(rawUserData));
  // const router = useRouter();

  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Subheader title="Manage profile">
        <CustomSignoutButton />
      </Subheader>
      <div className="mt-subheader-height">
        <UserProfile user={user} />
      </div>
      <div className="flex m-4 w-full"></div>
    </div>
  );
}

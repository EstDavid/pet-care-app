import UserProfile from '@/components/user-profile';
import { getUserByClerkId } from '@/lib/db/controller/User';
import { notFound } from 'next/navigation';
import { SignOutButton, currentUser } from '@clerk/nextjs';
import { PiSignOut } from 'react-icons/pi';
import Subheader from '@/components/navigation/subheader';

export default async function Page() {
  const clerkUser = await currentUser();
  const clerkUserId = clerkUser?.id;
  const rawUserData = await getUserByClerkId(clerkUserId || '');
  // serializing the user object to avoid circular structure error
  const user = JSON.parse(JSON.stringify(rawUserData));

  if (!user) {
    notFound();
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <Subheader title="Manage profile">
        <SignOutButton>
          <div className=" 0 border-brand-cta-950 border-2 w-full h-full flex justify-end px-3 py-2 rounded-md cursor-pointer">
            <div className="h-full w-full flex justify-end items-center gap-3 text-brand-cta-950">
              <p className="text-xl">Signout</p>
              <PiSignOut size="2em" />
            </div>
          </div>
        </SignOutButton>
      </Subheader>
      <div className="mt-subheader-height">
        <UserProfile user={user} />
      </div>
      <div className="flex m-4 w-full"></div>
    </div>
  );
}

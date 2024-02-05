import UserProfile from '@/components/user-profile';
import {getUserByClerkId} from '@/lib/db/controller/User';
import {notFound} from 'next/navigation';
import {currentUser} from '@clerk/nextjs';
import {SignOutButton} from '@clerk/nextjs';
import {Button} from '@/components/ui/button';

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
      <h1 className="text-2xl font-semibold text pb-2">Your profile</h1>
      <UserProfile user={user} />
      <div>
        <SignOutButton>
          <Button variant="destructive">Sign out</Button>
        </SignOutButton>
      </div>
    </div>
  );
}

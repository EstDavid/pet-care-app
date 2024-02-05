// import {notFound} from 'next/navigation';
// import {currentUser} from '@clerk/nextjs';
// import {checkUserRole} from '@/lib/db/controller/User';
// import UserForm from '@/components/user-form';

// export default async function Page() {
//   // get the current user and their role
//   const clerkUser = await currentUser();
//   const clerkUserId = clerkUser?.id;
//   const role = await checkUserRole(clerkUserId || '');

//   if (!clerkUser) {
//     notFound();
//   }
//   return (
//     <div className="flex flex-col items-center gap-4">
//       <h1 className="text-2xl font-semibold text pb-2">Your profile</h1>
//       <UserForm role={role || ''} />
//     </div>
//   );
// }

import UserProfile from '@/components/user-profile';
import {getUserByClerkId} from '@/lib/db/controller/User';
import {notFound} from 'next/navigation';
import {currentUser} from '@clerk/nextjs';

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
    </div>
  );
}

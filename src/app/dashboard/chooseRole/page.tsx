import { Button } from '@/components/ui/button';
import { currentUser, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { createUserByClerkId, getUserByClerkId } from '@/lib/db/controller/User';
import RoleButtons from './RoleButtons';
import { modifyUser } from '@/lib/db/controller/User';

const setRole = async function (role: string) {
  'use server'
  const user = await currentUser();
  if (user && user.id) modifyUser(user?.id, {role})

  // console.log(role);
  redirect('/dashboard')
}

export default async function ChooseRole() {
  const user = await currentUser();
  let dbUser;
  if (user) dbUser = await getUserByClerkId(user?.id)

  if (!dbUser && user && user.firstName && user.lastName) {
    const newUser = {
      clerkID: user.id,
      firstname: user.firstName,
      surname: user.lastName,
    };
    let result = await createUserByClerkId(newUser);
  }

  return (
    <div>
      <div className='flex flex-col gap-10 w-full items-center'>
        <h1>Hello {user?.firstName}! Are you an owner or a pet sitter?</h1>
        <RoleButtons setRole={setRole}></RoleButtons>
        <UserButton></UserButton>
      </div>
    </div>
  );
}
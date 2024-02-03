'use server';
import { currentUser, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import {
  createUserByClerkId,
  getUserByClerkId
} from '@/lib/db/controller/User';
import RoleButton from './RoleButton';
import selectRoleAction from '@/lib/actions/select-role';
import logo from '@/../public/logo.png';
import photoOwner from '@/../public/owner-photo.jpg';
import photoSitter from '@/../public/sitter-photo.jpg';
import Image from 'next/image';

export default async function ChooseRole() {
  const user = await currentUser();

  let dbUser;
  if (user) dbUser = await getUserByClerkId(user?.id);

  if (!dbUser && user && user.firstName && user.lastName) {
    const newUser = {
      clerkID: user.id,
      firstname: user.firstName,
      surname: user.lastName
    };
    let result = await createUserByClerkId(newUser);
  }

  if (!user?.id) {
    redirect('/');
  }

  const selectOwner = selectRoleAction.bind(null, user.id, 'owner');
  const selectSitter = selectRoleAction.bind(null, user.id, 'sitter');

  return (
    <div className="bg-brand-bg w-screen h-screen p-8">
      <div className="flex flex-col h-full gap-10 items-center justify-center">
        <Image
          className="px-8 mb-8 w-full sm:max-w-[480px]"
          alt="CADO logo"
          src={logo}
          priority={true}
        ></Image>
        <h1 className="text-brand-fg-100 bg-brand-bg-600 text-2xl font-bold text-center py-5 rounded-xl">
          Hello {user?.firstName}! Are you an owner or a pet sitter?
        </h1>
        <div className="w-full flex gap-4">
          <form action={selectOwner}>
            <RoleButton title="Owner" photo={photoOwner} />
          </form>
          <form action={selectSitter}>
            <RoleButton title="Sitter" photo={photoSitter} />
          </form>
        </div>
        {/* <UserButton></UserButton> */}
      </div>
    </div>
  );
}

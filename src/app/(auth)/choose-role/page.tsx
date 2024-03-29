import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import {
  createUserByClerkId,
  getUserByClerkId
} from '@/lib/db/controller/User';
import RoleButton from '../../../components/role-button';
import selectRoleAction from '@/lib/actions/select-role-actions';
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
  } else if (dbUser && dbUser.role) {
    redirect(`/${dbUser.role}/dashboard`);
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
        <div className="w-full text-brand-fg-50 bg-brand-bg-300 text-2xl font-bold text-center py-3 shadow-lg rounded-md leading-loose">
          <h1>Hello {user?.firstName}!</h1>
          <h1>Choose a role</h1>
        </div>
        <div className="w-full flex gap-4">
          <form action={selectOwner}>
            <RoleButton title="Owner" photo={photoOwner} />
          </form>
          <form action={selectSitter}>
            <RoleButton title="Sitter" photo={photoSitter} />
          </form>
        </div>
      </div>
    </div>
  );
}

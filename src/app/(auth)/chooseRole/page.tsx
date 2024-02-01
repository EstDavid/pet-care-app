import { Button } from '@/components/ui/button';
import { currentUser, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { createUserByClerkId } from '@/lib/db/controller/User';

export default async function ChooseRole() {
  const user = await currentUser();
  const authenticationObject = auth();
  console.log(user);
  console.log(authenticationObject);

  if (user?.firstName && user.lastName) {
    const newUser = {
      clerkID: user.id,
      firstname: user.firstName,
      surname: user.lastName,
    };
    let result = await createUserByClerkId(newUser);
  }

  // const match = await // find user in db
  // where clerkId = user.id as string

  // if (!match) {
  // await // create user in db
  // {data: {
  //   clerkId: user.id,
  //   email: user.email,
  // }}
  // }

  // redirect('/dashboard');

  return (
    <div>
      <h1>Hello {user?.firstName}</h1>
      <Button>Owner</Button>
      <Button>Sitter</Button>
    </div>
  );
}

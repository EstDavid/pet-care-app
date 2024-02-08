'use server';
import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import { getStaysByClerkUser } from '@/lib/db/controller/Stay';
import StayCard from '@/components/sitter/stay-card';
import { getUserByClerkId } from '@/lib/db/controller/User';
import Link from 'next/link';
import { Button } from 'react-day-picker';
// import {getStay}

export default async function Page() {
  const clerkUser = (await currentUser()) as User;
  const user = await getUserByClerkId(clerkUser.id);
  if (!user)
    throw new Error('typescript needs to be fussed over like an auntie');
  let stays = await getStaysByClerkUser(clerkUser.id);
  stays = JSON.parse(JSON.stringify(stays));

  return (
    <>
      <div className="flex gap-5 flex-col">
        {stays?.map((stay) => {
          return (
            <StayCard
              stay={stay}
              role={user.role || 'sitter'}
              key={stay._id.toString()}
            >
              <Link href={`/stays/${stay._id}`} className="w-full">
                <Button className="w-full">View Stay</Button>
              </Link>
            </StayCard>
          );
        })}
      </div>
    </>
  );
}

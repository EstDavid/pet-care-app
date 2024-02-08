'use server';
import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import { getStaysByClerkUser } from '@/lib/db/controller/Stay';
import StayCard from '@/components/sitter/stay-card';
import { getUserByClerkId } from '@/lib/db/controller/User';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';

export default async function Page() {
  const clerkUser = (await currentUser()) as User;
  const user = await getUserByClerkId(clerkUser.id);
  if (!user || !user._id) {
    return notFound();
  }

  let stays = await getStaysByClerkUser(clerkUser.id);
  stays = JSON.parse(JSON.stringify(stays));

  return (
    <>
      <div className="flex gap-5 flex-col">
        {stays?.map((stay) => {
          if (user._id && user.role) {
            return (
              <StayCard
                stay={stay}
                userId={user._id.toString()}
                role={user.role || 'sitter'}
                key={stay._id.toString()}
              >
                <Link href={`/stays/${stay._id}`} className="w-full">
                  <Button className="w-full">View Stay</Button>
                </Link>
              </StayCard>
            );
          }
        })}
      </div>
    </>
  );
}

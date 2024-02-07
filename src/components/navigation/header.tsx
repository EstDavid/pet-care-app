'use server';
import logo from '@/../public/logo.png';
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';
import { getUserByClerkId } from '@/lib/db/controller/User';

export default async function Header() {
  const clerkUser = await currentUser();
  const clerkName = clerkUser?.firstName;
  const clerkImageUrl = clerkUser?.imageUrl;

  const dbUser = await getUserByClerkId(clerkUser?.id || '');
  const dbImageUrl = dbUser?.pfpUrl;

  // if there is no image in the db uploaded by user, use the clerk image
  let imageUrl;
  dbImageUrl ? (imageUrl = dbImageUrl) : (imageUrl = clerkImageUrl);

  return (
    <div className="w-screen h-header-nav bg-brand-bg flex">
      <div className="flex w-full gap-5 justify-between items-center px-4 py-2 container shadow-lg">
        <div className="flex-1 justify-start items-center">
          <Image
            alt="user photo"
            src={imageUrl || ''}
            width={0}
            height={0}
            sizes="100vh"
            className="w-header-photo h-header-photo object-cover rounded-full"
          ></Image>
        </div>
        <h1 className="text-brand-fg font-semibold flex-1 text-xl text-center">
          Hi {clerkName}!
        </h1>
        <div className="relative h-full flex-1 flex justify-end">
          <div className="relative aspect-square flex flex-col justify-center">
            <Image alt="CADO logo" src={logo}></Image>
          </div>
        </div>
      </div>
    </div>
  );
}

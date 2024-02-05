'use server';
import logo from '@/../public/logo.png';
import Image from 'next/image';
import {currentUser} from '@clerk/nextjs';
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
      <div className="flex w-full gap-5 justify-between items-center mt-4 px-4 py-2 container">
        <div className="h-full flex-1 flex justify-start">
          <div className="relative h-full aspect-square">
            <Image
              alt="user photo"
              src={imageUrl || ''}
              fill={true}
              sizes='100px'
              style={{
                objectFit: 'cover',
              }}
              className="rounded-full"
            ></Image>
          </div>
        </div>
        <h1 className="text-brand-fg text-2xl flex-1 text-center">
          Hi {clerkName}!
        </h1>
        <div className="relative h-full flex-1 flex justify-end">
          <div className="relative h-full aspect-square flex flex-col justify-center">
            <Image alt="CADO logo" src={logo}></Image>
          </div>
        </div>
      </div>
    </div>
  );
}

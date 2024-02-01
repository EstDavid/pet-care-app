'use server'
import logo from '@/../public/logo.png';
import userphoto from '@/../public/mock-user-photo.jpg';
import Image from 'next/image';
import { currentUser} from '@clerk/nextjs';

export default async function Header() {
  const user = await currentUser();
  const name = user?.firstName;
  return (
    <div className="w-screen h-header-nav bg-brand-bg flex">
      <div className="flex w-full gap-5 justify-between items-center mt-4 px-4 py-2 container">
        <div className="h-full flex-1 flex justify-start">
          <div className="relative h-full aspect-square">
            <Image
              alt="user photo"
              src={userphoto}
              layout="fill"
              className="rounded-full"
            ></Image>
          </div>
        </div>
        <h1 className="text-brand-fg text-2xl flex-1 text-center">Hi {name}!</h1>
        <div className="relative h-full flex-1 flex justify-end">
          <div className="relative h-full aspect-square flex flex-col justify-center">
            <Image alt="CADO logo" src={logo}></Image>
          </div>
        </div>
      </div>
    </div>
  );
}

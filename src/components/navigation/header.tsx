import logo from '@/../public/logo.png';
import user from '@/../public/mock-user-photo.jpg';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="w-screen h-header-nav bg-brand-bg flex">
      <div className="flex w-full gap-5 justify-between items-center mt-4 px-4 py-2 container">
        <div className="h-full flex-1">
          <div className="relative h-full aspect-square">
            <Image
              alt="user photo"
              src={user}
              layout="fill"
              className="rounded-full"
            ></Image>
          </div>
        </div>
        <h1 className="text-brand-fg text-2xl flex-1 text-center">Hi Sarah!</h1>
        <div className="relative h-full flex-1 flex justify-end">
          <Image
            alt="CADO logo"
            src={logo}
            objectFit="contain"
            className="h-full w-auto"
          ></Image>
        </div>
      </div>
    </div>
  );
}

import logo from '@/../public/logo.png';
import user from '@/../public/mock-user-photo.jpg';
import Image from 'next/image';

export default function Header() {
  return (
    <div className="w-screen h-header-nav bg-brand-bg flex">
      <div className="flex w-full gap-5 justify-between items-center px-8">
        <div className="relative">
          <Image
            alt="user photo"
            src={user}
            width="0"
            height="0"
            sizes="20vw"
            className="w-full h-auto rounded-lg"
          ></Image>
        </div>
        <h1 className="text-brand-fg text-2xl">Hi Sarah!</h1>
        <div className="relative">
          <Image
            alt="CADO logo"
            src={logo}
            width="0"
            height="0"
            sizes="20vw"
            className="w-full h-auto"
          ></Image>
        </div>
      </div>
    </div>
  );
}

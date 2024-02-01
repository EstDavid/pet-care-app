import Image from 'next/image';
import logo from '@/../public/logo.png';

export default function Loading() {
  return (
    <div className="bg-brand-bg h-screen flex flex-col justify-center items-center">
      <h1 className="text-brand-fg text-xl">Loading...</h1>
      <Image
        className="px-8 mb-8 max-w-[480px]"
        alt="CADO logo"
        src={logo}
        width={180}
        height={150}
      ></Image>
    </div>
  );
}

import Image from 'next/image';
import logo from '@/../public/logo.png';
import Link from 'next/link';
import { IoMdPaw } from 'react-icons/io';

export default function Home() {
  return (
    <section className="bg-brand-bg h-screen flex flex-col justify-center items-center">
      <Image
        className="px-8 mb-8 w-full sm:max-w-[480px]"
        alt="CADO logo"
        src={logo}
        priority={true}
      ></Image>
      <h1 className="text-brand-fg text-3xl">Welcome to CADO</h1>
      <Link className="text-brand-fg mt-3 text-2xl underline" href="/chooseRole">
        <div className="flex flex-col items-center">
          <IoMdPaw size="4em" />
          {'Tap here to begin'}
        </div>
      </Link>
    </section>
  );
}

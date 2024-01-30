import Image from 'next/image';
import logo from '@/../public/logo.png';

export default function Home() {
  return (
    <section className="bg-brand-bg h-screen flex flex-col justify-center items-center">
      <Image className=" px-8 mb-8" alt="CADO logo" src={logo}></Image>
      <h1 className="text-brand-fg text-3xl">Welcome to CADO</h1>
    </section>
  );
}

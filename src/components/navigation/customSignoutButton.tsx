'use client';
import { SignOutButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { PiSignOut } from 'react-icons/pi';

export default function CustomSignoutButton() {
  const router = useRouter();
  const handleSignout = () => {
    router.push('/');
  };

  return (
    <SignOutButton signOutCallback={() => handleSignout()}>
      <div className=" 0 border-brand-cta-950 border-2 w-full h-full flex justify-end px-3 py-2 rounded-md cursor-pointer">
        <div className="h-full w-full flex justify-end items-center gap-3 text-brand-cta-950">
          <p className="text-xl">Signout</p>
          <PiSignOut size="2em" />
        </div>
      </div>
    </SignOutButton>
  );
}

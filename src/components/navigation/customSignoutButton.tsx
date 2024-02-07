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
      <div className="border-brand-cta-950 border w-full h-full flex justify-end px-2 rounded-md cursor-pointer">
        <div className="h-full w-full flex justify-end items-center gap-2 text-brand-cta-950">
          <p className="text-sm">Signout</p>
          <PiSignOut size="1.1em" />
        </div>
      </div>
    </SignOutButton>
  );
}

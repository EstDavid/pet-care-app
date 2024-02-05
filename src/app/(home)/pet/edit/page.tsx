import PetForm from '@/components/pet-form';
import {getPetById} from '@/lib/db/controller/Pet';
import {notFound} from 'next/navigation';
import {currentUser} from '@clerk/nextjs';
import {checkUserRole} from '@/lib/db/controller/User';

export default async function Page() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center pb-5">Your pet</h1>

      <PetForm pet={{}} />
    </>
  );
}

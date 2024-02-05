import PetForm from '@/components/pet-form';
import {getPetById} from '@/lib/db/controller/Pet';
import {notFound} from 'next/navigation';
import {currentUser} from '@clerk/nextjs';
import {checkUserRole} from '@/lib/db/controller/User';

export default async function Page({params}: {params: {id: string}}) {
  // get the pet id from the url
  const petId = params?.id;
  let pet = {};
  if (petId) {
    const rawPetData = await getPetById(petId);
    // serializing the pet object to avoid circular structure error
    pet = JSON.parse(JSON.stringify(rawPetData));
    if (!pet) {
      notFound();
    }
  }
  return (
    <>
      <h1 className="text-2xl font-semibold text-center pb-5">Your pet</h1>

      <PetForm pet={pet} />
    </>
  );
}

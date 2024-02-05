import PetProfile from '@/components/pet-profile';
import {getPetById} from '@/lib/db/controller/Pet';
import {notFound} from 'next/navigation';
import {currentUser} from '@clerk/nextjs';
import {checkUserRole} from '@/lib/db/controller/User';

export default async function Page ({ params }: { params: { id: string } }) {
  // get the pet id from the url
  const petId = params.id;
  const rawPetData = await getPetById(petId);
  // serializing the pet object to avoid circular structure error
  const pet = JSON.parse(JSON.stringify(rawPetData));

  // get the current user and their role
  const clerkUser = await currentUser();
  const clerkUserId = clerkUser?.id;
  const role = await checkUserRole(clerkUserId || '');

  if (!pet) {
    notFound();
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-semibold text pb-2">Pet profile</h1>
      <PetProfile pet={pet} role={role || ''} />
    </div>
  );
}

import PetProfile from '@/components/pet-profile';
import {getPetById} from '@/lib/db/controller/Pet';
import {notFound} from 'next/navigation';

export default async function Page({params}: {params: {id: string}}) {

  const petId = params.id;
  const rawPetData = await getPetById(petId);

  // serializing the pet object to avoid circular structure error
  const pet = JSON.parse(JSON.stringify(rawPetData));

  if (!pet) {
    notFound();
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl text-brand-bg font-semibold text pb-5">
        Pet profile
      </h1>
      <PetProfile pet={pet} />
    </div>
  );
}

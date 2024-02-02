import PetProfile from '@/components/pet-profile';
import {getPetById} from '@/lib/db/controller/Pet';
import {notFound} from 'next/navigation';

// Dougal to check
export default async function Page({params}: {params: {id: string}}) {
  // console.log(params.id);

  const petId = params.id;
  const pet = await getPetById(petId);
  const petName = pet.name
  const petBreed = pet.breed
  if (!pet) {
    notFound();
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl text-brand-bg font-semibold text pb-5">
        Pet profile
      </h1>
      <PetProfile name={petName} breed={petBreed} age={pet.age}/>
    </div>
  );
}

import PetProfile from '@/components/pet-profile';
import {getPetById} from '@/lib/db/controller/Pet';
import {notFound} from 'next/navigation';

// Dougal to check
export default async function Page({params}: {params: {id: string}}) {
  // console.log(params.id);

  const petId = params.id;
  const pet = await getPetById(petId);
  const petProp = {
    name: pet?.name,
    age: pet?.age,
    breed: pet?.breed,
    url: pet?.pfpUrl
  }
  if (!pet) {
    notFound();
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl text-brand-bg font-semibold text pb-5">
        Pet profile
      </h1>
      <PetProfile pet={petProp}/>
      {/* <PetProfile pet={pet}/> */}
    </div>
  );
}

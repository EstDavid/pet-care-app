'use server';
import { auth } from '@clerk/nextjs';
import AccountReady from '@/components/dashboard-components/AccountReady';
import PetCard from '@/components/dashboard-components/PetCard';
import { getPetsOwnedByUser, getUserByClerkId } from '@/lib/db/controller/User';
import { getStaysForPet } from '@/lib/db/controller/Stay';
import dogDummyImg from '@/../public/dogDummy.png';
import catDummyImg from '@/../public/catDummy.png';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';
import Notifications from '@/components/dashboard-components/Notifications';

export default async function Page({ params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const user = await getUserByClerkId(userId);

  if (!user || !user._id) {
    return notFound();
  }

  const profileStatus =
    user.role &&
    user.firstname &&
    user.surname &&
    user.contact?.phone &&
    user.contact?.street &&
    user.contact?.city &&
    user.contact?.postcode &&
    user.contact?.country;
  const pets = (await getPetsOwnedByUser(userId)) || [];
  const petAdded = pets.length >= 1 ? true : false;

  let readyToUse = profileStatus && petAdded;

  // create a function that will Check if the pet is in a stay by calling the isPetInStay and passing the petId
  async function isInStay(petId: string) {
    const currentDateTime = new Date();
    const stays = (await getStaysForPet(petId)) || [];
    for (const stay of stays) {
      if (
        new Date(stay.from) <= currentDateTime &&
        new Date(stay.to) >= currentDateTime
      ) {
        return false;
      }
    }
    return true;
  }

  const percentage =
    profileStatus && petAdded ? 100 : profileStatus || petAdded ? 66 : 33;

  function handleNoPetImage(petType: string) {
    return petType === 'dog' ? dogDummyImg : catDummyImg;
  }

  return (
    <div className="flex flex-col gap-y-4 text-center">
      <Notifications user={user} />
      {!readyToUse ? (
        <AccountReady
          percentage={percentage}
          profileComplete={!!profileStatus}
        />
      ) : null}
      {pets.length > 0 && (
        <h3 className="text-left text-xl text-brand-bg-300 border-b-2 border-b-brand-bg-300">
          Your Pets
        </h3>
      )}
      {pets.map(async (pet) => (
        <PetCard
          key={pet._id?.toString() ?? ''}
          petId={pet._id?.toString() ?? ''}
          petName={pet.name ?? ''}
          petImage={
            (pet.pfpUrl?.toString() ||
              (await handleNoPetImage(pet.species?.toString() ?? ''))) as string
          }
          petIsHome={await isInStay(pet._id?.toString() ?? '')}
          petType={pet.species?.toString() ?? ''}
        />
      ))}
      <Link href="/pet/edit">
        <Button className="w-full">
          {pets.length > 0 ? 'Add another Pet' : 'Add your first Pet'}
        </Button>
      </Link>
    </div>
  );
}

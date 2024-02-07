'use server';
import { auth } from '@clerk/nextjs';
import AccountReady from '@/components/dashboard-components/AccountReady';
import PetCard from '@/components/dashboard-components/PetCard';
import { getPetsOwnedByUser, getUserByClerkId } from '@/lib/db/controller/User';
import { getStaysByUser, getStaysForPet } from '@/lib/db/controller/Stay';
import dogDummyImg from '@/../public/dogDummy.png';
import catDummyImg from '@/../public/catDummy.png';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Notification from '@/components/dashboard-components/Notification';
import { notFound } from 'next/navigation';
import { FullStay } from '@/lib/db/models/Stay';
import { getUnreadMessages } from '@/lib/db/controller/Conversation';

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

  // Getting the relevant info on ongoing and upcoming stays
  const today = new Date();

  const stays: FullStay[] = await getStaysByUser(user._id, today);

  const closestUpcomingStay = stays
    .filter((stay) => stay.from >= today)
    .reduce((a, b) => (a.from < b.from ? a : b));

  const onGoingStays = stays.filter((stay) => stay.from < today);

  // Getting the number of unread messages and conversations
  const unreadConversations = await getUnreadMessages(user._id);

  const unreadMessages =
    unreadConversations && unreadConversations.length > 0
      ? unreadConversations.flatMap((conversation) =>
          conversation.messages.filter(
            (message) => !message.sender?._id.equals(user._id)
          )
        )
      : [];

  return (
    <div className="flex flex-col gap-y-4 text-center">
      <Notification title="Latest messages">
        {unreadConversations &&
          unreadConversations.length &&
          unreadMessages &&
          unreadMessages.length > 0 && (
            <h3 className="text-lg">
              You have <strong>{unreadMessages.length}</strong> messages from{' '}
              <strong>{unreadConversations?.length}</strong> conversations
            </h3>
          )}
      </Notification>
      {stays.length > 0 && (
        <Notification title="Stays">
          <div className="flex flex-col gap-2 mb-2">
            {onGoingStays.length > 0 &&
              onGoingStays.map((stay, index) => {
                if (stay.to) {
                  return (
                    <div
                      key={index}
                      className="bg-brand-fg-100 p-1 rounded-full text-brand-fg-900"
                    >
                      <h3>{`Ongoing stay until ${new Date(
                        stay.to
                      ).toDateString()}`}</h3>
                      <h3>{`Pet${stay.pet.length > 1 ? 's' : ''}: ${stay.pet
                        .map((pet) => pet.name)
                        .join(' ')}`}</h3>
                    </div>
                  );
                }
              })}
            {closestUpcomingStay && (
              <div className="bg-brand-bg-100 p-1 rounded-full text-brand-bg-900">
                <h3>{`Upcoming stay: ${new Date(
                  closestUpcomingStay.from
                ).toDateString()}`}</h3>
                <h3>{`Pet${
                  closestUpcomingStay.pet.length > 1 ? 's' : ''
                }: ${closestUpcomingStay.pet
                  .map((pet) => pet.name)
                  .join(', ')}`}</h3>
              </div>
            )}
          </div>
        </Notification>
      )}
      {!readyToUse ? (
        <AccountReady
          percentage={percentage}
          profileComplete={!!profileStatus}
        />
      ) : (
        <div className="flex flex-col gap-y-4"></div>
      )}
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
        <Button className="w-full">Add another Pet</Button>
      </Link>
    </div>
  );
}

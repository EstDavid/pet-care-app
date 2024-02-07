'use server';
import { UserButton, auth } from '@clerk/nextjs';
import AccountReady from '@/components/dashboard-components/AccountReady';
import AddPet from '@/components/dashboard-components/AddPet';
import PetCard from '@/components/dashboard-components/PetCard';
import { getPetsOwnedByUser, getUserByClerkId } from '@/lib/db/controller/User';
import { Pet } from '@/lib/db/models/Pet';
import { getStaysForPet, isPetInStay } from '@/lib/db/controller/Stay';
import Image from 'next/image';
import dogDummyImg from '@/../public/dogDummy.png';
import catDummyImg from '@/../public/catDummy.png';
import Recommendation from '@/components/dashboard-components/Recommendation';
import Notifications from '@/components/dashboard-components/Notifications';

export default async function Page({ params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const user = await getUserByClerkId(userId);
  const personalInformation =
    user?.role &&
    user?.firstname &&
    user?.surname &&
    user?.contact?.phone &&
    user?.contact?.street &&
    user?.contact?.city &&
    user?.contact?.postcode &&
    user?.contact?.country;

  const petSittingSettings =
    (user?.sitsCats || user?.sitsDogs) &&
    user?.maxPets &&
    user?.qualifications &&
    user?.firstAid &&
    user?.insuranceDetails;

  const percentage =
    !personalInformation && !petSittingSettings
      ? 25
      : personalInformation && !petSittingSettings
      ? 50
      : !personalInformation && petSittingSettings
      ? 75
      : 100;

  let readyToUse = personalInformation && petSittingSettings;

  let notification = 'You have no new notifications';
  let newNotification = true;
  let notificationContent =
    'Notifications should appear here when you have new ones';
  if (newNotification) {
    notification = 'You have a new message from a sitter';
    notificationContent =
      "Sitter: John Doe\nMessage: Hi, I'm interested in ...";
  }
  // recommendation is when the sitter didn't add self description then the recommendation message will be shown as profile description will better the chances of getting hired for pet sitting
  let recommendationTitle = 'Recommendation!';
  let recommendationMessage =
    'Enhance your pet sitting profile by adding a description\nit boosts your hiring prospects!';

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

  function handleNoPetImage(petType: string) {
    return petType === 'dog' ? dogDummyImg : catDummyImg;
  }

  return (
    <div className="flex flex-col gap-y-4 text-center">
      <Notifications user={user} />
      {!readyToUse ? (
        <AccountReady
          percentage={percentage}
          profileComplete={readyToUse}
          userRole={user?.role}
        />
      ) : (
        <div className="flex flex-col gap-y-4">
          {!user?.sitterDescription && (
            <Recommendation
              notification={recommendationTitle}
              notificationContent={recommendationMessage}
            />
          )}
        </div>
      )}
    </div>
  );
}

"use server";
import { UserButton, auth } from "@clerk/nextjs";
import AccountReady from "@/components/dashboard-components/AccountReady";
import AddPet from "@/components/dashboard-components/AddPet";
import PetCard from "@/components/dashboard-components/PetCard";
import { getPetsOwnedByUser, getUserByClerkId } from "@/lib/db/controller/User";
import { Pet } from "@/lib/db/models/Pet";
import { getStaysForPet, isPetInStay } from "@/lib/db/controller/Stay";
import Image from "next/image";
import dogDummyImg from "@/../public/dogDummy.png";
import catDummyImg from "@/../public/catDummy.png";
import Notifications from "@/components/dashboard-components/Notifications";

export default async function Page({ params }: { params: { id: string } }) {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const user = await getUserByClerkId(userId);
  const profileStatus =
    user?.role &&
    user?.firstname &&
    user?.surname &&
    user?.contact?.phone &&
    user?.contact?.street &&
    user?.contact?.city &&
    user?.contact?.postcode &&
    user?.contact?.country;
  const pets = (await getPetsOwnedByUser(userId)) || [];
  const petAdded = pets.length >= 1 ? true : false;

  ("Please complete your profile");

  let notification = "You have no new notifications";
  let newNotification = true;
  let notificationContent =
    "Notifications should appear here when you have new ones";
  if (newNotification) {
    notification = "You have a new message from a sitter";
    notificationContent =
      //❕Suggestion: We cab set the count of characters to display
      "Sitter: John Doe\nMessage: Hi, I'm interested in ...";
  }

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
    return petType === "dog" ? dogDummyImg : catDummyImg;
  }

  return (
    <div className="flex flex-col gap-y-4 text-center">
      {!readyToUse ? (
        <AccountReady
          percentage={percentage}
          profileComplete={!!profileStatus}
        />
      ) : (
        <div className="flex flex-col gap-y-4">
          <Notifications
            notification={notification}
            newNotification={newNotification}
            notificationContent={notificationContent}
          />
        </div>
      )}
      {pets.map(async (pet) => (
        <PetCard
          key={pet._id?.toString() ?? ""}
          petId={pet._id?.toString() ?? ""}
          petName={pet.name ?? ""}
          petImage={
            (pet.pfpUrl?.toString() ||
              (await handleNoPetImage(pet.species?.toString() ?? ""))) as string
          }
          petIsHome={await isInStay(pet._id?.toString() ?? "")}
          petType={pet.species?.toString() ?? ""}
        />
      ))}
      <AddPet petAdded={petAdded} />
    </div>
  );
}

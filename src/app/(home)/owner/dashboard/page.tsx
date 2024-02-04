"use server";
import { auth } from "@clerk/nextjs";
import AccountReady from "@/components/dashboard-components/AccountReady";
import AddPet from "@/components/dashboard-components/AddPet";
import PetCard from "@/components/dashboard-components/PetCard";
import { getPetsOwnedByUser, getUserByClerkId } from "@/lib/db/controller/User"; // Assuming these functions are defined in your backend to fetch data
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
  const profileStatus = true;
  // user?.firstname && user?.surname && user?.contact && user?.role;
  // const notifications = await getNotifications(user?._id);
  const pets = (await getPetsOwnedByUser(userId)) || [];
  const petAdded = pets ? true : false;

  let notification = "You have no new notifications";
  let newNotification = true;
  let notificationContent =
    "Notifications should appear here when you have new ones";
  if (newNotification) {
    notification = "You have a new message from a sitter";
    notificationContent =
      "Sitter: John Doe\nMessage: Hi, I'm interested in ..."; // Set the count of characters to display
  }

  let readyToUse = profileStatus && petAdded;

  // Check if the pet is in a stay
  const isInStay = async (petId: string) => {
    const currentDateTime = new Date();
    const staying = await isPetInStay(petId, stayId); // Pass the stayId argument to the isPetInStay function
    for (const stay of staying) {
      if (
        new Date(stay.from) <= currentDateTime &&
        new Date(stay.to) >= currentDateTime
      ) {
        return true;
      }
    }
    return false;
  };

  // const currentDateTime = new Date();
  // for (const pet of pets) {
  //   const stays = (await isPetInStay(pet._id.toString())) || []; // Convert ObjectId to string and ensure stays is always an array
  //   pet.isHome = true; // Assume pet is home
  //   for (const stay of stays) {
  //     if (
  //       new Date(stay.from) <= currentDateTime &&
  //       new Date(stay.to) >= currentDateTime
  //     ) {
  //       pet.isHome = false; // Pet is not at home if within a stay period
  //       break;
  //     }
  //   }
  // }

  // Process the data as needed for the frontend, for example, calculate percentage for AccountReady
  const percentage =
    profileStatus && petAdded ? 100 : profileStatus || petAdded ? 66 : 33;

  function handleNoPetImage(petType: string) {
    return petType === "dog" ? dogDummyImg : catDummyImg;
  }

  return (
    <div className="flex flex-col text-center">
      {!readyToUse ? (
        <AccountReady
          percentage={percentage}
          profileComplete={profileStatus}
          petAdded={petAdded}
        />
      ) : (
        <div className="flex flex-col gap-y-4">
          <Notifications
            notification={notification}
            newNotification={newNotification}
            notificationContent={notificationContent}
          />
          {pets.map((pet) => (
            <PetCard
              key={pet._id}
              petId={pet._id}
              petName={pet.name}
              petImage={pet.pfpUrl || handleNoPetImage(pet.species)}
              petIsHome={isInStay(pet._id.toString())} // when testing for Group app ! to show both cases
              petType={pet.species}
            />
          ))}
          <AddPet petAdded={petAdded} />
        </div>
      )}
    </div>
  );
}

// <div className="flex flex-col items-center">
// <Avatar
//   name={owner.name}
//   image={owner.profileImage}
//   size="xl"
//   fallback={<AvatarFallback />}
// />
// <h2>{owner.name}</h2>
// <p>
//   <FaLocationDot /> {owner.location}
// </p>
// <p>
//   <FaRegEnvelope /> {owner.email}
// </p>
// </div>
// <div className="flex flex-col items-center">
// <AccountReady
//   accountReady={accountReady}
//   percentage={percentage}
//   newNotification={newNotification}
// />
// <AddPet />
// <Notifications />
// </div>
// <div className="flex flex-col items-center">
// <h2>Your Pets</h2>
// <div className="flex flex-row">
//   {petsList.map((pet) => (
//     <PetCard
//       key={pet._id}
//       petName={pet.name}
//       petIsHome={pet.isHome}
//       petImage={pet.image}
//     />
//   ))}
// </div>
// </div>
// <div className="flex flex-col items-center">
// <h2>Chat with Sitters</h2>
// <Link href="/owner/dashboard/chat">
//   <Button>Start Chat</Button>
// </Link>
// </div>

"use server";
import { auth } from "@clerk/nextjs";
import AccountReady from "@/components/dashboard-components/AccountReady";
import AddPet from "@/components/dashboard-components/AddPet";
import PetCard from "@/components/dashboard-components/PetCard";
import { getPetsOwnedByUser, getUserByClerkId } from "@/lib/db/controller/User"; // Assuming these functions are defined in your backend to fetch data
import { Pet } from "@/lib/db/models/Pet";
import { getStaysForPet } from "@/lib/db/controller/Stay";
import Image from "next/image";
import dogDummyImg from "@/../public/dogDummy.png";
import catDummyImg from "@/../public/catDummy.png";

export default async function Page({ params }: { params: { id: string } }) {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  // Fetching data from the database/server instead of using useState
  const user = await getUserByClerkId(userId);
  const profileStatus = true;
  // const notifications = await getNotifications(user?._id);
  const pets = (await getPetsOwnedByUser(userId)) || []; // Ensure pets is always an array
  const petAdded = pets ? true : false;

  // Check if the pet is at home or not
  const currentDateTime = new Date();
  for (const pet of pets) {
    const stays = (await getStaysForPet(pet._id.toString())) || []; // Convert ObjectId to string and ensure stays is always an array
    pet.isHome = true; // Assume pet is home
    for (const stay of stays) {
      if (
        new Date(stay.from) <= currentDateTime &&
        new Date(stay.to) >= currentDateTime
      ) {
        pet.isHome = false; // Pet is not at home if within a stay period
        break;
      }
    }
  }

  // Process the data as needed for the frontend, for example, calculate percentage for AccountReady
  const percentage =
    profileStatus && petAdded ? 100 : profileStatus || petAdded ? 66 : 33;

  // const dogDummyImg = require("../../../../../public/dogDummy.png");
  // const catDummyImg = require("../../../../../public/catDummy.png");

  function handleNoPetImage(petType: string) {
    return petType === "dog" ? dogDummyImg : catDummyImg;
  }

  return (
    <div className="flex flex-col text-center">
      <AccountReady
        percentage={percentage}
        profileComplete={profileStatus}
        petAdded={petAdded}
      />
      {profileStatus && petAdded && (
        <div className="flex flex-col gap-y-4">
          {/* <Notifications notification={notifications} /> */}
          {pets.map((pet) => (
            <PetCard
              key={pet._id}
              petName={pet.name}
              petImage={pet.pfpUrl || handleNoPetImage(pet.species)}
              petIsHome={pet.isHome}
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

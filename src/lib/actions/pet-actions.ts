'use server';
import { addPet, updatePet } from '@/lib/db/controller/Pet';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';
import { getUserByClerkId } from '@/lib/db/controller/User';
import Pet, { Pet as IPet } from '@/lib/db/models/Pet';
import { User } from '@clerk/nextjs/server';

const createOrUpdatePetInDatabase = async (clerkUser: User, petInfo: IPet, petId: string | undefined) => {
  try {
    let savedPet: IPet | undefined;

    if (petId) {
      savedPet = await updatePet(petId, petInfo);
    } else {
      const newPet = new Pet(petInfo);
      savedPet = await addPet(clerkUser.id, newPet);
    }

    if (!savedPet) throw new Error('Pet could not be updated or created in database');

    return savedPet;
  } catch (error) {
    console.log('Error editing data', error);
  }
};

export async function createOrUpdatePet (imageUrl: string, petId: string | undefined, formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const {
    species,
    name,
    age,
    breed,
    sex,
    medication,
    allergies,
    vaccinations,
    sprayed,
    notes,
    emergencyInstructions,
    vetName,
    vetPhone,
    vetAddress,
    insurance,
    microchip,
  } = data;

  const clerkUser = await currentUser();
  if (!clerkUser) {
    throw new Error('oops'); // mushroom
  }

  const owner = await getUserByClerkId(clerkUser.id);

  let petInfo: IPet = {
    owner: owner?._id,
    species: species?.toString(),
    name: name?.toString(),
    age: age?.toString(),
    breed: breed?.toString(),
    sex: sex?.toString(),
    pfpUrl: imageUrl,
    medication: medication?.toString(),
    allergies: allergies?.toString(),
    vaccinations: vaccinations?.toString(),
    sprayed: sprayed?.toString() === 'true' ? true : false,
    notes: notes?.toString(),
    emergencyInstructions: emergencyInstructions?.toString(),
    insurance: insurance?.toString(),
    microchip: microchip?.toString(),
    vet: {
      name: vetName?.toString(),
      phone: vetPhone?.toString(),
      street: vetAddress?.toString(),
    },
  };

  const savedPet = await createOrUpdatePetInDatabase(clerkUser, petInfo, petId);

  if (savedPet) {
    revalidatePath('/pet/edit');
    redirect(`/pet/profile/${savedPet._id}`);
  }
}

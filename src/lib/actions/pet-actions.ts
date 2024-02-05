'use server';
import Pet from '@/lib/db/models/Pet';
import {addPet} from '@/lib/db/controller/Pet';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import {currentUser} from '@clerk/nextjs';
import {getUserByClerkId} from '../db/controller/User';

export async function createPet(imageUrl: string, formData: FormData) {
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

  let newPet = new Pet({
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
  });

  try {
    const savedPet = await addPet(clerkUser.id, newPet);
    if (!savedPet) throw new Error('double oops');
    console.log('savedPet', savedPet);
  } catch (error) {
    console.log('Error editing data', error);
    throw new Error('Failed to edit data.');
  }
  revalidatePath('/pet/edit');
  redirect(`/pet/profile/${newPet.id}`);
}

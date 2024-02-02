'use server';
import Pet from '@/lib/db/models/Pet';
import {addPet} from '@/lib/db/controller/Pet';
import {revalidatePath} from 'next/cache';
import {Types} from 'mongoose';
import {redirect} from 'next/navigation';

export async function createPet(formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const {
    species,
    name,
    age,
    breed,
    sex,
    pfpUrl,
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

  const newPet = new Pet({
    owner: new Types.ObjectId('65ba64b7c08954453b260011'),
    species: species?.toString(),
    name: name?.toString(),
    age: age?.toString(),
    breed: breed?.toString(),
    sex: sex?.toString(),
    pfpUrl: pfpUrl?.toString(),
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
    // Dougal: to check
    const savedPet = await addPet(newPet);
    console.log('savedPet', savedPet);
  } catch (error) {
    console.log('Error editing data', error);
    throw new Error('Failed to edit data.');
  }
  revalidatePath('/dashboard/pet/edit');
  redirect(`/dashboard/pet/profile/${newPet.id}`);
}

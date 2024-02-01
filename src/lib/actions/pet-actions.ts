'use server';
import {Pet} from '@/lib/db/models/Pet';
import {addPet} from '@/lib/db/controller/Pet';
import {revalidatePath} from 'next/cache';

// export async function getMediaUrl(url: string) {
//   const imgUrl = url;
//   console.log(imgUrl, 'imgUrl');
//   return imgUrl;
// }

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
  console.log(data, 'from actions');

  // console.log(url, 'url');
  // const pfpUrl = await getMediaUrl(url);
  // console.log(pfpUrl, 'pfpUrl');

  try {
    const newPet: Pet = {
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
    };
    // const savedPet = await addPet(newPet);
    console.log('newPet', newPet);
  } catch (error) {
    console.log('Error editing data', error);
    throw new Error('Failed to edit data.');
  }
  // revalidatePath('/dashboard/pet');
}

'use server';
import { User } from '@/lib/db/models/User';
import { addUser } from '@/lib/db/controller/User';
import { revalidatePath } from 'next/cache';

export default async function createUser(formData: FormData) {
  try {
    const firstname = formData.get('firstname')?.toString();
    const surname = formData.get('surname')?.toString();
    const phone = formData.get('mobileNumber')?.toString();
    const city = formData.get('city')?.toString();
    const street = formData.get('street')?.toString();
    const postcode = formData.get('postcode')?.toString();

    const newUser: User = {
      firstname: firstname,
      surname: surname,
      contact: {
        phone,
        city,
        street,
        postcode,
      },
    };
    const savedUser = await addUser(newUser);
    console.log(savedUser);
  } catch (error) {
    console.log('Error editing data', error);
    throw new Error('Failed to edit data.');
  }
  revalidatePath('/dashboard/user-profile');
}

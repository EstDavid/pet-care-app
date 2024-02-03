'use server';
import { User as IUser} from '@/lib/db/models/User';
import {modifyUser } from '@/lib/db/controller/User';
import { revalidatePath } from 'next/cache';
import {currentUser } from '@clerk/nextjs/server';

export default async function editUser(formData: FormData) {
  try {
    const phone = formData.get('mobileNumber')?.toString();
    const city = formData.get('city')?.toString();
    const street = formData.get('street')?.toString();
    const postcode = formData.get('postcode')?.toString();

    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error('auth error')
    const updatedUser: IUser = {
      contact: {
        phone,
        city,
        street,
        postcode,
      },
    };
    const savedUser = await modifyUser(clerkUser?.id, updatedUser);
    console.log(savedUser);
  } catch (error) {
    console.log('Error editing data', error);
    // throw new Error('Failed to edit data.');
  }
  revalidatePath('/dashboard/user-profile');
}

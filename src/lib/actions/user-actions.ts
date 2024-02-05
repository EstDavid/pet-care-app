'use server';
import {User as IUser} from '@/lib/db/models/User';
import {modifyUser} from '@/lib/db/controller/User';
import {revalidatePath} from 'next/cache';
import {currentUser} from '@clerk/nextjs/server';
import {env} from 'process';
import {redirect} from 'next/navigation';

async function getLatLong(addressString: string) {
  const api = process.env.GEOCODE_KEY;
  const res = await fetch(
    `https://geocode.maps.co/search?q=${addressString}&api_key=${api}`
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function editUser(imageUrl: string, formData: FormData) {
  console.log('imageUrl', imageUrl);
  try {
    const pfpUrl = imageUrl;
    const phone = formData.get('mobileNumber')?.toString();
    const city = formData.get('city')?.toString();
    const street = formData.get('street')?.toString();
    const postcode = formData.get('postcode')?.toString();
    const country = formData.get('country')?.toString();
    const sitterDescription = formData.get('sitterDescription')?.toString();
    const sitsDogs =
      formData.get('sitsDogs')?.toString() === 'true' ? true : false;
    const sitsCats =
      formData.get('sitsCats')?.toString() === 'true' ? true : false;
    const maxPets = formData.get('maxPets')?.toString();
    const qualifications = formData.get('qualifications')?.toString();
    const firstAid = formData.get('firstAid')?.toString();
    const insuranceDetails = formData.get('insuranceDetails')?.toString();

    let location;
    if (postcode) location = await getLatLong(`${postcode}+${country}`);
    console.log(location);

    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error('auth error');
    const updatedUser: IUser = {
      pfpUrl,
      sitterDescription,
      sitsDogs,
      sitsCats,
      maxPets,
      qualifications,
      firstAid,
      insuranceDetails,
      contact: {
        phone,
        city,
        street,
        postcode,
        location: {
          lat: location[0].lat,
          long: location[0].lon,
        },
      },
    };
    const savedUser = await modifyUser(clerkUser?.id, updatedUser);
    console.log(savedUser);
  } catch (error) {
    console.log('Error editing data', error);
    // throw new Error('Failed to edit data.');
  }
  revalidatePath('/owner/user-profile');
  revalidatePath('/sitter/user-profile');
  redirect('/user-profile');
}

'use server';
import {User as IUser} from '@/lib/db/models/User';
import {modifyUser} from '@/lib/db/controller/User';
import {revalidatePath} from 'next/cache';
import {currentUser} from '@clerk/nextjs/server';
import {env} from 'process';

async function getLatLong(addressString: string):Promise<number[]> {
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

  const result = await res.json();
  console.log(result);

  return [result[0].lon, result[0].lat]
}

export default async function editUser (imageUrl: string, formData: FormData) {
  console.log('imageUrl', imageUrl)
  try {
    const pfpUrl = imageUrl;
    const phone = formData.get('mobileNumber')?.toString();
    const city = formData.get('city')?.toString();
    const street = formData.get('street')?.toString();
    const postcode = formData.get('postcode')?.toString();
    const country = formData.get('country')?.toString();

    let coords = [0,0];
    if (postcode) coords = await getLatLong(`${postcode}+${country}`);
    console.log('coords = ' +coords);

    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error('auth error');
    const updatedUser: IUser = {
      pfpUrl,
      contact: {
        phone,
        city,
        street,
        postcode,
        loc:{
          type:'Point',
          coordinates:coords
        }
        // location: {
        //   lat: location[0].lat,
        //   long: location[0].lon,
        // },
      },
    };
    const savedUser = await modifyUser(clerkUser?.id, updatedUser);
    console.log(savedUser);
  } catch (error) {
    console.log('Error editing data', error);
    // throw new Error('Failed to edit data.');
  }
  // revalidatePath('/user-profile');
}

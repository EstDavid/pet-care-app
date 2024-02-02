'use server';
import { revalidatePath } from 'next/cache';
import Message from '@/lib/db/models/Message';

export default async function postMessage(formData: FormData) {
  try {
    // const firstname = formData.get('firstname')?.toString();
    // const surname = formData.get('surname')?.toString();
    // const phone = formData.get('mobileNumber')?.toString();
    // const city = formData.get('city')?.toString();
    // const street = formData.get('street')?.toString();
    // const postcode = formData.get('postcode')?.toString();

    // const newUser: User = {
    //   firstname: firstname,
    //   surname: surname,
    //   contact: {
    //     phone,
    //     city,
    //     street,
    //     postcode,
    //   },
    // };
    const newMessage = new Message({
      textContent: formData.get('message') as string,
    });

    // const savedMessage = await CONTROLLERFUNCTION(newMessage);
    const savedMessage = await newMessage.save();
    console.log(savedMessage);
  } catch (error) {
    console.log(error);
  }

  revalidatePath('/dashboard/chat');
}

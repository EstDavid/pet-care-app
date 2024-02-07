'use server';
import { addStay } from '../db/controller/Stay';

export default async function requestStay(
  owner: string,
  sitter: string,
  from: string,
  to: string,
  formData: FormData
) {
  const petArray = [];
  for (let petId of formData.entries()) {
    petArray.push(petId[0]);
  }

  try {
    const newStay = await addStay(owner, sitter, petArray, from, to);
    console.log(newStay);
  } catch (error) {
    console.log(error);
  }
}

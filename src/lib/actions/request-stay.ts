'use server';
import { addStay } from '../db/controller/Stay';

export default async function requestStay (
  owner: string,
  sitter: string,
  from: Date,
  to: Date,
  formData: FormData
) {
  const petArray = [];
  for (let petId of formData.entries()) {
    petArray.push(petId[0]);
  }

  try {
    await addStay(owner, sitter, petArray, new Date(from), new Date(to));
  } catch (error) {
    console.log(error);
  }
}

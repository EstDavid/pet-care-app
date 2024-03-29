'use server';
import {addStay, confirmStay, postUpdateToStay} from '../db/controller/Stay';
import {Stay} from '../db/models/Stay';
import {Types} from 'mongoose';
import Update from '../db/models/Update';
import {revalidatePath} from 'next/cache';

export async function requestStay(
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
    await addStay(
      owner,
      sitter,
      petArray,
      new Date(from),
      new Date(to)
    );
  } catch (error) {
    console.log(error);
  }
}

export async function confirmStayAction(_id: Types.ObjectId) {
  await confirmStay(_id);
}

export async function postUpdate(
  stayId: string,
  mediaUrl: string[],
  formData: FormData
) {
  try {
    // const mediaUrl = formData.get('mediaUrl') as string;
    const comment = formData.get('comment') as string;

    const newUpdate = new Update({
      mediaUrl,
      comment,
    });

    const postedUpdate = await postUpdateToStay(stayId, newUpdate);
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/stays/${stayId}/updates`);
}

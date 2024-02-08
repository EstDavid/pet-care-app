'use server';
import {addStay, confirmStay, postUpdateToStay} from '../db/controller/Stay';
import {Stay} from '../db/models/Stay';
import {Types} from 'mongoose';
import Update from '../db/models/Update';

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
    const test = await addStay(
      owner,
      sitter,
      petArray,
      new Date(from),
      new Date(to)
    );
    console.log(test);
  } catch (error) {
    console.log(error);
  }
}

export async function confirmStayAction(_id: Types.ObjectId) {
  await confirmStay(_id);
}

export async function postUpdate(
  stayId: string,
  // mediaUrl: string,
  // mediaType: string
  formData: FormData
) {
  try {
    const mediaUrl = formData.get('mediaUrl') as string;
    const comment = formData.get('comment') as string;

    const newUpdate = new Update({
      mediaUrl,
      comment,
    });

    // const stayId = '65c3ede4251a364a8896ba36';

    const postedUpdate = await postUpdateToStay(stayId, newUpdate);
    console.log('posted update', postedUpdate);
  } catch (error) {
    console.log(error);
  }
  // revalidatePath(`/stays/updates`);
}

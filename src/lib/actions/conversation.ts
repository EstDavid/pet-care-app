'use server';
import { redirect } from 'next/navigation';
import { createConversation, getConversationByPair } from '../db/controller/Conversation';
import mongoose, { Types } from 'mongoose';

// This extra function is a workaround to Nextjs not liking to use redirect inside try/catch
// and completely ignoring what goes on in them, therefore rendering /undefined urls
// See: https://stackoverflow.com/questions/76191324/next-13-4-error-next-redirect-in-api-routes
const getOrCreateConversation = async (senderId: Types.ObjectId, recipientId: Types.ObjectId) => {
  try {
    let conversation = await getConversationByPair(senderId, recipientId);

    if (!conversation) {
      conversation = await createConversation(senderId, recipientId);
    }

    if (!conversation) {
      throw new Error("Conversation couldn't be created");
    }

    return conversation;
  } catch (error) {
    console.log('Error editing data', error);
    throw new Error('Failed to edit data.');
  }
};

export default async function contactUser (
  senderId: Types.ObjectId | string,
  recipientId: Types.ObjectId | string | FormData,
) {
  if (typeof senderId === 'string') {
    senderId = new mongoose.Types.ObjectId(senderId);
  }

  if (typeof recipientId === 'string') {
    recipientId = new mongoose.Types.ObjectId(recipientId);
  }

  if (recipientId instanceof FormData) {
    recipientId = new mongoose.Types.ObjectId(recipientId.get('recipient')?.toString());
  }

  const conversation = await getOrCreateConversation(senderId, recipientId);

  if (conversation) {
    return redirect(`/chat/${conversation._id}`);
  }
}

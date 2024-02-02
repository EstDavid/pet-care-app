'use server';
import { redirect } from 'next/navigation';
import { createConversation } from '../db/controller/Conversation';

// This extra function is a workaround to Nextjs not liking to use redirect inside try/catch
// and completely ignoring what goes on in them, therefore rendering /undefined urls
// See: https://stackoverflow.com/questions/76191324/next-13-4-error-next-redirect-in-api-routes
const addConversationToDatabase = async (userId: string,
  sitterId: string) => {
  try {
    if (!userId || !sitterId) {
      throw new Error('User or Sitter ids not found on form');
    }

    const conversation = await createConversation(userId, sitterId);

    if (!conversation) {
      throw new Error("Conversation couldn't be created");
    }

    return conversation;
  } catch (error) {
    console.log('Error editing data', error);
    throw new Error('Failed to edit data.');
  }
};

export default async function createConversationWithSitter (
  userId: string,
  sitterId: string
) {
  const conversation = await addConversationToDatabase(userId, sitterId);

  if (conversation) {
    return redirect(`/dashboard/chat/${conversation?._id}`);
  }
}

'use server';
import { redirect } from 'next/navigation';
import { createConversation } from '../db/controller/Conversation';

export default async function createConversationWithSitter (formData: FormData) {
  try {
    const userId = formData.get('user')?.toString();
    const sitterId = formData.get('sitter')?.toString();

    if (!userId || !sitterId) {
      throw new Error('User or Sitter ids not found on form');
    }
    const conversation = await createConversation(userId, sitterId);

    if (!conversation) {
      throw new Error("Conversation couldn't be created");
    }

    redirect(`/dashboard/chat/${conversation._id}`);
  } catch (error) {
    console.log('Error editing data', error);
    throw new Error('Failed to edit data.');
  }
}

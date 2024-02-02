'use server';
import { revalidatePath } from 'next/cache';
import Message from '@/lib/db/models/Message';
import { postMessageToConversation } from '../db/controller/Conversation';

export default async function postMessage(
  formData: FormData,
  conversationId: string,
  userId: string
) {
  try {
    const newMessage = new Message({
      textContent: formData.get('message') as string,
      sender: userId,
    });

    const savedMessage = await postMessageToConversation(
      conversationId,
      newMessage
    );
    console.log(savedMessage);
  } catch (error) {
    console.log(error);
  }

  revalidatePath(`/dashboard/chat/${conversationId}`);
}

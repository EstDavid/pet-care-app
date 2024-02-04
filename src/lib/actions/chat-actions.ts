'use server';
import { revalidatePath } from 'next/cache';
import Message from '@/lib/db/models/Message';
import { postMessageToConversation } from '../db/controller/Conversation';

export default async function postMessage(
  conversationId: string,
  senderId: string,
  formData: FormData
) {
  try {
    const newMessage = new Message({
      textContent: formData.get('message') as string,
      sender: senderId,
    });

    await postMessageToConversation(conversationId, newMessage);
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/chat/${conversationId}`);
}

export async function postImage(
  conversationId: string,
  senderId: string,
  mediaUrl: string
) {
  try {
    const newMessage = new Message({
      mediaUrl,
      sender: senderId,
    });

    await postMessageToConversation(conversationId, newMessage);
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/chat/${conversationId}`);
}

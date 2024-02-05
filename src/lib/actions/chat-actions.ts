'use server';
import { revalidatePath } from 'next/cache';
import Message, { IMessage } from '@/lib/db/models/Message';
import { postMessageToConversation, setReadMessages } from '../db/controller/Conversation';

export default async function postMessage (
  conversationId: string,
  senderId: string,
  formData: FormData
) {
  try {
    const newMessage = new Message({
      textContent: formData.get('message') as string,
      sender: senderId,
      messageRead: false
    });

    await postMessageToConversation(conversationId, newMessage);
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/chat/${conversationId}`);
}

export async function postImage (
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

export async function readMessages (
  messages: IMessage[],
) {
  try {
    await setReadMessages(messages);
  } catch (error) {
    console.log(error);
  }

  revalidatePath(`/(home)/chat/`);
};

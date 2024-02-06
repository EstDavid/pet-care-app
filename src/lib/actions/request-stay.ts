'use server';
// import { revalidatePath } from 'next/cache';

export default async function requestStay(
  // conversationId: string,
  from: Date,
  to: Date,
  formData: FormData
) {
  console.log(formData);
  // try {
  //   const newMessage = new Message({
  //     textContent: formData.get('message') as string,
  //     sender: senderId,
  //     messageRead: false
  //   });
  //   await postMessageToConversation(conversationId, newMessage);
  // } catch (error) {
  //   console.log(error);
  // }
  // revalidatePath(`/chat/${conversationId}`);
}

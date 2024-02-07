'use server';
// import { revalidatePath } from 'next/cache';

export default async function requestStay(
  from: string,
  to: string,
  formData: FormData
) {
  console.log(new Date(from));
  console.log(new Date(to));
  console.log(formData);
  try {
    //   const newMessage = new Message({
    //     textContent: formData.get('message') as string,
    //     sender: senderId,
    //     messageRead: false
    //   });
    //   await postMessageToConversation(conversationId, newMessage);
  } catch (error) {
    console.log(error);
  }
  // revalidatePath(`/chat/${conversationId}`);
}

import { auth } from '@clerk/nextjs';
import postMessage, { readMessages } from '@/lib/actions/chat-actions';
import { getUserByClerkId, getUserById } from '@/lib/db/controller/User';
import { getConversationById } from '@/lib/db/controller/Conversation';
import { notFound } from 'next/navigation';
import MessageForm from '@/components/message-form';
import ChatMessages from '@/components/chat-messages';

export default async function Chat({ params }: { params: { id: string } }) {
  const { userId }: { userId: string | null } = auth();

  // Retrieve conversation from DB, conversationId is passed as a parameter
  const { id: conversationId } = params;
  const conversation = await getConversationById(conversationId);

  if (!conversation || !userId) {
    return notFound();
  }

  // Get the user from the database
  const dbUser = await getUserByClerkId(userId);

  if (!dbUser || !dbUser._id || !conversation.user1._id) {
    return notFound();
  }

  const receiverId =
    conversation.user1._id.toString() === dbUser._id.toString()
      ? conversation.user2._id
      : conversation.user1._id;

  if (!receiverId) {
    return notFound();
  }

  const receiver = await getUserById(receiverId.toString());

  // Pass conversationId and dbUser as additional arguments to postMessage server action
  const postNewMessage = postMessage.bind(
    null,
    conversationId,
    dbUser._id.toString()
  );

  // Retrieve messages from the conversation object
  const { messages } = conversation;

  const unreadMessages = messages.filter((message) => {
    return (
      !message.messageRead &&
      message.sender?.toString() !== dbUser._id?.toString()
    );
  });

  if (unreadMessages.length > 0) {
    readMessages.call(null, unreadMessages);
  }

  // Convert messages object to JSON to be able to pass it as a prop
  const messagesObject = JSON.parse(JSON.stringify(messages));

  return (
    <div className="h-full">
      <div className="w-full h-[60px] absolute left-0 top-[120px] bg-brand-bg-100 flex items-center pl-10">
        <h2 className="text-2xl font-bold text-brand-bg-500">
          {receiver?.firstname}
        </h2>
      </div>
      <div className="flex flex-col justify-between h-full">
        <ChatMessages
          messages={messagesObject}
          conversationId={conversationId}
          dbUser={dbUser._id.toString()}
        />
        <div className="grid w-full gap-2 mt-4">
          <form action={postNewMessage}>
            <MessageForm
              conversationId={conversationId}
              dbUser={dbUser._id.toString()}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

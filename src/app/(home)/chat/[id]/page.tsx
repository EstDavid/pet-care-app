import { Card } from '@/components/ui/card';

import { auth } from '@clerk/nextjs';
import { IMessage } from '@/lib/db/models/Message';
import postMessage from '@/lib/actions/chat-actions';
import { getUserByClerkId } from '@/lib/db/controller/User';
import { getConversationById } from '@/lib/db/controller/Conversation';
import { notFound } from 'next/navigation';
import MessageForm from '@/components/message-form';

export default async function Chat({ params }: { params: { id: string } }) {
  const { userId }: { userId: string | null } = auth();
  const { id: conversationId } = params;
  const conversation = await getConversationById(conversationId);

  if (!conversation || !userId) {
    return notFound();
  }

  const dbUser = await getUserByClerkId(userId);

  if (!dbUser || !dbUser._id) {
    return notFound();
  }

  const postNewMessage = postMessage.bind(
    null,
    conversationId,
    dbUser._id.toString()
  );

  const { messages } = conversation;

  return (
    <div className="flex flex-col justify-between h-full ">
      <div className="flex flex-col overflow-y-auto gap-4">
        {messages &&
          messages.map((message: IMessage) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender?.toString() === dbUser._id?.toString()
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              <Card className="px-2 my-2 min-w-[10%] max-w-[80%] bg-brand-bg-50">
                <p className="py-1">{message.textContent}</p>

                <p className="text-xs text-right text-slate-500">
                  {new Date(message.createdAt).toLocaleString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </Card>
            </div>
          ))}
      </div>
      <div className="grid w-full gap-2 mt-4">
        <form action={postNewMessage}>
          <MessageForm />
        </form>
      </div>
    </div>
  );
}

import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { auth } from '@clerk/nextjs';
import { IMessage } from '@/lib/db/models/Message';
import { User } from '@/lib/db/models/User';
import postMessage from '@/lib/actions/chat-actions';
import { getUserByClerkId } from '@/lib/db/controller/User';
import {
  getConversationById,
  getConversationByPair,
} from '@/lib/db/controller/Conversation';
import { notFound } from 'next/navigation';

export default async function Chat({ params }: { params: { id: string } }) {
  // userId --> clerkId
  const { userId }: { userId: string | null } = auth();

  // retrieve conversationId from params
  const { id: conversationId } = params;
  const conversation = await getConversationById(conversationId);
  // const conversation2 = await getConversationByPair(conversationId);

  let messages: IMessage[];
  if (conversation) {
    messages = conversation?.messages;
  }

  let dbUser: User | undefined;
  // let messages: IMessage[] | undefined = [];

  if (userId) {
    dbUser = await getUserByClerkId(userId);
    // if (dbUser && dbUser._id)
    // messages = await getUserMessages(dbUser._id.toString());
  }
  if (!dbUser || !dbUser._id) return notFound();

  return (
    <div className="flex flex-col justify-between items-center">
      <div className="flex flex-col overflow-y-auto my-4">
        {messages &&
          messages.map((message: IMessage) => {
            return (
              <div
                key={message.id}
                className={`flex ${
                  message.sender?.toString() === userId
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <Card className="px-2 my-2 w-4/5">
                  <p className="text-base py-1">{message.textContent}</p>

                  <p className="text-xs text-right text-slate-400 leading-4">
                    {new Date(message.createdAt).toLocaleString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </Card>
              </div>
            );
          })}
      </div>
      <div className="grid w-full gap-2">
        <form
          action={(formData) =>
            postMessage(formData, conversationId, dbUser._id.toString())
          }
        >
          <Textarea
            placeholder="Type your message here."
            name="message"
            required
          />
          <Button type="submit">Send message</Button>
        </form>
      </div>
    </div>
  );
}

import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { auth } from '@clerk/nextjs';
import { Message } from '@/lib/db/models/Message';
import { User } from '@/lib/db/models/User';
import postMessage from '@/lib/actions/chat-actions';
import { getUserMessages, getUserByClerkId } from '@/lib/db/controller/User';
import { ObjectId } from 'mongoose';

export default async function Chat() {
  const { userId }: { userId: string | null } = auth();
  let dbUser: User | undefined;
  let messages: Message[] | undefined = [];

  if (userId) {
    dbUser = await getUserByClerkId(userId);
    if (dbUser && dbUser._id)
      messages = await getUserMessages(dbUser._id.toString());
  }

  return (
    <div className="flex flex-col justify-between items-center">
      <div className="flex flex-col overflow-y-auto my-4">
        {messages &&
          messages.map((message: Message) => {
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
                    {/* {new Date(message.createdAt).toLocaleString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })} */}
                  </p>
                </Card>
              </div>
            );
          })}
      </div>
      <div className="grid w-full gap-2">
        <form action={postMessage}>
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

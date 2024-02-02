// import dbConnect from '@/app/lib/dbConnect';
import Message from '@/lib/db/models/Message';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import postMessage from '@/lib/actions/chat-actions';
import { getUserMessages } from '@/lib/db/controller/User';
import { auth } from '@clerk/nextjs';

export default async function Chat() {
  // await dbConnect();
  // let messages;
  // try {
  //   messages = await Message.find({});

  //   console.log(messages);
  // } catch (e) {
  //   console.error(e);
  // }

  // const messages = await getMessagesByConversationIdFromDB ()
  const { userId }: { userId: string | null } = auth();
  // let dbUser;
  // if (userId) dbUser = await getUserByClerkId(user?.id)

  return (
    <div className="flex flex-col justify-between items-center">
      <div className="flex flex-col overflow-y-auto my-4">
        {messages &&
          messages.map((message: MessageType) => {
            return (
              <div
                className={`flex ${
                  message.sender === userId ? 'justify-end' : 'justify-start'
                }`}
              >
                <Card key={message._id} className="px-2 my-2 w-4/5">
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

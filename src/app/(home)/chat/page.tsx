import { Card, CardHeader } from '@/components/ui/card';
import { getConversationsByUser } from '@/lib/db/controller/Conversation';
import { getUserByClerkId } from '@/lib/db/controller/User';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Page() {
  const { userId } = auth();

  if (!userId) {
    return notFound();
  }

  const user = await getUserByClerkId(userId);

  if (!user || !user._id) {
    return notFound();
  }

  const conversations = await getConversationsByUser(user._id);

  return (
    <div className="flex flex-col gap-2">
      {conversations && conversations.length > 0 ? (
        conversations.map((conversation) => {
          const receiver =
            conversation.user1._id?.toString() === user._id?.toString()
              ? conversation.user2
              : conversation.user1;

          const unreadMessages =
            conversation.messages.filter((message) => !message.messageRead)
              .length > 0;

          return (
            <Link
              key={conversation._id.toString()}
              href={`/chat/${conversation._id}`}
            >
              <Card className={`${unreadMessages ? 'bg-brand-fg-200' : ''}`}>
                <div className="flex justify-between items-center p-2 h-auto w-full">
                  <Image
                    src={receiver.pfpUrl || ''}
                    alt={receiver.firstname || 'User photo'}
                    width={0}
                    height={0}
                    sizes="100vh"
                    className="w-[60px] h-[60px] object-cover rounded-full"
                  />
                  <h3>{`${receiver.firstname} ${receiver.surname}`}</h3>
                </div>
              </Card>
            </Link>
          );
        })
      ) : (
        <h2>You have no conversations yet</h2>
      )}
    </div>
  );
}

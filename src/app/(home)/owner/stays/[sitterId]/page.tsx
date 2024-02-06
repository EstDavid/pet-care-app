import {auth} from '@clerk/nextjs';
import {getUserByClerkId, getUserById} from '@/lib/db/controller/User';
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {FaCat, FaDog} from 'react-icons/fa';
import {FaRegEnvelope} from 'react-icons/fa6';
import Link from 'next/link';
import {getConversationByPair} from '@/lib/db/controller/Conversation';
import {notFound} from 'next/navigation';
import createConversationWithSitter from '@/lib/actions/conversation';
import { Button } from '@/components/ui/button';

export default async function Page({params}: {params: {sitterId: string}}) {
  const {userId} = auth();

  const {sitterId: id} = params;

  if (!userId) {
    return null;
  }

  const user = await getUserByClerkId(userId);
  const sitter = await getUserById(id);

  

  if (!user?._id || !sitter?._id) {
    notFound();
  }

  const conversation = await getConversationByPair(
    user._id.toString(),
    sitter._id.toString()
  );

  const createConversation = createConversationWithSitter.bind(
    null,
    user._id.toString(),
    sitter._id.toString()
  );

  if (sitter) {
    return (
      <div>
        {' '}
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <Avatar>
                  <AvatarImage src={sitter.pfpUrl} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle>{sitter.firstname}</CardTitle>
              </div>
              <div className="flex gap-3">
                {sitter.sitsDogs ? (
                  <FaDog className="text-brand-bg-400" size="2em" />
                ) : null}
                {sitter.sitsCats ? (
                  <FaCat className="text-brand-fg-400" size="2em" />
                ) : null}
              </div>
            </div>
          </CardHeader>
          <CardContent>

          </CardContent>
          <CardFooter>

            {conversation ? (
              <Link
                href={`/chat/${conversation._id}`}
                className="flex items-center"
              >
                <span>Get latest messages with {sitter.firstname}</span>
                <FaRegEnvelope size="3em" />
              </Link>
            ) : (
              <form action={createConversation}>
                <Button type="submit">
                  <p className='mr-3'>Contact {sitter.firstname}</p>
                  <FaRegEnvelope size="1.5em" />
                </Button>
              </form>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  }
}

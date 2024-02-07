import {currentUser} from '@clerk/nextjs';
import {getUserByClerkId, getUserById} from '@/lib/db/controller/User';
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
// import {Separator} from '@radix-ui/react-separator';
import {FaCat, FaDog} from 'react-icons/fa';
import {FaRegEnvelope} from 'react-icons/fa6';
import Link from 'next/link';
import {getConversationByPair} from '@/lib/db/controller/Conversation';
import {notFound} from 'next/navigation';
import createConversationWithSitter from '@/lib/actions/conversation';
import {Button} from '@/components/ui/button';
import Image from 'next/image';
import {IoCalendar} from 'react-icons/io5';
import dummyUser from 'public/userDummyImage.png';

export default async function Page({params}: {params: {sitterId: string}}) {
  const {sitterId} = params;
  const sitter = await getUserById(sitterId);

  const clerkUser = await currentUser();
  if (!clerkUser) {
    return null;
  }
  const owner = await getUserByClerkId(clerkUser.id);

  if (!owner?._id || !sitter?._id) {
    notFound();
  }

  const imgSrc = sitter.pfpUrl ? sitter.pfpUrl : dummyUser;

  const conversation = await getConversationByPair(
    owner._id.toString(),
    sitter._id.toString()
  );

  const createConversation = createConversationWithSitter.bind(
    null,
    owner._id.toString(),
    sitter._id.toString()
  );

  if (sitter) {
    return (
      <div>
        {' '}
        <Card className="w-[350px]">
          {' '}
          <CardHeader className="flex flex-row items-center justify-around">
            <CardTitle className="text-xl">{sitter.firstname}</CardTitle>
            <div className="relative w-[120px] h-[120px]">
              <Image
                src={imgSrc}
                alt={`profile picture of ${sitter.firstname}`}
                fill={true}
                sizes="120px"
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          </CardHeader>
          <CardContent className="grid w-full items-center gap-4">
            <h3 className="font-semibold">Sitter Information</h3>
            <CardDescription>
              <span className="font-semibold">Description:</span>{' '}
              {sitter.sitterDescription}
            </CardDescription>
            <CardDescription>
              <span className="font-semibold">Maximum sitted pets:</span>{' '}
              {sitter.maxPets}
            </CardDescription>
            <CardDescription>
              <span className="font-semibold">Qualifications:</span>{' '}
              {sitter.qualifications}
            </CardDescription>
            <CardDescription>
              <span className="font-semibold">First aid experience:</span>{' '}
              {sitter.firstAid}
            </CardDescription>
            <CardDescription>
              <span className="font-semibold">Insurance details:</span>{' '}
              {sitter.insuranceDetails}
            </CardDescription>
            <CardDescription>
              <span className="font-semibold">Sitting dogs 🐶:</span>{' '}
              {sitter.sitsDogs ? 'Yes' : 'No'}
            </CardDescription>
            <CardDescription>
              <span className="font-semibold">Sitting cats 😸:</span>{' '}
              {sitter.sitsCats ? 'Yes' : 'No'}
            </CardDescription>
            <div className="shrink-0 dark:bg-slate-800 h-[1px] w-full bg-brand-bg"></div>
            <h3 className="font-semibold">Contact Information</h3>
            <CardDescription>
              <span className="font-semibold">Phone number:</span>{' '}
              {sitter.contact?.phone}
            </CardDescription>
            <CardDescription>
              <span className="font-semibold">Street:</span>{' '}
              {sitter.contact?.street}
            </CardDescription>
            <CardDescription>
              <span className="font-semibold">City:</span>{' '}
              {sitter.contact?.city}
            </CardDescription>
            <CardDescription>
              <span className="font-semibold">Postcode:</span>{' '}
              {sitter.contact?.postcode}
            </CardDescription>
            <CardDescription>
              <span className="font-semibold">Country:</span>{' '}
              {sitter.contact?.country}
            </CardDescription>
            {conversation ? (
              <Button type="submit">
                <p className="mr-3">Chat with {sitter.firstname}</p>
                <FaRegEnvelope size="1.5em" />
                <Link href={`/chat/${conversation._id}`}></Link>
              </Button>
            ) : (
              <form action={createConversation}>
                <Button type="submit">
                  <p className="mr-3">Chat with {sitter.firstname}</p>
                  <FaRegEnvelope size="1.5em" />
                </Button>
              </form>
            )}
            <Button type="submit">
              <p className="mr-3">Book a stay with {sitter.firstname}</p>
              <IoCalendar size="1.5em" />
            </Button>
            <Button variant="outline" type="button">
              <Link href="/owner/stays">Go back</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

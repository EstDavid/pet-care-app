import { currentUser } from '@clerk/nextjs';
import { getUserByClerkId, getUserById } from '@/lib/db/controller/User';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
// import {Separator} from '@radix-ui/react-separator';
import { FaRegEnvelope } from 'react-icons/fa6';
import Link from 'next/link';
import { getConversationByPair } from '@/lib/db/controller/Conversation';
import { notFound } from 'next/navigation';
import createConversationWithSitter from '@/lib/actions/conversation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { IoCalendar } from 'react-icons/io5';
import dummyUser from 'public/userDummyImage.png';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import RequestDrawer from '@/components/request-drawer';
import { getPetsOwnedByUser } from '@/lib/db/controller/User';

export default async function Page({
  params,
}: {
  params: { sitterId: string };
}) {
  // get sitter by id
  const { sitterId } = params;
  const sitter = await getUserById(sitterId);

  // get owner by clerk id
  const clerkUser = await currentUser();
  if (!clerkUser) return null;
  const owner = await getUserByClerkId(clerkUser.id);

  if (!owner?._id || !sitter?._id) {
    notFound();
  }

  // create or continue a conversation
  const conversation = await getConversationByPair(
    owner._id.toString(),
    sitter._id.toString()
  );
  const createConversation = createConversationWithSitter.bind(
    null,
    owner._id.toString(),
    sitter._id.toString()
  );

  // gather sitter info
  const imgSrc = sitter.pfpUrl ? sitter.pfpUrl : dummyUser;
  const sitterInfo: { title: string; value: string }[] = [
    { title: 'Description:', value: sitter.sitterDescription ?? '' },
    {
      title: 'Maximum number of pets this sitter can look after:',
      value: sitter.maxPets ?? '',
    },
    { title: 'Qualifications:', value: sitter.qualifications ?? '' },
    { title: 'First aid experience:', value: sitter.firstAid ?? '' },
    { title: 'Insurance details:', value: sitter.insuranceDetails ?? '' },
    {
      title: 'Do they look after dogs? 🐶:',
      value: sitter.sitsDogs ? 'Yes' : 'No',
    },
    {
      title: 'Do they look after cats? 😸:',
      value: sitter.sitsCats ? 'Yes' : 'No',
    },
  ];
  const contactInfo: { title: string; value: string }[] = [
    { title: 'Phone number:', value: sitter.contact?.phone ?? '' },
    { title: 'Street:', value: sitter.contact?.street ?? '' },
    { title: 'City:', value: sitter.contact?.city ?? '' },
    { title: 'Postcode:', value: sitter.contact?.postcode ?? '' },
    { title: 'Country:', value: sitter.contact?.country ?? '' },
  ];

  const pets = (await getPetsOwnedByUser(clerkUser.id)) || [];

  const petsObject = JSON.parse(JSON.stringify(pets));

  if (sitter) {
    return (
      <div className="flex flex-col items-center gap-4 relative">
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
            {sitterInfo.map((info, index) => (
              <CardDescription key={index}>
                <span className="font-semibold">{info.title}</span> {info.value}
              </CardDescription>
            ))}
            <div className="shrink-0 dark:bg-slate-800 h-[1px] w-full bg-brand-bg"></div>
            <h3 className="font-semibold">Contact Information</h3>
            {contactInfo.map((info, index) => (
              <CardDescription key={index}>
                <span className="font-semibold">{info.title}</span> {info.value}
              </CardDescription>
            ))}
            {conversation ? (
              <Button type="submit">
                <p className="mr-3">Chat with {sitter.firstname}</p>
                <FaRegEnvelope size="1.5em" />
                <Link href={`/chat/${conversation._id}`}></Link>
              </Button>
            ) : (
              <form action={createConversation}>
                <Button type="submit" className="w-[300px]">
                  <p className="mr-3">Chat with {sitter.firstname}</p>
                  <FaRegEnvelope size="1.5em" />
                </Button>
              </form>
            )}
            <Drawer>
              <DrawerTrigger>
                <Button type="submit" className="w-full">
                  <p className="mr-3">Book a stay with {sitter.firstname}</p>
                  <IoCalendar size="1.5em" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="bg-brand-bg flex flex-col gap-2">
                <RequestDrawer
                  pets={petsObject}
                  owner={owner._id.toString()}
                  sitter={sitterId}
                />
              </DrawerContent>
            </Drawer>
            <Button variant="outline" type="button">
              <Link href="/owner/stays">Go back</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

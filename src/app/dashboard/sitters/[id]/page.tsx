import { auth } from '@clerk/nextjs';
import { getUserByClerkId, getUserById } from '@/lib/db/controller/User';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { FaCat, FaDog } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { FaRegEnvelope } from 'react-icons/fa6';
import Link from 'next/link';
import { getConversationByPair } from '@/lib/db/controller/Conversation';
import { notFound } from 'next/navigation';
import createConversationWithSitter from '@/lib/actions/conversation';
import { Button } from '@/components/ui/button';

export default async function Page({ params }: { params: { id: string } }) {
  const { userId } = auth();

  const { id } = params;

  if (!userId) {
    return null;
  }

  const user = await getUserByClerkId(userId);
  const sitter = await getUserById(id);

  console.log(userId);

  const pfpUrl = 'https://avatars.githubusercontent.com/u/114820366?v=4';
  const descriptions = [
    "Hi, I'm Emily, your go-to cat sitter! In my cozy home, every cat is treated like a member of the family. I specialize in providing a tranquil and stimulating environment tailored specifically for cats. Whether your kitty loves chasing lasers or snuggling on laps, I ensure they receive all the love and attention they need. I offer daily play sessions, grooming, and personalized care for any special needs. Let me give your feline friend the purr-fect home away from home!",
    "Hello! I'm Paul, and dogs are my passion. At my doggy daycare, your beloved pooch will find a second home filled with fun and affection. From rambunctious playtime to relaxing walks, I cater to each dog's individual personality and needs. With experience handling various breeds and temperaments, I ensure your dog enjoys their time to the fullest. Your furry friend's happiness and well-being are my top priorities, so you can rest easy knowing they're in good hands.",
    "Hi there, I'm Sara! As a pet sitter who adores both cats and dogs, I offer a warm and welcoming place for your furry companions. Understanding the unique quirks of both cats and dogs, I create a balanced environment where each pet feels at home. Whether it's group play for sociable dogs or quiet cuddle time for your introspective cat, I tailor my care to suit their needs. With my attentive and loving approach, you can trust me to provide the best care for your beloved pets."
  ];

  if (!user?._id || !sitter?._id) {
    notFound();
  }

  const conversation = await getConversationByPair(
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
                  <AvatarImage src={pfpUrl} />
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
            <div>
              {descriptions[0].split('\n').map((desc, index) => {
                return (
                  <p key={index} className="text-sm text-brand-bg-500 italic">
                    {desc}
                  </p>
                );
              })}
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full justify-start items-end gap-4">
              <FaLocationDot size="2em" className="text-brand-fg-700" />
              <p className="text-center">5 km from you</p>
            </div>
            {conversation ? (
              <Link
                href={`/chat/${conversation._id}`}
                className="flex items-center"
              >
                <span>Get latest messages with {sitter.firstname}</span>
                <FaRegEnvelope size="3em" />
              </Link>
            ) : (
              <form action={createConversationWithSitter}>
                <input
                  type="text"
                  className="hidden"
                  name="user"
                  value={user._id.toString()}
                />
                <input
                  type="text"
                  className="hidden"
                  name="sitter"
                  value={sitter._id.toString()}
                />
                <Button>
                  <p>Contact {sitter.firstname}</p>
                  <FaRegEnvelope size="3em" />
                </Button>
              </form>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  }
}

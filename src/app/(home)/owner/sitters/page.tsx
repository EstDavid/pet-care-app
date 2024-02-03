import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getSitters } from '@/lib/db/controller/User';
import Link from 'next/link';
import { FaDog, FaCat } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

export default async function Page() {
  const sitters = await getSitters();

  // BOILER PLATE STARTS HERE
  const pfpUrl = 'https://avatars.githubusercontent.com/u/114820366?v=4';
  const descriptions = [
    "Hi, I'm Emily, your go-to cat sitter! In my cozy home, every cat is treated like a member of the family. I specialize in providing a tranquil and stimulating environment tailored specifically for cats. Whether your kitty loves chasing lasers or snuggling on laps, I ensure they receive all the love and attention they need. I offer daily play sessions, grooming, and personalized care for any special needs. Let me give your feline friend the purr-fect home away from home!",
    "Hello! I'm Paul, and dogs are my passion. At my doggy daycare, your beloved pooch will find a second home filled with fun and affection. From rambunctious playtime to relaxing walks, I cater to each dog's individual personality and needs. With experience handling various breeds and temperaments, I ensure your dog enjoys their time to the fullest. Your furry friend's happiness and well-being are my top priorities, so you can rest easy knowing they're in good hands.",
    "Hi there, I'm Sara! As a pet sitter who adores both cats and dogs, I offer a warm and welcoming place for your furry companions. Understanding the unique quirks of both cats and dogs, I create a balanced environment where each pet feels at home. Whether it's group play for sociable dogs or quiet cuddle time for your introspective cat, I tailor my care to suit their needs. With my attentive and loving approach, you can trust me to provide the best care for your beloved pets.",
  ];

  const catDogs = [
    {
      cats: true,
      dogs: true,
    },
    {
      cats: false,
      dogs: true,
    },
    {
      cats: true,
      dogs: false,
    },
  ];

  // BOILER PLATE ENDS HERE

  return (
    <section>
      <h1 className="text-xl font-bold mb-3 text-brand-bg-900">
        Find sitters near you
      </h1>
      <div className="flex flex-col gap-5">
        {sitters?.map((sitter, index) => {
          if (sitter._id) {
            return (
              <Link key={sitter._id.toString()} href={`/owner/sitters/${sitter._id}`}>
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
                        {catDogs[index]?.dogs ? (
                          <FaDog className="text-brand-bg-400" size="2em" />
                        ) : null}
                        {catDogs[index]?.cats ? (
                          <FaCat className="text-brand-fg-400" size="2em" />
                        ) : null}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div>
                      {descriptions[index]
                        ?.slice(0, 90)
                        .concat('...')
                        .split('\n')
                        .map((desc, index) => {
                          return (
                            <p
                              key={index}
                              className="text-sm text-brand-bg-500 italic"
                            >
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
                  </CardFooter>
                </Card>
              </Link>
            );
          }
        })}
      </div>
    </section>
  );
}

// TODO Search sitter by filters and sort
// TODO add catSitter and dogSitter booleans
// TODO add available boolean to sitters
// TODO add pfpUrl to mockdata
// TODO add sitter decription
// TODO db add favorite sitters

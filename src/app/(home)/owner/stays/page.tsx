import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  getNearestSitters,
  getSitters,
  getUserByClerkId,
} from '@/lib/db/controller/User';
import {currentUser} from '@clerk/nextjs';
import {User} from '@clerk/nextjs/server';
import {User as IUser} from '@/lib/db/models/User';
import Link from 'next/link';
import {FaDog, FaCat} from 'react-icons/fa';
import {FaLocationDot} from 'react-icons/fa6';
import {getDistance} from '../../../../lib/getDistance';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {getStaysByUser} from '@/lib/db/controller/Stay';
import StayCard from '@/components/stay-card';
import {FullStay} from '@/lib/db/models/Stay';
import {notFound} from 'next/navigation';
import {Button} from '@/components/ui/button';

export default async function Page() {
  const clerkUser = (await currentUser()) as User;
  const user = (await getUserByClerkId(clerkUser.id)) as IUser;
  let sitters = await getSitters();

  if (!user || !user._id) {
    return notFound();
  }

  // Getting the relevant info on ongoing and upcoming stays
  const today = new Date();

  let stays: FullStay[] = await getStaysByUser(user._id, today);

  stays = JSON.parse(JSON.stringify(stays));
  const userWithLocation =
    user && user.contact && user.contact.loc && user.contact.loc.coordinates;

  if (!user || !user._id) {
    return notFound();
  }

  if (user?.contact?.loc?.coordinates) {
    sitters = (await getNearestSitters(
      user.contact.loc.coordinates
    )) as IUser[];
  }
  const userLoc = user.contact?.loc?.coordinates;

  return (
    <section>
      <Tabs defaultValue="view-stays" className="w-[350px] mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-3">
          <TabsTrigger value="view-stays">View my stays</TabsTrigger>
          <TabsTrigger value="book-stay">Book a new stay</TabsTrigger>
        </TabsList>
        <TabsContent value="view-stays">
          <div className="flex flex-col gap-5">
            {stays?.map((stay) => {
              if (user._id && user.role) {
                return (
                  <StayCard
                    stay={stay}
                    userId={user._id?.toString()}
                    role={user.role || 'sitter'}
                    key={stay._id.toString()}
                  >
                    <Link href={`/stays/${stay._id}`} className="w-full">
                      <Button className="w-full">View Stay</Button>
                    </Link>
                  </StayCard>
                );
              }
            })}
          </div>
        </TabsContent>
        <TabsContent value="book-stay">
          <h1 className="text-lg font-semibold text-brand-bg-900 text-center mb-2">
            Find a perfect sitter for your pet
          </h1>
          <div className="flex flex-col gap-5">
            {sitters?.map((sitter) => {
              if (sitter._id) {
                return (
                  <Link
                    key={sitter._id.toString()}
                    href={`/owner/stays/${sitter._id}`}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between">
                          <div className="flex flex-col gap-2">
                            {sitter.pfpUrl && (
                              <Avatar>
                                <AvatarImage src={sitter.pfpUrl} />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                            )}
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
                          {sitter.sitterDescription
                            ?.slice(0, 90)
                            .concat(
                              sitter.sitterDescription.length > 90 ? '...' : ''
                            )
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
                        {userWithLocation && (
                          <div className="flex w-full justify-start items-end gap-4">
                            <FaLocationDot
                              size="2em"
                              className="text-brand-fg-700"
                            />
                            <p className="text-center">
                              {userLoc
                                ? getDistance(
                                    userLoc,
                                    sitter?.contact?.loc?.coordinates ?? [0, 0]
                                  )
                                : ''}{' '}
                              km from you
                            </p>
                          </div>
                        )}
                      </CardFooter>
                    </Card>
                  </Link>
                );
              }
            })}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  getNearestSitters,
  getSitters,
  getUserByClerkId
} from '@/lib/db/controller/User';
import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import { User as IUser } from '../../../../lib/db/models/User';
import Link from 'next/link';
import { FaDog, FaCat } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { getDistance } from './getDistance';

export default async function Page() {
  const clerkUser = (await currentUser()) as User;
  const user = (await getUserByClerkId(clerkUser.id)) as IUser;
  let sitters = await getSitters();

  const userWithLocation =
    user && user.contact && user.contact.loc && user.contact.loc.coordinates;

  if (userWithLocation) {
    sitters = (await getNearestSitters(
      user.contact.loc.coordinates
    )) as IUser[];
  }
  // const nearSitters = await getNearestSitters(user.contact.loc?.coordinates)
  const userLoc = user.contact?.loc?.coordinates;
  // const sitterLoc = nearSitters[0].contact?.loc?.coordinates

  return (
    <section>
      <h1 className="text-xl font-bold mb-3 text-brand-bg-900">
        Find sitters near you
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
                                sitter.contact?.loc?.coordinates
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
    </section>
  );
}

// TODO Search sitter by filters and sort
// TODO add catSitter and dogSitter booleans
// TODO add available boolean to sitters
// TODO add pfpUrl to mockdata
// TODO add sitter decription
// TODO db add favorite sitters

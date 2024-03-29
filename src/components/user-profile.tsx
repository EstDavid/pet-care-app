'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {User} from '@/lib/db/models/User';
import Image from 'next/image';
import Link from 'next/link';
import {useUser} from '@clerk/nextjs';
import {Separator} from '@/components/ui/separator';

// rename user received from the server component to dbUser because Clerk's useUser hook uses user
export default function UserProfile({user: dbUser}: {user: User}) {
  const {isLoaded, isSignedIn, user} = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Card className="w-[350px]">
        <CardHeader className="flex flex-row items-center justify-around">
          <CardTitle className="text-xl">{user.firstName}</CardTitle>
          <div>
            {dbUser.pfpUrl && (
              <Image
                src={dbUser.pfpUrl}
                alt={`profile picture of ${user.firstName}`}
                width={0}
                height={0}
                sizes="100vh"
                className="w-[70px] h-[70px] rounded-full object-cover -z-1"
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="grid w-full items-center gap-4">
          <Separator className="bg-brand-bg" />
          <h3 className="font-semibold">Account Information</h3>
          <CardDescription>
            <span className="font-semibold">Name:</span> {user.firstName}{' '}
            {user.lastName}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Email:</span>{' '}
            {user.primaryEmailAddress?.emailAddress}
          </CardDescription>
          <Separator className="bg-brand-bg" />
          <h3 className="font-semibold">Contact Information</h3>
          <CardDescription>
            <span className="font-semibold">Phone number:</span>{' '}
            {dbUser.contact?.phone}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Street:</span>{' '}
            {dbUser.contact?.street}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">City:</span> {dbUser.contact?.city}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Postcode:</span>{' '}
            {dbUser.contact?.postcode}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Country:</span>{' '}
            {dbUser.contact?.country}
          </CardDescription>
          {/* additional sitter specific fields */}
          {dbUser.role === 'sitter' && (
            <>
              <Separator className="bg-brand-bg" />
              <h3 className="font-semibold">Sitter Information</h3>
              <CardDescription>
                <span className="font-semibold">Description:</span>{' '}
                {dbUser.sitterDescription}
              </CardDescription>
              <CardDescription>
                <span className="font-semibold">Do you look after dogs 🐶:</span>{' '}
                {dbUser.sitsDogs ? 'Yes' : 'No'}
              </CardDescription>
              <CardDescription>
                <span className="font-semibold">Do you look after cats 😸:</span>{' '}
                {dbUser.sitsCats ? 'Yes' : 'No'}
              </CardDescription>
              <CardDescription>
                <span className="font-semibold">Maximum number of pets you can look after:</span>{' '}
                {dbUser.maxPets}
              </CardDescription>
              <CardDescription>
                <span className="font-semibold">Qualifications:</span>{' '}
                {dbUser.qualifications}
              </CardDescription>
              <CardDescription>
                <span className="font-semibold">First aid experience:</span>{' '}
                {dbUser.firstAid}
              </CardDescription>
              <CardDescription>
                <span className="font-semibold">Insurance details:</span>{' '}
                {dbUser.insuranceDetails}
              </CardDescription>
            </>
          )}

          <Button variant="default" type="button">
            <Link href={`/user-profile/edit`}>Edit profile</Link>
          </Button>
          <Button variant="outline" type="button">
            {dbUser.role === 'sitter' ? (
              <Link href="/sitter/dashboard">Go back</Link>
            ) : (
              <Link href="/owner/dashboard">Go back</Link>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

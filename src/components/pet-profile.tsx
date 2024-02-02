'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Separator} from '@radix-ui/react-separator';
import {Pet} from '@/lib/db/models/Pet';
import Image from 'next/image';
import Link from 'next/link';

export default function PetProfile({pet}: {pet: Pet}) {

  const sprayed = pet.sprayed ? 'Yes' : 'No';

  return (
    <div className="flex flex-col items-center gap-4">
      <Card className="w-[350px]">
        <CardHeader className="flex items-center align-top space-x-2">
          <CardTitle>{pet.name}</CardTitle>
          {pet.pfpUrl && (
            <Image
              src={pet.pfpUrl}
              width={120}
              height={120}
              alt={`profile picture of ${pet.name}`}
            />
          )}
        </CardHeader>
        <CardContent className="grid w-full items-center gap-4">
          <Separator className="bg-brand-bg" />
          <h3 className="font-semibold">Basic Information</h3>
          <CardDescription>
            <span className="font-semibold">Name:</span> {pet.name}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Species:</span> {pet.species}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Age:</span> {pet.age}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Breed:</span> {pet.breed}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Sex:</span> {pet.sex}
          </CardDescription>
          <Separator className="bg-brand-bg" />
          <h3 className="font-semibold">Health Information</h3>
          <div className="flex flex-col space-y-1.5"></div>
          <CardDescription>
            <span className="font-semibold">Medication:</span> {pet.medication}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Allergies:</span> {pet.allergies}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Vaccinations:</span>{' '}
            {pet.vaccinations}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Sprayed/neutred:</span> {sprayed}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Behavior Notes:</span> {pet.notes}
          </CardDescription>
          <Separator className="bg-brand-bg" />
          <h3 className="font-semibold">Emergency Information</h3>
          <CardDescription>
            <span className="font-semibold">Instructions:</span>{' '}
            {pet.emergencyInstructions}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Vet Name:</span> {pet.vet.name}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Vet Number:</span> {pet.vet.phone}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Vet Address:</span> {pet.vet.street}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Insurance Number:</span>{' '}
            {pet.insurance}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Microchip Number:</span>{' '}
            {pet.microchip}
          </CardDescription>
          <div className="flex flex-col space-y-1.5"></div>
          <Link href="/dashboard">
            <Button className="bg-brand-cta text-white" type="button">
              Go Back
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {Pet} from '@/lib/db/models/Pet';
import Image from 'next/image';
import Link from 'next/link';

export default function PetProfile({pet, role}: {pet: Pet; role: string}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Card className="w-[350px]">
        {role == 'owner' && <CardHeader className="flex flex-row items-center justify-around">
            <CardTitle className="text-2xl">{pet.name}</CardTitle>
          <div className="relative w-[120px] h-[120px]">
            {pet.pfpUrl && (
              <Image
                src={pet.pfpUrl}
                alt={`profile picture of ${pet.name}`}
                fill={true}
                sizes="120px"
                style={{
                  objectFit: 'cover',
                }}
              />
            )}
          </div>
        </CardHeader>}
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
            <span className="font-semibold">Spayed/neutred:</span>{' '}
            {pet.sprayed ? 'Yes' : 'No'}
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
            <span className="font-semibold">Vet Name:</span> {pet.vet?.name}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Vet Number:</span> {pet.vet?.phone}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Vet Address:</span>{' '}
            {pet.vet?.street}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Insurance Number:</span>{' '}
            {pet.insurance}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Microchip Number:</span>{' '}
            {pet.microchip}
          </CardDescription>
          {role === 'owner' && (
            <>
              <Button variant="default" type="button">
                <Link href={`/pet/edit/${pet._id}`}>Edit pet</Link>
              </Button>
              <Button variant="outline" type="button">
                <Link href="/owner/dashboard">Go back</Link>
              </Button>
            </>
          ) }
        </CardContent>
      </Card>
    </div>
  );
}

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
import {Separator} from '@radix-ui/react-separator';
import {getPetById} from '@/lib/db/controller/Pet';
import {Pet} from '@/lib/db/models/Pet';
import Image from 'next/image';

// DOugal to check
export default function PetProfile({pet}:Pet) {

  console.log(pet.name);
  ;

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <div>
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>{pet.name}</CardTitle>
              <div>
                {pet.url && <Image src={pet.url} width={120} height={120} alt={`profile picture of ${pet.name}`} />}
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="bg-brand-bg" />
              <h3 className="font-semibold">Basic Information</h3>
                <CardDescription>
                </CardDescription>
                <CardDescription>
                  <span className="font-semibold">Breed:</span> {pet.breed}
                </CardDescription>
                <CardDescription>
                  <span className="font-semibold">Age:</span> {pet.age}
                </CardDescription>
              <Separator className="bg-brand-bg" />
              <h3 className="font-semibold">Health Information</h3>
              <div className="flex flex-col space-y-1.5"></div>
              <Separator className="bg-brand-bg" />
              <h3 className="font-semibold">Emergency Information</h3>
              <div className="flex flex-col space-y-1.5"></div>
              <Button className="bg-brand-cta text-white" type="button">
                Go back
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
